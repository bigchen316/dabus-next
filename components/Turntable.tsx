"use client";
import { useEffect, useRef, useState } from "react";

// 首屏 3D 转盘：熬夜款 24 帧（每帧 15°），图片由 scripts/make-home-images.cjs 导出。
const FRAMES = 24;
const STEP_MS = 160; // 自动旋转约 3.8 秒一圈
const DRAG_PX = 12; // 拖动 12px 转一帧
const frameSrc = (i: number) => `/home/turntable-sleep/f_${String(i).padStart(2, "0")}.webp`;

export default function Turntable({ className = "" }: { className?: string }) {
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const drag = useRef<{ x: number; frame: number } | null>(null);
  const pausedUntil = useRef(0);

  // 先显示正面帧，其余帧在后台加载完再开始转。
  useEffect(() => {
    let loaded = 0;
    const imgs = Array.from({ length: FRAMES }, (_, i) => {
      const img = new Image();
      img.onload = img.onerror = () => { if (++loaded === FRAMES) setReady(true); };
      img.src = frameSrc(i);
      return img;
    });
    return () => imgs.forEach(img => { img.onload = img.onerror = null; });
  }, []);

  // 系统要求减少动态时不自动转，拖动仍然可用。
  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (drag.current || Date.now() < pausedUntil.current) return;
      setFrame(f => (f + 1) % FRAMES);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [ready]);

  const wrap = (n: number) => ((n % FRAMES) + FRAMES) % FRAMES;
  const release = () => { drag.current = null; pausedUntil.current = Date.now() + 1500; };

  return <div
    className={`turntable${className ? ` ${className}` : ""}`}
    role="img"
    aria-label="大巴熬夜款 3D 公仔：深蓝睡衣、眼罩、抱着枕头打哈欠，可拖动或用左右方向键旋转"
    tabIndex={0}
    onPointerDown={e => { drag.current = { x: e.clientX, frame }; e.currentTarget.setPointerCapture(e.pointerId); }}
    onPointerMove={e => { if (drag.current) setFrame(wrap(drag.current.frame - Math.round((e.clientX - drag.current.x) / DRAG_PX))); }}
    onPointerUp={release}
    onPointerCancel={release}
    onKeyDown={e => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      pausedUntil.current = Date.now() + 3000;
      setFrame(f => wrap(f + (e.key === "ArrowRight" ? 1 : -1)));
    }}
  >
    {(ready ? Array.from({ length: FRAMES }, (_, i) => i) : [0]).map(i =>
      <img key={i} src={frameSrc(i)} alt="" width={382} height={880} draggable={false}
        className={i === frame ? "is-active" : undefined}
        fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />)}
  </div>;
}
