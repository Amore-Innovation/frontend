// components/agent/AgentQueueSection.jsx
import { useMemo, useRef, useEffect, useState } from "react";

import calendarIcon from "../../assets/icon/calendar.svg";
import clockIcon from "../../assets/icon/clock.svg";
import timelineIcon from "../../assets/icon/timeline.svg";
import underArrow from "../../assets/icon/under_arrow.png";

import QueueCard from "./QueueCard.jsx";

import { getNowMinutesKST, nowLabelKST, minutesToLabel12h } from "../../utils/timeKst.js";
import { placeQueueItems } from "../../utils/queuePlacement.js";
import { DUMMY_QUEUE_ITEMS } from "../../mocks/agentQueueItems.js";

const ITEM_DURATION_MIN = 45;

export default function AgentQueueSection() {
    // 1) 360px = 45분 => 1분 = 8px
    const PX_PER_MIN = 360 / ITEM_DURATION_MIN; // 8
    const DAY_MIN=60*24;
    const GRID_W = DAY_MIN * PX_PER_MIN;

// 2) 추가 격자(45분 단위)
    const slotMarks = useMemo(() => {
        const arr = [];
        for (let m = 0; m <= DAY_MIN; m += ITEM_DURATION_MIN) arr.push(m);
        return arr;
    }, []);

    const ROW_PADDING_Y = 10;      // ✅ 추가
    const ROW_H = 132;             // ✅ 112 -> 132 (위아래 10px씩 더 여유)
    const CARD_TOP_OFFSET = ROW_PADDING_Y;

    const VIEW_ROWS = 3.5;
    const VIEW_H = Math.round(ROW_H * VIEW_ROWS);

    const [nowMin, setNowMin] = useState(() => getNowMinutesKST());
    const [nowText, setNowText] = useState(() => nowLabelKST());

    useEffect(() => {
        const id = setInterval(() => {
            setNowMin(getNowMinutesKST());
            setNowText(nowLabelKST());
        }, 30_000);
        return () => clearInterval(id);
    }, []);

    const nowX = nowMin * PX_PER_MIN;

    const { placedItems, rowCount } = useMemo(
        () => placeQueueItems(DUMMY_QUEUE_ITEMS, ITEM_DURATION_MIN),
        []
    );

    const ROWS = rowCount;
    const GRID_H = ROWS * ROW_H;

    const scrollerRef = useRef(null);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollLeft = Math.max(0, nowX - 420);
    }, [nowX]);

    const hourMarks = useMemo(() => {
        const arr = [];
        for (let h = 0; h <= 24; h += 3) arr.push(h * 60);
        return arr;
    }, []);

    return (
        <div className="rounded-[28px] bg-white border border-[#EDEDED] px-10 py-9">
            {/* 헤더 */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <img src={clockIcon} alt="" className="w-6 h-6" />
                        <h2 className="text-[20px] font-bold text-[#252525]">에이전트 전략 대기열</h2>
                    </div>
                    <p className="mt-2 text-[16px] font-medium text-[#797979]">
                        AI가 성과 분석을 바탕으로 다음 마케팅 전략을 미리 생성하고 실행을 준비하고 있습니다
                    </p>
                </div>

                {/* 우측 필터 */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="h-[44px] px-5 rounded-[10px] border border-[#E4E4E4] bg-white text-[16px] font-semibold text-[#8C8C8C] flex items-center gap-2"
                    >
                        브랜드
                        <img src={underArrow} alt="" className="w-4 h-4 opacity-80" />
                    </button>

                    <button
                        type="button"
                        className="h-[44px] px-5 rounded-[10px] border border-[#E4E4E4] bg-white text-[16px] font-semibold text-[#8C8C8C] flex items-center gap-2"
                    >
                        조정
                        <img src={underArrow} alt="" className="w-4 h-4 opacity-80" />
                    </button>

                    <div className="h-[44px] px-5 rounded-[10px] border border-[#E2E2E2] bg-white flex items-center gap-2">
                        <img src={calendarIcon} alt="" className="w-5 h-5" />
                        <span className="text-[16px] font-semibold text-[#8C8C8C]">2025 / 12 / 27</span>
                    </div>
                </div>
            </div>

            {/* 스크롤 컨테이너 */}
            <div className="mt-6 rounded-[12px] overflow-hidden border border-[#EDEDED]">
                <div
                    ref={scrollerRef}
                    className="relative overflow-x-auto overflow-y-auto bg-white"
                    style={{ height: 44 + VIEW_H }}
                >
                    <div
                        className="relative"
                        style={{ width: GRID_W, height: 44 + Math.max(GRID_H, VIEW_H) }}
                    >
                        {/* 시간 라벨 바 */}
                        <div className="absolute top-0 left-0 h-[44px] bg-[#001A4C]" style={{ width: GRID_W }}>
                            {hourMarks.map((m) => (
                                <div
                                    key={m}
                                    className="absolute top-0 h-full flex items-center justify-center text-white text-[16px] font-semibold"
                                    style={{
                                        left: m * PX_PER_MIN,
                                        width: 3 * 60 * PX_PER_MIN,
                                    }}
                                >
                                    {minutesToLabel12h(m)}
                                </div>
                            ))}
                        </div>

                        {/* 그리드 영역 */}
                        <div
                            className="absolute left-0"
                            style={{ top: 44, width: GRID_W, height: Math.max(GRID_H, VIEW_H) }}
                        >
                            {/*  배경 레이어 (음영/격자/행라인) */}
                            <div className="absolute inset-0 z-0">
                                {/* 지난 시간 음영 */}
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#EEF2FA]"
                                    style={{ width: Math.max(0, nowX) }}
                                />

                                {/* 3시간 단위 세로 점선 */}
                                {hourMarks.map((m) => (
                                    <div
                                        key={`grid-3h-${m}`}
                                        className="absolute top-0 h-full border-l border-dashed border-[#E2E2E2]"
                                        style={{ left: m * PX_PER_MIN }}
                                    />
                                ))}

                                {/* ✅ 45분(=카드 폭) 단위 점선 (더 연하게) */}
                                {slotMarks.map((m) => (
                                    <div
                                        key={`grid-45m-${m}`}
                                        className="absolute top-0 h-full border-l border-dashed border-[#F0F0F0]"
                                        style={{ left: m * PX_PER_MIN }}
                                    />
                                ))}

                                {/* 행 가이드 */}
                                {Array.from({ length: ROWS }).map((_, i) => (
                                    <div
                                        key={`row-${i}`}
                                        className="absolute left-0 w-full border-t border-[#F1F1F1]"
                                        style={{ top: i * ROW_H }}
                                    />
                                ))}
                            </div>

                            {/* ✅ 현재시간 점선: 카드보다 뒤로 (가려지게) */}
                            <div
                                className="absolute top-0 h-full z-[5] border-l-2 border-dashed border-[#001A4C]"
                                style={{ left: nowX }}
                            />

                            {/* ✅ 카드: 점선보다 위 */}

                            <div className="absolute inset-0 z-10">
                                {placedItems.map((item) => {
                                    const left = item.startMin * PX_PER_MIN;
                                    const top = item.row * ROW_H + CARD_TOP_OFFSET;   // ✅ 변경

                                    return (
                                        <div key={item.id} className="absolute" style={{ left, top }}>
                                            <QueueCard item={item} />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ✅ 타임라인 배지: 가장 위 */}
                            <div className="absolute z-20" style={{ left: nowX - 6, top: 210 }}>
                                <div className="relative">
                                    <img src={timelineIcon} alt="" className="h-[30px] w-auto" />
                                    <span className="absolute inset-0 flex items-center justify-center text-white text-[14px] font-semibold">
                  {nowText}
                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}