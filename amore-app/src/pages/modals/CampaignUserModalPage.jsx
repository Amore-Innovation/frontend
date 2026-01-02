// CampaignUserModalPage.jsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalShell from "./ModalShell.jsx";

import Brand from "../../components/ui/Brand.jsx";
import {
    findCampaign,
    findUser,
    findUserPinnedDelivery,
    listUserDeliveries,
} from "../../mocks/db/index.js";

import userIcon from "../../assets/icon/user.svg";
import messageIcon from "../../assets/icon/Email.svg";
import profileIcon from "../../assets/icon/profile.svg";

/* ---------------- utils ---------------- */

function formatKSTLabel(iso) {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, "0");

    const MONTH = [
        "JAN","FEB","MAR","APR","MAY","JUN",
        "JUL","AUG","SEP","OCT","NOV","DEC"
    ][m];

    const ampm = hh >= 12 ? "P.M" : "A.M";
    const hh12 = hh % 12 === 0 ? 12 : hh % 12;

    return `${y}.${MONTH}.${String(day).padStart(2, "0")} / ${String(hh12).padStart(
        2,
        "0"
    )} : ${mm} ${ampm}`;
}

function Badge({ tone, label }) {
    const base =
        "inline-flex items-center justify-center h-[32px] px-3 rounded-[6px] border text-[14px] font-semibold whitespace-nowrap";

    const cls =
        tone === "opened"
            ? "border-[#FF2571] text-[#FF2571] bg-[#FFEDF3]"
            : tone === "notOpened"
                ? "border-[#1D3AE0] text-[#1D3AE0] bg-[#E6EAFF]"
                : tone === "purchased"
                    ? "border-[#FF4925] text-[#FF4925] bg-[#FFF3ED]"
                    : "border-[#1F5796] text-[#1F5796] bg-[#F2F4FF]";

    return <span className={`${base} ${cls}`}>{label}</span>;
}

