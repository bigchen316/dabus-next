"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * 夜行大巴到站转场：大巴驶入、刹停、开门，IP 下车后把页面交给访客。
 * 设计提案页不套用这段品牌转场，避免干扰方向比较。
 */
export default function ArrivalTransition() {
  const pathname = usePathname() || "/";
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsLeaving(true);
      return;
    }

    const timer = window.setTimeout(() => setIsLeaving(true), 2550);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (pathname.startsWith("/design-options")) return null;

  return (
    <div className={`arrival-transition${isLeaving ? " is-leaving" : ""}`} role="status" aria-label="大巴正在到站">
      <div className="arrival-sky" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="arrival-copy">
        <span>DA BA NIGHT BUS / ARRIVAL</span>
        <strong>下一站，<em>到了。</em></strong>
        <small>欢迎下车，慢慢看。</small>
      </div>
      <div className="arrival-route" aria-hidden="true">
        <span className="arrival-route-stop">A</span><i /><span className="arrival-route-stop">B</span><i /><span className="arrival-route-stop is-current">C</span>
      </div>
      <div className="arrival-road" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="arrival-bus" aria-hidden="true">
        <div className="arrival-bus-top"><span>DA BA</span><b>夜行 01</b></div>
        <div className="arrival-bus-window"><img src="/avatars/daba-headphones-listening.png" alt="" /></div>
        <div className="arrival-bus-body"><span className="arrival-headlight" /><span className="arrival-door"><i /><i /><i /></span><span className="arrival-bus-line" /></div>
        <span className="arrival-wheel arrival-wheel--one" /><span className="arrival-wheel arrival-wheel--two" />
        <span className="arrival-bus-light" />
      </div>
      <div className="arrival-walker" aria-hidden="true"><img src="/avatars/daba-headphones-wave.png" alt="" /><span>到站了</span></div>
      <button className="arrival-skip" type="button" onClick={() => setIsLeaving(true)}>跳过到站动画 ↗</button>
    </div>
  );
}
