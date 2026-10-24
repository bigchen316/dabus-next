"use client";

import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import frameCenters from "./home-turntable-centers.json";

const FRAME_COUNT = frameCenters.length;
const wrap = (frame: number) => (frame % FRAME_COUNT + FRAME_COUNT) % FRAME_COUNT;

export default function HomeTurntable() {
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const sprite = useRef<HTMLImageElement>(null);
  const drag = useRef<{ id: number; x: number; frame: number } | null>(null);
  const [centerX, centerY] = frameCenters[frame];
  // Keep each rendered silhouette on the same center instead of orbiting in its cell.
  const spriteLeft = -(frame % 6 * 200 + (centerX - 140) / 280 * 100);
  const spriteTop = -(Math.floor(frame / 6) * 100 + (centerY - 280) / 560 * 100);

  useEffect(() => {
    // The image may finish loading before hydration, especially on a cached visit.
    if (sprite.current?.complete && sprite.current.naturalWidth > 0) setReady(true);
  }, []);

  function start(event: PointerEvent<HTMLDivElement>) {
    if (!ready || event.button !== 0 || drag.current) return;
    drag.current = { id: event.pointerId, x: event.clientX, frame };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const active = drag.current;
    if (!active || active.id !== event.pointerId) return;
    setFrame(wrap(active.frame + Math.round((event.clientX - active.x) / 12)));
  }

  function stop(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!ready) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") setFrame(0);
    else if (event.key === "End") setFrame(FRAME_COUNT - 1);
    else setFrame(value => wrap(value + (event.key === "ArrowRight" ? 1 : -1)));
  }

  return <div className="home-figure home-turntable">
    <div className={`home-model${dragging ? " is-dragging" : ""}`} role="slider"
      aria-label="基础款大巴的旋转角度" aria-describedby="home-model-hint"
      aria-valuemin={0} aria-valuemax={345} aria-valuenow={frame * 15}
      aria-valuetext={`${frame * 15} 度${frame === 0 ? "，正面" : ""}`}
      aria-disabled={!ready} tabIndex={ready ? 0 : -1}
      onPointerDown={start} onPointerMove={move} onPointerUp={stop}
      onPointerCancel={stop} onLostPointerCapture={stop} onKeyDown={keyDown}>
      <img className="home-model-poster" src="/home/base-front.webp" alt="基础款大巴：黑色运动套装、胸前黄色 W 和黄白运动鞋" width={280} height={560} fetchPriority="high" draggable={false} style={{ visibility: ready ? "hidden" : "visible" }} />
      <img ref={sprite} className="home-model-sprite" src="/home/base-turntable.webp" alt="" width={3360} height={2240}
        draggable={false} decoding="async" onLoad={() => setReady(true)} onError={() => { setReady(false); setFrame(0); }}
        style={{ opacity: ready ? 1 : 0, left: `${spriteLeft}%`, top: `${spriteTop}%` }} />
    </div>
    <div className="home-model-controls">
      <button type="button" aria-label="向左旋转基础款大巴" disabled={!ready} onClick={() => setFrame(value => wrap(value - 1))}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg>
      </button>
      <span id="home-model-hint">{ready ? "拖动旋转 · 360°" : "基础款大巴"}</span>
      <button type="button" aria-label="向右旋转基础款大巴" disabled={!ready} onClick={() => setFrame(value => wrap(value + 1))}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
      </button>
    </div>
  </div>;
}
