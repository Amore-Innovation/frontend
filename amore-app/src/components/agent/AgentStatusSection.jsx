// AgentStatusSection.jsx
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import aiIcon from "../../assets/icon/ai.svg";
import navigatePrev from "../../assets/icon/NavigatePrevious.svg";
import navigateNext from "../../assets/icon/NavigateNext.svg";
import Brand from "../ui/Brand.jsx";

import { DUMMY_CARDS } from "../../mocks/agentStatusCards.js";

//  실행중/긴급중단
function Status({ children, tone = "pink" }) {
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
    // ✅ "긴급 중단" 카드도 클릭/hover 가능해야 하므로, disabled는 "진짜 비활성"이 아니라 "스타일"만 의미
    const isDisabledTheme = card.theme === "disabled";
    const navigate = useNavigate();
    const location = useLocation();

    const cardCls = [
        "rounded",
        "shadow-[0_0_8px_rgba(0,0,0,0.1)]",
        "border border-[#EFEFEF]",
        "transition-transform duration-200 will-change-transform",
        isDisabledTheme ? "bg-[#F7F7F7]" : "bg-white",
        "hover:scale-[1.02]", // ✅ 항상 hover 확대
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

    const openDetail = () => {
        navigate(`/agents/campaign/${card.id}`, {
            state: { backgroundLocation: location },
        });
    };

    return (
        <div className={cardCls}>
            <div className="p-8">
                <div className="grid grid-cols-[32px_1fr] gap-x-2">
                    <img src={card.leftIcon} alt="" className="w-[32px] h-[32px]" />
                    <div className="text-[20px] font-semibold text-[#232323]">{card.title}</div>
                    <div className="col-span-2 mt-2 text-[14px] text-[#818181] font-medium leading-[22px] min-h-[44px]">
                        <div className="line-clamp-1">{card.target}</div>
                        <div className="line-clamp-1">{card.date}</div>
                    </div>
                </div>

                <div className="my-3 h-px bg-[#E5E5E5]" />

                <div className="flex items-center gap-2">
                    <Status tone={card.status.tone}>{card.status.label}</Status>
                    <Brand brand={card.brand.key} variant="display" disabled={isDisabledTheme} />
                </div>

                <div className={["mt-3 rounded-xl px-4 py-4", kpiBoxCls].join(" ")}>
                    <div className="flex items-center justify-between">
                        <span className="text-[16px] text-[#393939] font-medium">핵심 성과</span>
                        <span className={["text-[20px] font-bold", kpiTextCls].join(" ")}>
                            {card.kpiValue}
                        </span>
                    </div>

                    <div className="mt-5 h-[16px] w-full rounded-full bg-white overflow-hidden">
                        <div
                            className={["h-full rounded-full", barCls].join(" ")}
                            style={{ width: `${Math.round(card.progress * 100)}%` }}
                        />
                    </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        // ✅ 긴급중단(회색)도 클릭/hover 가능해야 하므로 disabled 제거
                        className={[
                            "h-[40px] w-[140px] rounded-sm",
                            "text-[18px] font-semibold",
                            "flex items-center justify-center",
                            isDisabledTheme
                                ? [
                                    "bg-[#E3E3E3] text-[#7D7D7D] cursor-pointer",
                                    "transition-all duration-150",
                                    "hover:brightness-95 hover:-translate-y-[1px] hover:shadow-sm",
                                    "active:translate-y-0",
                                ].join(" ")
                                : [
                                    "bg-[#FF510E] text-white cursor-pointer",
                                    "transition-all duration-150",
                                    "hover:brightness-95 hover:-translate-y-[1px] hover:shadow-sm",
                                    "active:translate-y-0",
                                ].join(" "),
                        ].join(" ")}
                    >
                        긴급 중단
                    </button>

                    <button
                        type="button"
                        // ✅ 긴급중단(회색)도 클릭/hover 가능해야 하므로 disabled 제거
                        onClick={openDetail} //팝업열기
                        className={[
                            "h-[40px] w-[140px] rounded-sm",
                            "text-[18px] font-semibold",
                            "whitespace-nowrap",
                            "flex items-center justify-center",
                            isDisabledTheme
                                ? [
                                    "bg-[#FFFFFF] text-[#001A4C] cursor-pointer",
                                    "transition-all duration-150",
                                    "hover:bg-[#F3F3F3] hover:-translate-y-[1px] hover:shadow-sm",
                                    "active:translate-y-0",
                                ].join(" ")
                                : [
                                    "bg-[#F3F3F3] text-[#001A4C] cursor-pointer",
                                    "transition-all duration-150",
                                    "hover:bg-[#E9E9E9] hover:-translate-y-[1px] hover:shadow-sm",
                                    "active:translate-y-0",
                                ].join(" "),
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
    const VISIBLE_COUNT = 3;
    const [startIndex, setStartIndex] = useState(0);

    const maxStart = Math.max(0, DUMMY_CARDS.length - VISIBLE_COUNT);
    const canPrev = startIndex > 0;
    const canNext = startIndex < maxStart;

    const visibleCards = useMemo(() => {
        return DUMMY_CARDS.slice(startIndex, startIndex + VISIBLE_COUNT);
    }, [startIndex]);

    const handlePrev = () => {
        if (!canPrev) return;
        setStartIndex((v) => Math.max(0, v - 1));
    };

    const handleNext = () => {
        if (!canNext) return;
        setStartIndex((v) => Math.min(maxStart, v + 1));
    };

    return (
        <div className="rounded-[28px] bg-white border border-[#EDEDED] p-10">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <img src={aiIcon} alt="" className="w-7 h-7" />
                        <h2 className="text-[20px] font-bold text-[#252525]">에이전트 상태 요약</h2>
                    </div>
                    <p className="mt-3 text-[16px] text-[#797979] font-medium">
                        AI가 성과 분석을 바탕으로 다음 마케팅 전략을 미리 생성하고 실행을 준비하고 있습니다.
                    </p>
                </div>

                <div className="flex items-center">
                    <button
                        type="button"
                        className={[
                            "p-0",
                            canPrev
                                ? "cursor-pointer transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-0"
                                : "",
                        ].join(" ")}
                        aria-label="Previous"
                        onClick={handlePrev}
                        disabled={!canPrev}
                    >
                        <img
                            src={navigatePrev}
                            alt=""
                            className={[
                                "w-[24px] h-[24px]",
                                !canPrev ? "opacity-30" : "opacity-100",
                                canPrev ? "hover:opacity-90" : "",
                            ].join(" ")}
                        />
                    </button>

                    <button
                        type="button"
                        className={[
                            "p-0",
                            canNext
                                ? "cursor-pointer transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-0"
                                : "",
                        ].join(" ")}
                        aria-label="Next"
                        onClick={handleNext}
                        disabled={!canNext}
                    >
                        <img
                            src={navigateNext}
                            alt=""
                            className={[
                                "w-[24px] h-[24px]",
                                !canNext ? "opacity-30" : "opacity-100",
                                canNext ? "hover:opacity-90" : "",
                            ].join(" ")}
                        />
                    </button>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-10 overflow-visible">
                {visibleCards.map((c) => (
                    <AgentCard key={c.id} card={c} />
                ))}
            </div>
        </div>
    );
}