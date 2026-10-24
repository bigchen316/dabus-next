"use client";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import metadata from "../public/home/turntable-base/metadata.json";

// 帧和尺寸统一来自 make-home-images.cjs；生成阶段已将人物中心对齐。
const FRAMES = metadata.frames;
const frameSrc = (i: number) => `/home/turntable-base/f_${String(i).padStart(2, "0")}.webp`;
const wrap = (n: number) => (n % FRAMES + FRAMES) % FRAMES;

export default function Turntable({ className = "" }: { className?: string }) {
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [dragging, setDragging] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; frame: number } | null>(null);
  const playing = ready && autoRotate && !reducedMotion;
  const angle = Math.round(frame * 360 / FRAMES);

  useEffect(() => {
    let pending = FRAMES, failed = false, disposed = false;
    const images = Array.from({ length: FRAMES }, (_, i) => {
      const image = new Image();
      const complete = () => { if (--pending === 0 && !disposed && !failed) setReady(true); };
      image.onload = complete;
      image.onerror = () => { failed = true; complete(); };
      image.src = frameSrc(i);
      return image;
    });
    return () => { disposed = true; images.forEach(image => { image.onload = image.onerror = null; }); };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReducedMotion(media.matches);
    const visibility = () => setPageVisible(!document.hidden);
    motion(); visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    if (container.current) observer.observe(container.current);
    return () => { media.removeEventListener("change", motion); document.removeEventListener("visibilitychange", visibility); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!playing || !inView || !pageVisible) return;
    const id = window.setInterval(() => { if (!drag.current) setFrame(value => wrap(value + 1)); }, 160);
    return () => window.clearInterval(id);
  }, [playing, inView, pageVisible]);

  function step(delta: number) { setAutoRotate(false); setFrame(value => wrap(value + delta)); }
  function start(event: PointerEvent<HTMLDivElement>) {
    if (!ready || event.button !== 0 || drag.current) return;
    setAutoRotate(false); setDragging(true);
    drag.current = { id: event.pointerId, x: event.clientX, frame };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const active = drag.current;
    if (active?.id === event.pointerId) setFrame(wrap(active.frame - Math.round((event.clientX - active.x) / 12)));
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null; setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!ready || event.altKey || event.ctrlKey || event.metaKey || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault(); setAutoRotate(false);
    if (event.key === "Home") setFrame(0);
    else if (event.key === "End") setFrame(FRAMES - 1);
    else step(event.key === "ArrowRight" ? 1 : -1);
  }

  return <div ref={container} className={`turntable${className ? ` ${className}` : ""}`} data-playing={playing && inView && pageVisible}>
    <div className={`turntable-viewport${dragging ? " is-dragging" : ""}`} role="slider"
      aria-label="基础款大巴的旋转角度" aria-describedby="turntable-help" aria-disabled={!ready}
      aria-valuemin={0} aria-valuemax={Math.round((FRAMES - 1) * 360 / FRAMES)} aria-valuenow={angle}
      aria-valuetext={`${angle} 度${frame === 0 ? "，正面" : ""}`} tabIndex={ready ? 0 : -1}
      onFocus={() => setAutoRotate(false)} onPointerDown={start} onPointerMove={move}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onKeyDown={keyDown}>
      {(ready ? Array.from({ length: FRAMES }, (_, i) => i) : [0]).map(i =>
        <img key={i} src={frameSrc(i)} alt="" width={metadata.width} height={metadata.height} draggable={false}
          className={i === frame ? "is-active" : undefined} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />)}
    </div>
    <span className="turntable-help" id="turntable-help">拖动或用左右方向键旋转，Home 键回到正面。</span>
    <div className="turntable-controls">
      <button type="button" aria-label="向左旋转基础款大巴" disabled={!ready} onClick={() => step(-1)}><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg></button>
      <button className="turntable-play" type="button" aria-label={reducedMotion ? "已按系统设置关闭自动旋转" : autoRotate ? "暂停自动旋转" : "开始自动旋转"} disabled={!ready || reducedMotion} onClick={() => setAutoRotate(value => !value)}>{reducedMotion ? "手动旋转" : autoRotate ? "暂停旋转" : "自动旋转"}</button>
      <button type="button" aria-label="向右旋转基础款大巴" disabled={!ready} onClick={() => step(1)}><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></button>
    </div>
  </div>;
}
