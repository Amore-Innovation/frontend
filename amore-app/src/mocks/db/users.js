// src/mocks/db/users.js

const PERSONA_SEQ = ["p1", "p2", "p3", "p4", "p5"];

const ageByPersona = { p1: 33, p2: 30, p3: 20, p4: 49, p5: 28 };
const skinByPersona = { p1: "복합성", p2: "복합성", p3: "지성", p4: "건성", p5: "지성" };
const genderByPersona = { p1: "여자", p2: "여자", p3: "여자", p4: "여자", p5: "남자" };

export const users = Array.from({ length: 30 }).map((_, i) => {
    const idx = 1001 + i*173; // ✅ u1001부터
    const personaId = PERSONA_SEQ[i % PERSONA_SEQ.length];

    return {
        id: `u${idx}`,
        maskedId: `u${idx}_mask`,
        age: ageByPersona[personaId],
        gender: genderByPersona[personaId],
        skin: skinByPersona[personaId],
        personaId,
    };
});