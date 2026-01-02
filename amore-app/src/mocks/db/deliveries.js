// src/mocks/db/deliveries.js
import { campaigns } from "./campaigns.js";
import { users } from "./users.js";
import { messageTemplates } from "./messageTemplates.js";
import { products } from "./products.js";

// ✅ 새로고침해도 결과 고정 hash
function hash01(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
}

// ✅ "1~2개만 2026" 섞기용: newestOnly=true면 2026-01-02 기준,
// 아니면 기존 2025-12-27 기준
function makeISO(daysAgo, hour, minute, newestOnly = false) {
    const base = newestOnly
        ? new Date("2026-01-02T00:00:00+09:00") // ✅ 2026 기준
        : new Date("2025-12-27T00:00:00+09:00"); // ✅ 2025 기준

    base.setDate(base.getDate() - daysAgo);
    base.setHours(hour, minute, 0, 0);
    return base.toISOString();
}

const personaBehavior = {
    p1: { openRate: 0.80, purchaseRate: 0.70 },
    p2: { openRate: 0.65, purchaseRate: 0.95 },
    p3: { openRate: 0.65, purchaseRate: 0.40 },
    p4: { openRate: 0.70, purchaseRate: 0.70 },
    p5: { openRate: 0.70, purchaseRate: 0.50 },
};

function pickTemplate({ personaId, triggerType }) {
    const candidates = messageTemplates.filter(
        (t) => t.personaId === personaId && t.triggerType === triggerType
    );
    return candidates[0] || null; // ✅ 각 트리거당 1개만 남길 거라 0번이면 충분
}

function findProduct(productId) {
    return products.find((p) => p.id === productId) || null;
}

export const deliveries = (() => {
    const arr = [];

    // ✅ 항상 고정으로 u1001~u1005만 "데이터 있는 행"이 되게
    const topUsers = users.slice(0, 5);

    for (let ui = 0; ui < topUsers.length; ui++) {
        const user = topUsers[ui];
        const userId = user.id;
        const personaId = user.personaId; // ✅ 유저의 페르소나

        for (let ci = 0; ci < campaigns.length; ci++) {
            const c = campaigns[ci];

            const campaignId = c.id;
            const triggerType = c.triggerType; // ✅ 캠페인의 트리거로 "그 캠페인에서 보낸 메시지"를 구성

            const template = pickTemplate({ personaId, triggerType });
            if (!template) continue; // 해당 persona에 그 트리거 템플릿이 없으면 스킵

            const prod = findProduct(template.productId);

            const seedKey = `${userId}::${campaignId}::${triggerType}`;

            const behavior =
                personaBehavior[personaId] || { openRate: 0.5, purchaseRate: 0.2 };
            const r1 = hash01(seedKey + "::opened");
            const r2 = hash01(seedKey + "::purchased");

            const opened = r1 < behavior.openRate;
            const purchased = opened && r2 < behavior.purchaseRate;

            // ✅ 유저당 1개만 2026으로(가장 최신 ci=0)
            //    나머지는 2025 기준 유지
            const is2026 = ci === 0; // ✅ 여기만 바꾸면 "몇 개 2026" 조절 가능
            const sentAt = makeISO(
                ci, // daysAgo로 계속 쓰고 싶으면 유지
                9 + (ci % 3),
                10 + (ci * 7) % 50,
                is2026
            );

            arr.push({
                id: `d_${userId}_${campaignId}`, // ✅ (user,campaign) 단일키

                campaignId,
                userId,
                sentAt,
                opened,
                purchased,

                personaId,
                templateId: template.id,
                triggerType: template.triggerType,
                triggerName: template.triggerName,
                highlightTag: template.highlightTag,
                reviewId: template.reviewId,

                product: {
                    id: prod?.id ?? template.productId,
                    name: prod?.name ?? "(상품명 없음)",
                    spec: prod?.spec ?? "",
                    price: prod?.currentPrice ?? null,
                    discount: prod?.discountRate ?? null,
                },

                message: {
                    title: template.messageTitle,
                    body: template.messageBody,
                    cta: template.buttonText || "자세히 보기",
                },
            });
        }
    }

    return arr.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
})();