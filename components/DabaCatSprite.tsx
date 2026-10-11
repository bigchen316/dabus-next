"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

type DabaCatSpriteProps = {
  animated?: boolean;
  className?: string;
  label?: string;
};

type Mood = "sleeping" | "waking" | "awake";

/** 参考 Meet A 的交互逻辑：靠近唤醒、离开打盹、鼠标跟随、点击跳跃。 */
export default function DabaCatSprite({
  animated = false,
  className = "",
  label = "头顶小猫的大巴形象",
}: DabaCatSpriteProps) {
  const [mood, setMood] = useState<Mood>(animated ? "sleeping" : "awake");
  const [jumping, setJumping] = useState(false);
  const sleepTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(sleepTimer.current), []);

  const wake = () => {
    window.clearTimeout(sleepTimer.current);
    setMood((current) => (current === "awake" ? current : "waking"));
    window.setTimeout(() => setMood("awake"), 1100);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    event.currentTarget.style.setProperty("--follow-x", `${(x * 8).toFixed(1)}px`);
    event.currentTarget.style.setProperty("--follow-y", `${(y * 5).toFixed(1)}px`);
    event.currentTarget.style.setProperty("--follow-r", `${(x * 3).toFixed(1)}deg`);
    wake();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--follow-x", "0px");
    event.currentTarget.style.setProperty("--follow-y", "0px");
    event.currentTarget.style.setProperty("--follow-r", "0deg");
    window.clearTimeout(sleepTimer.current);
    sleepTimer.current = window.setTimeout(() => setMood("sleeping"), 2200);
  };

  const handleJump = () => {
    wake();
    setJumping(false);
    requestAnimationFrame(() => setJumping(true));
    window.setTimeout(() => setJumping(false), 720);
  };

  return (
    <button
      type="button"
      className={`daba-cat-sprite is-${mood}${jumping ? " is-jumping" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${label}，鼠标靠近会醒来，点击会跳一下`}
      onPointerEnter={wake}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={wake}
      onClick={handleJump}
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
