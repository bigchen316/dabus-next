import Link from "next/link";

type ConceptKey = "station" | "editorial" | "signal";

const concepts: Record<ConceptKey, { name: string; english: string }> = {
  station: { name: "硬派站牌", english: "BOLD BUS STOP" },
  editorial: { name: "公路编辑部", english: "ROAD JOURNAL" },
  signal: { name: "夜间信号台", english: "NIGHT SIGNAL" },
};

function SwitchLinks({ current }: { current: ConceptKey }) {
  const alternate = (Object.keys(concepts) as ConceptKey[]).filter((key) => key !== current);
  return (
    <div className="concept-other-options">
      {alternate.map((key) => (
        <Link key={key} href={`/design-options/${key}/`}>
          再看：{concepts[key].name} ↗
        </Link>
      ))}
    </div>
  );
}

function StationConcept() {
  return (
    <main className="concept concept--station station-study">
      <header className="station-header">
        <Link className="station-brand" href="/design-options/"><span className="station-brand-mark">大</span><span>大巴Bus <small>ROUTE CONTROL</small></span></Link>
        <span className="station-live"><i /> LIVE ROUTE / 01</span>
        <Link className="station-switch" href="/design-options/">三版方案 ↗</Link>
      </header>

      <section className="station-hero" id="top">
        <div className="station-rail" aria-hidden="true"><span>ROUTE<br />01</span><i /><b>DA BA<br />BUS</b><i /><span>ON<br />BOARD</span></div>
        <div className="station-hero-copy"><span className="station-kicker">BOLD BUS STOP · PERSONAL SITE</span><h1>把复杂的<br /><em>讲成人话。</em></h1><p>一辆开在内容公路上的大巴车，分享 AI 工具、效率折腾和动漫日常。</p><div className="station-actions"><a className="station-button" href="#routes">查看三条线路 <span>↓</span></a><Link className="station-link" href="/about/">认识司机 ↗</Link></div></div>
        <div className="station-hero-stage"><span className="station-stage-label">DRIVER / NO.001</span><div className="station-art-window"><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /></div><span className="station-stage-note">本人驾驶<br />安心上车</span></div>
      </section>

      <section className="station-routes" id="routes"><div className="station-board-head"><span className="station-kicker">DEPARTURE BOARD / 三条线路</span><h2>现在发往哪里？</h2><p>每条线路都从真实体验出发，按内容准备好再发车。</p></div><div className="station-board-list">
        <article className="station-board-row station-board-row--yellow"><span className="station-board-no">A01</span><div><small>AI TOOLS</small><h3>AI 工具实测</h3></div><p>亲手试过再说：能干嘛、怎么上手、值不值得。</p><b>整理中 →</b></article>
        <article className="station-board-row station-board-row--green"><span className="station-board-no">B02</span><div><small>WORKFLOW</small><h3>效率折腾手册</h3></div><p>把重复劳动交给 AI，把时间还给生活。</p><b>上班族视角 →</b></article>
        <article className="station-board-row station-board-row--ink"><span className="station-board-no">C03</span><div><small>ANIME SEAT</small><h3>动漫副驾频道</h3></div><p>下班路上的追番碎碎念和冷门安利。</p><b>随缘发车 →</b></article>
      </div></section>

      <section className="station-broadcast" id="story"><div className="station-broadcast-number">NEXT<br />STOP</div><div><span className="station-kicker">到站广播 / DRIVER'S NOTE</span><h2>AI 工具实测现场。</h2><p>不讲玄学，只把普通人用得上的工具拆成清楚、可跟着做的步骤。</p></div><Link className="station-button station-button--dark" href="/articles/workbuddy-vs-codex/">先读一篇实测 ↗</Link></section>

      <section className="station-feature" id="article"><div className="station-feature-ticket"><span>FIRST REVIEW</span><b>01</b><i>2026.09</i></div><div><span className="station-kicker">PROJECT NOTES</span><h2>同一个个人站，<br />两轮 AI 协作。</h2><p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录一次真实改版。</p><Link className="station-link" href="/articles/workbuddy-vs-codex/">查看改版复盘 →</Link></div></section>

      <footer className="station-footer"><Link className="station-brand" href="/"><span className="station-brand-mark">大</span><span>大巴Bus <small>慢慢开，站站停</small></span></Link><Link href="/contact/">乘车指南 →</Link><SwitchLinks current="station" /></footer>
    </main>
  );
}

