import Link from "next/link";
import DabaIllustration from "../components/DabaIllustration";
export default function Home() {
  return <main id="main-content" className="home-page">
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-intro"><h1 id="home-title">和大巴，一起探索 AI。</h1><p>一个普通上班族的实测与日常。</p></div>
      <DabaIllustration className="home-illustration" priority />
      <Link className="btn btn-ink" href="/articles/">阅读实测</Link>
    </section>
    <section className="home-latest" aria-label="最新文章">
      <Link className="latest-inner" href="/articles/workbuddy-vs-codex/"><div><span className="subtle">最新文章</span><h2>WorkBuddy vs Codex</h2><p>从个人网站到个人 IP，两轮 AI 协作的真实记录。</p></div><span className="latest-read">阅读复盘 ↗</span></Link>
      <p id="lines" className="home-topics">AI 工具实测 · 效率折腾手册 · 动漫副驾日常</p>
    </section>
  </main>;
}
