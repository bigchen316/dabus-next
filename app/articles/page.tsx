import type { Metadata } from "next";
import Link from "next/link";
import DabaIllustration from "../../components/DabaIllustration";
export const metadata: Metadata = { title: "文章", description: "大巴亲手试过的 AI 工具、个人项目和效率折腾记录。" };
export default function Articles() {
  return <main id="main-content" className="content-page article-list-page"><header className="page-heading wrap"><h1>亲手试过，再分享。</h1><p>AI 工具、个人项目，以及普通上班族的真实体验。</p></header>
    <section className="wrap"><article className="article-feature"><div><h2>同一个个人站，<br />两轮 AI 协作。</h2><p>从 Work Buddy 的视觉起稿，到 Codex 对网站代码、设计规范和 IP 的继续优化。这是一次真实的个人项目记录。</p><Link className="article-preview-link" href="/articles/workbuddy-vs-codex/">阅读 WorkBuddy vs Codex</Link></div><DabaIllustration className="article-feature-art" pose="read" /></article><p className="article-list-note">下一篇，等我亲手试完再出发。</p></section>
  </main>;
}