function EditorialConcept() {
  return (
    <main className="concept concept--editorial editorial-study">
      <header className="concept-nav"><Link className="concept-brand" href="/design-options/"><span className="concept-brand-mark">大</span><span>大巴Bus <small>DESIGN STUDY / 02</small></span></Link><nav aria-label="方案预览导航"><a href="#routes">运营线路</a><a href="#story">司机档案</a><a href="#article">首篇实测</a></nav><Link className="concept-nav-cta" href="/design-options/">三版方案 ↗</Link></header>

      <section className="concept-hero editorial-study-hero" id="top"><div className="concept-hero-copy"><span className="concept-kicker">ROAD JOURNAL · ISSUE 01</span><h1>把复杂的<br /><em>讲成人话。</em></h1><p>我是大巴，一个分享 AI 工具的普通上班族。白天上班攒素材，下班把好用的、好玩的讲清楚。</p><div className="concept-actions"><a className="concept-button" href="#article">先看我的实测 <span>↘</span></a><a className="concept-text-link" href="#routes">看看这趟车跑哪几站</a></div></div><div className="concept-hero-art"><div className="concept-art-frame"><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /></div><span className="concept-art-sticker">本人驾驶<br />安心上车</span><span className="concept-art-caption">DRIVER · DA BA / 2026</span></div><span className="concept-hero-index">ISSUE 01 — 03</span></section>

      <section className="concept-routes" id="routes"><div className="concept-section-head"><span className="concept-kicker">THREE ROUTES / 三条线路</span><h2>这趟车，<br />固定跑三条线。</h2><p>每一站都讲实际体验，不绕路。</p></div><div className="concept-route-grid"><article className="concept-route-card"><span className="concept-route-no">A</span><span className="concept-route-label">AI TOOLS</span><h3>AI 工具实测</h3><p>亲手试过再说：能干嘛、怎么上手、值不值得。</p><span className="concept-route-status"><i /> 正在整理首篇实测</span></article><article className="concept-route-card"><span className="concept-route-no">B</span><span className="concept-route-label">WORKFLOW</span><h3>效率折腾手册</h3><p>把重复劳动交给 AI，把时间还给生活。</p><span className="concept-route-status"><i /> 上班族视角</span></article><article className="concept-route-card"><span className="concept-route-no">C</span><span className="concept-route-label">ANIME SEAT</span><h3>动漫副驾频道</h3><p>下班路上的追番碎碎念和冷门安利。</p><span className="concept-route-status"><i /> 随缘发车</span></article></div></section>

      <section className="concept-broadcast" id="story"><div className="concept-broadcast-sign"><span>NEXT STOP</span><b>下一站</b><i>→</i></div><div><span className="concept-kicker">DRIVER'S NOTE</span><h2>AI 工具实测现场。</h2><p>我不是来讲玄学的。只想把普通人用得上的工具，拆成清楚、可跟着做的步骤。</p></div><Link href="/about/">认识司机 <span>↗</span></Link></section>

      <section className="concept-feature" id="article"><div className="concept-feature-number">FIRST<br />REVIEW</div><div className="concept-feature-copy"><span className="concept-kicker">PROJECT NOTES · 2026.09</span><h2>同一个个人站，<br />两轮 AI 协作。</h2><p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录这次真实改版。</p><Link className="concept-button" href="/articles/workbuddy-vs-codex/">读这篇改版复盘 ↗</Link></div><div className="concept-feature-aside"><span>01</span><span>真实项目<br />持续更新</span></div></section>

      <footer className="concept-footer"><Link className="concept-brand" href="/"><span className="concept-brand-mark">大</span><span>大巴Bus <small>慢慢开，站站停</small></span></Link><div className="concept-footer-links"><Link href="/contact/">乘车指南</Link><a href="mailto:wangc98316@gmail.com">发邮件聊聊</a></div><SwitchLinks current="editorial" /></footer>
    </main>
  );
}

