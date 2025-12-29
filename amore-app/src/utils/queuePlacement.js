// src/utils/queuePlacement.js
import { hhmmToMinutes } from "./timeKst";

/**
 * 45분(혹은 durationMin) 안에 겹치면 아래 row로 보내는 배치.
 * @param {Array<{id:string, at:string}>} items
 * @param {number} durationMin 기본 45
 * @returns {{ placedItems: Array, rowCount: number }}
 */
export function placeQueueItems(items, durationMin = 45) {
    const sorted = [...items]
        .map((it) => ({ ...it, startMin: hhmmToMinutes(it.at) }))
        .sort((a, b) => a.startMin - b.startMin);

    const rowEnds = []; // rowEnds[row] = endMin

    const placedItems = sorted.map((it) => {
        const endMin = it.startMin + durationMin;

        let row = 0;
        for (; row < rowEnds.length; row++) {
            if (it.startMin >= rowEnds[row]) break; // 안 겹침
        }

        if (row === rowEnds.length) rowEnds.push(endMin);
        else rowEnds[row] = endMin;

        return { ...it, row, endMin };
    });

    return { placedItems, rowCount: Math.max(1, rowEnds.length) };
}