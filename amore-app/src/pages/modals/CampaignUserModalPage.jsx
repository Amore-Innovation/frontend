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

function formatKSTLabel(iso) {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, "0");

    const MONTH = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][m];
    const ampm = hh >= 12 ? "P.M" : "A.M";
    const hh12 = hh % 12 === 0 ? 12 : hh % 12;

    return `${y}.${MONTH}.${String(day).padStart(2, "0")} / ${String(hh12).padStart(
        2,
        "0"
    )} : ${mm} ${ampm}`;
}

function Badge({ tone, label }) {
    const base = [
        "inline-flex items-center justify-center",
        "h-[32px] px-3 rounded-[6px]",
        "border text-[14px] font-semibold",
        "whitespace-nowrap",
    ].join(" ");

    const cls =
        tone === "opened"
            ? "border-[#FF2571] text-[#FF2571] bg-[#FFEDF3]"
            : tone === "notOpened"
                ? "border-[#1D3AE0] text-[#1D3AE0] bg-[#E6EAFF]"
                : tone === "purchased"
                    ? "border-[#FF4925] text-[#FF4925] bg-[#FFF3ED]"
                    : "border-[#1F5796] text-[#1F5796] bg-[#F2F4FF]";

    return <span className={[base, cls].join(" ")}>{label}</span>;
}

