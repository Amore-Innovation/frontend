// components/agent/QueueCard.jsx
import activeIcon from "../../assets/icon/activate.svg";
import Brand from "../ui/Brand.jsx";

export default function QueueCard({ item }) {
    return (
        <div
     className={[
                       "w-[360px] rounded-[12px] bg-[#F7F7F7] px-5 py-4",
               "transition-all duration-150 will-change-transform",
               "hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
               "active:-translate-y-[1px]",
             ].join(" ")}
       >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={activeIcon} alt="" className="w-7 h-7" />
                    <div className="text-[18px] font-semibold text-[#000000]">{item.title}</div>
                </div>
                <Brand brand={item.brand} variant="display" />
            </div>

            <div className="mt-2 text-[16px] text-[#818181] font-medium">대상 : {item.target}</div>
            <div className="mt-1 text-[16px] text-[#818181] font-medium">
                발송 예정 : 2025 . FEB 2 . {item.at} A.M
            </div>
        </div>
    );
}