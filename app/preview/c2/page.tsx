import type { Metadata } from "next";
import Link from "next/link";
import { email, latest, pillars, platforms } from "../content";
export const metadata: Metadata = { title: "预览 C2 · 巴黄海报 × 窄栏排版" };

const tags = ["实测", "手册", "日常"];
const moments = [
  { img: "/landing/fig-basketball.webp", alt: "大巴穿 18 号黄色球衣抱着篮球", title: "周末球场", note: "下班后的另一半" },
  { img: "/landing/fig-study.webp", alt: "大巴背着书包拿笔记本记录", title: "认真记笔记", note: "试过的都记下来" },
  { img: "/landing/fig-newyear.webp", alt: "大巴穿红色唐装提着灯笼", title: "过年也更新", note: "慢慢开，不断更" },
  { img: "/landing/fig-super.webp", alt: "大巴披着黄色披风飞行的超能形态", title: "赶 DDL 形态", note: "偶尔也会超速" },
];
const sections = [
  { id: "c2-content", label: "内容" },
  { id: "c2-latest", label: "文章" },
  { id: "c2-about", label: "关于" },
  { id: "c2-contact", label: "乘车" },
];

export default function PreviewC2() {
  return <main id="main-content" className="pc2">
    <section className="pc2-hero" aria-labelledby="pc2-title">
      <div className="pc2-col pc2-hero-inner">
        <h1 id="pc2-title"><span>大巴</span><span>上车，</span><span>探索 AI.</span></h1>
        <img className="pc2-figure" src="/landing/hero-sticker.webp" alt="大巴 3D 形象：黑色运动套装，胸前黄色小 W，微笑站立，带白色贴纸边" width={586} height={1351} fetchPriority="high" />
        <p className="pc2-meta"><strong>大 巴</strong><span>普通上班族 / AI 爱好者 / 动漫观众</span></p>
        <a className="pc2-down" href="#c2-content">↓ 往下滑</a>
      </div>
    </section>

    <nav className="pc2-col pc2-tabs" aria-label="本页分区">
      {sections.map((s, i) => <a key={s.id} href={"#" + s.id} className={i === 0 ? "is-first" : ""}>{s.label}</a>)}
    </nav>

    <section id="c2-content" className="pc2-col pc2-section" data-num="01" aria-labelledby="pc2-content-title">
      <h2 id="pc2-content-title" className="pc2-label">路上会聊 · {pillars.length}</h2>
      <div className="pc2-grid">
        {pillars.map((p, i) => <Link key={p.title} href="/articles/" className="pc2-card">
          <div className="pc2-card-head"><h3>{p.title}</h3><span className="pc2-tag">{tags[i]}</span><span className="pc2-arrow" aria-hidden="true">↗</span></div>
          <p>{p.text}</p>
          <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
        </Link>)}
        <Link href="/about/" className="pc2-card pc2-card-ink">
          <div className="pc2-card-head"><h3>为什么叫大巴？</h3><span className="pc2-arrow" aria-hidden="true">↗</span></div>
          <p>起点固定、路线清晰、谁都能上、到站即达。做内容也是这样，不端着，也不绕路。</p>
          <img src="/landing/daba-car.webp" alt="大巴开着一辆白色带黄色 W 的小车" width={1200} height={800} loading="lazy" decoding="async" />
        </Link>
      </div>
    </section>

    <section id="c2-latest" className="pc2-col pc2-section" data-num="02" aria-labelledby="pc2-latest-title">
      <h2 id="pc2-latest-title" className="pc2-label">最新文章 · 1</h2>
      <Link href={latest.href} className="pc2-feature">
        <img src="/landing/fig-ai.webp" alt="大巴端着笔记本电脑，身边飘着 AI 小助手" width={900} height={900} loading="lazy" decoding="async" />
        <div><h3>{latest.title}</h3><p>{latest.text}</p><span>阅读复盘 →</span></div>
        <em aria-hidden="true">01</em>
      </Link>
    </section>

    <section id="c2-about" className="pc2-col pc2-section" data-num="03" aria-labelledby="pc2-about-title">
      <h2 id="pc2-about-title" className="pc2-label">下班后的大巴 · {moments.length}</h2>
      <div className="pc2-grid pc2-grid-small">
        {moments.map(m => <figure key={m.title} className="pc2-card pc2-moment">
          <figcaption className="pc2-card-head"><h3>{m.title}</h3><span>{m.note}</span></figcaption>
          <img src={m.img} alt={m.alt} width={900} height={900} loading="lazy" decoding="async" />
        </figure>)}
      </div>
    </section>

    <section id="c2-contact" className="pc2-col pc2-section" data-num="04" aria-labelledby="pc2-contact-title">
      <h2 id="pc2-contact-title" className="pc2-label">— 乘车 / 找到大巴</h2>
      <ol className="pc2-rows">
        {platforms.map((p, i) => <li key={p.name}><span className="pc2-idx">{String(i + 1).padStart(2, "0")}</span><strong>{p.name}</strong><code>{p.handle}</code><span className="pc2-hint">搜索</span></li>)}
        <li><span className="pc2-idx">{String(platforms.length + 1).padStart(2, "0")}</span><strong>Email</strong><a href={`mailto:${email}`}><code>{email}</code></a><span className="pc2-hint" aria-hidden="true">→</span></li>
      </ol>
    </section>
  </main>;
}
