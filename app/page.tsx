import Link from "next/link";
import DabaIllustration from "../components/DabaIllustration";
export default function Home() {
  return <main id="main-content" className="home-page">
    <div className="home-screen">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-intro"><h1 id="home-title">和大巴，一起探索 AI。</h1><p>一个普通上班族的实测与日常。</p></div>
        <DabaIllustration className="home-illustration" pose="wave" priority />
        <Link className="btn btn-ink" href="/articles/">阅读实测</Link>
      </section>
      <section className="home-latest" aria-label="最新文章">
        <Link className="latest-inner" href="/articles/workbuddy-vs-codex/"><div><span className="subtle">最新文章</span><h2>WorkBuddy vs Codex</h2><p>从个人网站到个人 IP，两轮 AI 协作的真实记录。</p></div><span className="latest-read">阅读复盘 ↗</span></Link>
        <p id="lines" className="home-topics">AI 工具实测 · 效率折腾手册 · 动漫副驾日常</p>
      </section>
    </div>
    {/* 赛博盲盒预留位：内容上线后替换 .blindbox-slot 内部即可，首屏不受影响。 */}
    <section id="blindbox" className="home-blindbox wrap" aria-labelledby="blindbox-title">
      <DabaIllustration className="blindbox-illustration" pose="surprised" />
      <div className="blindbox-copy">
        <span className="subtle">下一站</span>
        <h2 id="blindbox-title">赛博盲盒</h2>
        <p>大巴正在装箱，里面会是什么，上线那天揭晓。</p>
      </div>
      <div className="blindbox-slot" aria-label="赛博盲盒即将上线"><span aria-hidden="true">?</span><strong>即将上线</strong></div>
    </section>
  </main>;
}
