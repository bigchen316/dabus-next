type DabaCatSpriteProps = {
  className?: string;
  label?: string;
};

/** 静态展示原素材第二格，不注册鼠标、键盘或动画事件。 */
export default function DabaCatSprite({
  className = "",
  label = "头顶小猫的大巴形象",
}: DabaCatSpriteProps) {
  return (
    <span className={`daba-cat-sprite${className ? ` ${className}` : ""}`} role="img" aria-label={label}>
      <svg className="daba-cat-sprite-svg" viewBox="0 0 144 177" aria-hidden="true" focusable="false">
        <image
          href="/avatars/daba-cat-bus-sheet.png"
          x="-144"
          y="0"
          width="576"
          height="177"
          preserveAspectRatio="none"
        />
      </svg>
    </span>
  );
}
