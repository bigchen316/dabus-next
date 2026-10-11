"use client";

import { FocusEvent, PointerEvent, useEffect, useRef, useState } from "react";

type DabaCatSpriteProps = {
  animated?: boolean;
  className?: string;
  label?: string;
};

type Mood = "sleeping" | "waking" | "awake";

/**
 * 大巴角色的轻量状态机：SVG 舞台承载现有手绘角色，代码只负责状态和运动。
 * 参考 Meet A 的交互节奏：闲置打盹、靠近唤醒、跟随指针、点击起跳。
 */
export default function DabaCatSprite({
  animated = false,
  className = "",
  label = "头顶小猫的大巴形象",
}: DabaCatSpriteProps) {
  const [mood, setMood] = useState<Mood>(animated ? "sleeping" : "awake");
  const [jumping, setJumping] = useState(false);
  const moodRef = useRef<Mood>(animated ? "sleeping" : "awake");
  const sleepTimer = useRef<number | undefined>(undefined);
  const wakeTimer = useRef<number | undefined>(undefined);
  const jumpTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      window.clearTimeout(sleepTimer.current);
      window.clearTimeout(wakeTimer.current);
      window.clearTimeout(jumpTimer.current);
    };
  }, []);

  const setMoodValue = (nextMood: Mood) => {
    moodRef.current = nextMood;
    setMood(nextMood);
  };

  const wake = () => {
    window.clearTimeout(sleepTimer.current);
    if (moodRef.current === "sleeping") {
      window.clearTimeout(wakeTimer.current);
      setMoodValue("waking");
      wakeTimer.current = window.setTimeout(() => setMoodValue("awake"), 1100);
    }
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

  const scheduleSleep = (button: HTMLButtonElement) => {
    button.style.setProperty("--follow-x", "0px");
    button.style.setProperty("--follow-y", "0px");
    button.style.setProperty("--follow-r", "0deg");
    window.clearTimeout(sleepTimer.current);
    sleepTimer.current = window.setTimeout(() => setMoodValue("sleeping"), 2200);
  };

  const settleToSleep = (event: PointerEvent<HTMLButtonElement>) => {
    scheduleSleep(event.currentTarget);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    scheduleSleep(event.currentTarget);
  };

  const handleJump = () => {
    wake();
    window.clearTimeout(jumpTimer.current);
    setJumping(false);
    requestAnimationFrame(() => setJumping(true));
    jumpTimer.current = window.setTimeout(() => setJumping(false), 720);
  };

  return (
    <button
      type="button"
      className={`daba-cat-sprite is-${mood}${jumping ? " is-jumping" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${label}，鼠标靠近会醒来，点击会跳一下`}
      onPointerEnter={wake}
      onPointerMove={handlePointerMove}
      onPointerLeave={settleToSleep}
      onFocus={wake}
      onBlur={handleBlur}
      onClick={handleJump}
    >
      <svg
        className="daba-cat-sprite-svg"
        viewBox="0 0 144 177"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <g className="daba-cat-sprite-sheet" aria-hidden="true">
          <image
            href="/avatars/daba-cat-bus-sheet.png"
            x="0"
            y="0"
            width="576"
            height="177"
            preserveAspectRatio="none"
          />
        </g>
        <g className="daba-cat-sprite-ink" aria-hidden="true">
          <path className="daba-cat-sprite-breath" d="M30 166 C58 171 91 171 116 165" />
          <path className="daba-cat-sprite-spark" d="M120 34 l6 -5 M125 42 l8 -1" />
          <text className="daba-cat-sprite-z" x="111" y="26">z</text>
          <text className="daba-cat-sprite-z daba-cat-sprite-z--two" x="123" y="16">z</text>
        </g>
      </svg>
    </button>
  );
}
