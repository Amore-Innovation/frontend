import { useMemo, useState } from "react";
import PerformanceChart from "./PerformanceChart.jsx";
import SummaryPanel from "./SummaryPanel.jsx";

import graphIcon from "../../assets/icon/graph.svg";
import calendarIcon from "../../assets/icon/calendar.svg";

const MAIN_TABS = [
    { key: "all", label: "전체 요약" },
    { key: "brand", label: "브랜드별" },
    { key: "metric", label: "지표별" },
];

const BRANDS = ["설화수", "이니스프리", "에뛰드", "에스트라", "비레디"];

const METRICS = [
    { key: "open", label: "오픈율", color: "#12B981" },
    { key: "click", label: "클릭율", color: "#FF25C8" },
    { key: "conv", label: "전환율", color: "#2773E6" },
    { key: "roi", label: "ROI", color: "#001A4C" },
];

// 더미 데이터: 일단 all 기준으로 4개 지표 다 넣어둠 (roi도 추가)
const DUMMY_SERIES = [
    { date: "Dec 21", open: 80, click: 45, conv: 20, roi: 30 },
    { date: "Dec 22", open: 95, click: 55, conv: 35, roi: 40 },
    { date: "Dec 23", open: 130, click: 50, conv: 28, roi: 35 },
    { date: "Dec 24", open: 175, click: 105, conv: 33, roi: 60 },
    { date: "Dec 25", open: 200, click: 110, conv: 33, roi: 60 },
    { date: "Dec 26", open: 220, click: 140, conv: 28, roi: 35 },
];

export default function PerformanceSection() {
    const [tab, setTab] = useState("all");

    // ✅ 브랜드별: 단일 선택
    const [selectedBrand, setSelectedBrand] = useState("이니스프리");

    // ✅ 지표별: 다중 선택(제한 없음)
    const [selectedMetrics, setSelectedMetrics] = useState(["open", "click"]);

    // 탭 바뀔 때 “자연스러운 기본값” 잡아주기
    const handleChangeTab = (next) => {
        setTab(next);

        if (next === "brand") {
            // 브랜드 탭 들어오면 기본 1개 선택 유지
            // (원하면 여기서 강제로 "이니스프리"로 리셋 가능)
            return;
        }
        if (next === "metric") {
            // 지표 탭 들어오면 기본 2개 정도 켜두기
            if (selectedMetrics.length === 0) setSelectedMetrics(["open", "click"]);
        }
    };

    // ✅ 실제 차트에 그릴 key들 결정
    const visibleKeys = useMemo(() => {
        if (tab === "metric") return selectedMetrics; // 선택된 지표만
        // all/brand는 일단 3개 고정 (원하면 all에서 4개 다 보여도 됨)
        return ["open", "click", "conv"];
    }, [tab, selectedMetrics]);

    // ✅ 더미데이터라도 “브랜드별” 느낌 내고 싶으면 여기에서 브랜드별로 데이터를 바꾸면 됨
    // 지금은 백엔드 없으니까 그대로 쓰되,
    // 나중에 brand별 dataMap 붙일 자리만 만들어둠.
    const chartData = useMemo(() => {
        if (tab !== "brand") return DUMMY_SERIES;

        // 예시: 브랜드에 따라 값 살짝 다르게(더미)
        const factorMap = {
            설화수: 1.05,
            이니스프리: 1.0,
            에뛰드: 0.95,
            에스트라: 1.1,
            비레디: 0.9,
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

    // ✅ 지표 토글
    const toggleMetric = (key) => {
        setSelectedMetrics((prev) => {
            if (prev.includes(key)) return prev.filter((k) => k !== key);
            return [...prev, key];
        });
    };

    return (
        <div className="w-[1240px] h-[760px] rounded-[28px] border border-[#E2E2E2] bg-white p-8">
            {/* ✅ 2컬럼 고정: 왼쪽(차트) / 오른쪽(캠페인요약) */}
            <div className="grid grid-cols-[1fr_395px] gap-6 h-full">
                {/* LEFT */}
                <div className="relative">
                    {/* ✅ 달력은 '왼쪽 컬럼' 우상단에 고정 */}
                    <div className="absolute top-0 right-0">
                        <div className="h-10 px-4 rounded-lg border border-[#E2E2E2] bg-white flex items-center gap-2 text-[14px] text-[#7A7A7A]">
                            <img src={calendarIcon} alt="" className="w-4 h-4" />
                            2025 / 12 / 27 - 2025 / 12 / 27
                        </div>
                    </div>

                    {/* 타이틀 + 탭 */}
                    <div>
                        <div className="flex items-center gap-2">
                            <img src={graphIcon} alt="" className="w-5 h-5" />
                            <h2 className="text-[20px] font-semibold">성과 분석 차트</h2>
                        </div>

                        {/* 메인 탭 */}
                        <div className="mt-3 flex items-center gap-2">
                            {MAIN_TABS.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => handleChangeTab(t.key)}
                                    className={[
                                        "h-10 px-4 rounded-lg border text-[14px] font-semibold",
                                        tab === t.key
                                            ? "bg-[#001A4C] text-white border-[#001A4C]"
                                            : "bg-white text-[#A1A0A0] border-[#E2E2E2]",
                                    ].join(" ")}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* ✅ 선택창 영역: all/brand/metric 모두 '같은 높이/같은 여백' 유지 */}
                        <div className="mt-4 min-h-[44px] flex items-center">
                            {tab === "brand" && (
                                <div className="flex items-center gap-3">
                                    {BRANDS.map((b) => {
                                        const active = selectedBrand === b;
                                        return (
                                            <button
                                                key={b}
                                                type="button"
                                                onClick={() => setSelectedBrand(b)}
                                                className={[
                                                    "h-10 px-5 rounded-full text-[14px] font-semibold transition",
                                                    active
                                                        ? (b === "설화수"
                                                            ? "bg-[#FF8C03] text-white"
                                                            : b === "이니스프리"
                                                                ? "bg-[#12B981] text-white"
                                                                : b === "에뛰드"
                                                                    ? "bg-[#FF25C8] text-white"
                                                                    : b === "에스트라"
                                                                        ? "bg-[#2773E6] text-white"
                                                                        : "bg-[#1F12EF] text-white")
                                                        : "bg-[#E2E2E2] text-[#A1A0A0]",
                                                ].join(" ")}
                                            >
                                                {b}
                                            </button>
                                        );
                                    })}
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
                                                    "h-10 px-5 rounded-full text-[14px] font-semibold transition",
                                                    active ? "text-white" : "bg-[#E2E2E2] text-[#A1A0A0]",
                                                ].join(" ")}
                                                style={active ? { backgroundColor: m.color } : undefined}
                                            >
                                                {m.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ✅ 전체요약도 brand/metric과 동일한 '선택창 자리'만 유지 */}
                            {tab === "all" && <div className="h-10" />}
                        </div>
                    </div>

                    {/* 차트 */}
                    <div className="mt-6 w-[760px] h-[520px]">
                        <PerformanceChart data={chartData} visibleKeys={visibleKeys} />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="h-[710px] self-start">
                    <SummaryPanel />
                </div>
            </div>
        </div>
    );
}