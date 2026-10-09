"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BlackCat from "./BlackCat";

/**
 * 页面内常驻的夜行路线：小巴从 A 站驶向 C 站，IP 在终点下车并戴上头套。
 * 设计提案页不套用，避免干扰方向比较。
 */
export default function ArrivalTransition() {
  const pathname = usePathname() || "/";
  const [isArrived, setIsArrived] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsArrived(false);
    setIsHidden(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsArrived(true);
      return;
    }

    const timer = window.setTimeout(() => setIsArrived(true), 12000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (pathname.startsWith("/design-options")) return null;

  if (isHidden) {
    return (
      <button className="journey-peek" type="button" onClick={() => setIsHidden(false)}>
        <span aria-hidden="true">●</span> 显示路线
      </button>
    );
  }

  return (
    <aside
      className={`route-journey${isArrived ? " is-arrived" : ""}`}
      role="status"
      aria-label={isArrived ? "大巴已到站，IP 已戴上头套" : "大巴正在沿路线行驶"}
    >
      <div className="journey-card">
        <div className="journey-topline">
          <div>
            <span className="journey-kicker">DA BA NIGHT BUS / LIVE ROUTE</span>
            <strong>{isArrived ? "到站了，戴上头套。" : "跟着我，慢慢开。"}</strong>
          </div>
          <button className="journey-hide" type="button" onClick={() => setIsHidden(true)} aria-label="收起路线">
            ×
          </button>
        </div>

        <div className="journey-track" aria-hidden="true">
          <span className="journey-stop journey-stop--a"><b>A</b><small>始发</small></span>
          <span className="journey-stop journey-stop--b"><b>B</b><small>途中</small></span>
          <span className="journey-stop journey-stop--c"><b>C</b><small>到站</small></span>
          <div className="journey-vehicle">
            <div className="journey-cat"><BlackCat isArrived={isArrived} /></div>
            <div className="journey-mini-bus">
              <div className="journey-mini-top"><span>DA BA</span><b>夜行 01</b></div>
              <div className="journey-mini-window"><img src="/avatars/daba-headphones-listening.png" alt="" /></div>
              <div className="journey-mini-body">
                <span className="journey-mini-headlight" />
                <span className="journey-mini-door"><i /><i /><i /></span>
                <span className="journey-mini-line" />
              </div>
              <span className="journey-mini-wheel journey-mini-wheel--one" />
              <span className="journey-mini-wheel journey-mini-wheel--two" />
            </div>
            <div className="journey-driver">
              <img src="/avatars/daba-headphones-wave.png" alt="" />
              <span>戴上头套</span>
            </div>
          </div>
        </div>

        <div className="journey-footer">
          <span>司机：大巴 IP</span>
          <span>{isArrived ? "STOP C / ARRIVED" : "A → B → C / MOVING"}</span>
        </div>
      </div>
    </aside>
  );
}
