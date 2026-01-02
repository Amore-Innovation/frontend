// src/mocks/db/campaigns.js
import iconSunny from "../../assets/icon/Sunny.svg";
import iconActivate from "../../assets/icon/activate.svg";
import iconNewcustom from "../../assets/icon/newcustom.svg";

// ✅ 기준 날짜(오늘): 2026-01-02
// "실행중 (N일)"이면 시작일 = 오늘 - (N-1)일
// 예) 3일째 -> 2025-12-31 (사용자 요구 반영)

export const campaigns = [
    {
        id: "c1",
        personaId: "p1",
        triggerType: "CART_ABANDON",
        title: "장바구니 리마인드",
        target: "20-40대 / 민감·복합성 피부",
        dateLabel: "DEC 31. 2025", // ✅ 3일째 -> 2025-12-31
        leftIcon: iconActivate,
        status: { label: "실행중 (3일)", tone: "pink" },
        brand: { key: "aestura" },
        theme: "cool",
        kpiValue: "+ 35.4% 전환", // ✅ KPI 지수(숫자형)
        progress: 0.82,

        period: { start: "2025-12-31", end: "2026-01-02" },
        metrics: {
            openRate: { value: 1820, rate: 41.2 },
            clickRate: { value: 392, rate: 21.5 },
            openedUsers: { value: 1820, rate: 41.2 },
            roi: { value: 214, rate: 214.0 },
            goal: { value: 68, rate: 68.0 },
        },
    },

    {
        id: "c2",
        personaId: "p2",
        triggerType: "WISH_LIST_DISCOUNT",
        title: "찜 상품 혜택 안내",
        target: "20-40대 / 부모님 선물",
        dateLabel: "DEC 29. 2025", // ✅ 5일째 -> 2025-12-29
        leftIcon: iconSunny,
        status: { label: "실행중 (5일)", tone: "pink" },
        brand: { key: "sulhwasoo" },
        theme: "warm",
        kpiValue: "+ 0.2% 전환", // ✅ (작게 개선된 케이스)
        progress: 0.74,

        period: { start: "2025-12-29", end: "2026-01-02" },
        metrics: {
            openRate: { value: 940, rate: 48.6 },
            clickRate: { value: 286, rate: 30.4 },
            openedUsers: { value: 940, rate: 48.6 },
            roi: { value: 326, rate: 326.0 },
            goal: { value: 82, rate: 82.0 },
        },
    },

    {
        id: "c3",
        personaId: "p3",
        triggerType: "REPURCHASE_CYCLE",
        title: "재구매 유도",
        target: "10-20대 / 저가 메이크업",
        dateLabel: "JAN 01. 2026", // ✅ 2일째 -> 2026-01-01
        leftIcon: iconNewcustom,
        status: { label: "실행중 (2일)", tone: "pink" },
        brand: { key: "etude" },
        theme: "cool",
        kpiValue: "+ 24.5% 전환",
        progress: 0.56,

        period: { start: "2026-01-01", end: "2026-01-02" },
        metrics: {
            openRate: { value: 1240, rate: 34.7 },
            clickRate: { value: 198, rate: 16.0 },
            openedUsers: { value: 1240, rate: 34.7 },
            roi: { value: 148, rate: 148.0 },
            goal: { value: 54, rate: 54.0 },
        },
    },

    {
        id: "c4",
        personaId: "p4",
        triggerType: "CROSS_SELL",
        title: "연관 상품 추천",
        target: "40대 이상 / 고기능 에센스",
        dateLabel: "DEC 30. 2025", // ✅ 4일째 -> 2025-12-30
        leftIcon: iconSunny,
        status: { label: "실행중 (4일)", tone: "pink" },
        brand: { key: "sulhwasoo" },
        theme: "warm",
        kpiValue: "+ 12.1% 객단가",
        progress: 0.69,

        period: { start: "2025-12-30", end: "2026-01-02" },
        metrics: {
            openRate: { value: 610, rate: 22.1 },
            clickRate: { value: 74, rate: 12.1 },
            openedUsers: { value: 610, rate: 22.1 },
            roi: { value: 72, rate: 72.0 },
            goal: { value: 18, rate: 18.0 },
        },
    },

    {
        id: "c5",
        personaId: "p5",
        triggerType: "CART_ABANDON",
        title: "장바구니 리마인드",
        target: "20-30대 / 지성·여드름",
        dateLabel: "JAN 02. 2026", // ✅ 1일째 -> 2026-01-02
        leftIcon: iconActivate,
        status: { label: "실행중 (1일)", tone: "pink" },
        brand: { key: "bready" },
        theme: "cool",
        kpiValue: "+ 18.9% 전환",
        progress: 0.63,

        period: { start: "2026-01-02", end: "2026-01-02" },
        metrics: {
            openRate: { value: 980, rate: 38.9 },
            clickRate: { value: 312, rate: 31.8 },
            openedUsers: { value: 980, rate: 38.9 },
            roi: { value: 176, rate: 176.0 },
            goal: { value: 61, rate: 61.0 },
        },
    },
];