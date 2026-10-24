import Link from "next/link";
import Turntable from "../components/Turntable";
import HomeSections from "../components/HomeSections";
import HomeProjectCard, { type HomeCard } from "../components/HomeProjectCard";
import catalog from "../content/home-cards.json";

const { products, tests } = catalog as { products: HomeCard[]; tests: HomeCard[] };
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
      <h2 id="home-picks-title" className="home-label">推荐</h2>
      {/* 后续推荐卡片使用与产品、AI 实测相同的 HomeProjectCard。 */}
      <div className="home-grid home-project-grid" />
    </section>

    <section className="home-col home-section" data-num="04" aria-labelledby="home-about-title">
      <h2 id="home-about-title" className="home-label">关于我</h2>
      {/* 后续关于我卡片使用与产品、AI 实测相同的 HomeProjectCard。 */}
      <div className="home-grid home-project-grid" />
    </section>

    <section className="home-col home-section" data-num="05" aria-labelledby="home-contact-title">
      <h2 id="home-contact-title" className="home-label">— 交流 / 找到大巴</h2>
      <ol className="home-contact-list">
        {platforms.map((p, i) => <li className="home-contact-card" key={p.name}><span className="home-idx">{String(i + 1).padStart(2, "0")}</span><strong>{p.name}</strong><code>{p.handle}</code><span className="home-hint">搜索</span></li>)}
        <li className="home-contact-card"><span className="home-idx">{String(platforms.length + 1).padStart(2, "0")}</span><strong>Email</strong><a href={`mailto:${email}`}><code>{email}</code></a><span className="home-hint" aria-hidden="true">→</span></li>
      </ol>
    </section>
    </HomeSections>
  </main>;
}
