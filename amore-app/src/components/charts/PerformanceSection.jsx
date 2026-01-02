// PerformanceSection.jsx
import { useMemo, useState } from "react";
import PerformanceChart from "./PerformanceChart.jsx";
import SummaryPanel from "./SummaryPanel.jsx";
import Brand, { LABEL } from "../ui/Brand.jsx"; // ✅ named import
import graphIcon from "../../assets/icon/graph.svg";
import calendarIcon from "../../assets/icon/calendar.svg";

const MAIN_TABS = [
    { key: "all", label: "전체 요약" },
    { key: "brand", label: "브랜드별" },
    { key: "metric", label: "지표별" },
];

const BRANDS = ["sulhwasoo", "inisfree", "etude", "aestura", "bready"];

const METRICS = [
    { key: "open", label: "오픈율", color: "#12B981" },
    { key: "click", label: "클릭율", color: "#FF25C8" },
    { key: "conv", label: "전환율", color: "#1F5796" },
    { key: "roi", label: "ROI", color: "#001A4C" },
];

const METRIC_LABEL = {
    open: "오픈율",
    click: "클릭율",
    conv: "전환율",
    roi: "ROI",
};

const DUMMY_SERIES = [
    { date: "Dec 21", open: 80, click: 45, conv: 20, roi: 30 },
    { date: "Dec 22", open: 95, click: 55, conv: 35, roi: 40 },
    { date: "Dec 23", open: 130, click: 50, conv: 28, roi: 35 },
    { date: "Dec 24", open: 175, click: 105, conv: 33, roi: 60 },
    { date: "Dec 25", open: 200, click: 110, conv: 33, roi: 60 },
    { date: "Dec 26", open: 220, click: 140, conv: 28, roi: 35 },
];

