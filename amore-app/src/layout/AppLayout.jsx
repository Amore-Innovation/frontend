import Header from "../components/Header.jsx"; // 폴더명 오타 그대로면 이 경로
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="pt-[72px]"> {/*헤더만큼 띄우기*/}
        <Outlet />
      </main>
    </>
  );
}