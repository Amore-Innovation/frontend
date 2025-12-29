// AgentStatusSection.jsx
import aiIcon from "../../assets/icon/ai.svg";
import navigatePrev from "../../assets/icon/NavigatePrevious.svg";
import navigateNext from "../../assets/icon/NavigateNext.svg";
import Brand from "../ui/brand.jsx";

import iconSunny from "../../assets/icon/Sunny.svg";
import iconActivate from "../../assets/icon/activate.svg";
import iconNewcustom from "../../assets/icon/newcustom.svg";

const DUMMY_CARDS = [
    {
        id: "c1",
        title: "재구매 유도",
        target: "20-30대 / 복합성 피부",
        date: "FEB 2. 2025",
        leftIcon: iconActivate,
        status: { label: "실행중 (7일)", tone: "pink" },
        brand: { key: "inisfree" },
        kpiValue: "+ 35.4% 전환",
        progress: 0.62,
        theme: "cool",
    },
    {
        id: "c2",
        title: "구매 전환 유도",
        target: "20-30대 / 복합성 피부",
        date: "FEB 2. 2025",
        leftIcon: iconSunny,
        status: { label: "실행중 (7일)", tone: "pink" },
        brand: { key: "sulhwasoo" },
        kpiValue: "+ 0.2% 전환",
        progress: 0.22,
        theme: "warm",
    },
    {
        id: "c3",
        title: "신규 고객 확보",
        target: "20-30대 / 복합성 피부",
        date: "FEB 2. 2025",
        leftIcon: iconNewcustom,
        status: { label: "긴급 중단", tone: "dark" },
        brand: { key: "etude" },
        kpiValue: "+ 0.2% 전환",
        progress: 0.12,
        theme: "disabled",
    },
];

//  실행중/긴급중단 
function Status({ children, tone = "pink", disabled = false }) {
    if (tone === "pink") {
        return (
            <span
                className={[
                    "inline-flex items-center justify-center",
                    "h-[32px] px-2.5 py-3",
                    "rounded",
                    "border-1 border-[#FF2571]",
                    "bg-[#FFEDF3]",
                    "text-[#FF2571] font-semibold text-[14px]",
                ].join(" ")}
            >
        {children}
      </span>
        );
    }

    // 긴급중단
    return (
        <span
            className={[
                "inline-flex items-center justify-center",
                "h-[32px] px-2.5 py-1.5",
                "rounded",
                "bg-[#7D7D7D] text-white",
                "font-Semibold text-[14px]",
            ].join(" ")}
        >
      {children}
    </span>
    );
}

function AgentCard({ card }) {
    const disabled = card.theme === "disabled";

    const cardCls = [
        "rounded",
        "shadow-[0_0_8px_rgba(0,0,0,0.1)]",
        "border border-[#EFEFEF]",                 //  카드 테두리
        disabled ? "bg-[#F7F7F7]" : "bg-white",
    ].join(" ");


    const kpiBoxCls =
        card.theme === "warm"
            ? "bg-[#FFEAE2]"
            : card.theme === "disabled"
                ? "bg-[#D7D7D7]"
                : "bg-[#EEF2FA]";

    const kpiTextCls =
        card.theme === "warm"
            ? "text-[#FF510E]"
            : card.theme === "disabled"
                ? "text-[#7D7D7D]"
                : "text-[#001A4C]";

    const barCls =
        card.theme === "warm"
            ? "bg-[#FF510E]"
            : card.theme === "disabled"
                ? "bg-[#7D7D7D]"
                : "bg-[#001A4C]";

    return (
        <div className={cardCls}>

            <div className="p-8">
                {/* 헤더 */}
                <div className="grid grid-cols-[32px_1fr] gap-x-2">
                    <img
                        src={card.leftIcon}
                        alt=""
                        className="w-[32px] h-[32px]"
                    />

                    <div className="text-[20px] font-semibold text-[#232323]">
                        {card.title}
                    </div>
                    <div className="col-span-2 mt-2 text-[14px] text-[#818181] font-medium">
                        {card.target}. {card.date}
                    </div>
                </div>

                <div className="my-3 h-px bg-[#E5E5E5]" />

                {/* 배지 */}
                <div className="flex items-center gap-2">
                    <Status tone={card.status.tone} disabled={disabled}>
                        {card.status.label}
                    </Status>

                    <Brand
                        brand={card.brand.key}
                        variant="display"
                        disabled={disabled}
                    />
                </div>

                {/* 성과 박스 */}
                <div className={["mt-3 rounded-xl px-4 py-4", kpiBoxCls].join(" ")}>
                    <div className="flex items-center justify-between">
                        <span className="text-[16px] text-[#393939] font-medium">
                          핵심 성과
                        </span>
                        <span className={["text-[20px] font-bold", kpiTextCls].join(" ")}>
                          {card.kpiValue}
                        </span>
                    </div>

                    {/* progress bar */}
                    <div className="mt-5 h-[16px] w-full rounded-full bg-white overflow-hidden">
                        <div
                            className={["h-full rounded-full", barCls].join(" ")}
                            style={{ width: `${Math.round(card.progress * 100)}%` }}
                        />
                    </div>
                </div>

                {/* 버튼 (radius 4) */}
                <div className="mt-7 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        disabled={disabled}
                        className={[
                            "h-[40px] w-[140px] rounded-sm ",
                            "text-[18px] font-semibold",
                            "flex items-center justify-center",
                            disabled ? "bg-[#E3E3E3] text-[#7D7D7D]" : "bg-[#FF510E] text-white",
                        ].join(" ")}
                    >
                        긴급 중단
                    </button>

                    <button
                        type="button"
                        disabled={disabled}
                        className={[
                            "h-[40px]  w-[140px] rounded-sm ",
                            "text-[18px] font-semibold",
                            "whitespace-nowrap",
                            "flex items-center justify-center",
                            disabled ? "bg-[#FFFFFF] text-[#001A4C]" : "bg-[#F3F3F3] text-[#001A4C]",
                        ].join(" ")}
                    >
                        자세히 보기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AgentStatusSection() {
    return (
        <div className="rounded-[28px] bg-white border border-[#EDEDED] p-10">
            {/* 섹션 헤더 */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <img src={aiIcon} alt="" className="w-7 h-7" />
                        <h2 className="text-[20px] font-bold text-[#252525]">
                            에이전트 상태 요약
                        </h2>
                    </div>
                    <p className="mt-3 text-[16px] text-[#797979] font-medium">
                        AI가 성과 분석을 바탕으로 다음 마케팅 전략을 미리 생성하고 실행을 준비하고 있습니다.
                    </p>
                </div>

                {/* 우상단 네비: 테두리/배경 없는 이미지 버튼 */}
                <div className="flex items-center ">
                    <button type="button" className="p-0" aria-label="Previous">
                        <img src={navigatePrev} alt="" className="w-[24px] h-[24px]" />
                    </button>
                    <button type="button" className="p-0" aria-label="Next">
                        <img src={navigateNext} alt="" className="w-[24px] h-[24px]" />
                    </button>
                </div>
            </div>

            {/* 카드 */}
            <div className="mt-10 grid grid-cols-3 gap-10">
                {DUMMY_CARDS.map((c) => (
                    <AgentCard key={c.id} card={c} />
                ))}
            </div>
        </div>
    );
}