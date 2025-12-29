import { NavLink, useLocation, useNavigate } from "react-router-dom";
import headerIcon from "../assets/icon/header.svg";

const tabs = [
    { label: "성과 분석 차트", to: "/charts" },
    { label: "에이전트 상태 요약", to: "/agents" },
    { label: "에이전트 전략 대기열", to: "/logs" },
    { label: "에이전트 자동 운영 로그    ", to: "/queue" },
];

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogoClick = () => {
        if (pathname !== "/charts") {
            navigate("/charts");
            return;
        }
        // 이미 charts면 맨 위로
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#001A4C]">
            <div className="h-full flex items-center justify-between px-[50px]">
                <button
                    type="button"
                    onClick={handleLogoClick}
                    className="flex items-center"
                    aria-label="Go to top"
                >
                    <img
                        src={headerIcon}
                        alt="AMORE PARTY"
                        className="h-[60px] w-auto select-none"
                    />
                </button>
                <div className="flex-1" />
                <nav className="flex items-center gap-8">
                    {tabs.map((t) => (
                        <NavLink
                            key={t.to}
                            to={t.to}
                            end
                            className={({ isActive }) =>
                                [
                                    "relative inline-flex items-center h-[72px]",
                                    "text-[16px] font-semibold",
                                    isActive ? "text-[#A1A0A0]" : "text-white",
                                    isActive
                                        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-full after:bg-[#A1A0A0]"
                                        : "",
                                ].join(" ")
                            }
                        >
                            {t.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}