import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import DabaAvatar from "@/components/DabaAvatar";
import Link from "next/link";

export const metadata: Metadata = { title: "司机档案" };

export default function About() {
  return (
    <main id="main-content" className="editorial-page editorial-about">
      <div className="wrap page-head editorial-page-head">
        <span className="label-caps">Route Info · Driver</span>
        <h1>司机档案</h1>
        <p className="hand">本车由大巴亲自驾驶，请放心上车。</p>
      </div>

      {/* 司机自介 · 左车窗右文字 */}
      <section className="editorial-profile-section">
        <div className="wrap about-grid">
          <Reveal>
            <figure className="bus-window">
              <DabaAvatar />
              <figcaption>大巴 · 耳机抱臂版</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-text">
              <p>
                我是<b>大巴</b>，一个分享 AI 工具的普通上班族。<b>AI 爱好者</b>，
                也是<b>资深动漫观众</b>——这两件事看似不搭，但在我这里刚好拼成完整的下班生活。
              </p>
              <p>
                开这个站的原因很简单：市面上的 AI 内容要么太玄乎、要么太啰嗦。
                我想用上班族真实的时间预算，把 AI 工具讲成<b>人话</b>——
                能干嘛、怎么上手、值不值，一次说清。
              </p>
              <p>
                这里没有花架子，只有一个上班族下班后的认真整理。慢慢开，站站停。
              </p>
              <div className="note-card">
                <span className="note-badge">为什么叫大巴 ✦</span>
                <p>
                  大巴的特点：起点固定、路线清晰、谁都能上、到站即达。
                  我希望做内容也是这样——不端着，也不绕路。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 发车计划 · 纵向站点流程线 */}
      <section className="editorial-stops-section">
        <div className="wrap">
          <Reveal>
            <div className="sec-head">
              <span className="sec-num">RUN</span>
              <h2>发车计划</h2>
              <p className="lead">不卷更新频率，卷每一条的质量。</p>
            </div>
          </Reveal>
          <ul className="stop-flow">
            <li>
              <span className="stop-num">A</span>
              <h3>AI 工具实测</h3>
              <p>每个工具亲手跑一遍再写：能干嘛、怎么上手、值不值。不恰饭，才敢说真话。</p>
            </li>
            <li>
              <span className="stop-num">B</span>
              <h3>效率折腾手册</h3>
              <p>上班族视角的效率技巧——怎么把重复劳动交给 AI，把时间还给生活。</p>
            </li>
            <li>
              <span className="stop-num">C</span>
              <h3>动漫副驾频道</h3>
              <p>下班路上的精神食粮：追番碎碎念、冷门安利，偶尔剧透警告。</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="editorial-page-next">
        <div className="wrap editorial-next-inner">
          <span className="label-caps">NEXT STOP · CONTACT</span>
          <h2>想一起聊聊？<br />下一站，乘车指南。</h2>
          <Link className="btn btn-ink" href="/contact/">找到大巴 →</Link>
        </div>
      </section>
    </main>
  );
}
