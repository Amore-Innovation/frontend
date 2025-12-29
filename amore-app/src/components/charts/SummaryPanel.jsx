import graphWIcon from "../../assets/icon/graph_w.svg";
import aiIcon from "../../assets/icon/ai.svg";

export default function SummaryPanel() {
    return (
        <aside className="h-full w-full rounded-2xl bg-[#001A4C] p-6 text-white">
            <div className="flex items-center gap-2">
                <img src={graphWIcon} alt="" className="w-5 h-5" />
                <h3 className="text-[20px] font-bold">캠페인 요약</h3>
            </div>

            <div className="mt-5">
                <div className="text-[16px] text-#FFFFFF">진행 중인 캠페인 수</div>
                <div className="text-[36px] font-bold leading-tight">8</div>
            </div>

            <div className="mt-6">
                <div className="text-[16px] text-#FFFFFF">총 타겟 고객수</div>
                <div className="text-[36px] font-bold leading-tight">142,580</div>
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-6 relative text-white">

                    {/* 가로 구분선(그대로) */}
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" />

                    {/* 세로 구분선: 위/아래로 분리해서 가운데 뚫리게 */}
                    <div className="absolute left-1/2 top-0 h-[calc(50%-10px)] w-px bg-white/20" />
                    <div className="absolute left-1/2 bottom-0 h-[calc(50%-10px)] w-px bg-white/20" />

                    <div>
                        <div className="text-[16px] text-FFFFFF font-medium">오픈율</div>
                        <div className="mt-2 text-[24px] font-bold">
                            458 <span className="text-[16px] font-medium">(14.48%)</span>
                        </div>
                    </div>

                    <div>
                        <div className="text-[16px] text-FFFFFF font-medium">ROI</div>
                        <div className="mt-2 text-[24px] font-bold">+ 324%</div>
                    </div>

                    <div>
                        <div className="text-[16px] text-FFFFFF font-medium">클릭율</div>
                        <div className="mt-2 text-[24px] font-bold">
                            243 <span className="text-[16px] font-medium">(14.48%)</span>
                        </div>
                    </div>

                    <div>
                        <div className="text-[16px] text-FFFFFF font-medium">구매 전환율</div>
                        <div className="mt-2 text-[24px] font-bold">+ 24.5%</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 ">
                <div className="flex items-center gap-2 text=[16px] font-bold text-[#141414]">
                    <img src={aiIcon} alt="" className="w-5 h-5" />
                    AI 요약
                </div>
                <p className="mt-3 text-[14px] leading-relaxed  font-medium text-[#2B2B2B]">
                    오픈율과 클릭율이 동시에 개선되며 메시지 반응도가 전반적으로 상승했습니다.
                    전환 가능성이 높은 지표에서 성과가 집중되고 있으며, 구매로 이어질 확률이
                    상승하는 추세입니다.
                </p>
            </div>
        </aside>
    );
}