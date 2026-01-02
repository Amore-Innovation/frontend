// src/mocks/db/triggers.js
export const triggers = [
    { type: "CART_ABANDON", label: "장바구니 이탈", description: "장바구니 담고 이탈" },
    { type: "WISH_LIST_DISCOUNT", label: "찜/가격 변동", description: "찜 상품 할인/혜택 발생" },
    { type: "REPURCHASE_CYCLE", label: "재구매 주기", description: "소모 주기 기반 리마인드" },
    { type: "CROSS_SELL", label: "연관 추천", description: "연관 상품/조합 추천" },
];