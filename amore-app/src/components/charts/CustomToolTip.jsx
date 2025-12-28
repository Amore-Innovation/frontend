export default function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    const map = Object.fromEntries(
        payload.map((p) => [p.dataKey, p.value])
    );

    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-[#E2E2E2]">
            <div className="text-[16px] font-semibold text-[#444] mb-2">
                {label}
            </div>

            <div className="space-y-1 text-[15px] font-semibold">
                <div className="text-[#12B981]">
                    오픈율 : {map.open}
                </div>
                <div className="text-[#2773E6]">
                    구매 전환율 : {map.conv}
                </div>
                <div className="text-[#FF25C8]">
                    클릭율 : {map.click}
                </div>
            </div>
        </div>
    );
}