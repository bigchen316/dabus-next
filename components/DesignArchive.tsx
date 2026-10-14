import Link from "next/link";
import DabaIllustration from "./DabaIllustration";
export default function DesignArchive({ previous }: { previous?: string }) {
  return <main id="main-content" className="content-page">
    <header className="page-heading wrap"><h1>手绘大巴，继续出发。</h1><p>个人网站已统一采用 C 版：苹果式简洁页面与清爽手绘 IP。</p></header>
    <div className="wrap"><DabaIllustration className="article-banner" /><section className="archive-note"><h2>{previous ? previous + "已归档" : "新的方向，已经选定。"}</h2><p>早期方案保留在项目的设计记录中。这个旧地址仍然可以访问，现在会把你带回新的大巴个人站。</p><div className="archive-links"><Link href="/">回到首页</Link><Link href="/articles/">阅读文章</Link><Link href="/about/">认识大巴</Link></div></section></div><div className="page-close" />
  </main>;
}
