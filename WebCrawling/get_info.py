# 입력: urls/*.txt 중 파일명이 *_p_url.txt 인 것들 전부
# 출력: 각 txt 파일마다 product_csv/{브랜드}_p_info.csv
import json
import time
import re
import requests
import pandas as pd
from bs4 import BeautifulSoup
from pathlib import Path  # 추가

HEADERS = {
    "user-agent": "Mozilla/5.0",
    "accept-language": "ko-KR,ko;q=0.9",
}


def clean_url_line(line: str) -> str | None:
    line = line.strip()
    if not line:
        return None
    line = line.rstrip("\\")
    line = line.rstrip("}")
    line = line.strip()
    return line if line.startswith("http") else None


def extract_brand_en(info: dict) -> str | None:
    seo = info.get("seoInfo") or {}
    for k in ["brandNameEn", "brandEn", "brandNameENG", "brandNameEnglish"]:
        v = seo.get(k)
        if isinstance(v, str) and v.strip():
            return v.strip()

    keyword = (info.get("metaInfo") or {}).get("keyword")
    if isinstance(keyword, str) and keyword.strip():
        tokens = [t.strip() for t in keyword.split(",")]
        english = [
            t for t in tokens if re.fullmatch(r"[A-Za-z0-9\-\s]+", t) and len(t) <= 30
        ]
        if english:
            return english[0].strip()

    return None


def normalize_subtitle(info: dict) -> str | None:
    origin = info.get("originOnlineProdName")
    if isinstance(origin, str) and origin.strip():
        return origin.strip()

    name = info.get("onlineProdName")
    if not isinstance(name, str) or not name.strip():
        return None

    name2 = re.sub(r"\[[^\]]+\]\s*", "", name).strip()
    return name2


def classify_top_category(cat_large: str | None) -> str | None:
    if not cat_large:
        return None
    if "스킨케어" in cat_large:
        return "스킨케어"
    if "메이크업" in cat_large:
        return "메이크업"
    return "기타"


def parse_product_from_html(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    script = soup.find("script", id="__NEXT_DATA__")
    if not script or not script.string:
        raise ValueError("NO_NEXT_DATA_SCRIPT")

    next_data = json.loads(script.string)
    state_str = next_data["props"]["pageProps"]["initialState"]
    state = json.loads(state_str)

    info = state["productDetail"]["productInfo"]

    category_info = info.get("categoryInfo", {}) or {}
    cat_group = category_info.get("categoryGroupInfo", {}) or {}

    cat_id = category_info.get("categoryId")
    cat_title = category_info.get("categoryTitle")

    cat_large = cat_group.get("large")
    cat_middle = cat_group.get("middle")
    cat_small = cat_group.get("small")

    if not cat_small:
        cat_small = cat_title
    if not cat_large:
        cat_large = cat_title

    brand_ko = (info.get("brandInfo") or {}).get("brandName")
    brand_en = extract_brand_en(info)

    keyword = (info.get("metaInfo") or {}).get("keyword")
    top = classify_top_category(cat_large)

    return {
        "onlineProdSn": info.get("onlineProdSn"),
        "제품명": info.get("onlineProdName"),
        "브랜드": brand_ko,
        "카테고리_id": cat_id,
        "카테고리_타이틀": cat_title,
        "카테고리_대": cat_large,
        "카테고리_중": cat_middle,
        "카테고리_소": cat_small,
        "핵심키워드": keyword,
        "브랜드한글명": brand_ko,
        "브랜드영문명": brand_en,
        "스킨케어/메이크업": top,
        "카테고리2": cat_middle,
        "카테고리3": cat_small,
        "부제목": normalize_subtitle(info),
    }


def read_urls_from_txt(txt_path: Path) -> list[str]:
    with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
        raw_lines = f.readlines()

    urls = []
    for line in raw_lines:
        u = clean_url_line(line)
        if u:
            urls.append(u)

    seen = set()
    urls = [u for u in urls if not (u in seen or seen.add(u))]
    return urls


def main():
    urls_dir = Path("urls")
    out_dir = Path("product_csv")
    out_dir.mkdir(parents=True, exist_ok=True)

    txt_files = sorted(urls_dir.glob("*_p_url.txt"))
    if not txt_files:
        print("FAIL: urls 폴더에서 *_p_url.txt 파일을 찾지 못했습니다.")
        return

    desired_cols = [
        "onlineProdSn",
        "제품명",
        "브랜드",
        "카테고리_id",
        "카테고리_타이틀",
        "카테고리_대",
        "카테고리_중",
        "카테고리_소",
        "핵심키워드",
        "브랜드한글명",
        "브랜드영문명",
        "스킨케어/메이크업",
        "카테고리2",
        "카테고리3",
        "부제목",
        "url",
    ]

    session = requests.Session()

    for txt_path in txt_files:
        brand_key = txt_path.name.replace("_p_url.txt", "")  # 예: sulwhasoo
        urls = read_urls_from_txt(txt_path)
        print(f"\n[{brand_key}] URL 개수: {len(urls)} ({txt_path.as_posix()})")

        rows = []
        for idx, url in enumerate(urls, 1):
            try:
                r = session.get(url, headers=HEADERS, timeout=20)
                r.raise_for_status()

                row = parse_product_from_html(r.text)
                row["url"] = url
                rows.append(row)

                print(
                    f"[{idx}/{len(urls)}] OK  {row.get('브랜드')} | {row.get('제품명')}"
                )
            except Exception as e:
                print(f"[{idx}/{len(urls)}] FAIL {url} ({e})")

            time.sleep(0.4)

        df = pd.DataFrame(rows).reindex(columns=desired_cols)

        out_csv = out_dir / f"{brand_key}_p_info.csv"  # 예: sulwhasoo_p_info.csv
        df.to_csv(out_csv, index=False, encoding="utf-8-sig")
        print(f"[{brand_key}] 저장 완료: {out_csv.as_posix()} (rows={len(df)})")


if __name__ == "__main__":
    main()
