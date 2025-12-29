export default function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    const map = Object.fromEntries(
        payload.map((p) => [p.dataKey, p.value])
    );

    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-[#E2E2E2]">
            <div className="text-[16px] font-semibold text-[#4E4E4E] mt-3 mb-1">
                {label}
            </div>

            <div className="space-y-1 text-[16px] font-semibold">
                <div className="text-[#12B981]">
                    오픈율 : {map.open}
                </div>
                <div className="text-[#1F5796]">
                    구매 전환율 : {map.conv}
                </div>
                <div className="text-[#FF25C8]">
                    클릭율 : {map.click}
                </div>
            </div>
        </div>
    );
}