function HoverLink({ children }) {
    return (
        <span
            className={[
                "inline-flex items-center gap-2",
                "text-[16px] font-medium text-[#484848]",
                "cursor-pointer",
                "transition-colors",
                "hover:text-[#232323] hover:underline",
            ].join(" ")}
            title="(데모) 클릭 동작 없음"
        >
      {children}
    </span>
    );
}

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

    const history = useMemo(() => listUserDeliveries(userId), [userId]); // 최신 -> 과거

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

    const priceText = (p) =>
        `가격 : ${p?.price?.toLocaleString?.() ?? p?.price}원 ( - ${p?.discount} % )`;

    return (
        <ModalShell onClose={close}>
            <div className="p-8">
                {/* 상단: (유저정보) + (추천상품/메시지내용 합친 카드) */}
                <div className="grid grid-cols-[360px_1fr] gap-6">
                    {/* ✅ 유저 정보 카드 (2번처럼 들여쓰기) */}
                    <div className="rounded-[16px] bg-[#F7F7F7] p-6">
                        <div className="grid grid-cols-[40px_1fr] gap-y-1">
                            {/* 아이콘 */}
                            <div className="pt-[2px]">
                                <img src={userIcon} alt="" className="w-6 h-6" />
                            </div>
                            {/* 타이틀 */}
                            <div className="text-[20px] font-semibold text-[#232323]">
                                유저 정보
                            </div>

                            {/* ✅ 정보 텍스트: 오른쪽 컬럼에만 (들여쓰기 핵심) */}
                            <div className="col-start-2 text-[16px] font-medium text-[#545454] leading-7">
                                아이디 : {user.maskedId}
                                <br />
                                나이 : {user.age}
                                <br />
                                성별 : {user.gender}
                                <br />
                                피부타입 : {user.skin}
                            </div>

                            {/* ✅ 구분선도 오른쪽 컬럼에만 */}
                            <div className="col-start-2 h-px my-1 bg-[#DFDFDF]" />

                            {/* ✅ 버튼/배지도 오른쪽 컬럼에만 */}
                            <div className="col-start-2 flex items-center gap-2">
                                {pinnedDelivery?.purchased ? (
                                    <Badge tone="purchased" label="구매 완료" />
                                ) : (
                                    <Badge tone="notPurchased" label="미구매" />
                                )}

                                {pinnedDelivery?.opened ? (
                                    <Badge tone="opened" label="열람" />
                                ) : (
                                    <Badge tone="notOpened" label="미열람" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 추천상품 + 메시지내용 카드 */}
                    <div className="rounded-[16px] bg-[#F7F7F7] overflow-hidden">
                        <div className="grid grid-cols-[1fr_1px_1fr] items-stretch">
                            {/* ✅ 추천 상품 (가격 바닥 고정) */}
                            <div className="p-6 flex flex-col h-full min-h-0">
                                <div className="flex items-center gap-3">
                                    <img src={messageIcon} alt="" className="w-5 h-5" />
                                    <div className="text-[20px] font-semibold text-[#232323]">
                                        추천 상품
                                    </div>
                                </div>

                                <div className="mt-3 text-[16px] font-medium text-[#484848] leading-7 whitespace-pre-line">
                                    {pinnedDelivery?.product?.name}
                                    {"\n"}
                                    {pinnedDelivery?.product?.spec}
                                </div>

                                {/* ✅ 가격을 맨 아래로 */}
                                <div className="mt-auto pt-4 text-[16px] font-medium text-[#484848]">
                                    {priceText(pinnedDelivery?.product)}
                                </div>
                            </div>

                            {/* 세로줄 (위/아래 여백) */}
                            <div className="relative">
                                <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                            </div>

                            {/* 메시지 내용 */}
                            <div className="p-6 h-full min-h-0 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={messageIcon} alt="" className="w-5 h-5" />
                                        <div className="text-[16px] font-medium text-[#484848]">
                                            메시지 내용
                                        </div>
                                    </div>

                                    {pinnedDelivery?.sentAt ? (
                                        <div className="text-[16px] font-medium text-[#545454]">
                                            {formatKSTLabel(pinnedDelivery.sentAt)}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-3 text-[16px] font-medium text-[#484848] leading-7 whitespace-pre-line">
                                    {pinnedDelivery?.message?.title}
                                    {"\n"}
                                    {pinnedDelivery?.message?.body}
                                    {"\n"}
                                    <HoverLink>{pinnedDelivery?.message?.cta}</HoverLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 히스토리 */}
                <div className="mt-8">
                    <div className="flex items-center gap-3">
                        <img src={messageIcon} alt="" className="w-5 h-5" />
                        <div className="text-[20px] font-semibold text-[#232323]">
                            {user.maskedId}님의 CRM 메시지별 구매 이력
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        {history.map((d) => {
                            const c = findCampaign(d.campaignId);

                            return (
                                <div
                                    key={d.id}
                                    className={[
                                        "rounded-[16px] bg-[#FFFFFF]",
                                        "shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]",
                                        "overflow-hidden",
                                        "transition-transform",
                                        "hover:-translate-y-[1px]",
                                    ].join(" ")}
                                >
                                    <div className="grid grid-cols-[360px_1px_1fr_1px_1fr] items-stretch">
                                        {/* 좌측 */}
                                        <div className="p-6 h-full">
                                            <div className="flex items-center gap-3">
                                                {c?.leftIcon ? (
                                                    <img src={c.leftIcon} alt="" className="w-7 h-7" />
                                                ) : (
                                                    <img src={messageIcon} alt="" className="w-6 h-6" />
                                                )}

                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="text-[20px] font-semibold text-[#232323] truncate">
                                                        {c?.title ?? "재구매 유도"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-[16px] font-medium text-[#545454]">
                                                {formatKSTLabel(d.sentAt)}
                                            </div>

                                            <div className="mt-4 flex items-center gap-2">
                                                {d.purchased ? (
                                                    <Badge tone="purchased" label="구매 완료" />
                                                ) : (
                                                    <Badge tone="notPurchased" label="미구매" />
                                                )}

                                                {d.opened ? (
                                                    <Badge tone="opened" label="열람" />
                                                ) : (
                                                    <Badge tone="notOpened" label="미열람" />
                                                )}
                                            </div>
                                        </div>

                                        {/* 세로줄 1 */}
                                        <div className="relative">
                                            <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                                        </div>

                                        <div className="p-6 flex flex-col h-full min-h-0 text-[16px] font-medium text-[#484848] leading-7">
                                            {/* ✅ Brand: 상품명 위 */}
                                            {c?.brand?.key ? (
                                                <div className="mb-2">
                                                    <Brand brand={c.brand.key} variant="display" />
                                                </div>
                                            ) : null}

                                            <div className="whitespace-pre-line">
                                                {d.product.name}
                                                {"\n"}
                                                {d.product.spec}
                                            </div>

                                            <div className="mt-auto pt-4">{priceText(d.product)}</div>
                                        </div>

                                        {/* 세로줄 2 */}
                                        <div className="relative">
                                            <div className="absolute top-6 bottom-6 left-0 w-px bg-[#DFDFDF]" />
                                        </div>

                                        {/* 우측 */}
                                        <div className="p-6 h-full min-h-0 text-[16px] font-medium text-[#484848] leading-7 whitespace-pre-line">
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

                    <div className="h-2" />
                </div>
            </div>
        </ModalShell>
    );
}