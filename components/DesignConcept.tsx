import Link from "next/link";

type ConceptKey = "station" | "editorial" | "signal";

const concepts: Record<ConceptKey, { name: string; english: string; intro: string; accent: string }> = {
  station: {
    name: "硬派站牌",
    english: "BOLD BUS STOP",
    intro: "把大巴做成一张醒目的城市路线海报：黑底、交通黄大色块、绿色站点灯。",
    accent: "#ffc400",
  },
  editorial: {
    name: "公路编辑部",
    english: "ROAD JOURNAL",
    intro: "像一本持续更新的个人杂志，用大标题、留白和路线标记呈现观点与实测。",
    accent: "#00c853",
  },
  signal: {
    name: "夜间信号台",
    english: "NIGHT SIGNAL",
    intro: "把站点变成一块深色控制台：绿色负责状态，黄色负责重要内容，信息更有科技感。",
    accent: "#00c853",
  },
};

export default function DesignConcept({ variant }: { variant: ConceptKey }) {
  const concept = concepts[variant];
  const alternate: ConceptKey[] = ["station", "editorial", "signal"].filter((key) => key !== variant) as ConceptKey[];

  return (
    <main className={`concept concept--${variant}`}>
      <header className="concept-nav">
        <Link className="concept-brand" href="/design-options/">
          <span className="concept-brand-mark">大</span>
          <span>大巴Bus <small>DESIGN STUDY</small></span>
        </Link>
        <nav aria-label="方案预览导航">
          <a href="#routes">运营线路</a>
          <a href="#story">司机档案</a>
          <a href="#article">首篇实测</a>
        </nav>
        <Link className="concept-nav-cta" href="/design-options/">三版方案 ↗</Link>
      </header>

      <section className="concept-hero">
        <div className="concept-hero-copy">
          <span className="concept-kicker">{concept.english} · ROUTE 01</span>
          <h1>把复杂的<br /><em>讲成人话。</em></h1>
          <p>我是大巴，一个分享 AI 工具的普通上班族。白天上班攒素材，下班把好用的、好玩的讲清楚。</p>
          <div className="concept-actions">
            <a className="concept-button" href="#article">先看我的实测 <span aria-hidden="true">↘</span></a>
            <a className="concept-text-link" href="#routes">看看这趟车跑哪几站</a>
          </div>
        </div>
        <div className="concept-hero-art">
          <div className="concept-art-frame">
            <img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" />
          </div>
          <span className="concept-art-sticker">本人驾驶<br />安心上车</span>
          <span className="concept-art-caption">DRIVER · DA BA / 2026</span>
        </div>
        <span className="concept-hero-index">01 — 03</span>
      </section>

      <section className="concept-routes" id="routes">
        <div className="concept-section-head">
          <span className="concept-kicker">THREE ROUTES / 三条线路</span>
          <h2>这趟车，<br className="concept-mobile-break" />固定跑三条线。</h2>
          <p>每一站都讲实际体验，不绕路。</p>
        </div>
        <div className="concept-route-grid">
          <article className="concept-route-card">
            <span className="concept-route-no">A</span>
            <span className="concept-route-label">AI TOOLS</span>
            <h3>AI 工具实测</h3>
            <p>亲手试过再说：能干嘛、怎么上手、值不值得。</p>
            <span className="concept-route-status"><i /> 正在整理首篇实测</span>
          </article>
          <article className="concept-route-card">
            <span className="concept-route-no">B</span>
            <span className="concept-route-label">WORKFLOW</span>
            <h3>效率折腾手册</h3>
            <p>把重复劳动交给 AI，把时间还给生活。</p>
            <span className="concept-route-status"><i /> 上班族视角</span>
          </article>
          <article className="concept-route-card">
            <span className="concept-route-no">C</span>
            <span className="concept-route-label">ANIME SEAT</span>
            <h3>动漫副驾频道</h3>
            <p>下班路上的追番碎碎念和冷门安利。</p>
            <span className="concept-route-status"><i /> 随缘发车</span>
          </article>
        </div>
      </section>

      <section className="concept-broadcast" id="story">
        <div className="concept-broadcast-sign"><span>NEXT STOP</span><b>下一站</b><i>→</i></div>
        <div>
          <span className="concept-kicker">DRIVER'S NOTE</span>
          <h2>AI 工具实测现场。</h2>
          <p>我不是来讲玄学的。只想把普通人用得上的工具，拆成清楚、可跟着做的步骤。</p>
        </div>
        <Link href="/about/">认识司机 <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="concept-feature" id="article">
        <div className="concept-feature-number">FIRST<br />REVIEW</div>
        <div className="concept-feature-copy">
          <span className="concept-kicker">PROJECT NOTES · 2026.09</span>
          <h2>同一个个人站，<br />两轮 AI 协作。</h2>
          <p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录这次真实改版。</p>
          <Link className="concept-button" href="/articles/workbuddy-vs-codex/">读这篇改版复盘 ↗</Link>
        </div>
        <div className="concept-feature-aside"><span>01</span><span>真实项目<br />持续更新</span></div>
      </section>

      <footer className="concept-footer">
        <Link className="concept-brand" href="/">
          <span className="concept-brand-mark">大</span><span>大巴Bus <small>慢慢开，站站停</small></span>
        </Link>
        <div className="concept-footer-links"><Link href="/contact/">乘车指南</Link><a href="mailto:wangc98316@gmail.com">发邮件聊聊</a></div>
        <div className="concept-other-options">
          {alternate.map((key) => <Link key={key} href={`/design-options/${key}/`}>再看：{concepts[key].name} ↗</Link>)}
        </div>
      </footer>
    </main>
  );
}
