// AgentAutoLogSection.jsx
import Brand from "../ui/Brand.jsx";
import logIcon from "../../assets/icon/log.svg";
import arrowIcon from "../../assets/icon/right_arrow.png";
import arrowDown from "../../assets/icon/under_arrow.png";
import calendar from "../../assets/icon/calendar.svg";
import { DUMMY_LOGS } from "../../mocks/agentAutoLogs.js";

/* ---------------- Tag Pill ---------------- */
function TagPill({ label, tone = "soft" }) {
    if (tone === "warn") {
        return (
            <span className="inline-flex items-center justify-center h-[31px] px-4 rounded-full bg-[#FF510E] text-white text-[14px] font-semibold">
        {label}
      </span>
        );
    }

    if (tone === "dark") {
        return (
            <span className="inline-flex items-center justify-center h-[31px] px-4 rounded-full bg-[#7D7D7D] text-white text-[14px] font-semibold">
        {label}
      </span>
        );
    }

    return (
        <span className="inline-flex items-center justify-center h-[31px] px-4 rounded-full bg-[#EAEAEA] text-[#333] text-[14px] font-semibold">
      {label}
    </span>
    );
}

/* ---------------- Log Row ---------------- */
function LogRow({ item }) {
    const isDisabled = item.tone === "disabled";

    const rowBase = [
        "group relative w-full rounded-[12px]",
        "py-4 pr-6 pl-8 flex items-center",
        "transition-all duration-150",
        !isDisabled && "cursor-pointer",
        !isDisabled && "hover:-translate-y-[1px]",
        !isDisabled && "hover:shadow-sm",
    ]
        .filter(Boolean)
        .join(" ");

    const rowTone =
        item.tone === "warn"
            ? "bg-[#FFEAE2]"
            : item.tone === "disabled"
                ? "bg-[#EAEAEA]"
                : "bg-white border border-[#EFEFEF] hover:bg-[#FAFAFA]";

    const titleCls =
        item.tone === "disabled" ? "text-[#7D7D7D]" : "text-[#232323]";

    return (
        <div className={[rowBase, rowTone].join(" ")}>
            {/* 왼쪽 컬러 바 */}
            {(item.tone === "warn" || item.tone === "disabled") && (
                <div
                    className={[
                        "absolute left-0 top-1 h-[55px] w-[4px] rounded-sm",
                        item.tone === "warn" ? "bg-[#FF510E]" : "bg-[#7D7D7D]",
                    ].join(" ")}
                />
            )}

            <div className="flex items-center gap-6 min-w-0 flex-1">
                <div className="w-[64px] text-[16px] font-medium text-[#7F7F7F] shrink-0">
                    {item.time}
                </div>

                <div
                    className={[
                        "text-[16px] font-medium truncate",
                        titleCls,
                    ].join(" ")}
                >
                    {item.title}
                </div>
            </div>

            {/* 오른쪽 pill + arrow */}
            <div className="flex items-center shrink-0">
                <div className="flex items-center gap-3">
                    <Brand brand={item.brand} variant="display" />
                    <TagPill label={item.tag.label} tone={item.tag.tone} />
                </div>

                <div className="w-[300px]" />

                <img
                    src={arrowIcon}
                    alt="arrow"
                    className={[
                        "w-[18px] h-[18px]",
                        "opacity-50",
                        "transition-all duration-150",
                        !isDisabled && "group-hover:opacity-100",
                    ].join(" ")}
                />
            </div>
        </div>
    );
}

/* ---------------- Section ---------------- */
export default function AgentAutoLogSection() {
    const filterBtnCls = [
        "h-[44px] px-5 rounded-[10px]",
        "bg-white border border-[#EDEDED]",
        "text-[16px] font-semibold text-[#7D7D7D]",
        "inline-flex items-center gap-2",
        "cursor-pointer",
        "transition-all duration-150",
        "hover:-translate-y-[1px]",
        "hover:border-[#CFCFCF]",
        "hover:bg-[#FAFAFA]",
        "hover:shadow-sm",
        "active:translate-y-0",
    ].join(" ");

    return (
        <div className="rounded-[28px] bg-white border border-[#EDEDED] p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2">
                        <img src={logIcon} alt="" className="w-[20px] h-[20px]" />
                        <h2 className="text-[20px] font-bold text-[#232323]">
                            에이전트 자동 운영 로그
                        </h2>
                    </div>
                    <p className="mt-1 text-[16px] text-[#7F7F7F] font-medium">
                        AI 에이전트가 자동으로 운영되고 있습니다.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 mr-[15px]">
                    <button type="button" className={filterBtnCls}>
                        브랜드
                        <img src={arrowDown} alt="" className="w-[18px] h-[18px] opacity-70" />
                    </button>

                    <button type="button" className={filterBtnCls}>
                        조정
                        <img src={arrowDown} alt="" className="w-[18px] h-[18px] opacity-70" />
                    </button>

                    <button type="button" className={filterBtnCls}>
                        <img src={calendar} alt="" className="w-[18px] h-[18px] opacity-70" />
                        2025 / 12 / 27 - 2025 / 12 / 27
                    </button>
                </div>
            </div>

            {/* Log List */}
            <div
                className={[
                    "mt-8 h-[420px] overflow-y-auto pr-3 space-y-3",
                    "[&::-webkit-scrollbar]:w-[7px]",
                    "[&::-webkit-scrollbar-thumb]:bg-[#D7D7D7]",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                ].join(" ")}
                style={{ scrollbarWidth: "thin" }}
            >
                {DUMMY_LOGS.map((item) => (
                    <LogRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}