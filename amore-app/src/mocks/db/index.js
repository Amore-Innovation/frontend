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

    // ✅ persona 일치만 + triggerType 기준 중복 제거
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

    return deduped; // ✅ 결과: 트리거 4개만
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