import Reveal from "../components/Reveal";
import Link from "next/link";

const routes = [
  {
    code: "A",
    label: "AI TOOLS",
    title: "AI 工具实测",
    text: "能干嘛、怎么上手、值不值，亲手试过再说。",
    color: "yellow",
  },
  {
    code: "B",
    label: "EFFICIENCY",
    title: "效率折腾手册",
    text: "把重复劳动交给 AI，把时间还给生活。",
    color: "green",
  },
  {
    code: "C",
    label: "ANIME SEAT",
    title: "动漫副驾频道",
    text: "下班路上的追番碎碎念和冷门安利。",
    color: "ink",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="editorial-page editorial-home editorial-home-one-page">
      <section className="home-deck" id="top">
        <div className="home-deck-topline">
          <span className="label-caps">Route 01 · Personal Site</span>
          <span className="home-live"><i /> LIVE ROUTE / 2026</span>
        </div>

        <div className="home-deck-stage">
          <div className="home-deck-copy">
            <span className="home-deck-kicker">普通上班族的内容大巴</span>
            <h1>大巴<span>Bus</span></h1>
            <p className="lead">
              我是<b>大巴</b>，一个<span className="hl">分享 AI 工具的普通上班族</span>。
              白天上班攒素材，下班把好用的、好玩的讲成人话。
            </p>
            <div className="chips">
              <span className="chip">AI 爱好者</span>
              <span className="chip">爱看动漫</span>
              <span className="chip">上班族视角</span>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-ink" href="/contact/">🚌 上车 · 找到大巴</Link>
              <Link className="btn-ghost" href="/about/">认识司机 ↗</Link>
            </div>
          </div>

          <div className="home-deck-visual home-deck-route-mark" aria-label="大巴内容路线">
            <Reveal>
              <div className="home-deck-route-mark-inner">
                <span className="home-deck-route-mark-kicker">DA BA / NIGHT ROUTE</span>
                <strong>内容在路上，<br /><em>不用露脸。</em></strong>
                <p>AI 工具、效率折腾和动漫日常，沿着同一条个人路线发车。</p>
                <div className="home-deck-route-map" aria-hidden="true">
                  <span><b>A</b> START</span>
                  <i />
                  <span><b>C</b> NEXT STOP</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="home-deck-bottom">
          <Reveal>
            <Link className="home-deck-feature" href="/articles/workbuddy-vs-codex/">
              <span className="route-line">FIRST REVIEW · PROJECT NOTES</span>
              <strong>同一个个人站，<br />两轮 AI 协作。</strong>
              <span className="home-deck-feature-cta">阅读改版复盘 →</span>
            </Link>
          </Reveal>

          <div className="home-deck-routes" aria-label="三条运营线路">
            {routes.map((route) => (
              <article className={`home-deck-route home-deck-route--${route.color}`} key={route.code}>
                <span className="home-deck-route-code">LINE {route.code}</span>
                <small>{route.label}</small>
                <h2>{route.title}</h2>
                <p>{route.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
