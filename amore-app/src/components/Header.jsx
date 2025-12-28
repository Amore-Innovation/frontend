import { NavLink } from "react-router-dom";
import headerIcon from "../assets/icon/header.svg";

const tabs = [
    { label: "성과 분석 차트", to: "/" },        // 루트를 성과분석으로
    { label: "에이전트 상태 요약", to: "/agents" },
    { label: "AI 자동 운영 로그", to: "/logs" },
    { label: "AI 전략 대기열", to: "/queue" },
    { label: "AI 중단 / 조정 이력", to: "/history" },
];

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#001A4C]">
            <div className="h-full flex items-center gap-10 px-10">
                {/* logo */}
                <img src={headerIcon} alt="AMORE PARTY" className="h-60px w-auto select-none" />

                {/* tabs */}
                <nav className="flex items-center gap-8">
                    {tabs.map((t) => (
                        <NavLink
                            key={t.to}
                            to={t.to}
                            end={t.to === "/"}   // 루트(/)가 다른 경로에서 active 안 되게
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