function HoverLink({ children }) {
    return (
        <span className="inline-flex items-center gap-2 text-[16px] font-medium text-[#484848]
            cursor-pointer transition-colors hover:text-[#232323] hover:underline">
            {children}
        </span>
    );
}

/* ---------------- persona beauty profile ---------------- */

const BEAUTY_PROFILE = {
    p1: ["복합성", "트러블", "모공"],
    p2: ["건성", "탄력", "주름"],
    p3: ["복합성"],
    p4: ["복합성", "탄력", "주름"],
    p5: ["복합성"],
};

/* ---------------- page ---------------- */

export default function CampaignUserModalPage() {
    const navigate = useNavigate();
    const { campaignId, userId } = useParams();
    const close = () => navigate(-1);

    const campaign = useMemo(() => findCampaign(campaignId), [campaignId]);
    const user = useMemo(() => findUser(userId), [userId]);

    const pinned = useMemo(
        () => findUserPinnedDelivery({ campaignId, userId }),
        [campaignId, userId]
    );

    const history = useMemo(() => listUserDeliveries(userId), [userId]);

    if (!campaign || !user) {
        return (
            <ModalShell onClose={close}>
                <div className="h-full flex items-center justify-center text-[#7D7D7D]">
                    데이터를 찾을 수 없습니다.
                </div>
            </ModalShell>
        );
    }

    const pinnedDelivery = pinned || history[0];
    const restHistory = history.filter((d) => d !== pinnedDelivery);

    const priceText = (p) =>
        `가격 : ${p?.price?.toLocaleString?.() ?? p?.price}원 ( - ${p?.discount} % )`;

    return (
        <ModalShell onClose={close}>
            <div className="p-8 space-y-10">

                {/* ================= 유저 정보 ================= */}
                <div className="rounded-[16px] bg-[#F7F7F7] p-6 max-w-[50%]">
                    <div className="flex items-center gap-3 mb-5">
                        <img src={userIcon} className="w-6 h-6" />
                        <div className="text-[20px] font-semibold">유저 정보</div>
                    </div>

                    <div className="grid grid-cols-[144px_1fr_1px_1fr] gap-4 items-start">
                        <img
                            src={profileIcon}
                            className="w-[144px] h-[144px] rounded-full"
                            alt=""
                        />

                        <div className="text-[18px] font-medium leading-7 text-[#545454]">
                            아이디 : {user.id}
                            <br />
                            나이 : {user.age}
                            <br />
                            성별 : {user.gender}
                            <br />
                            아모레 등급 : M
                        </div>

                        <div className="w-px bg-[#DFDFDF] h-full" />

                        <div>
                            <div className="text-[18px] font-semibold mb-2">뷰티 프로필</div>
                            <div className="flex flex-wrap gap-2">
                                {(BEAUTY_PROFILE[user.personaId] || []).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1 rounded-full text-[14px]
                                            bg-[#F8FAFF] border border-[#E1E4ED]
                                            text-[#6D758F] font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= 가장 최근 메시지 ================= */}
                {pinnedDelivery && (
                    <div className="rounded-[16px] bg-[#F7F7F7] overflow-hidden">
                        <div className="grid grid-cols-[360px_1px_1fr_1px_1fr]">

                            {/* 트리거 + 상태 */}
                            <div className="p-6">
                                <div className="flex items-center gap-3">
                                    <img src={campaign?.leftIcon || messageIcon} className="w-6 h-6" />
                                    <div className="text-[20px] font-semibold">
                                        {campaign?.title}
                                    </div>
                                </div>

                                <div className="mt-2 text-[#545454]">
                                    {formatKSTLabel(pinnedDelivery.sentAt)}
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Badge
                                        tone={pinnedDelivery.purchased ? "purchased" : "notPurchased"}
                                        label={pinnedDelivery.purchased ? "구매 완료" : "미구매"}
                                    />
                                    <Badge
                                        tone={pinnedDelivery.opened ? "opened" : "notOpened"}
                                        label={pinnedDelivery.opened ? "열람" : "미열람"}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                            </div>

                            {/* 상품 */}
                            <div className="p-6">
                                {campaign?.brand?.key && (
                                    <div className="mb-2">
                                        <Brand brand={campaign.brand.key} variant="display" />
                                    </div>
                                )}

                                <div className="whitespace-pre-line text-[#484848]">
                                    {pinnedDelivery.product.name}
                                    {"\n"}
                                    {pinnedDelivery.product.spec}
                                </div>

                                <div className="mt-4">{priceText(pinnedDelivery.product)}</div>
                            </div>

                            <div className="relative">
                                <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                            </div>

                            {/* 메시지 */}
                            <div className="p-6 whitespace-pre-line text-[#484848]">
                                {pinnedDelivery.message.title}
                                {"\n"}
                                {pinnedDelivery.message.body}
                                {"\n"}
                                <HoverLink>{pinnedDelivery.message.cta}</HoverLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= 메시지별 구매 이력 ================= */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={messageIcon} className="w-5 h-5" />
                        <div className="text-[20px] font-semibold">
                            {user.id}님의 CRM 메시지별 구매 이력
                        </div>
                    </div>

                    <div className="space-y-4">
                        {restHistory.map((d) => {
                            const c = findCampaign(d.campaignId);

                            return (
                                <div
                                    key={d.id}
                                    className="rounded-[16px] bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)]
                                        hover:bg-[#F7F7F7] transition"
                                >
                                    <div className="grid grid-cols-[360px_1px_1fr_1px_1fr]">
                                        {/* 좌 */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3">
                                                <img src={c?.leftIcon || messageIcon} className="w-6 h-6" />
                                                <div className="text-[20px] font-semibold">
                                                    {c?.title}
                                                </div>
                                            </div>

                                            <div className="mt-2 text-[#545454]">
                                                {formatKSTLabel(d.sentAt)}
                                            </div>

                                            <div className="mt-4 flex gap-2">
                                                <Badge
                                                    tone={d.purchased ? "purchased" : "notPurchased"}
                                                    label={d.purchased ? "구매 완료" : "미구매"}
                                                />
                                                <Badge
                                                    tone={d.opened ? "opened" : "notOpened"}
                                                    label={d.opened ? "열람" : "미열람"}
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                                        </div>

                                        {/* 상품 */}
                                        <div className="p-6">
                                            {c?.brand?.key && (
                                                <div className="mb-2">
                                                    <Brand brand={c.brand.key} variant="display" />
                                                </div>
                                            )}

                                            <div className="whitespace-pre-line text-[#484848]">
                                                {d.product.name}
                                                {"\n"}
                                                {d.product.spec}
                                            </div>

                                            <div className="mt-4">{priceText(d.product)}</div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                                        </div>

                                        {/* 메시지 */}
                                        <div className="p-6 whitespace-pre-line text-[#484848]">
                                            {d.message.title}
                                            {"\n"}
                                            {d.message.body}
                                            {"\n"}
                                            <HoverLink>{d.message.cta}</HoverLink>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </ModalShell>
    );
}