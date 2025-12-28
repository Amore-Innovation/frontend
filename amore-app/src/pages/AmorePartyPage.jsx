import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PerformanceSection from "../components/charts/PerformanceSection.jsx";

export default function AmorePartyPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // 섹션 정의 (id ↔ route)
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

    // 1) URL이 바뀌면 해당 섹션으로 스무스 스크롤 (탭 클릭 시 동작)
    useEffect(() => {
        const id = pathToId[pathname];
        if (!id) return;

        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [pathname, pathToId]);

    // 2) 스크롤 위치가 바뀌면 URL을 자동 갱신 (IntersectionObserver)
    const rafRef = useRef(null);

    useEffect(() => {
        const idToPath = new Map(sections.map((s) => [s.id, s.path]));
        const targets = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean);

        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // 너무 잦은 navigate 방지: rAF로 한 프레임에 한번만 처리
                if (rafRef.current) cancelAnimationFrame(rafRef.current);

                rafRef.current = requestAnimationFrame(() => {
                    // 현재 화면에서 "가장 많이 보이는" 섹션 선택
                    let best = null;

                    for (const e of entries) {
                        if (!e.isIntersecting) continue;
                        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
                    }

                    if (!best) return;

                    const nextPath = idToPath.get(best.target.id);
                    if (!nextPath) return;

                    // 같은 경로면 아무 것도 안 함
                    if (nextPath === pathname) return;

                    // 스크롤로 바뀌는 URL은 히스토리 쌓지 않게 replace
                    navigate(nextPath, { replace: true });
                });
            },
            {
                // fixed header(72px) + 약간 여유를 고려해서 상단 기준 조정
                // 위쪽은 -90px 정도 빼주면 헤더 아래에서 "활성" 판정이 자연스러움
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

    return (
        <div className="container-300 py-8 space-y-14">
            {/* 헤더 fixed(72px)라서 scroll-mt로 보정 */}
            <section id="section-charts" className="scroll-mt-[92px]">
                <PerformanceSection />
            </section>

            <section id="section-agents" className="scroll-mt-[92px]">
                <h1 className="text-2xl font-semibold">에이전트 상태 요약</h1>
                <div className="mt-4 h-[260px] rounded-xl border bg-white" />
            </section>

            <section id="section-queue" className="scroll-mt-[92px]">
                <h1 className="text-2xl font-semibold">에이전트 전략 대기열</h1>
                <div className="mt-4 h-[260px] rounded-xl border bg-white" />
            </section>

            <section id="section-logs" className="scroll-mt-[92px]">
                <h1 className="text-2xl font-semibold">에이전트 자동 운영 로그</h1>
                <div className="mt-4 h-[260px] rounded-xl border bg-white" />
            </section>
        </div>
    );
}