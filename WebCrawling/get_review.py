# 리뷰당 추천 많은순 10개, 베스트순 10개, 리뷰 높은순 10개 크롤링
# 상품별 1개 CSV (추천)
# 	reviews/{brand}/{brand}_{i:03d}_reviews.csv
# 	한 파일에 30행(정렬별 10개씩)
# 	컬럼은 “원문 + 메타 + surveys 요약 컬럼”까지

# survey는 리스트라 키:값 문자열 ->	survey_지속력=적당해요 | survey_유분기=보통이에요 | ...
# prodReviewBodyText, scope, surveys(피부타입, 피부고민), userAddAttrInfo(연령대,성별,survey 요약),  prodName(색상,/호수/라인) 추출 
import time
import requests
import pandas as pd
from pathlib import Path
import json

HEADERS = {
    "user-agent": "Mozilla/5.0",
    "accept-language": "ko-KR,ko;q=0.9",
}

API_URL = "https://api-gw.amoremall.com/commune/v2/M01/apcp/reviews"

SORTS = [
    ("Recommend", "추천많은순"),
    ("BestScrOnly", "베스트순"),
    ("HighScope", "별점높은순"),
]

# 상품 CSV에서 가져올 컬럼 후보
COL_PROD_SN = "onlineProdSn"
COL_PROD_NAME = "제품명"
COL_PROD_URL = "url"


def fetch_reviews(
    session: requests.Session,
    online_prod_sn: str | int,
    sort_code: str,
    limit: int = 10,
    offset: int = 0,
):
    params = {
        "onlineProdSn": str(online_prod_sn),
        "offset": offset,
        "limit": limit,
        "prodReviewUnit": "OnlineProd",
        "prodReviewType": "All",
        "prodReviewSort": sort_code,
        "scope": "All",
        "opinion": "",
        "filterMemberAttrYn": "N",
        "imageOnlyYn": "N",
    }
    r = session.get(API_URL, headers=HEADERS, params=params, timeout=20)
    r.raise_for_status()
    return r.json()


def surveys_to_kv(surveys: list[dict]) -> str:
    if not surveys:
        return ""
    parts = []
    for s in surveys:
        q = (s.get("questionHeader") or "").strip()
        a = (s.get("responseBodyText") or "").strip()
        if q and a:
            parts.append(f"{q}:{a}")
    return " | ".join(parts)


def normalize_review_item(
    item: dict, sort_code: str, sort_name: str, online_prod_sn: str | int
):
    surveys = item.get("surveys") or []
    img_list = item.get("imgList") or []
    profile = item.get("profile") or {}

    return {
        "onlineProdSn": str(online_prod_sn),
        "sortCode": sort_code,
        "sortName": sort_name,
        "prodReviewSn": item.get("prodReviewSn"),
        "prodReviewTypeCode": item.get("prodReviewTypeCode"),
        "prodReviewRegistDt": item.get("prodReviewRegistDt"),
        "scope": item.get("scope"),
        "recommendCnt": item.get("recommendCnt"),
        "rvAnalyticsScore": item.get("rvAnalyticsScore"),
        "memberId_masked": item.get("memberId") or profile.get("nickName"),
        "userAddAttrInfo": item.get("userAddAttrInfo"),
        "prodName_in_review": item.get("prodName"),
        "prodReviewBodyText": item.get("prodReviewBodyText"),
        "hasImage": "Y" if len(img_list) > 0 else "N",
        "imageCount": len(img_list),
        # surveys 저장 (분석용 + 원본보존)
        "surveys_kv": surveys_to_kv(surveys),
        "surveys_json": json.dumps(surveys, ensure_ascii=False),
    }


def main():
    product_dir = Path("product_csv")
    review_root = Path("reviews")
    review_root.mkdir(parents=True, exist_ok=True)

    product_csvs = sorted(product_dir.glob("*_p_info.csv"))
    if not product_csvs:
        print("FAIL: product_csv 폴더에서 *_p_info.csv 파일을 찾지 못했습니다.")
        return

    session = requests.Session()

    for csv_path in product_csvs:
        brand_key = csv_path.name.replace("_p_info.csv", "")  # 예: sulwhasoo
        brand_out_dir = review_root / brand_key
        brand_out_dir.mkdir(parents=True, exist_ok=True)

        df_prod = pd.read_csv(csv_path, dtype=str).fillna("")
        if COL_PROD_SN not in df_prod.columns:
            print(
                f"[{brand_key}] FAIL: {csv_path.name} 에 onlineProdSn 컬럼이 없습니다."
            )
            continue

        products = df_prod.to_dict("records")
        print(f"\n[{brand_key}] 상품 개수: {len(products)}")

        for i, p in enumerate(products, 1):
            online_prod_sn = p.get(COL_PROD_SN, "").strip()
            if not online_prod_sn:
                print(f"[{brand_key}] [{i}/{len(products)}] SKIP (onlineProdSn 없음)")
                continue

            prod_name = p.get(COL_PROD_NAME, "").strip()
            prod_url = p.get(COL_PROD_URL, "").strip()

            rows = []
            try:
                for sort_code, sort_name in SORTS:
                    data = fetch_reviews(
                        session, online_prod_sn, sort_code, limit=10, offset=0
                    )
                    review_list = data.get("prodReviewList") or []

                    for item in review_list[:10]:
                        row = normalize_review_item(
                            item, sort_code, sort_name, online_prod_sn
                        )
                        row["제품명"] = prod_name
                        row["상품url"] = prod_url
                        rows.append(row)

                    time.sleep(0.2)

                out_csv = brand_out_dir / f"{brand_key}_{i:03d}_reviews.csv"
                pd.DataFrame(rows).to_csv(out_csv, index=False, encoding="utf-8-sig")
                print(
                    f"[{brand_key}] [{i}/{len(products)}] OK  {online_prod_sn} | {prod_name} -> {out_csv.name} (rows={len(rows)})"
                )

            except Exception as e:
                print(
                    f"[{brand_key}] [{i}/{len(products)}] FAIL {online_prod_sn} | {prod_name} ({e})"
                )

            time.sleep(0.2)


if __name__ == "__main__":
    main()
