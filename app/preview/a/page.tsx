import type { Metadata } from "next";
import Link from "next/link";
import { email, latest, pillars, platforms } from "../content";
export const metadata: Metadata = { title: "预览 A · 白色展台" };

export default function PreviewA() {
  return <main id="main-content" className="pa">
    <section className="pa-hero" aria-labelledby="pa-title">
      <p className="pa-kicker">大巴Bus · 分享 AI 工具的普通上班族</p>
      <h1 id="pa-title">和大巴，<br />一起把 AI 用明白。</h1>
      <p className="pa-lede">亲手试过再说，用上班族的时间预算讲人话。</p>
      <div className="pa-actions"><Link className="btn btn-ink" href="/articles/">阅读实测</Link><Link className="pa-link" href="/about/">认识大巴 ›</Link></div>
      <img className="pa-figure" src="/landing/hero-cutout.webp" alt="大巴 3D 形象：黑色运动套装，胸前黄色小 W，微笑站立" width={546} height={1311} fetchPriority="high" />
    </section>

    <section className="pa-section wrap" aria-labelledby="pa-pillars">
      <h2 id="pa-pillars" className="pa-h2">路上会聊这三件事</h2>
      <div className="pa-cards">{pillars.map(p => <article key={p.title} className="pa-card">
        <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
        <div><h3>{p.title}</h3><p>{p.text}</p></div>
      </article>)}</div>
    </section>

    <section className="pa-latest wrap">
      <Link href={latest.href}><span className="subtle">最新文章</span><h2>{latest.title}</h2><p>{latest.text}</p><span className="pa-link">阅读复盘 ›</span></Link>
    </section>

    <section className="pa-why wrap" aria-labelledby="pa-why">
      <img src="/landing/daba-car.webp" alt="大巴开着一辆白色带黄色 W 的小车" width={1200} height={800} loading="lazy" decoding="async" />
      <div><h2 id="pa-why" className="pa-h2">为什么叫大巴？</h2><p>起点固定、路线清晰、谁都能上、到站即达。做内容也是这样，不端着，也不绕路。</p></div>
    </section>

    <section className="pa-contact wrap" aria-labelledby="pa-contact">
      <h2 id="pa-contact" className="pa-h2">在这些地方找到大巴</h2>
      <dl>{platforms.map(p => <div key={p.name}><dt>{p.name}</dt><dd>{p.handle}</dd></div>)}</dl>
      <a className="pa-email" href={`mailto:${email}`}>{email}</a>
    </section>
  </main>;
}
