import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import AmorePartyPage from "./pages/AmorePartyPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<AmorePartyPage />} />
                <Route path="/agents" element={<div>agents</div>} />
                <Route path="/logs" element={<div>logs</div>} />
                <Route path="/queue" element={<div>queue</div>} />
                <Route path="/history" element={<div>history</div>} />
            </Route>
        </Routes>
    );
}