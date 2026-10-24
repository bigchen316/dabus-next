import Link from "next/link";
import Turntable from "../components/Turntable";
import HomeSections from "../components/HomeSections";
import HomeProjectCard, { type HomeCard } from "../components/HomeProjectCard";
import catalog from "../content/home-cards.json";

const { products, tests } = catalog as { products: HomeCard[]; tests: HomeCard[] };
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
          <div className="home-actions"><Link className="home-explore" href="#products">开始探索<span aria-hidden="true">→</span></Link></div>
        </div>
        <Link className="home-down" href="#products"><span aria-hidden="true">↓</span>往下滑</Link>
      </div>
    </section>

    <HomeSections sections={sections}>
    <section className="home-col home-section" data-num="01" aria-labelledby="home-products-title">
      <h2 id="home-products-title" className="home-label">产品 · {products.length}</h2>
      <div className="home-grid home-project-grid">{products.map(card => <HomeProjectCard key={card.id} card={card} />)}</div>
    </section>

    <section className="home-col home-section" data-num="02" aria-labelledby="home-tests-title">
      <h2 id="home-tests-title" className="home-label">AI skill 实测 · {tests.length}</h2>
      <div className="home-grid home-project-grid">{tests.map(card => <HomeProjectCard key={card.id} card={card} />)}</div>
    </section>

    <section className="home-col home-section" data-num="03" aria-labelledby="home-picks-title">
      <h2 id="home-picks-title" className="home-label">推荐 · 动漫与内容</h2>
      <div className="home-grid home-picks-grid">
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

    <section className="home-col home-section" data-num="04" aria-labelledby="home-about-title">
      <h2 id="home-about-title" className="home-label">关于我 · 普通上班族 / AI 爱好者 / 动漫观众</h2>
      <div className="home-card home-card-ink home-card-wide">
        <div className="home-card-head"><h3>为什么叫大巴？</h3></div>
        <p>起点固定、路线清晰、谁都能上、到站即达。做内容也是这样，不端着，也不绕路。</p>
      </div>
      <div className="home-grid home-grid-small home-feature-gap">
        {moments.map(m => <figure key={m.title} className="home-card home-moment">
          <figcaption className="home-card-head"><h3>{m.title}</h3><span>{m.note}</span></figcaption>
          <img src={m.img} alt={m.alt} width={900} height={900} loading="lazy" decoding="async" />
        </figure>)}
      </div>
    </section>

    <section className="home-col home-section" data-num="05" aria-labelledby="home-contact-title">
      <h2 id="home-contact-title" className="home-label">— 交流 / 找到大巴</h2>
      <ol className="home-rows">
        {platforms.map((p, i) => <li key={p.name}><span className="home-idx">{String(i + 1).padStart(2, "0")}</span><strong>{p.name}</strong><code>{p.handle}</code><span className="home-hint">搜索</span></li>)}
        <li><span className="home-idx">{String(platforms.length + 1).padStart(2, "0")}</span><strong>Email</strong><a href={`mailto:${email}`}><code>{email}</code></a><span className="home-hint" aria-hidden="true">→</span></li>
      </ol>
    </section>
    </HomeSections>
  </main>;
}
