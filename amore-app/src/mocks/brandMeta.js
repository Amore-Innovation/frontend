export const BRAND_META = {
    sulhwasoo: { label: "설화수" },
    inisfree: { label: "이니스프리" },
    etude: { label: "에뛰드" },
    aestura: { label: "에스트라" },
    bready: { label: "비레디" },
};

export const getBrandLabel = (key) => BRAND_META[key]?.label ?? key;