import Link from "next/link";
import Turntable from "../components/Turntable";

const pillars = [
  { title: "AI 工具实测", tag: "实测", text: "每个工具亲手跑一遍再写：能干嘛、怎么上手、值不值。不恰饭，才敢说真话。", img: "/home/fig-ai.webp", alt: "大巴穿蓝白卫衣，端着笔记本电脑，身边飘着 AI 小助手" },
  { title: "效率折腾手册", tag: "手册", text: "上班族视角的效率技巧。怎么把重复劳动交给 AI，把时间还给生活。", img: "/home/fig-coffee.webp", alt: "大巴下班后拿着咖啡和笔记本" },
  { title: "动漫副驾日常", tag: "日常", text: "下班路上的精神食粮：追番碎碎念、冷门安利，偶尔剧透警告。", img: "/home/fig-sleep.webp", alt: "大巴穿睡衣戴眼罩，抱着枕头打哈欠" },
];
const moments = [
  { img: "/home/fig-basketball.webp", alt: "大巴穿 18 号黄色球衣抱着篮球", title: "周末球场", note: "下班后的另一半" },
  { img: "/home/fig-study.webp", alt: "大巴背着书包拿笔记本记录", title: "认真记笔记", note: "试过的都记下来" },
  { img: "/home/fig-newyear.webp", alt: "大巴穿红色唐装提着灯笼", title: "过年也更新", note: "慢慢开，不断更" },
  { img: "/home/fig-super.webp", alt: "大巴披着黄色披风飞行的超能形态", title: "赶 DDL 形态", note: "偶尔也会超速" },
];
const platforms = [
  { name: "微信公众号", handle: "大巴的公路志" },
  { name: "小红书", handle: "大巴的副驾" },
  { name: "Bilibili", handle: "大巴bus" },
  { name: "抖音", handle: "大巴bus" },
];
const email = "wangc98316@gmail.com";
const sections = [
  { id: "content", label: "内容" },
  { id: "latest", label: "文章" },
  { id: "moments", label: "关于" },
  { id: "contact", label: "乘车" },
];

export default function Home() {
  return <main id="main-content" className="home">
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <p className="home-kicker"><b>夜班车</b> · 熬夜也在探索 AI</p>
          <h1 id="home-title"><span className="home-chip">大巴</span><span>上车</span><span>探索 <em>AI</em></span></h1>
          <p className="home-meta"><strong>大 巴</strong><span>普通上班族 / AI 爱好者 / 动漫观众</span></p>
          <div className="home-actions"><Link className="home-cta" href="/articles/">阅读实测</Link><a className="home-down" href="#content">↓ 往下滑</a></div>
        </div>
        <div className="home-stage">
          <Turntable />
          <p className="home-stage-note" aria-hidden="true"><b>熬夜款</b> · 拖动转一圈</p>
        </div>
      </div>
    </section>

    <nav className="home-col home-tabs" aria-label="本页分区">
      {sections.map((s, i) => <a key={s.id} href={"#" + s.id} className={i === 0 ? "is-first" : ""}>{s.label}</a>)}
    </nav>

    <section id="content" className="home-col home-section" data-num="01" aria-labelledby="home-content-title">
      <h2 id="home-content-title" className="home-label">路上会聊 · {pillars.length}</h2>
      <div className="home-grid">
        {pillars.map(p => <Link key={p.title} href="/articles/" className="home-card">
          <div className="home-card-head"><h3>{p.title}</h3><span className="home-tag">{p.tag}</span><span className="home-arrow" aria-hidden="true">↗</span></div>
          <p>{p.text}</p>
          <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
        </Link>)}
        <Link href="/about/" className="home-card home-card-ink">
          <div className="home-card-head"><h3>为什么叫大巴？</h3><span className="home-arrow" aria-hidden="true">↗</span></div>
          <p>起点固定、路线清晰、谁都能上、到站即达。做内容也是这样，不端着，也不绕路。</p>
          <img src="/home/daba-car.webp" alt="大巴开着一辆白色带黄色 W 的小车" width={1200} height={800} loading="lazy" decoding="async" />
        </Link>
      </div>
    </section>

    <section id="latest" className="home-col home-section" data-num="02" aria-labelledby="home-latest-title">
      <h2 id="home-latest-title" className="home-label">最新文章 · 1</h2>
      <Link href="/articles/workbuddy-vs-codex/" className="home-feature">
        <img src="/home/fig-ai.webp" alt="大巴端着笔记本电脑，身边飘着 AI 小助手" width={900} height={900} loading="lazy" decoding="async" />
        <div><h3>WorkBuddy vs Codex</h3><p>从个人网站到个人 IP，两轮 AI 协作的真实记录。</p><span>阅读复盘 →</span></div>
        <em aria-hidden="true">01</em>
      </Link>
    </section>

    <section id="moments" className="home-col home-section" data-num="03" aria-labelledby="home-moments-title">
      <h2 id="home-moments-title" className="home-label">下班后的大巴 · {moments.length}</h2>
      <div className="home-grid home-grid-small">
        {moments.map(m => <figure key={m.title} className="home-card home-moment">
          <figcaption className="home-card-head"><h3>{m.title}</h3><span>{m.note}</span></figcaption>
          <img src={m.img} alt={m.alt} width={900} height={900} loading="lazy" decoding="async" />
        </figure>)}
      </div>
    </section>

    <section id="contact" className="home-col home-section" data-num="04" aria-labelledby="home-contact-title">
      <h2 id="home-contact-title" className="home-label">— 乘车 / 找到大巴</h2>
      <ol className="home-rows">
        {platforms.map((p, i) => <li key={p.name}><span className="home-idx">{String(i + 1).padStart(2, "0")}</span><strong>{p.name}</strong><code>{p.handle}</code><span className="home-hint">搜索</span></li>)}
        <li><span className="home-idx">{String(platforms.length + 1).padStart(2, "0")}</span><strong>Email</strong><a href={`mailto:${email}`}><code>{email}</code></a><span className="home-hint" aria-hidden="true">→</span></li>
      </ol>
    </section>
  </main>;
}