export default function PerformanceSection() {
     const tabBtnBase =
        "h-10 px-4 rounded-lg border text-[16px] font-semibold transition-all duration-150 " +
        "hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0"

    const tabBtnActive = "bg-[#001A4C] text-white border-[#001A4C]";
    const tabBtnInactive =
    "bg-white text-[#A8A8A8] border-[#E2E2E2] hover:text-[#6F6F6F] hover:border-[#CFCFCF]";

    const [tab, setTab] = useState("all");

    // ✅ 브랜드 key로 통일
    const [selectedBrand, setSelectedBrand] = useState("inisfree");

    const [selectedMetrics, setSelectedMetrics] = useState(["open", "click"]);

    const handleChangeTab = (next) => {
        setTab(next);

        if (next === "metric") {
            if (selectedMetrics.length === 0) setSelectedMetrics(["open", "click"]);
        }
    };

    const visibleKeys = useMemo(() => {
        if (tab === "metric") return selectedMetrics;
        return ["open", "click", "conv"];
    }, [tab, selectedMetrics]);

    const chartData = useMemo(() => {
        if (tab !== "brand") return DUMMY_SERIES;

        const factorMap = {
            sulhwasoo: 1.05,
            inisfree: 1.0,
            etude: 0.95,
            aestura: 1.1,
            bready: 0.9,
        };

        const f = factorMap[selectedBrand] ?? 1.0;

        return DUMMY_SERIES.map((d) => ({
            ...d,
            open: Math.round(d.open * f),
            click: Math.round(d.click * f),
            conv: Math.round(d.conv * f),
            roi: Math.round(d.roi * f),
        }));
    }, [tab, selectedBrand]);

    const toggleMetric = (key) => {
        setSelectedMetrics((prev) => {
            if (prev.includes(key)) return prev.filter((k) => k !== key);
            return [...prev, key];
        });
    };

    // ✅ AI 요약 멘트: 탭/선택값 따라 변경
    const aiSummary = useMemo(() => {
        if (tab === "all") {
            return "오픈율과 클릭율이 동반 상승해 메시지 반응도가 전반적으로 개선됐습니다. 전환율도 안정적으로 유지되어 구매로 이어질 가능성이 높아지는 흐름입니다.";
        }

        if (tab === "brand") {
            const brandName = LABEL[selectedBrand] ?? selectedBrand;
            return `${brandName} 캠페인은 오픈/클릭 지표가 안정적으로 상승 중입니다. 전환율이 유지되는 구간에서 도달·반응 효율이 개선되고 있어, 다음 액션으로 발송 타이밍/예산 최적화를 권장합니다.`;
        }

        // metric
        if (!selectedMetrics || selectedMetrics.length === 0) {
            return "선택된 지표가 없습니다. 확인할 지표(오픈율/클릭율/전환율/ROI)를 선택해 주세요.";
        }

        const labels = selectedMetrics.map((k) => METRIC_LABEL[k] ?? k).join(", ");
        return `현재 ${labels} 중심으로 추이를 분석 중입니다. 지표를 함께 비교하면 ‘반응(오픈/클릭) → 구매(전환) → 효율(ROI)’ 흐름을 더 정확히 파악할 수 있습니다.`;
    }, [tab, selectedBrand, selectedMetrics]);

    return (
        <div className="w-[1240px] h-[760px] rounded-[28px] border border-[#EAEAEA] bg-white p-8">
            <div className="grid grid-cols-[1fr_395px] gap-6 h-full">
                <div className="relative">
                    <div className="absolute top-0 right-0">
                        <button
                        type="button"
                       className={[
                                     "h-10 px-4 rounded-lg border border-[#E4E4E4] font-semibold bg-white flex items-center gap-2",
                                     "text-[16px] text-[#8C8C8C]",
                                     "transition-all duration-150 cursor-pointer",
                                     "hover:border-[#CFCFCF] hover:text-[#6F6F6F] hover:shadow-sm hover:-translate-y-[1px]",
                                     "active:translate-y-0",
                                   ].join(" ")}
                                 >
                            <img src={calendarIcon} alt="" className="w-4 h-4" />
                            2026 / 01 / 01 - 2026 / 01 / 02
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <img src={graphIcon} alt="" className="w-5 h-5" />
                            <h2 className="text-[20px] font-bold">성과 분석 차트</h2>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            {MAIN_TABS.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => handleChangeTab(t.key)}
                                    className={[
                                        tabBtnBase,
                                        tab === t.key ? tabBtnActive : tabBtnInactive,
                                    ].join(" ")}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 mb-8 min-h-[44px] flex items-center">
                            {tab === "brand" && (
                                <div className="flex items-center gap-3">
                                    {BRANDS.map((brand) => (
                                        <Brand
                                            key={brand}
                                            brand={brand}
                                            variant="select"
                                            active={selectedBrand === brand}
                                            onClick={() => setSelectedBrand(brand)}
                                        />
                                    ))}
                                </div>
                            )}

                            {tab === "metric" && (
                                <div className="flex items-center gap-3">
                                    {METRICS.map((m) => {
                                        const active = selectedMetrics.includes(m.key);
                                        return (
                                            <button
                                                key={m.key}
                                                type="button"
                                                onClick={() => toggleMetric(m.key)}
                                                className={[
                                                    "h-10 px-5 rounded-full text-[16px] font-semibold transition-all duration-150",
                                                    "cursor-pointer hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0",
                                                    active
                                                        ? "text-white"
                                                        : "bg-[#E2E2E2] text-[#A8A8A8] hover:bg-[#D7D7D7] hover:text-[#7A7A7A]",
                                                ].join(" ")}
                                                style={active ? { backgroundColor: m.color } : undefined}
                                            >
                                                {m.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {tab === "all" && <div className="h-10" />}
                        </div>
                    </div>

                    <div className="mt-6 w-[760px] h-[520px]">
                        <PerformanceChart data={chartData} visibleKeys={visibleKeys} />
                    </div>
                </div>

                <div className="h-[710px] self-start overflow-hidden">
                    {/* ✅ aiSummary 전달 */}
                    <SummaryPanel aiSummary={aiSummary} />
                </div>
            </div>
        </div>
    );
}