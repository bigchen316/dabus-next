type DabaCatSpriteProps = {
  animated?: boolean;
  className?: string;
  label?: string;
};

/**
 * 四格小巴素材的轻量逐帧角色：保留原图笔触，不引入视频或复杂运行时。
 * 只取前三格，避开原素材右下角的水印区域。
 */
export default function DabaCatSprite({
  animated = false,
  className = "",
  label = "头顶小猫的大巴形象",
}: DabaCatSpriteProps) {
  return (
    <span
      className={`daba-cat-sprite${animated ? " is-animated" : ""}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={label}
    >
      <span className="daba-cat-sprite-frame" aria-hidden="true" />
    </span>
  );
}