function SignalConcept() {
  return (
    <main className="concept concept--signal signal-study">
      <header className="signal-header"><Link className="signal-brand" href="/design-options/"><span className="signal-brand-mark">大</span><span>大巴Bus <small>NIGHT SIGNAL / 03</small></span></Link><span className="signal-system"><i /> SYSTEM ONLINE · 2026</span><Link className="signal-menu" href="/design-options/">COMPARE ↗</Link></header>

      <section className="signal-hero" id="top"><div className="signal-hero-copy"><span className="signal-kicker">INPUT / PERSONAL CHANNEL</span><h1>让工具<br /><em>先跑起来。</em></h1><p>AI 工具、效率流程和动漫日常。把试过的东西留下，把复杂的部分拆掉。</p><div className="signal-actions"><a href="#routes" className="signal-action signal-action--primary">进入频道 <span>→</span></a><Link href="/contact/" className="signal-action">联系司机 ↗</Link></div></div><aside className="signal-monitor"><div className="signal-monitor-head"><span>DRIVER_FEED</span><b>LIVE</b></div><div className="signal-monitor-screen"><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /><span className="signal-crosshair signal-crosshair--one" /><span className="signal-crosshair signal-crosshair--two" /></div><dl><div><dt>ROLE</dt><dd>普通上班族</dd></div><div><dt>FOCUS</dt><dd>AI / WORKFLOW</dd></div><div><dt>STATUS</dt><dd><i /> 正在发车</dd></div></dl></aside></section>

      <section className="signal-routes" id="routes"><div className="signal-section-bar"><span className="signal-kicker">CHANNELS / 03</span><h2>正在监听的频道</h2><span className="signal-section-code">A—C / OPEN</span></div><div className="signal-route-list"><article><span className="signal-route-code">CH.A</span><div><h3>AI 工具实测</h3><p>亲手试过再说：能干嘛、怎么上手、值不值得。</p></div><span className="signal-route-meter"><i style={{ width: "68%" }} /></span><b>ACTIVE</b></article><article><span className="signal-route-code">CH.B</span><div><h3>效率折腾手册</h3><p>把重复劳动交给 AI，把时间还给生活。</p></div><span className="signal-route-meter"><i style={{ width: "42%" }} /></span><b>RUNNING</b></article><article><span className="signal-route-code">CH.C</span><div><h3>动漫副驾频道</h3><p>下班路上的追番碎碎念和冷门安利。</p></div><span className="signal-route-meter"><i style={{ width: "23%" }} /></span><b>STANDBY</b></article></div></section>

      <section className="signal-story" id="story"><div className="signal-story-copy"><span className="signal-kicker">PROCESS LOG / 001</span><h2>不讲玄学，<br />只留可执行的信号。</h2><p>我把工具放进真实工作流里跑一遍，再告诉你它适不适合普通人的一天。</p><Link href="/about/" className="signal-action">打开司机档案 ↗</Link></div><div className="signal-log"><p><i>09:12:04</i><span>INPUT</span>收到一个新工具</p><p><i>09:18:27</i><span>TEST</span>放进真实工作流</p><p><i>09:42:51</i><span>OUTPUT</span>留下能跟着做的结论</p><p className="signal-log-live"><i>NOW</i><span>LIVE</span>等待下一次发车</p></div></section>

      <section className="signal-article" id="article"><span className="signal-article-code">LOG / 001<br />ARCHIVE</span><div><span className="signal-kicker">PROJECT NOTES · 2026.09</span><h2>同一个个人站，<br />两轮 AI 协作。</h2><p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录一次真实改版。</p><Link href="/articles/workbuddy-vs-codex/" className="signal-action signal-action--primary">读取完整日志 ↗</Link></div></section>

      <footer className="signal-footer"><Link className="signal-brand" href="/"><span className="signal-brand-mark">大</span><span>大巴Bus <small>慢慢开，站站停</small></span></Link><div><Link href="/contact/">乘车指南</Link><a href="mailto:wangc98316@gmail.com">wangc98316@gmail.com</a></div><SwitchLinks current="signal" /></footer>
    </main>
  );
}

export default function DesignConcept({ variant }: { variant: ConceptKey }) {
  if (variant === "station") return <StationConcept />;
  if (variant === "signal") return <SignalConcept />;
  return <EditorialConcept />;
}
