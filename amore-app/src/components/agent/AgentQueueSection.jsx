// components/agent/AgentQueueSection.jsx
import { useMemo, useRef, useEffect, useState } from "react";

import calendarIcon from "../../assets/icon/calendar.svg";
import clockIcon from "../../assets/icon/clock.svg";
import underArrow from "../../assets/icon/under_arrow.png";

import QueueCard from "./QueueCard.jsx";

import { getNowMinutesKST, nowLabelKST, minutesToLabel12h } from "../../utils/timeKst.js";
import { DUMMY_QUEUE_ITEMS } from "../../mocks/agentQueueItems.js";

// ✅ 1칸 = 1시간
const ITEM_DURATION_MIN = 60;

// ✅ "HH:MM" -> minutes (0~1439)
function atToMinutes(at) {
    const [hh, mm] = at.split(":").map((x) => parseInt(x, 10));
    return hh * 60 + mm;
}

export default function AgentQueueSection() {
    // ✅ 360px = 60분 => 1분 = 6px
    const PX_PER_MIN = 360 / ITEM_DURATION_MIN; // 6
    const DAY_MIN = 60 * 24; // 1440

    // ✅ 00:00 ~ 24:00 고정
    const windowStartMin = 0;
    const windowEndMin = DAY_MIN;
    const GRID_W = (windowEndMin - windowStartMin) * PX_PER_MIN + 340;

    const ROW_PADDING_Y = 10;
    const ROW_H = 132;
    const CARD_TOP_OFFSET = ROW_PADDING_Y;

    const VIEW_ROWS = 3.5;
    const VIEW_H = Math.round(ROW_H * VIEW_ROWS);

    const [nowMin, setNowMin] = useState(() => getNowMinutesKST());
    const [nowText, setNowText] = useState(() => nowLabelKST());

    // 공통 hover
    const filterBtnCls =
        "h-[44px] px-5 rounded-[10px] border bg-white text-[16px] font-semibold " +
        "text-[#8C8C8C] flex items-center gap-2 " +
        "cursor-pointer transition-all duration-150 " +
        "hover:-translate-y-[1px] hover:border-[#CFCFCF] hover:bg-[#FAFAFA] hover:shadow-sm " +
        "active:translate-y-0";

    useEffect(() => {
        const id = setInterval(() => {
            setNowMin(getNowMinutesKST());
            setNowText(nowLabelKST());
        }, 30_000);
        return () => clearInterval(id);
    }, []);

    const nowX = (nowMin - windowStartMin) * PX_PER_MIN;

    // ✅ 헤더 시간: 1시간마다 표기 (24시는 제외)
    const hourMarks = useMemo(() => {
        const arr = [];
        for (let h = 0; h < 24; h += 1) arr.push(h * 60); // 0~23
        return arr;
    }, []);

    /**
     * ✅ 배치 규칙 (사진1처럼)
     * - 카드 left는 "해당 시간대의 정시(버킷 시작)"로 스냅
     * - 같은 시간 칸 안에서는 실제 시작시간이 빠를수록 위(row 0)
     * - rowCount = 한 시간 칸에 쌓이는 최대 개수
     */
    const { placedItems, rowCount } = useMemo(() => {
        // 1) 원본에 startMin(실제 시작시간) 추가
        const items = DUMMY_QUEUE_ITEMS.map((it) => {
            const startMin = atToMinutes(it.at);
            const bucketStartMin = Math.floor(startMin / 60) * 60; // ✅ 10:05 -> 10:00
            return {
                ...it,
                startMin,
                bucketStartMin,     // ✅ 시각적 칸 시작점
            };
        });

        // 2) 시간 칸(버킷)별로 그룹화
        const map = new Map(); // key: bucketStartMin, value: items[]
        for (const it of items) {
            const key = it.bucketStartMin;
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(it);
        }

        // 3) 각 버킷 내에서 실제 시작시간 오름차순 정렬 후 row 부여(0부터)
        let maxRows = 0;
        const placed = [];

        for (const [bucketStartMin, arr] of map.entries()) {
            arr.sort((a, b) => a.startMin - b.startMin);

            maxRows = Math.max(maxRows, arr.length);

            arr.forEach((it, idx) => {
                placed.push({
                    ...it,
                    row: idx,                 // ✅ 같은 시간 칸에서 위->아래
                    visualStartMin: bucketStartMin, // ✅ left는 정시로 고정
                });
            });
        }

        // 4) 전체 정렬: 시간 칸 오름차순 → 같은 시간 칸에서는 실제 시작시간 오름차순
        placed.sort((a, b) => {
            if (a.visualStartMin !== b.visualStartMin) return a.visualStartMin - b.visualStartMin;
            return a.startMin - b.startMin;
        });

        return { placedItems: placed, rowCount: maxRows };
    }, [nowMin]);

    const ROWS = rowCount;
    const GRID_H = ROWS * ROW_H;

    const scrollerRef = useRef(null);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollLeft = Math.max(0, nowX - 420);
    }, [nowX]);

    // ✅ overscroll/이상 스크롤 방지
    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const clamp = () => {
            const max = Math.max(0, el.scrollWidth - el.clientWidth);
            if (el.scrollLeft < 0) el.scrollLeft = 0;
            if (el.scrollLeft > max) el.scrollLeft = max;
        };

        el.addEventListener("scroll", clamp, { passive: true });
        clamp();
        return () => el.removeEventListener("scroll", clamp);
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
                    <button type="button" className={[filterBtnCls, "border-[#E4E4E4]"].join(" ")}>
                        브랜드
                        <img src={underArrow} alt="" className="w-4 h-4 opacity-80" />
                    </button>

                    <button type="button" className={[filterBtnCls, "border-[#E4E4E4]"].join(" ")}>
                        필터
                        <img src={underArrow} alt="" className="w-4 h-4 opacity-80" />
                    </button>

                    <div
                        className={[
                            "h-[44px] px-5 rounded-[10px] border border-[#E2E2E2] bg-white flex items-center gap-2",
                            "cursor-pointer transition-all duration-150",
                            "hover:-translate-y-[1px] hover:border-[#CFCFCF] hover:bg-[#FAFAFA] hover:shadow-sm",
                            "active:translate-y-0",
                        ].join(" ")}
                    >
                        <img src={calendarIcon} alt="" className="w-5 h-5" />
                        <span className="text-[16px] font-semibold text-[#8C8C8C]">2026 / 01 / 02</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-[12px] overflow-hidden border border-[#EDEDED]">
                <div
                    ref={scrollerRef}
                    className="relative overflow-x-auto overflow-y-auto bg-white overscroll-x-none"
                    style={{ height: 44 + VIEW_H }}
                >
                    <div className="relative" style={{ width: GRID_W, height: 44 + Math.max(GRID_H, VIEW_H) }}>
                        {/* 시간 라벨 바 */}
                        <div className="absolute top-0 left-0 h-[44px] bg-[#001A4C]" style={{ width: GRID_W }}>
                            {hourMarks.map((m) => (
                                <div
                                    key={m}
                                    className="absolute top-0 h-full flex items-center justify-center text-white text-[16px] font-medium"
                                    style={{
                                        left: (m - windowStartMin) * PX_PER_MIN,
                                        width: 60 * PX_PER_MIN, // 1시간 폭
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
                            {/* ✅ 카드 */}
                            <div className="absolute inset-0 z-10">
                                {placedItems.map((item) => {
                                    const cellW = 60 * PX_PER_MIN; // 1시간 칸 폭 (360)
                                    const left =
                                    (item.visualStartMin - windowStartMin) * PX_PER_MIN + cellW / 2; // ✅ 중앙(시간 글자 위치)에서 시작

                                    const top = item.row * ROW_H + CARD_TOP_OFFSET;

                                    // ✅ 실행완료(시간 지남): 시작+1시간 <= nowMin 이면 완료 처리
                                    const isDone = item.startMin + 60 <= nowMin;

                                    return (
                                        <div key={item.id} className="absolute cursor-pointer" style={{ left, top }}>
                                            <QueueCard item={item} done={isDone} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}