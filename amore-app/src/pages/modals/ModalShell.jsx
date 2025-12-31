// ModalShell.jsx
import { useEffect } from "react";
import messageIcon from "../../assets/icon/Email.svg"

export default function ModalShell({ onClose, children }) {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div
                    className={[
                        "relative overflow-hidden rounded-[20px] bg-white shadow-xl",
                        "w-[1240px] h-[720px] max-w-[95vw] max-h-[95vh]",
                    ].join(" ")}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* 공통 header: 네가 준 스타일 그대로 */}
                    <div className=" flex items-center justify-between px-8 border-b mt-6 border-white">
                        <div className="flex items-center gap-3">
                            <img src={messageIcon} className="w-5 h-5"/>
                            <div className="text-[18px] font-bold text-[#232323]">발송 메시지 확인</div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-[#7D7D7D] hover:opacity-80"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* ✅ body (header 밑에 남은 영역만 스크롤) */}
                    <div className="h-[calc(720px-56px)] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}