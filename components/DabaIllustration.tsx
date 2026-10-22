import poses from "./daba-poses.json";

export type DabaPose = keyof typeof poses | "laptop";

export default function DabaIllustration({
  className = "",
  priority = false,
  pose = "wave",
}: { className?: string; priority?: boolean; pose?: DabaPose }) {
  const isSheet = pose !== "wave" && pose !== "laptop";
  const classNames = ["daba-illustration", className].filter(Boolean).join(" ");
  if (!isSheet) {
    const laptop = pose === "laptop";
    const png = laptop ? "/illustrations/daba-laptop-transparent.png" : "/illustrations/daba-wave-01.png";
    // WebP 体积约为 PNG 的 1/5～1/9，PNG 仅作不支持 WebP 时的回退。
    return <div className={classNames} data-pose={pose}>
      <picture>
        <source srcSet={png.replace(/\.png$/, ".webp")} type="image/webp" />
        <img src={png}
          alt={laptop ? "大巴坐在电脑前，认真实测 AI 和整理项目记录" : "大巴 IP 的第一个招手动作：黑发少年穿黑色服装，微笑挥手"}
          width={laptop ? 1536 : 1185} height={laptop ? 1024 : 1327}
          loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      </picture>
    </div>;
  }
  const frame = poses[pose as keyof typeof poses];
  const clipId = "daba-action-" + pose;
  return <div className={classNames} data-pose={pose} data-action-number={frame.number}>
    <svg viewBox={[frame.x, frame.y, frame.w, frame.h].join(" ")} role="img" aria-label={frame.label} focusable="false" preserveAspectRatio="xMidYMid meet">
      <defs><clipPath id={clipId}><rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} /></clipPath></defs>
      <image href="/illustrations/daba-ip-24-actions-transparent.webp"width="1536" height="1024" clipPath={"url(#" + clipId + ")"} />
    </svg>
  </div>;
}
