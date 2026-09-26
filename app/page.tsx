import Reveal from "@/components/Reveal";
import DabaAvatar from "@/components/DabaAvatar";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" className="editorial-page editorial-home">
      {/* ① Hero · 双栏不对称（1 : 0.6） */}
      <section className="hero editorial-hero" id="top">
        <div>
          <span className="label-caps">Route 01 · Personal Site</span>
          <h1>大巴Bus</h1>
          <p className="lead">
            我是<b>大巴</b>，一个<span className="hl">分享 AI 工具的普通上班族</span>
            。白天上班攒素材，下班把好用的、好玩的讲成人话——不玄乎，不绕路。
          </p>
          <div className="chips">
            <span className="chip">AI 爱好者</span>
            <span className="chip">爱看动漫</span>
            <span className="chip">上班族视角</span>
          </div>
          <div className="hero-actions">
            <a className="btn btn-ink" href="/contact/">
              🚌 上车 · 找到大巴
            </a>
            <a className="btn-ghost" href="#lines">
              先看看运营线路 ↓
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <Reveal>
            <figure className="bus-window">
              <DabaAvatar />
              <figcaption>司机本巴，正在发车</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="feature-article-section">
        <div className="wrap">
          <Reveal>
            <Link className="feature-article" href="/articles/workbuddy-vs-codex/">
              <div>
                <span className="route-line">FIRST REVIEW · PROJECT NOTES</span>
                <h2>同一个个人站，两轮 AI 协作</h2>
                <p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录这次真实改版。</p>
              </div>
              <span className="feature-article-cta">阅读改版复盘 <span aria-hidden="true">→</span></span>
            </Link>
            <Link className="concept-hub-link" href="/design-options/">想看三种更大胆的首页方向？预览设计提案 ↗</Link>
          </Reveal>
        </div>
      </section>

      {/* ② 三条运营线路 · 三列卡片 */}
      <section className="editorial-routes" id="lines">
        <div className="wrap">
          <Reveal>
            <div className="sec-head">
              <span className="sec-num">01</span>
              <h2>三条运营线路</h2>
              <p className="lead">这趟车固定跑三条线，发车不定期，但每一站都讲人话。</p>
            </div>
          </Reveal>
          <div className="route-grid">
            <Reveal>
              <article className="route-card">
                <span className="route-line">LINE A · AI TOOLS</span>
                <h3>AI 工具实测</h3>
                <p>亲手试过的 AI 工具，讲清楚三件事：能干嘛、怎么上手、值不值。不恰饭，才敢说真话。</p>
                <span className="route-note">发车频率：不定期 · 发车即干货</span>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="route-card">
                <span className="route-line">LINE B · EFFICIENCY</span>
                <h3>效率折腾手册</h3>
                <p>上班族视角的效率技巧——怎么把重复劳动交给 AI，把时间还给生活。每一招都经过本巴实测。</p>
                <span className="route-note">发车频率：不定期 · 跟着上班节奏走</span>
              </article>
            </Reveal>
            <Reveal delay={0.2}>
              <article className="route-card">
                <span className="route-line">LINE C · ANIME</span>
                <h3>动漫副驾频道</h3>
                <p>下班路上的精神食粮：追番碎碎念、冷门安利，偶尔剧透警告。这是大巴的休息区。</p>
                <span className="route-note">发车频率：随缘 · 看到好东西就停一站</span>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ③ 到站广播 · 全宽深色面板 */}
      <section className="broadcast editorial-broadcast">
        <div className="wrap">
          <Reveal>
            <p className="stop-big">
              <span className="to">下一站——</span>
              AI 工具实测现场。
            </p>
            <p className="sub">
              第一篇深度实测正在排版中。想第一时间上车，可以先去任意平台搜下面这些名字，
              或者到「乘车指南」挑一个你常用的入口。
            </p>
            <div className="chips">
              <span className="chip">公众号 · 大巴的公路志</span>
              <span className="chip">小红书 · 大巴的副驾</span>
              <span className="chip">B 站 · 大巴bus</span>
              <span className="chip">抖音 · 大巴bus</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ④ 路线图 · 中轴时间线 */}
      <section className="editorial-timeline-section">
        <div className="wrap">
          <Reveal>
            <div className="sec-head">
              <span className="sec-num">02</span>
              <h2>这趟车开去哪</h2>
              <p className="lead">从始发站到下一站，路线图全透明。</p>
            </div>
          </Reveal>
          <div className="timeline">
            <Reveal>
              <div className="t-item">
                <span className="t-dot" />
                <div className="t-card">
                  <span className="t-tag">STOP 00 · 始发站</span>
                  <h3>为什么开这趟车</h3>
                  <p>
                    网上的 AI 教程要么太玄乎，要么太啰嗦。我想用上班族真实的时间预算，把 AI 讲成人话。
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="t-item">
                <span className="t-dot" />
                <div className="t-card">
                  <span className="t-tag">STOP 01 · 途中</span>
                  <h3>现在在做什么</h3>
                  <p>
                    白天上班攒素材，晚上整理成条理清楚的分享：工具实测、效率技巧拆解，一条一条发车。
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="t-item">
                <span className="t-dot" />
                <div className="t-card">
                  <span className="t-tag">STOP 02 · 下一站</span>
                  <h3>接下来</h3>
                  <p>
                    第一篇 AI 工具深度实测 + 一份「普通人上手 AI」的路线图。到站时间：敬请留意广播。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ⑤ CTA · 全宽黄底面板 */}
      <section className="cta-panel editorial-cta">
        <div className="wrap">
          <Reveal>
            <span className="sec-num">03</span>
            <h2>免费上车，随时下车</h2>
            <p className="lead">
              不收门票，不搞套路。关注公众号「大巴的公路志」，更新第一时间到站；
              或者来乘车指南，挑一个你常用的平台。
            </p>
            <div className="cta-actions">
              <a className="btn btn-ink" href="/contact/">
                去乘车指南 →
              </a>
              <a className="btn-ghost" href="mailto:wangc98316@gmail.com">
                发邮件唠两句
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
