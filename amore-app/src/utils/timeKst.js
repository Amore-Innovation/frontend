// src/utils/timeKst.js

export function hhmmToMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map((v) => parseInt(v, 10));
    return h * 60 + m;
}

export function getNowMinutesKST() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    }).formatToParts(now);

    const hh = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
    const mm = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
    return hh * 60 + mm;
}

export function minutesToLabel12h(minutes) {
    const h24 = Math.floor(minutes / 60);
    const ampm = h24 >= 12 ? "P.M" : "A.M";
    const h12 = ((h24 + 11) % 12) + 1;
    return `${h12}:00 ${ampm}`;
}

// "8:10 A.M"
export function nowLabelKST() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
    }).formatToParts(now);

    const hour = parts.find((p) => p.type === "hour")?.value ?? "0";
    const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
    const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "AM";
    const ampm = dayPeriod.toUpperCase() === "PM" ? "P.M" : "A.M";
    return `${hour}:${minute} ${ampm}`;
}