// AgentAutoLogSection.jsx
import Brand from "../ui/Brand.jsx";
import logIcon from "../../assets/icon/log.svg";
import arrowIcon from "../../assets/icon/right_arrow.png"
import arrowDown from "../../assets/icon/under_arrow.png"
import calendar from "../../assets/icon/calendar.svg"

const DUMMY_LOGS = [
    // 최신순(위) -> 과거(아래) 느낌으로 5개 패턴 반복해서 10개
    {
        id: "l1",
        time: "02:33",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "성과 최적화", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l2",
        time: "02:33",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "성과 최적화", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l3",
        time: "02:33",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "sulhwasoo",
        tag: { label: "리스크 감지", tone: "warn" },
        tone: "warn",
    },
    {
        id: "l4",
        time: "02:33",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "전략 수정", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l5",
        time: "02:33",
        title: "성과 저조 캠페인 자동 중단",
        brand: "etude",
        tag: { label: "자동 중지", tone: "dark" },
        tone: "disabled",
    },

    // 반복 (10개 맞추기)
    {
        id: "l6",
        time: "02:12",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "성과 최적화", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l7",
        time: "02:12",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "성과 최적화", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l8",
        time: "02:12",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "sulhwasoo",
        tag: { label: "리스크 감지", tone: "warn" },
        tone: "warn",
    },
    {
        id: "l9",
        time: "02:12",
        title: "20대 지성 피부 페르소나 예산 자동 확대",
        brand: "inisfree",
        tag: { label: "전략 수정", tone: "soft" },
        tone: "normal",
    },
    {
        id: "l10",
        time: "02:12",
        title: "성과 저조 캠페인 자동 중단",
        brand: "etude",
        tag: { label: "자동 중지", tone: "dark" },
        tone: "disabled",
    },
];

function TagPill({ label, tone = "soft" }) {
    // 주요 색상: FF510E/FFEAE2, 7D7D7D/EAEAEA
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

    // soft(기본) - 회색 pill
    return (
        <span className="inline-flex items-center justify-center h-[31px] px-4 rounded-full bg-[#EAEAEA] text-[#333] text-[14px] font-semibold">
      {label}
    </span>
    );
}

function LogRow({ item }) {
    const rowBase = "relative w-full rounded-[12px] py-4 pr-6 pl-8 flex items-center";
    const rowTone =
        item.tone === "warn"
            ? "bg-[#FFEAE2] border border-transparent"
            : item.tone === "disabled"
                ? "bg-[#EAEAEA] border border-transparent"
                : "bg-white border border-[#EFEFEF]";

    const leftBar =
        item.tone === "warn"
            ? "bg-[#FF510E]"
            : item.tone === "disabled"
                ? "bg-[#7D7D7D]"
                : "bg-transparent";

    const titleCls =
        item.tone === "disabled" ? "text-[#7D7D7D]" : "text-[#232323]";

    return (
        <div className={[rowBase, rowTone].join(" ")}>
            {/* 왼쪽 컬러 바(경고/비활성만) */}
            <div className="flex items-center gap-6 min-w-0 flex-1">
                {(item.tone === "warn" || item.tone === "disabled") && (
                    <div
                           className={[
                             "absolute left-0 top-1 h-[55px] w-[4px]",
                               "rounded-sm",
                             item.tone === "warn" ? "bg-[#FF510E]" : "bg-[#7D7D7D]",
                           ].join(" ")}
                         />
                       )}

                <div className="w-[64px] text-[16px] font-medium text-[#7F7F7F] shrink-0">
                    {item.time}
                </div>

                <div className={["text-[16px] font-medium text-[#3B3B3B] truncate", titleCls].join(" ")}>
                    {item.title}
                </div>
            </div>

            {/* 오른쪽 pill + chevron */}
             <div className="flex items-center shrink-0">
               <div className="flex items-center gap-3">
                 <Brand brand={item.brand} variant="display" />
                 <TagPill label={item.tag.label} tone={item.tag.tone} />
               </div>
               <div className="w-[300px]" /> {/*  화살표와 300px 간격 */}
               <img src={arrowIcon} alt="arrow" className="w-[18px] h-[18px] opacity-70" />
             </div>
        </div>
    );
}

export default function AgentAutoLogSection() {
    return (
        <div className="rounded-[28px] bg-white border border-[#EDEDED] p-10">
            {/* 헤더 */}
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

                {/* 필터(디자인용 버튼) */}
                <div className="flex items-center gap-3 mr-[15px]">
                    <button
                        type="button"
                        className="h-[44px] px-5 rounded-[10px] bg-white border border-[#EDEDED] text-[16px] font-semibold text-[#7D7D7D] inline-flex items-center gap-2"
                    >
                        브랜드
                        <img
                        src={arrowDown}
                        alt="arrow"
                        className="w-[18px] h-[18px] opacity-70"
                    />
                    </button>

                    <button
                        type="button"
                        className="h-[44px] px-5 rounded-[10px] bg-white border border-[#EDEDED] text-[16px] font-semibold text-[#7D7D7D] inline-flex items-center gap-2"
                    >
                        조정 <img
                        src={arrowDown}
                        alt="arrow"
                        className="w-[18px] h-[18px] opacity-70"
                    />
                    </button>

                    <button
                        type="button"
                        className="h-[44px] px-5 rounded-[10px] bg-white border border-[#EDEDED] text-[16px] font-semibold text-[#7D7D7D] inline-flex items-center gap-2"
                    >
                        <img
                            src={calendar}
                            alt="calendar"
                            className="w-[18px] h-[18px] opacity-70"
                        />
                        2025 / 12 / 27 - 2025 / 12 / 27
                    </button>
                </div>
            </div>

            {/* 로그 리스트(520px + 내부 스크롤 + 스크롤바) */}
            <div
                className={[
                    "mt-8 h-[420px] overflow-y-auto pr-3 space-y-3",
                    // ✅ 스크롤바 7px, thumb 색 D7D7D7
                    "[&::-webkit-scrollbar]:w-[7px]",
                    "[&::-webkit-scrollbar-thumb]:bg-[#D7D7D7]",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                ].join(" ")}
                style={{ scrollbarWidth: "thin" }} // Firefox 보조
            >
                {DUMMY_LOGS.map((item) => (
                    <LogRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}