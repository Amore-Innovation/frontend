// AmorePartyPage.jsx
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PerformanceSection from "../components/charts/PerformanceSection.jsx";
import AgentStatusSection from "../components/agent/AgentStatusSection.jsx";
import AgentQueueSection from "../components/agent/AgentQueueSection.jsx";
import AgentAutoLogSection from "../components/agent/AgentAutoLogSection.jsx";

export default function AmorePartyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

    const sections = useMemo(
        () => [
            { id: "section-charts", path: "/charts" },
            { id: "section-agents", path: "/agents" },
            { id: "section-queue", path: "/queue" },
            { id: "section-logs", path: "/logs" },
        ],
        []
    );

    const pathToId = useMemo(() => {
        const map = {};
        sections.forEach((s) => (map[s.path] = s.id));
        return map;
    }, [sections]);

    useEffect(() => {
        const intent = location.state?.scrollTo;
        if (!intent) return; //  스크롤로 URL이 바뀐 경우엔 스크롤하지 않음

        //  프로그램 스크롤 시작
        isProgrammaticScrollRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        if (intent === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const id = pathToId[pathname];
            const el = id ? document.getElementById(id) : null;
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        //  0.8초 정도는 observer가 URL replace 못하게
        scrollTimeoutRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
        }, 800);

        //  state 제거(재렌더 시 중복 실행 방지)
        navigate(pathname, { replace: true, state: null });
    }, [pathname, pathToId, location.state, navigate]);

    const rafRef = useRef(null);

    useEffect(() => {
        const idToPath = new Map(sections.map((s) => [s.id, s.path]));
        const targets = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isProgrammaticScrollRef.current) return; //  핵심

                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(() => {
                    let best = null;
                    for (const e of entries) {
                        if (!e.isIntersecting) continue;
                        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
                    }
                    if (!best) return;

                    const nextPath = idToPath.get(best.target.id);
                    if (!nextPath || nextPath === pathname) return;

                    navigate(nextPath, { replace: true, state: null }); //  state 없이
                });
            },
            {
                root: null,
                rootMargin: "-90px 0px -55% 0px",
                threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
            }
        );

        targets.forEach((el) => observer.observe(el));
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            observer.disconnect();
        };
    }, [navigate, pathname, sections]);

    // 가운데 정렬용: 컴포넌트들이 1240px 기반-> max-w를 그 정도로 잡기
    const CONTENT_WRAP = "mx-auto w-full max-w-[1240px]";

    return (
        <div className="w-full">
            {/* 1) 성과 분석 차트(흰 배경) */}
            <div className="w-full px-8 py-15">
                <div className={CONTENT_WRAP}>
                    <section id="section-charts" className="scroll-mt-[92px]">
                        <PerformanceSection />
                    </section>
                </div>
            </div>

            {/* 2) 여기부터 페이지 전체 배경 회색 (Full width) */}
            <div className="w-full bg-[#F2F2F2]">
                <div className="w-full px-8 py-5 space-y-10">
                    <div className={CONTENT_WRAP}>
                        <section id="section-agents" className="scroll-mt-[92px]">
                            <AgentStatusSection />
                        </section>
                    </div>

                    <div className={CONTENT_WRAP}>
                        <section id="section-queue" className="scroll-mt-[92px]">
                            <AgentQueueSection />
                        </section>
                    </div>

                    <div  className={CONTENT_WRAP}  >
                        <section id="section-logs" className="scroll-mt-[92px]">
                            <AgentAutoLogSection />
                        </section>
                    </div>
                </div>
            </div>

            {/*  Footer (흰 영역 400px + 문구) */}
            <footer className="w-full bg-white">
                <div className={`${CONTENT_WRAP} h-[400px] flex flex-col items-center justify-center`}>
                    <p className="text-[#A6A6A6] text-[16px] font-medium text-center">
                        COPYRIGHT(C) 2026 AMORE PARTY. ALL RIGHT RESERVED.
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-[#A6A6A6] text-[16px] font-medium">
                        <button type="button" className="hover:opacity-80">
                            개인정보처리방침
                        </button>
                        <span className="text-[#A6A6A6]">|</span>
                        <button type="button" className="hover:opacity-80">
                            도움말
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}