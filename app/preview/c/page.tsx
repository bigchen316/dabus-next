import type { Metadata } from "next";
import Link from "next/link";
import { email, latest, pillars, platforms } from "../content";
export const metadata: Metadata = { title: "预览 C · 巴黄海报" };

const moments = [
  { img: "/landing/fig-basketball.webp", alt: "大巴穿 18 号黄色球衣抱着篮球", label: "周末球场" },
  { img: "/landing/fig-study.webp", alt: "大巴背着书包拿笔记本记录", label: "认真记笔记" },
  { img: "/landing/fig-newyear.webp", alt: "大巴穿红色唐装提着灯笼", label: "过年也更新" },
  { img: "/landing/fig-super.webp", alt: "大巴披着黄色披风飞行的超能形态", label: "赶 DDL 形态" },
];

export default function PreviewC() {
  return <main id="main-content" className="pc">
    <section className="pc-hero" aria-labelledby="pc-title">
      <div className="pc-hero-inner wrap">
        <div className="pc-copy">
          <p className="pc-tag">AI · 效率 · 动漫</p>
          <h1 id="pc-title"><span>大巴</span>上车，<br />一起探索 AI。</h1>
          <p>一个普通上班族的实测与日常。慢慢开，站站停。</p>
          <Link className="btn btn-ink" href="/articles/">阅读实测</Link>
        </div>
        <img className="pc-figure" src="/landing/hero-sticker.webp" alt="大巴 3D 形象：黑色运动套装，胸前黄色小 W，微笑站立，带白色贴纸边" width={586} height={1351} fetchPriority="high" />
      </div>
    </section>

    <p className="pc-strip" aria-hidden="true">AI 工具实测 · 效率折腾手册 · 动漫副驾日常 · AI 工具实测 · 效率折腾手册 · 动漫副驾日常</p>

    <section className="pc-pillars wrap" aria-label="内容方向">
      {pillars.map((p, i) => <article key={p.title} className={i === 0 ? "pc-big" : ""}>
        <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
        <div><h2>{p.title}</h2><p>{p.text}</p></div>
      </article>)}
      <Link className="pc-latest" href={latest.href}><span>最新文章</span><h2>{latest.title}</h2><p>{latest.text}</p><strong>阅读复盘 ↗</strong></Link>
    </section>

    <section className="pc-moments wrap" aria-labelledby="pc-moments">
      <h2 id="pc-moments">下班后的大巴</h2>
      <ul>{moments.map(m => <li key={m.label}><img src={m.img} alt={m.alt} width={900} height={900} loading="lazy" decoding="async" /><span>{m.label}</span></li>)}</ul>
    </section>

    <section className="pc-contact">
      <div className="wrap">
        <h2>搜「大巴」，就能上车。</h2>
        <ul>{platforms.map(p => <li key={p.name}><span>{p.name}</span>{p.handle}</li>)}</ul>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </section>
  </main>;
}
