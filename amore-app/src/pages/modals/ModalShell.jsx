// ModalShell.jsx
import { useEffect } from "react";
import messageIcon from "../../assets/icon/Email.svg";
import xIcon from "../../assets/icon/btn_x.svg";

export default function ModalShell({ onClose, children }) {
    useEffect(() => { //모달이 실행되면, 원래 페이지의 스크롤을 막음.
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
        return () => window.removeEventListener("keydown", onKey); //keydown이벤트 리스너를 윈도우에 붙임.
    }, [onClose]);

    return (
        // 바깥에 클릭 닫기
        <div className="fixed inset-0 z-[9999]" onClick={onClose}>
            {/* 시각용 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />
            {/* 모달 래퍼*/}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* 모달 본체 클릭은 닫기 막음. */}
                <div
                    className={[
                        "relative overflow-hidden rounded-[20px] bg-white shadow-xl",
                        "w-[1240px] h-[720px] max-w-[95vw] max-h-[95vh]",
                    ].join(" ")}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between px-8 border-b mt-6 border-white">
                        <div className="flex items-center gap-3">
                            <img src={messageIcon} className="w-5 h-5" alt="" />
                            <div className="text-[20px] font-bold text-[#232323]">
                                발송 메시지 확인
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="hover:opacity-50"
                            aria-label="Close"
                        >
                            <img src={xIcon} alt="" className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="h-[calc(720px-56px)] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}