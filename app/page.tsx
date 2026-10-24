import Link from "next/link";
import Turntable from "../components/Turntable";

const repo = "https://github.com/bigchen316/daba-cyber-blindbox";
const tests = [
  { title: "AI 工具实测", tag: "实测", text: "每个工具亲手跑一遍再写：能干嘛、怎么上手、值不值。不恰饭，才敢说真话。", img: "/home/fig-ai.webp", alt: "大巴穿蓝白卫衣，端着笔记本电脑，身边飘着 AI 小助手" },
  { title: "效率折腾手册", tag: "手册", text: "上班族视角的效率技巧。怎么把重复劳动交给 AI，把时间还给生活。", img: "/home/fig-coffee.webp", alt: "大巴下班后拿着咖啡和笔记本" },
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
  { id: "products", label: "产品" },
  { id: "tests", label: "AI skill 实测" },
  { id: "picks", label: "推荐" },
  { id: "about", label: "关于我" },
  { id: "contact", label: "交流" },
];

export default function Home() {
  return <main id="main-content" className="home">
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-kicker"><span>AI · 创作 · 日常</span><span>PERSONAL SPACE</span></div>
      <div className="home-hero-inner">
        <h1 id="home-title" className="home-title" aria-label="探索 AI."><span>探索</span><span className="home-title-ai">AI.</span></h1>
        <div className="home-stage"><Turntable /></div>
      </div>
      <div className="home-hero-band">
        <div className="home-hero-copy">
          <p className="home-hello">HELLO, I'M DABA</p>
          <p className="home-intro">上车，一起探索 AI。</p>
          <p className="home-meta">普通上班族 / AI 爱好者 / 动漫观众</p>
          <div className="home-actions"><Link className="home-explore" href="#products">开始探索<span aria-hidden="true">→</span></Link><Link className="home-read" href="/articles/">阅读实测 ↗</Link></div>
        </div>
        <Link className="home-down" href="#products"><span aria-hidden="true">↓</span>往下滑</Link>
      </div>
    </section>

    <nav className="home-col home-tabs" aria-label="本页分区">
      {sections.map((s, i) => <Link key={s.id} href={"#" + s.id} className={i === 0 ? "is-first" : ""}>{s.label}</Link>)}
    </nav>

    <section id="products" className="home-col home-section" data-num="01" aria-labelledby="home-products-title">
      <h2 id="home-products-title" className="home-label">产品 · 2</h2>
      <a href="https://bigchen316.github.io/daba-cyber-blindbox/site/" className="home-feature home-product">
        <img src="/home/product-box.webp" alt="大巴赛博盲盒 VOL.01 星空包装盒，正面是穿黑色运动套装的大巴公仔" width={720} height={900} loading="lazy" decoding="async" />
        <div><span className="home-tag">VOL.01</span><h3>大巴赛博盲盒</h3><p>下班后，我在偷偷变强。8 款公仔（7 常规 + 1 隐藏）加彩蛋「超能大巴」，可以在线开盒。</p><span>在线开盒 ↗</span></div>
        <em aria-hidden="true">01</em>
      </a>
      <a href={repo} className="home-card home-card-wide">
        <div className="home-card-head"><h3>IP 盲盒快捷工作流</h3><span className="home-tag">Skill</span><span className="home-arrow" aria-hidden="true">↗</span></div>
        <p>把任意 IP 做成盲盒全套：2D 款式 → 混元 3D 建模 → 盒面设计 → Blender 渲染 → 可开盒网页。支持 Claude Code、Codex、WorkBuddy、ZCode，一键安装。</p>
        <img src="/home/product-lineup.webp" alt="大巴盲盒全部 9 款公仔排成一排：基础、篮球、AI 学习、学霸、咖啡、新年、金色隐藏、熬夜和超能大巴" width={2000} height={360} loading="lazy" decoding="async" />
      </a>
    </section>

    <section id="tests" className="home-col home-section" data-num="02" aria-labelledby="home-tests-title">
      <h2 id="home-tests-title" className="home-label">AI skill 实测 · {tests.length + 1}</h2>
      <div className="home-grid">
        {tests.map(p => <Link key={p.title} href="/articles/" className="home-card">
          <div className="home-card-head"><h3>{p.title}</h3><span className="home-tag">{p.tag}</span><span className="home-arrow" aria-hidden="true">↗</span></div>
          <p>{p.text}</p>
          <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
        </Link>)}
      </div>
      <Link href="/articles/workbuddy-vs-codex/" className="home-feature home-feature-gap">
        <img src="/home/fig-study.webp" alt="大巴背着书包拿笔记本记录" width={900} height={900} loading="lazy" decoding="async" />
        <div><span className="home-tag">最新复盘</span><h3>WorkBuddy vs Codex</h3><p>从个人网站到个人 IP，两轮 AI 协作的真实记录。</p><span>阅读复盘 →</span></div>
        <em aria-hidden="true">01</em>
      </Link>
    </section>

    <section id="picks" className="home-col home-section" data-num="03" aria-labelledby="home-picks-title">
      <h2 id="home-picks-title" className="home-label">推荐 · 动漫与内容</h2>
      <div className="home-grid">
        <div className="home-card">
          <div className="home-card-head"><h3>动漫副驾日常</h3><span className="home-tag">动漫</span></div>
          <p>下班路上的精神食粮：追番碎碎念、冷门安利，偶尔剧透警告。</p>
          <img src="/home/fig-sleep.webp" alt="大巴穿睡衣戴眼罩，抱着枕头打哈欠" width={900} height={900} loading="lazy" decoding="async" />
        </div>
        <div className="home-card home-card-soon">
          <div className="home-card-head"><h3>推荐清单</h3><span className="home-tag">整理中</span></div>
          <p>最近在追的番、常看的博主和值得一看的内容，正在整理，下班后慢慢更新。</p>
          <span className="home-soon-mark" aria-hidden="true">?</span>
        </div>
      </div>
    </section>

    <section id="about" className="home-col home-section" data-num="04" aria-labelledby="home-about-title">
      <h2 id="home-about-title" className="home-label">关于我 · 普通上班族 / AI 爱好者 / 动漫观众</h2>
      <Link href="/about/" className="home-card home-card-ink home-card-wide">
        <div className="home-card-head"><h3>为什么叫大巴？</h3><span className="home-arrow" aria-hidden="true">↗</span></div>
        <p>起点固定、路线清晰、谁都能上、到站即达。做内容也是这样，不端着，也不绕路。</p>
      </Link>
      <div className="home-grid home-grid-small home-feature-gap">
        {moments.map(m => <figure key={m.title} className="home-card home-moment">
          <figcaption className="home-card-head"><h3>{m.title}</h3><span>{m.note}</span></figcaption>
          <img src={m.img} alt={m.alt} width={900} height={900} loading="lazy" decoding="async" />
        </figure>)}
      </div>
    </section>

    <section id="contact" className="home-col home-section" data-num="05" aria-labelledby="home-contact-title">
      <h2 id="home-contact-title" className="home-label">— 交流 / 找到大巴</h2>
      <ol className="home-rows">
        {platforms.map((p, i) => <li key={p.name}><span className="home-idx">{String(i + 1).padStart(2, "0")}</span><strong>{p.name}</strong><code>{p.handle}</code><span className="home-hint">搜索</span></li>)}
        <li><span className="home-idx">{String(platforms.length + 1).padStart(2, "0")}</span><strong>Email</strong><a href={`mailto:${email}`}><code>{email}</code></a><span className="home-hint" aria-hidden="true">→</span></li>
      </ol>
    </section>
  </main>;
}
