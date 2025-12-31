// App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx"
//메인 페이지
import AmorePartyPage from "./pages/AmorePartyPage.jsx";

// 모달 페이지
import CampaignModalPage from "./pages/modals/CampaignModalPage.jsx";
import CampaignUserModalPage from "./pages/modals/CampaignUserModalPage.jsx";

export default function App() {
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    return (
        <>
            {/* 1) 모달 배경 라우트: backgroundLocation이 있으면 그걸로 렌더 */}
            <Routes location={backgroundLocation || location}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/charts" replace />} />
                    <Route path="/charts" element={<AmorePartyPage />} />
                    <Route path="/agents" element={<AmorePartyPage />} />
                    <Route path="/logs" element={<AmorePartyPage />} />
                    <Route path="/queue" element={<AmorePartyPage />} />
                </Route>
            </Routes>

            {/* 2) 모달 라우트: backgroundLocation이 있을 때만 위에 얹혀지게 실행 */}
            {backgroundLocation && (
                <Routes>
                    <Route element={<AppLayout />}>
                        {/* 팝업1: 캠페인(카드) 상세 + 유저 목록 */}
                        <Route path="/agents/campaign/:campaignId" element={<CampaignModalPage />} />

                        {/* 팝업2: 유저 상세 (같은 모달 레이어로 보여줄 수도 있고, 별도 페이지로도 가능) */}
                        <Route
                            path="/agents/campaign/:campaignId/user/:userId"
                            element={<CampaignUserModalPage />}
                        />
                    </Route>
                </Routes>
            )}
        </>
    );
}