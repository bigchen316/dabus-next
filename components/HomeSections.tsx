"use client";

import { Children, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type Section = { id: string; label: string };

export default function HomeSections({ sections, children }: { sections: Section[]; children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(sections[0].id);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0 });
  const nav = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = Children.toArray(children);

  useEffect(() => {
    const validId = (hash: string) => sections.find(section => `#${section.id}` === hash)?.id;
    const restore = () => {
      const next = validId(window.location.hash);
      if (next) setActive(next);
      else if (!window.location.hash) setActive(sections[0].id);
    };
    // The hero and navigation keep real links; activate the matching panel before their normal hash scroll.
    const followAnchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const next = validId(url.hash);
      if (next) setActive(next);
      else if (!url.hash) setActive(sections[0].id);
    };
    restore();
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    document.addEventListener("click", followAnchor, true);
    return () => {
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("popstate", restore);
      document.removeEventListener("click", followAnchor, true);
    };
  }, [sections]);

  useLayoutEffect(() => {
    let disposed = false;
    const update = () => {
      const button = buttons.current[sections.findIndex(section => section.id === active)];
      if (disposed || !nav.current || !button) return;
      if (document.activeElement?.getAttribute("role") === "tab" && document.activeElement !== button) {
        button.focus({ preventScroll: true });
      }
      const navRect = nav.current.getBoundingClientRect(), rect = button.getBoundingClientRect();
      const next = { left: rect.left - navRect.left, top: rect.bottom - navRect.top - 12, width: rect.width };
      setIndicator(previous => previous.left === next.left && previous.top === next.top && previous.width === next.width ? previous : next);
    };
    update();
    const observer = new ResizeObserver(update);
    if (nav.current) observer.observe(nav.current);
    buttons.current.forEach(button => { if (button) observer.observe(button); });
    document.fonts.ready.then(update);
    return () => { disposed = true; observer.disconnect(); };
  }, [active, sections]);

  function warm(id: string) {
    root.current?.querySelectorAll<HTMLImageElement>(`#home-panel-${id} img`).forEach(image => {
      if (!image.complete) { const preload = new Image(); preload.src = image.src; }
    });
  }
  function select(id: string) {
    warm(id);
    setActive(id);
    if (window.location.hash !== `#${id}`) router.push(`#${id}`, { scroll: false });
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % sections.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + sections.length) % sections.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sections.length - 1;
    else return;
    event.preventDefault();
    buttons.current[next]?.focus({ preventScroll: true });
    select(sections[next].id);
  }

  return <div className="home-content" ref={root}>
    {sections.map(section => <span key={section.id} id={section.id} className="home-section-anchor" aria-hidden="true" />)}
    <nav ref={nav} className="home-col home-tabs" role="tablist" aria-label="本页分区">
      <span className="home-tab-indicator" aria-hidden="true" style={{ width: indicator.width, transform: `translate(${indicator.left}px,${indicator.top}px)` }} />
      {sections.map((section, index) => <button key={section.id} ref={node => { buttons.current[index] = node; }} type="button"
        role="tab" id={`home-tab-${section.id}`} aria-selected={active === section.id} aria-controls={`home-panel-${section.id}`}
        tabIndex={active === section.id ? 0 : -1} onClick={() => select(section.id)} onKeyDown={event => keyDown(event, index)}
        onPointerEnter={() => warm(section.id)} onFocus={() => warm(section.id)}>{section.label}</button>)}
    </nav>
    <div className="home-panels">{sections.map((section, index) => <div key={section.id} id={`home-panel-${section.id}`}
      className="home-panel" role="tabpanel" tabIndex={0} aria-labelledby={`home-tab-${section.id}`} hidden={active !== section.id}>
      {panels[index]}
    </div>)}</div>
  </div>;
}
