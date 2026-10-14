import type { Metadata } from "next";
import Link from "next/link";
import DabaIllustration from "../../components/DabaIllustration";
export const metadata: Metadata = { title: "司机档案" };
export default function About() {
  return <main id="main-content" className="content-page">
    <header className="page-heading wrap"><h1>这趟车，由大巴驾驶。</h1><p>分享 AI 工具的普通上班族，也是爱看动漫的人。</p></header>
    <section className="profile-section wrap" aria-labelledby="profile-title">
      <DabaIllustration className="profile-illustration" pose="backpack" />
      <div className="profile-copy"><h2 id="profile-title">我是大巴。</h2>
        <p>一个分享 AI 工具的普通上班族。AI 爱好者，也是资深动漫观众。这两件事看似不搭，在我这里刚好拼成完整的下班生活。</p>
        <p>开这个站的原因很简单：市面上的 AI 内容要么太玄乎，要么太啰嗦。我想用上班族真实的时间预算，把 AI 工具讲成人话：能干嘛、怎么上手、值不值，一次说清。</p>
        <p>这里没有花架子，只有一个上班族下班后的认真整理。慢慢开，站站停。</p>
      </div>
    </section>
    <section className="tone-section"><div className="wrap short-copy"><DabaIllustration className="story-illustration" pose="bus" /><h2>为什么叫大巴？</h2><p>起点固定、路线清晰、谁都能上、到站即达。我希望做内容也是这样，不端着，也不绕路。</p></div></section>
    <section className="wrap content-section"><div className="section-heading"><h2>路上会聊些什么</h2><p>不卷更新频率，卷每一条的质量。</p></div>
      <div className="topic-list">
        <article><DabaIllustration className="topic-illustration" pose="phone" /><div><h3>AI 工具实测</h3><p>每个工具亲手跑一遍再写：能干嘛、怎么上手、值不值。不恰饭，才敢说真话。</p></div></article>
        <article><DabaIllustration className="topic-illustration" pose="stretch" /><div><h3>效率折腾手册</h3><p>上班族视角的效率技巧。怎么把重复劳动交给 AI，把时间还给生活。</p></div></article>
        <article><DabaIllustration className="topic-illustration" pose="petCat" /><div><h3>动漫副驾频道</h3><p>下班路上的精神食粮：追番碎碎念、冷门安利，偶尔剧透警告。</p></div></article>
      </div>
    </section>
    <section className="page-close wrap"><h2>想一起聊聊？</h2><p>选一个你习惯的地方，找到大巴。</p><Link className="btn btn-ink" href="/contact/">乘车指南</Link></section>
  </main>;
}
