"use client";

import { useState } from "react";

type DabaCatSpriteProps = {
  animated?: boolean;
  className?: string;
  label?: string;
};

/** 四帧手绘素材：睡着 → 耳朵抖动 → 半醒 → 睁眼。点击角色会跳一下。 */
export default function DabaCatSprite({
  animated = false,
  className = "",
  label = "头顶小猫的大巴形象",
}: DabaCatSpriteProps) {
  const [jumping, setJumping] = useState(false);

  return (
    <button
      type="button"
      className={`daba-cat-sprite${animated ? " is-animated" : ""}${jumping ? " is-jumping" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${label}，点击让角色跳一下`}
      onClick={() => {
        setJumping(false);
        requestAnimationFrame(() => setJumping(true));
        window.setTimeout(() => setJumping(false), 700);
      }}
    >
      <img
        className="daba-cat-sprite-sheet"
        src="/avatars/daba-cat-bus-sheet.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </button>
  );
}
