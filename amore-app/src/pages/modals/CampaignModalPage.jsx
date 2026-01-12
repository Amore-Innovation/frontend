import { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ModalShell from "./ModalShell.jsx";

import Brand from "../../components/ui/Brand.jsx";
import GraphIcon from "../../assets/icon/graph.svg"
import calendarIcon from "../../assets/icon/calendar.svg"
import arrowicon from "../../assets/icon/under_arrow.png"
import searchIcon from "../../assets/icon/search.svg"
import { findCampaign, listCampaignDeliveries, findUser, getCampaignProductName } from "../../mocks/db/index.js";

function Badge({ tone, label }) {
    const base = [
        "inline-flex items-center justify-center",
        "h-[32px] px-3 rounded-[6px]",
        "border text-[14px] font-semibold",
    ].join(" ");

    const cls =
        tone === "opened" // 열람
            ? "border-[#FF2571] text-[#FF2571] bg-[#FFEDF3] "
            : tone === "notOpened" // 미열람
                ? "border-[#1D3AE0] text-[#1D3AE0] bg-[#E6EAFF]"
                : tone === "purchased" // 구매 완료
                    ? "border-[#FF4925] text-[#FF4925] bg-[#FFF3ED]"
                    : "border-[#1F5796] text-[#1F5796] bg-[#F2F4FF]"; // 미구매

    return <span className={[base, cls].join(" ")}>{label}</span>;
}

function FilterPill({ label }) {
    return (
        <button
            type="button"
            className={[
                "h-[40px] px-4 rounded-[10px] border border-[#E4E4E4] bg-white",
                "text-[16px] font-semibold text-[#8C8C8C]",
                "inline-flex items-center gap-2",
                "transition-all duration-150",
                "hover:-translate-y-[1px] hover:bg-[#FAFAFA] hover:border-[#CFCFCF] hover:shadow-sm",
                "active:translate-y-0",
            ].join(" ")}
        >
            {label}
            <img src={arrowicon} alt="" className="w-5 h-5" />
        </button>
    );
}

export default function CampaignModalPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { campaignId } = useParams();
    const close = () => navigate(-1);

    const campaign = useMemo(() => findCampaign(campaignId), [campaignId]);

    const allDeliveries = useMemo(
        () => listCampaignDeliveries(campaignId),
        [campaignId]
    );

    // 필터/검색 state
    const [q, setQ] = useState("");
    const [age, setAge] = useState("all");
    const [skin, setSkin] = useState("all");
    const [opened, setOpened] = useState("all"); // all | opened | not
    const [purchased, setPurchased] = useState("all"); // all | purchased | not

    const filtered = useMemo(() => {
        const lower = q.trim().toLowerCase();

        return allDeliveries
            .filter((d) => {
                const u = findUser(d.userId);
                if (!u) return false;

                if (lower) {
                    const target = `${u.id}`.toLowerCase();
                    if (!target.includes(lower)) return false;
                }

                if (age !== "all" && String(u.age) !== String(age)) return false;
                if (skin !== "all" && u.skin !== skin) return false;

                if (opened === "opened" && !d.opened) return false;
                if (opened === "not" && d.opened) return false;

                if (purchased === "purchased" && !d.purchased) return false;
                if (purchased === "not" && d.purchased) return false;

                return true;
            })
            //  여기 추가
            .sort((a, b) => {
                const na = Number(a.userId.replace("u", ""));
                const nb = Number(b.userId.replace("u", ""));
                return na - nb;
            });
    }, [allDeliveries, q, age, skin, opened, purchased]);

    // 페이지네이션 ( 데모용: 1/8 고정, 다음 버튼 활성화만)
    const PAGE_SIZE = 8;
    const [page, setPage] = useState(1);

    //  화면에는 1/8로만 보이게 고정
        const FAKE_TOTAL_PAGES = 8;
        const totalPages = FAKE_TOTAL_PAGES;
        const pageSafe = 1; //  항상 1페이지로 고정

    //  실제 데이터는 1페이지 분량만 보여주기
        const pageItems = useMemo(() => {
            return filtered.slice(0, PAGE_SIZE);
        }, [filtered]);

    //  버튼 눌러도 실제로는 페이지 이동 안함(가짜)
        const goPage = () => {};

    const openUser = (userId) => {
        navigate(`/agents/campaign/${campaignId}/user/${userId}`, {
            state: { backgroundLocation: location.state?.backgroundLocation || location },
        });
    };

    if (!campaign) {
        return (
            <ModalShell onClose={close}>
                <div className="h-full flex items-center justify-center text-[#7D7D7D]">
                    캠페인을 찾을 수 없습니다.
                </div>
            </ModalShell>
        );
    }

    const metricBox = campaign.metrics;

    return (
        <ModalShell onClose={close} >

            {/* body */}
                <div className="p-8 pt-3">
                    {/* 상단 2카드 */}
                    <div className="grid grid-cols-[360px_1fr] gap-6">

                        {/* 캠페인 요약 */}
                        <div className="rounded-[16px] bg-[#FAFAFA] border border-[#EFEFEF] p-6">
                            {/* 1) 아이콘 + 타이틀 */}
                            <div className="flex items-start gap-3">
                                <img src={campaign.leftIcon} alt="" className="w-[26px] h-[26px]" />
                                <div className="min-w-0">
                                    <div className="text-[20px] font-semibold text-[#232323]">
                                        {campaign.title}
                                    </div>
                                </div>
                            </div>

                            {/* 2) 실행중/브랜드 (타이틀 아래로) */}
                            <div className="mt-4 flex items-center gap-2">
                                <span
                                    className={[
                                        "h-[32px] px-3 rounded-[8px] inline-flex items-center justify-center",
                                        "border text-[14px] font-semibold",
                                        campaign.status.tone === "pink"
                                            ? "border-[#FF2571] text-[#FF2571] bg-[#FFEDF3]"
                                            : "border-[#7D7D7D] text-[#FFFFFF] bg-[#7D7D7D]",
                                    ].join(" ")}
                                >
                                  {campaign.status.label}
                                </span>

                                <Brand brand={campaign.brand.key} variant="display" />
                            </div>

                            {/* 3) 구분선 (DFDFDF) */}
                            <div className="mt-5 h-px bg-[#DFDFDF]" />

                            {/* 4) 대상/기간 (아래로) */}
                            <div className="mt-3 text-[14px] font-semibold text-[#545454] leading-6">
                                기간 : {campaign.period.start} - {campaign.period.end}
                            </div>
                        </div>

                        {/* 성과 */}
                        <div className="rounded-[16px] bg-[#FAFAFA] border border-[#EFEFEF] p-6">
                            <div className="flex items-center gap-3">
                                <img src={GraphIcon} className="w-5 h-5"/>
                                <div className="text-[20px] font-semibold text-[#232323]">성과</div>
                            </div>

                            <div className="mt-15 grid grid-cols-5 gap-6">
                                {[
                                    { k: "오픈율", v: metricBox.openRate },
                                    { k: "클릭율", v: metricBox.clickRate },
                                    { k: "열람 고객 수", v: metricBox.openedUsers },
                                    { k: "ROI", v: metricBox.roi },
                                    { k: "목표 달성 정도", v: metricBox.goal },
                                ].map((x) => {
                                    const isPercentOnly = x.k === "ROI" || x.k === "목표 달성 정도";

                                    return (
                                        <div key={x.k}>
                                            <div className="text-[16px] font-medium text-[#232323]">{x.k}</div>

                                            <div className="mt-4 flex items-end gap-2">
                                                <div className="text-[24px] font-bold text-[#232323]">
                                                    {isPercentOnly ? `${x.v.value}%` : x.v.value}
                                                </div>

                                                {!isPercentOnly && (
                                                    <div className="text-[16px] font-medium text-[#232323]">
                                                        ({x.v.rate}%)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 필터/검색 */}
                    <div className="mt-6 flex items-center gap-4">
                        {/*  왼쪽 덩어리: 필터 + 달력 */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FilterPill label="나이" />
                                <FilterPill label="피부 타입" />
                                <FilterPill label="열람 여부" />
                                <FilterPill label="구매 여부" />

                                {/* 실제 state 연결 필요하면 여기 구현 */}
                                <div className="hidden">
                                    <select value={age} onChange={(e) => setAge(e.target.value)} />
                                    <select value={skin} onChange={(e) => setSkin(e.target.value)} />
                                    <select value={purchased} onChange={(e) => setPurchased(e.target.value)} />
                                    <select value={opened} onChange={(e) => setOpened(e.target.value)} />
                                </div>
                            </div>

                            {/* 달력은 왼쪽 덩어리에 포함 */}
                            <div
                                className={[
                                    "h-[40px] px-5 rounded-[10px] border border-[#E2E2E2] bg-white flex items-center gap-2",
                                    "cursor-pointer transition-all duration-150",
                                    "hover:-translate-y-[1px] hover:border-[#CFCFCF] hover:bg-[#FAFAFA] hover:shadow-sm",
                                    "active:translate-y-0",
                                    "shrink-0",
                                ].join(" ")}
                            >
                                <img src={calendarIcon} alt="" className="w-5 h-5" />
                                <span className="text-[16px] font-semibold text-[#8C8C8C]">
        2026 / 01 / 01 ~ 2026 / 01 / 02
      </span>
                            </div>
                        </div>

                        {/*  가운데 스페이서: 검색을 오른쪽 끝으로 밀어냄 */}
                        <div className="flex-1" />

                        {/*  오른쪽 끝: 검색 */}
                        <div
                            className={[
                                "h-[40px] w-[320px] px-5 rounded-[10px]",
                                "border border-[#E4E4E4] bg-white",
                                "flex items-center gap-2",
                                "shrink-0",
                            ].join(" ")}
                        >
                            <input
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="검색어를 입력해 주세요"
                                className="w-full text-[16px] font-semibold text-[#8C8C8C] placeholder:text-[#8C8C8C] outline-none"
                            />
                            <img src={searchIcon} alt="" className="w-5 h-5" />
                        </div>
                    </div>

                    {/* 테이블 */}
                    <div className="mt-4 border border-white overflow-hidden">
                        <div className="grid grid-cols-[140px_80px_80px_120px_1fr_200px_120px] bg-[#F7F7F7] text-[14px] font-semibold text-[#555]">
                            <div className="px-4 py-3">아이디</div>
                            <div className="px-4 py-3">나이</div>
                            <div className="px-4 py-3">성별</div>
                            <div className="px-4 py-3">피부 타입</div>

                            {/* 추천제품 헤더: 왼쪽선 + 오른쪽선 둘 다 */}
                            <div className="px-4 py-3 pl-6 pr-4 border-l border-r border-[#EFEFEF]">추천제품</div>

                            {/* 열람여부 헤더: border 없음, 대신 padding만 */}
                            <div className="px-4 py-3 pl-[80px] pr-4 whitespace-nowrap">열람 여부</div>

                            <div className="px-4 py-3">구매 여부</div>
                        </div>

                        {pageItems.map((d) => {
                            const u = findUser(d.userId);
                            if (!u) return null;

                            return (
                                <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => openUser(d.userId)}
                                    className={[
                                        "w-full text-left grid grid-cols-[140px_80px_80px_120px_1fr_200px_120px]",
                                        "border-t border-[#EFEFEF]",
                                        "transition-colors",
                                        "hover:bg-[#FAFAFA]",
                                        "h-[48px] items-center",
                                    ].join(" ")}
                                >
                                    {/*  아이디: hover underline + 클릭가능 느낌 */}
                                    <div className="px-4 py-2 text-[14px] font-semibold text-[#232323]">
                                        <span className="cursor-pointer hover:underline">
                                          {u.id}
                                        </span>
                                    </div>

                                    <div className="px-4 py-2 text-[14px] text-[#232323]">{u.age}</div>
                                    <div className="px-4 py-2 text-[14px] text-[#232323]">{u.gender}</div>
                                    <div className="px-4 py-2 text-[14px] text-[#232323]">{u.skin}</div>

                                    {/* 추천제품 */}
                                    {/* 추천제품 */}
                                    <div className="px-4 py-2 pl-6 pr-4 border-l border-r border-[#EFEFEF] text-[14px] text-[#232323] truncate">
                                        {getCampaignProductName(campaignId) || d.product.name}
                                    </div>

                                    {/* 열람여부 (border 제거) */}
                                    <div className="px-4 py-2 pl-[80px] pr-4 whitespace-nowrap flex items-center">
                                        {d.opened ? <Badge tone="opened" label="열람" /> : <Badge tone="notOpened" label="미열람" />}
                                    </div>

                                    <div className="px-4 py-2 ">
                                        {d.purchased ? (
                                            <Badge tone="purchased" label="구매 완료" />
                                        ) : (
                                            <Badge tone="notPurchased" label="미구매" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="mt-5 flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => goPage(pageSafe - 1)}
                            disabled={pageSafe <= 1}
                            className={[
                                "h-[32px] px-3 rounded-[10px] border text-[14px] font-semibold",
                                pageSafe <= 1
                                    ? "border-[#EDEDED] text-[#C7C7C7]"
                                    : "border-[#EDEDED] text-[#7D7D7D] hover:bg-[#FAFAFA]",
                            ].join(" ")}
                        >
                            이전
                        </button>

                        <div className="text-[14px] font-semibold text-[#7D7D7D] px-3">
                            {pageSafe} / {totalPages}
                        </div>

                        <button
                            type="button"
                            onClick={() => goPage(pageSafe + 1)}
                            disabled={pageSafe >= totalPages}
                            className={[
                                "h-[32px] px-3 rounded-[10px] border text-[14px] font-semibold",
                                pageSafe >= totalPages
                                    ? "border-[#EDEDED] text-[#C7C7C7]"
                                    : "border-[#EDEDED] text-[#7D7D7D] hover:bg-[#FAFAFA]",
                            ].join(" ")}
                        >
                            다음
                        </button>
                    </div>

                    <div className="h-2" />
                </div>
        </ModalShell>
    );
}