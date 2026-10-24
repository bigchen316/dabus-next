"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeCard } from "./HomeProjectCard";

export default function HomeBlindboxCard({ card }: { card: HomeCard }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(440);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "dabus:blindbox-size") return;
      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight) && nextHeight > 200 && nextHeight < 1200) setHeight(nextHeight + 2);
    };
    window.addEventListener("message", resize);
    frame.current?.contentWindow?.postMessage({ type: "dabus:blindbox-measure" }, location.origin);
    return () => window.removeEventListener("message", resize);
  }, []);

  return <article className="home-card home-project-card home-blindbox-card">
    <div className="home-card-head"><h3>{card.title}</h3></div>
    {card.tag && <span className="home-project-tag">{card.tag}</span>}
    <p>{card.description}</p>
    <div className="home-blindbox-stage" aria-busy={!ready} style={{ minHeight: height }}>
      {!ready && <p className="home-blindbox-loading" role="status">开盒内容载入中…</p>}
      <iframe ref={frame} title="大巴赛博盲盒，直接开盒并收集公仔" src={`${card.url}?embed=card`} loading="lazy" height={height} onLoad={() => { setReady(true); frame.current?.contentWindow?.postMessage({ type: "dabus:blindbox-measure" }, location.origin); }} className={ready ? "is-ready" : ""} />
    </div>
    <a className="home-project-action" href={card.url}>放大开盒 ↗</a>
    <noscript><a href={card.url}>打开完整开盒网页 →</a></noscript>
  </article>;
}
