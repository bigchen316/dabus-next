/**
 * 大巴 IP 形象 · 内联 SVG 组件
 * 来源：画布「大巴IP形象_头像设计」极简版（无站牌 · 双手自然下垂 · 炭黑/深林绿/交通黄）
 * 好处：矢量内联，任意缩放不糊，无需图片资源
 */
export default function DabaAvatar({
  variant = "bust",
}: {
  variant?: "bust" | "full";
}) {
  if (variant === "full") {
    return (
      <svg
        viewBox="0 0 360 520"
        role="img"
        aria-label="大巴 IP 形象全身像"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <g stroke="#161616" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
          <circle cx="120" cy="214" r="14" />
          <circle cx="240" cy="214" r="14" />
          <rect x="90" y="40" width="180" height="172" rx="36" />
          <path d="M160 40 q-3 -14 8 -16" strokeWidth="4" fill="none" />
          <path d="M196 40 q6 -12 14 -6" strokeWidth="4" fill="none" />
          <rect x="132" y="58" width="96" height="18" rx="8" strokeWidth="3.5" fill="#FFC400" />
          <path d="M90 104 q-13 -2 -17 7" strokeWidth="4" fill="none" />
          <rect x="58" y="106" width="18" height="22" rx="8" strokeWidth="4" />
          <path d="M270 104 q13 -2 17 7" strokeWidth="4" fill="none" />
          <rect x="284" y="106" width="18" height="22" rx="8" strokeWidth="4" />
          <rect x="110" y="94" width="140" height="82" rx="20" strokeWidth="4" />
          <circle cx="152" cy="130" r="18" strokeWidth="4" />
          <circle cx="208" cy="130" r="18" strokeWidth="4" />
          <path d="M170 130 q10 -6 20 0" strokeWidth="4" fill="none" />
          <path d="M134 129 L114 125" strokeWidth="4" />
          <path d="M226 129 L246 125" strokeWidth="4" />
          <circle cx="155" cy="133" r="3.4" fill="#161616" stroke="none" />
          <circle cx="211" cy="133" r="3.4" fill="#161616" stroke="none" />
          <path d="M166 160 q14 10 28 0" strokeWidth="4" fill="none" />
          <path d="M128 234 q52 16 104 0 l22 60 -22 6 6 52 q-58 12 -116 0 l6 -52 -22 -6 z" fill="#161616" />
          <path d="M128 262 q-32 16 -36 66" fill="none" />
          <circle cx="90" cy="336" r="7" strokeWidth="4" />
          <path d="M234 262 q32 16 36 66" fill="none" />
          <circle cx="272" cy="336" r="7" strokeWidth="4" />
          <path d="M152 362 q-4 54 -10 104" fill="none" />
          <path d="M206 362 q6 54 12 102" fill="none" />
          <path d="M130 466 q-14 6 -10 14 q4 8 16 6 q13 -2 17 -10 q2 -8 -8 -9 q-9 -2 -15 -1 z" strokeWidth="4" fill="#12734A" />
          <path d="M206 464 q-4 8 2 13 q6 6 17 4 q13 -2 13 -11 q0 -8 -11 -8 q-13 0 -21 2 z" strokeWidth="4" fill="#12734A" />
        </g>
      </svg>
    );
  }

  // bust：方形头像构图（社交头像 / Hero 用）
  return (
    <svg
      viewBox="0 0 300 300"
      role="img"
      aria-label="大巴 IP 形象头像"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <g stroke="#161616" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
        <rect x="52" y="24" width="196" height="192" rx="42" />
        <path d="M124 24 q-3 -14 8 -16" strokeWidth="4" fill="none" />
        <path d="M164 24 q6 -12 14 -6" strokeWidth="4" fill="none" />
        <rect x="100" y="44" width="100" height="18" rx="8" strokeWidth="3.5" fill="#FFC400" />
        <path d="M52 96 q-13 -2 -17 7" strokeWidth="4" fill="none" />
        <rect x="20" y="98" width="18" height="22" rx="8" strokeWidth="4" />
        <path d="M248 96 q13 -2 17 7" strokeWidth="4" fill="none" />
        <rect x="262" y="98" width="18" height="22" rx="8" strokeWidth="4" />
        <rect x="70" y="86" width="160" height="90" rx="20" strokeWidth="4" />
        <circle cx="121" cy="128" r="20" strokeWidth="4" />
        <circle cx="179" cy="128" r="20" strokeWidth="4" />
        <path d="M142 128 q8 -6 16 0" strokeWidth="4" fill="none" />
        <path d="M101 127 L81 123" strokeWidth="4" />
        <path d="M199 127 L219 123" strokeWidth="4" />
        <circle cx="124" cy="131" r="3.6" fill="#161616" stroke="none" />
        <circle cx="182" cy="131" r="3.6" fill="#161616" stroke="none" />
        <path d="M138 166 q14 10 28 0" strokeWidth="4" fill="none" />
        <path d="M30 300 C52 185 248 185 270 300 Z" fill="#161616" />
      </g>
    </svg>
  );
}
