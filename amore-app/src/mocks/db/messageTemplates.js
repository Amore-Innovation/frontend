// src/mocks/db/messageTemplates.js

export const messageTemplates = [
    // -------------------------
    // 페르소나1 (에스트라)
    // -------------------------
    {
        id: "t_p1_cart_abandon",
        personaId: "p1",
        triggerType: "CART_ABANDON",
        triggerName: "장바구니 리마인드",
        messageTitle: "🛒 장바구니 속 [에이시카 흔적세럼] 잊지 마세요!",
        messageBody:
            "{이름}님! 담아두신 에이시카365 흔적진정세럼이 기다리고 있어요. 🥺 \"끈적임 없이 쏙 흡수돼서 정착했다\"는 리뷰 속 그 제품! ✨ 지금 결제하면 통 큰 40% 혜택가 21,600원에 득템 가능! 🏃💨 고민은 배송만 늦출 뿐이에요!",
        buttonText: "지금 바로 구매하기 🛍️",
        highlightTag: "품절주의",
        productId: "prod_aestura_cica_serum_60ml",
        reviewId: "5976207",
        offer: { currentPriceText: "21,600원", discountRateText: "40%" },
    },
    {
        id: "t_p1_wish_list_discount",
        personaId: "p1",
        triggerType: "WISH_LIST_DISCOUNT",
        triggerName: "찜 상품 가격 변동",
        messageTitle: "📉 가격 다운! [에이시카 흔적세럼] 역대급 찬스!",
        messageBody:
            "{이름}님이 찜하신 에스트라 에이시카365 흔적진정세럼 가격이 뚝! 떨어졌어요! 💸 기존가 대비 40% 할인된 21,600원! 😱 \"순해서 매일 써도 부담 없다\"는 리뷰 보셨죠? 이 가격은 한정 수량만 유지되니 서두르세요! 🔥",
        buttonText: "특가로 가져가기 🎁",
        highlightTag: "깜짝세일",
        productId: "prod_aestura_cica_serum_60ml",
        reviewId: "5976207",
        offer: { currentPriceText: "21,600원", discountRateText: "40%" },
    },
    {
        id: "t_p1_repurchase_cycle",
        personaId: "p1",
        triggerType: "REPURCHASE_CYCLE",
        triggerName: "재구매 유도",
        messageTitle: "💧 [에이시카 흔적세럼] 똑 떨어지기 전 쟁여두기!",
        messageBody:
            "{이름}님, 쓰시던 에이시카365 흔적진정세럼 재구매 타임! 🔍 \"리뉴얼 후에도 촉촉함이 그대로라 무조건 재구매해요\"라는 후기처럼 믿고 쓰는 정착템! ✨ 지금 재구매 시 전용 혜택가 21,600원(40% OFF)에 모십니다! 🎟️",
        buttonText: "쿠폰 쓰고 재구매 🛒",
        highlightTag: "재구매혜택",
        productId: "prod_aestura_cica_serum_60ml",
        reviewId: "5976207",
        offer: { currentPriceText: "21,600원", discountRateText: "40%" },
    },
    {
        id: "t_p1_abandoned_search",
        personaId: "p1",
        triggerType: "CART_ABANDON",            // ✅ 변경
        triggerName: "장바구니 리마인드 (추가)", // ✅ 변경
        messageTitle: "🔍 찾으시던 [에이시카 흔적세럼] 최저가 확인!",
        messageBody:
            "끈적임 없는 진정템 찾으셨나요? 🙅‍♀️ 에스트라 에이시카365 흔적진정세럼은 바르자마자 싹- 흡수되는 산뜻함이 매력! ✨ phm0*님이 극찬한 이 제품, 오직 {이름}님께만 40% 특별가 21,600원에 제안드려요. 🌱 더 늦기 전에 클릭!",
        buttonText: "최저가 확인 👀",
        highlightTag: "인기급상승",
        productId: "prod_aestura_cica_serum_60ml",
        reviewId: "5976207",
        offer: { currentPriceText: "21,600원", discountRateText: "40%" },
    },
    {
        id: "t_p1_cross_sell",
        personaId: "p1",
        triggerType: "CROSS_SELL",
        triggerName: "연관 상품 추천",
        messageTitle: "🤝 {이름}님 피부엔 [에이시카 흔적세럼]이 딱!",
        messageBody:
            "복합성 피부 고민, 에이시카365 흔적진정세럼으로 종결! 🌿 \"트러블 진정은 물론 피부가 편안해져요\"라는 만족도 1위 제품! 💖 지금 구매하시면 단돈 21,600원(40% OFF)에 진정 루틴 완성! 💰✨ 이 기회 절대 놓치지 마세요!",
        buttonText: "혜택 받고 구매하기 🎁",
        highlightTag: "강력추천",
        productId: "prod_aestura_cica_serum_60ml",
        reviewId: "5976207",
        offer: { currentPriceText: "21,600원", discountRateText: "40%" },
    },

    // -------------------------
    // 페르소나2 (설화수 선물)
    // -------------------------
    {
        id: "t_p2_cart_abandon",
        personaId: "p2",
        triggerType: "CART_ABANDON",
        triggerName: "장바구니 리마인드",
        messageTitle: "🎁 어머니를 위한 최고의 선택, [자음생 2종 세트]",
        messageBody:
            "{이름}님, 장바구니에 담아두신 설화수 자음생 2종 세트를 확인해 보세요. ✨ 인삼의 생명력으로 탄력을 채워주는 어머니들의 No.1 선물입니다. 👑 지금 결제 시 특별 혜택가 144,000원(20% OFF)에 전용 선물 포장 혜택까지 더해드립니다. ✉️",
        buttonText: "품격 있게 선물하기 🛍️",
        highlightTag: "선물포장무료",
        productId: "prod_sulhwasoo_jaumsaeng_2set",
        reviewId: "rev_sul_2set_01",
        offer: { currentPriceText: "144,000원", discountRateText: "20%" },
    },
    {
        id: "t_p2_wish_list_discount",
        personaId: "p2",
        triggerType: "WISH_LIST_DISCOUNT",
        triggerName: "찜 상품 혜택 안내",
        messageTitle: "📉 [설화수] 자음생 2종 세트, 특별 혜택가 안내",
        messageBody:
            "{이름}님이 찜하신 설화수 자음생 2종 세트가 선물을 위한 최적의 가격으로 조정되었습니다. 💎 정가 대비 20% 할인된 144,000원! 💸 안티에이징의 정수로 어머니께 탄력 있는 하루를 선물하세요. 한정 수량 기프트 세트로 준비했습니다. 🌹",
        buttonText: "특별 혜택가 구매 🎁",
        highlightTag: "시즌한정",
        productId: "prod_sulhwasoo_jaumsaeng_2set",
        reviewId: "rev_sul_2set_01",
        offer: { currentPriceText: "144,000원", discountRateText: "20%" },
    },
    {
        id: "t_p2_repurchase_cycle",
        personaId: "p2",
        triggerType: "REPURCHASE_CYCLE",
        triggerName: "재구매/기념일 리마인드",
        messageTitle: "🗓️ 소중한 분을 위한 마음, [자음생 세트]로 다시 전하세요",
        messageBody:
            "지난 선물 이후 120일이 지났습니다. ✨ 어머니의 피부 컨디션을 위해 자음생 2종 세트를 다시 준비해 보시는 건 어떨까요? 😊 \"선물해 드렸더니 너무 좋아하신다\"는 효도 후기 1위 제품! 오늘 구매 시 144,000원(20% OFF) 혜택을 드립니다. 💝",
        buttonText: "감사의 선물 준비하기 🛒",
        highlightTag: "BEST효도템",
        productId: "prod_sulhwasoo_jaumsaeng_2set",
        reviewId: "rev_sul_2set_01",
        offer: { currentPriceText: "144,000원", discountRateText: "20%" },
    },
    {
        id: "t_p2_abandoned_search",
        personaId: "p2",
        triggerType: "CART_ABANDON",            // ✅ 변경
        triggerName: "장바구니 리마인드 (추가)", // ✅ 변경
        messageTitle: "🔍 찾으시던 프리미엄 선물, [설화수 자음생]이 정답입니다",
        messageBody:
            "품격 있는 안티에이징 선물을 찾고 계신가요? 👑 설화수 자음생 2종 세트는 탄력과 윤기를 동시에 선사하는 가장 완벽한 구성입니다. ✨ 지금 바로 40% 혜택가 144,000원으로 어머니께 잊지 못할 감동을 선물해 보세요. 🌱",
        buttonText: "자세히 보기 👀",
        highlightTag: "재구매율1위",
        productId: "prod_sulhwasoo_jaumsaeng_2set",
        reviewId: "rev_sul_2set_01",
        offer: { currentPriceText: "144,000원", discountRateText: "20%" },
    },
    {
        id: "t_p2_cross_sell",
        personaId: "p2",
        triggerType: "CROSS_SELL",
        triggerName: "프리미엄 세트 추천",
        messageTitle: "🤝 {이름}님, 어머니를 위한 가장 센스 있는 선택!",
        messageBody:
            "주름과 탄력 고민을 한 번에 해결해 줄 설화수 자음생 2종 세트를 추천합니다. 🌿 설화수만의 기술력이 담긴 자음생 라인으로 어머니의 시간을 되돌려주세요. ✨ 지금 구매 시 144,000원(20% OFF)에 여행용 샘플까지 풍성하게 담아드립니다! 💰",
        buttonText: "전용 세트 구매하기 🎁",
        highlightTag: "풀세트증정",
        productId: "prod_sulhwasoo_jaumsaeng_2set",
        reviewId: "rev_sul_2set_01",
        offer: { currentPriceText: "144,000원", discountRateText: "20%" },
    },

    // -------------------------
    // 페르소나3 (에뛰드 틴트)
    // -------------------------
    {
        id: "t_p3_cart_abandon",
        personaId: "p3",
        triggerType: "CART_ABANDON",
        triggerName: "장바구니 리마인드",
        messageTitle: "🧣 겨울 니트에 찰떡! [포근 픽싱틴트] 보셨나요?",
        messageBody:
            "{이름}님! 장바구니에 담아둔 쿠션이랑 이 틴트 조합이 진짜 대박인데... ☁️ 안 바른 듯 가볍고 보송하게 밀착되는 신상 컬러! ✨ 지금 담으면 10,400원(20% OFF)에 올겨울 인생 립 완성입니다. 💄",
        buttonText: "신상 컬러 확인하기 🛍️",
        highlightTag: "품절주의",
        productId: "prod_etude_fixing_tint_newcolor",
        reviewId: "rev_etude_fixing_01",
        offer: { currentPriceText: "10,400원", discountRateText: "20%" },
    },
    {
        id: "t_p3_wish_list_discount",
        personaId: "p3",
        triggerType: "WISH_LIST_DISCOUNT",
        triggerName: "찜 상품 혜택 안내",
        messageTitle: "📉 가격까지 포근해진 [포근 픽싱틴트] 세일!",
        messageBody:
            "{이름}님이 찜하신 포근 픽싱틴트 가격이 내려갔어요! 💸 묻어남 걱정 없는 '픽싱력'에 분위기 있는 컬러감까지. ✨ 단돈 10,400원으로 요즘 유행하는 오버립 메이크업 도전해보세요! 💋",
        buttonText: "할인가로 구매하기 🎁",
        highlightTag: "최저가도전",
        productId: "prod_etude_fixing_tint_newcolor",
        reviewId: "rev_etude_fixing_01",
        offer: { currentPriceText: "10,400원", discountRateText: "20%" },
    },
    {
        id: "t_p3_repurchase_cycle",
        personaId: "p3",
        triggerType: "REPURCHASE_CYCLE",
        triggerName: "재구매 유도",
        messageTitle: "💄트렌디한 립을 찾고 계신가요??",
        messageBody:
            "'18호 쿨핑 온탑'은 쿨톤에 잘 어울리는 자연스러운 컬러로, " +
            "부드러운 발림성과 화사한 피부 표현을 도와줘요!",
        buttonText: "지금 확인해보세요 👉 [상품 보러가기] ",
        highlightTag: "만족도1위",
        productId: "prod_etude_fixing_tint_newcolor",
        reviewId: "rev_etude_fixing_01",
        offer: { currentPriceText: "10,400원", discountRateText: "20%" },
    },
    {
        id: "t_p3_cross_sell",
        personaId: "p3",
        triggerType: "CROSS_SELL",
        triggerName: "연관 상품 추천 (쿠션 조회 시)",
        messageTitle: "🤝 쿠션이랑 같이 쓰면 더 예쁜 꿀조합 틴트!",
        messageBody:
            "화사한 쿠션엔 분위기 있는 틴트가 필수! 🌿 포근 픽싱틴트로 지속력까지 챙겨보세요. ✨ 지금 쿠션이랑 함께 구매하면 혜택가 10,400원에 추가 적립까지! 💰 올겨울 메이크업 끝판왕 조합입니다. 💖",
        buttonText: "꿀조합 완성하기 🎁",
        highlightTag: "함께사면이득",
        productId: "prod_etude_fixing_tint_newcolor",
        reviewId: "rev_etude_fixing_01",
        offer: { currentPriceText: "10,400원", discountRateText: "20%" },
    },

    // -------------------------
    // 페르소나4 (설화수 윤조 에디션)
    // -------------------------
    {
        id: "t_p4_cart_abandon",
        personaId: "p4",
        triggerType: "CART_ABANDON",
        triggerName: "장바구니 리마인드",
        messageTitle: "🐎 2026 말의 해, 오직 지금만 만나는 특별한 윤조",
        messageBody:
            "{이름}님, 장바구니 속 윤조에센스 말의 해 에디션을 확인해 보세요. ✨ 120ml 대용량으로 더 넉넉하게, 한정판 디자인으로 더 특별하게 준비했습니다. 🕯️ 품격 있는 안티에이징의 시작, 혜택가 157,250원에 소장하실 마지막 기회입니다. 👑",
        buttonText: "한정판 에디션 구매하기 🛍️",
        highlightTag: "2026한정판",
        productId: "prod_sulhwasoo_first_care_essence_120ml_horse",
        reviewId: "rev_sul_lny_26",
        offer: { currentPriceText: "157,250원", discountRateText: "15%" },
    },
    {
        id: "t_p4_wish_list_discount",
        personaId: "p4",
        triggerType: "WISH_LIST_DISCOUNT",
        triggerName: "찜 상품 혜택 안내",
        messageTitle: "📉 [설화수] 2026 에디션, 가장 기품 있는 혜택",
        messageBody:
            "{이름}님이 찜하신 윤조에센스 말의 해 에디션 가격이 조정되었습니다. 💎 새해의 기운을 담은 특별한 디자인과 설화수의 독보적인 탄력 기술력을 경험해 보세요. ✨ 15% 혜택가 157,250원으로 {이름}님의 피부에 눈부신 윤기를 선사합니다. 🌹",
        buttonText: "혜택가로 소장하기 🎁",
        highlightTag: "가격혜택",
        productId: "prod_sulhwasoo_first_care_essence_120ml_horse",
        reviewId: "rev_sul_lny_26",
        offer: { currentPriceText: "157,250원", discountRateText: "15%" },
    },
    {
        id: "t_p4_repurchase_cycle",
        personaId: "p4",
        triggerType: "REPURCHASE_CYCLE",
        triggerName: "재구매/관리 리마인드",
        messageTitle: "🗓️ 새해의 탄력을 채우는 가장 특별한 방법",
        messageBody:
            "{이름}님, 안티에이징 관리가 필요한 시기입니다. 🔍 이번엔 특별히 2026 말의 해 에디션으로 루틴을 업그레이드해 보시는 건 어떨까요? ✨ \"끈적임 없이 매끈한 결은 그대로, 대용량이라 더 든든해요\"라는 찬사! 한정 혜택가 157,250원 💝",
        buttonText: "새해 피부 관리 시작 🛒",
        highlightTag: "대용량기획",
        productId: "prod_sulhwasoo_first_care_essence_120ml_horse",
        reviewId: "rev_sul_lny_26",
        offer: { currentPriceText: "157,250원", discountRateText: "15%" },
    },
    {
        id: "t_p4_cross_sell",
        personaId: "p4",
        triggerType: "CROSS_SELL",
        triggerName: "연관 상품 추천",
        messageTitle: "🤝 새해 안티에이징, 말의 해 에디션으로 완성",
        messageBody:
            "복합성 피부의 결을 매끄럽게 다듬어줄 최고의 선택! 🌿 설화수 윤조에센스 6세대 120ml를 추천합니다. 🐎 한정판 에디션이 선사하는 특별한 에너지를 지금 구매 시 15% 할인(157,250원) 혜택과 함께 누려보세요. 💰✨",
        buttonText: "한정 혜택 받기 🎁",
        highlightTag: "품격있는선물",
        productId: "prod_sulhwasoo_first_care_essence_120ml_horse",
        reviewId: "rev_sul_lny_26",
        offer: { currentPriceText: "157,250원", discountRateText: "15%" },
    },

    // -------------------------
    // 페르소나5 (비레디)
    // -------------------------
    {
        id: "t_p5_cart_abandon",
        personaId: "p5",
        triggerType: "CART_ABANDON",
        triggerName: "장바구니 리마인드",
        messageTitle: "🚨 아직도 고민? 흔적 지우는 [시카페인 크림]",
        messageBody:
            "{이름}님, 트러블 자국 그대로 두실 건가요? 🤦‍♂️ 끈적임 없이 피부결 리셋해주는 비레디 1등 크림! 지금 사면 24,500원(30% 할인)입니다. 고민은 흔적만 남길 뿐! 🏃‍♂️💨",
        buttonText: "지금 바로 결제 🛒",
        highlightTag: "흔적삭제",
        productId: "prod_bready_caffeine_cream_70ml",
        reviewId: "rev_br_caff_01",
        offer: { currentPriceText: "24,500원", discountRateText: "30%" },
    },
    {
        id: "t_p5_wish_list_discount",
        personaId: "p5",
        triggerType: "WISH_LIST_DISCOUNT",
        triggerName: "찜 상품 혜택 안내",
        messageTitle: "📉 가격 털기! 시카페인 크림 드디어 할인",
        messageBody:
            "{이름}님이 찜한 비레디 시카페인 크림, 오늘 가격 좋습니다. 💸 30% 깎아서 24,500원. 트러블 흔적 고민, 가성비 있게 끝내시죠. 지금이 득템 타이밍입니다! ⚡️",
        buttonText: "최저가로 줍줍 🎁",
        highlightTag: "가격최고",
        productId: "prod_bready_caffeine_cream_70ml",
        reviewId: "rev_br_caff_01",
        offer: { currentPriceText: "24,500원", discountRateText: "30%" },
    },
    {
        id: "t_p5_repurchase_cycle",
        personaId: "p5",
        triggerType: "REPURCHASE_CYCLE",
        triggerName: "재구매 유도",
        messageTitle: "🧴 피부 리셋 멈추지 마세요. [시카페인] 리필!",
        messageBody:
            "흔적 관리 좀 되는 것 같은데 끊기면 아깝죠. ✨ 2주마다 재구매하는 남성 유저 속출 중! 🧤 {이름}님을 위한 재구매 혜택가 24,500원 적용됐습니다. 미리 챙기세요. 🤝",
        buttonText: "미리 쟁여두기 🛒",
        highlightTag: "재구매폭주",
        productId: "prod_bready_caffeine_cream_70ml",
        reviewId: "rev_br_caff_01",
        offer: { currentPriceText: "24,500원", discountRateText: "30%" },
    },
    {
        id: "t_p5_cross_sell",
        personaId: "p5",
        triggerType: "CROSS_SELL",
        triggerName: "연관 상품 추천", // ✅ 변경
        messageTitle: "🤝 트러블 졸업하고 싶으면 무조건 이거!",
        messageBody:
            "{이름}님, 세안 후 이거 하나만 발라도 피부가 달라집니다. 🌱 카페인 성분으로 붓기 빼고 시카로 진정까지! 🧤 딱 24,500원에 트러블 흔적 싹- 리셋하세요. 후회 없는 선택입니다. 💰",
        buttonText: "리셋하러 가기 ✨",
        highlightTag: "강력추천",
        productId: "prod_bready_caffeine_cream_70ml",
        reviewId: "rev_br_caff_01",
        offer: { currentPriceText: "24,500원", discountRateText: "30%" },
    },
];