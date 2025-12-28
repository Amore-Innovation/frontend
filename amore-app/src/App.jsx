import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import AmorePartyPage from "./pages/AmorePartyPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/charts" replace />} />
                <Route path="/charts" element={<AmorePartyPage />} />
                <Route path="/agents" element={<AmorePartyPage />} />
                <Route path="/logs" element={<AmorePartyPage />} />
                <Route path="/queue" element={<AmorePartyPage />} />
            </Route>
        </Routes>
    );
}