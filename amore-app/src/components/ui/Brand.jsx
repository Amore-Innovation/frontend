    // BrandPill.jsx
    export const BRAND_COLOR = {
        inisfree: "#12B981",
        aestura: "#2773E6",
        etude: "#FF25C8",
        sulhwasoo: "#FF8C03",
        bready: "#1E12FF",
    };

    export const LABEL = {
        inisfree: "이니스프리",
        aestura: "에스트라",
        etude: "에뛰드",
        sulhwasoo: "설화수",
        bready: "비레디",
    };

    /**
     * variant:
     *  - "select": 브랜드 선택 UI (active만 컬러 fill, 나머지는 회색)
     *  - "display": 브랜드 표시 UI (흰 배경 + 컬러 글자 + 그림자)
     */
    export default function Brand({
                                          brand = "inisfree",
                                          variant = "select",
                                          active = false,
                                          disabled = false,
                                          className = "",
                                          onClick,
                                      }) {
        const color = BRAND_COLOR[brand] ?? BRAND_COLOR.inisfree;

        const base =
            "inline-flex items-center justify-center select-none " +
            "px-[20px] rounded-full " +
            "text-[16px] font-semibold leading-none transition";

        //  표시용: 흰 배경 + 컬러 글자 + 그림자(테두리 없음)
        if (variant === "display") {
            const displayColor = disabled ? "#7D7D7D" : color;
            return (
                <span
                    className={[
                        base,
                        "h-[31px]",
                        "bg-white",
                        "shadow-[0_0px_4px_rgba(0,0,0,0.1)]",
                        className,
                    ].join(" ")}
                    style={{ color: displayColor }}
                >
                  {LABEL[brand] ?? brand}
                </span>
            );
        }

        // 선택용 : active=컬러 fill, 나머지(=inactive/disabled)=회색 동일
        const isClickable = !disabled;

        const cls = [
            base,
            "h-[40px]",
            active ? "text-white" : "bg-[#E2E2E2] text-[#A8A8A8]",
            isClickable ? "cursor-pointer" : "cursor-not-allowed",
            isClickable && !active ? "hover:bg-[#D7D7D7] hover:text-[#7A7A7A]" : "",
            isClickable ? "transition-all duration-150 hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0" : "",
            className,
        ].join(" ");

        return (
            <button
                type="button"
                className={cls}
                onClick={isClickable ? onClick : undefined}
                style={active ? { backgroundColor: color } : undefined}
            >
                {LABEL[brand] ?? brand}
            </button>
        );
    }