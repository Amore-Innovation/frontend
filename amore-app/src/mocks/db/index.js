// src/mocks/db/index.js

import { campaigns } from "./campaigns.js";
import { users } from "./users.js";
import { deliveries } from "./deliveries.js";
import { personas } from "./personas.js";
import { products } from "./products.js";
import { reviews } from "./reviews.js";
import { messageTemplates } from "./messageTemplates.js";
import { triggers } from "./triggers.js";

export {
    campaigns,
    users,
    deliveries,
    personas,
    products,
    reviews,
    messageTemplates,
    triggers,
};

// ✅ 캠페인별 "고정 추천상품(풀네임)" 매핑 추가
const CAMPAIGN_PRODUCT_NAME = {
    c1: "[리뉴얼]에이시카365 흔적진정세럼pH4.5 60ml", // 에스트라
    c2: "설화수 자음생 2종 세트",                      // 설화수(찜 상품 혜택 안내)
    c3: "[NEWCOLOR] 포근 픽싱틴트",                     // 에뛰드
    c4: "윤조에센스 6세대 120ml(말의 해 에디션)",        // 설화수(연관 상품 추천)
    c5: "시카페인 트러블리셋 크림 70ml",                 // 비레디
};

// ✅ 밖에서 쓰게 export
export function getCampaignProductName(campaignId) {
    return CAMPAIGN_PRODUCT_NAME[campaignId] || null;
}

export function findCampaign(campaignId) {
    return campaigns.find((c) => c.id === campaignId) || null;
}

export function findUser(userId) {
    return users.find((u) => u.id === userId) || null;
}

export function listCampaignDeliveries(campaignId) {
    return deliveries
        .filter((d) => d.campaignId === campaignId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
}

export function listUserDeliveries(userId) {
    const user = findUser(userId);
    if (!user) return [];

    const items = deliveries
        .filter((d) => d.userId === userId && d.personaId === user.personaId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

    const seen = new Set();
    const deduped = [];
    for (const d of items) {
        if (seen.has(d.triggerType)) continue;
        seen.add(d.triggerType);
        deduped.push(d);
    }

    return deduped;
}

export function findUserPinnedDelivery({ campaignId, userId }) {
    const user = findUser(userId);
    if (!user) return null;

    return (
        deliveries.find(
            (d) =>
                d.campaignId === campaignId &&
                d.userId === userId &&
                d.personaId === user.personaId
        ) || null
    );
}