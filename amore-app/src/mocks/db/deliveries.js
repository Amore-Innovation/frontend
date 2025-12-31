const sampleProducts = [
    { name: "[더블] 그린티 히알루론산 수분 선세럼 50ml SPF50/PA++++", spec: "EX 50ml SPF50/PA++++", price: 20000, discount: 60 },
    { name: "[더블] 비타C 잡티 케어 세럼 50ml SPF50/PA++++", spec: "30ml", price: 18000, discount: 50 },
    { name: "[더블] 시카 진정 크림 50ml SPF50/PA++++", spec: "50ml", price: 22000, discount: 40 },
    { name: "[더블] 히알루론산 토너 50ml SPF50/PA++++", spec: "200ml", price: 15000, discount: 45 },
];

const sampleMessages = [
    {
        title: "[ 익숙한 루틴을 이어가기 좋은 시점이에요 ]",
        body:
            "[이름]님이 사용해오신 제품을 다시 추천드려요.\n" +
            "매일 사용하는 기초 제품은 루틴을 끊김 없이 이어가는 것이 중요해요." +
            "이전과 같은 사용감으로 피부 컨디션을 안정적으로 관리하실 수 있어요.\n" +
            "지금 사용하기 좋은 타이밍에 준비해보세요.",
        cta: "👉 동일 제품 다시 보기",
    },
    {
        title: "[ 지금이 가장 효과를 보기 좋아요 ]",
        body:
            "최근 관심 제품과 비슷한 라인으로 맞춤 추천을 준비했어요." +
            "빛나는 피부를 위해 한 번 구매해보시는거 어떨까요?\n" +
            "오늘만 추가 혜택이 적용돼요.",
        cta: "👉 동일 제품 다시 보기",
    },
];

function makeISO(daysAgo, hour, minute) {
    // 기준일을 임의로 2025-02-25로 잡고 “daysAgo”만큼 과거로 생성
    const base = new Date("2025-02-25T00:00:00+09:00");
    base.setDate(base.getDate() - daysAgo);
    base.setHours(hour, minute, 0, 0);
    return base.toISOString();
}

export const deliveries = (() => {
    const arr = [];

    const campaignIds = ["c1", "c2", "c3", "c4", "c5", "c6"];

    for (let u = 1; u <= 30; u++) {
        const userId = `u${u}`;

        // 유저마다 6개 캠페인 중 일부에 delivery 생성 + “유저 히스토리”용으로 추가 히스토리 더 붙임
        for (let k = 0; k < 10; k++) {
            const campaignId = campaignIds[(u + k) % campaignIds.length];
            const product = sampleProducts[(u + k) % sampleProducts.length];
            const msg = sampleMessages[(u + k) % sampleMessages.length];

            const opened = (u + k) % 3 === 0;
            const purchased = (u + k) % 5 === 0;

            arr.push({
                id: `d_${userId}_${campaignId}_${k}`,
                campaignId,
                userId,
                sentAt: makeISO(k, 9, 30), // k가 커질수록 과거 (0이 최신)
                opened,
                purchased,
                product: {
                    name: product.name,
                    spec: product.spec,
                    price: product.price,
                    discount: product.discount,
                },
                message: {
                    title: msg.title,
                    body: msg.body,
                    cta: msg.cta,
                },
            });
        }
    }

    return arr;
})();