export const users = Array.from({ length: 30 }).map((_, i) => {
    const idx = i + 1;
    return {
        id: `u${idx}`,
        maskedId: `ASDF**${idx}`,
        age: idx % 2 ? 32 : 28,
        gender: idx % 2 ? "여자" : "여자", // 필요하면 남/여 섞어도 됨
        skin: idx % 3 === 0 ? "복합성" : "건성",
    };
});