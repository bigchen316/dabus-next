"use client";

import { useEffect, useState } from "react";
import DabaCatSprite from "./DabaCatSprite";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isJumping, setIsJumping] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsJumping(false);
      return;
    }

    const timer = window.setTimeout(() => setIsJumping(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition${isJumping ? " page-transition--jumping" : ""}`}>
      {children}
      <div className="page-jump-layer" aria-hidden="true">
        <DabaCatSprite animated className="page-jump-sprite" label="" />
      </div>
    </div>
  );
}
