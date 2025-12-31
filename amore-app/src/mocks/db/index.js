import { campaigns } from "./campaigns.js";
import { users } from "./users.js";
import { deliveries } from "./deliveries.js";

export function findCampaign(campaignId) {
    return campaigns.find((c) => c.id === campaignId) || null;
}

export function findUser(userId) {
    return users.find((u) => u.id === userId) || null;
}

export function listCampaignDeliveries(campaignId) {
    return deliveries
        .filter((d) => d.campaignId === campaignId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)); // 최신 -> 과거
}

export function listUserDeliveries(userId) {
    return deliveries
        .filter((d) => d.userId === userId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)); // 최신 -> 과거
}

export function findUserPinnedDelivery({ campaignId, userId }) {
    // 해당 캠페인+유저에서 가장 최신 1건을 pinned로 사용
    return deliveries
        .filter((d) => d.campaignId === campaignId && d.userId === userId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))[0] || null;
}