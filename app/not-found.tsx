import Link from "next/link";
import DabaIllustration from "../components/DabaIllustration";
export default function NotFound() {
  return <main id="main-content" className="content-page"><header className="page-heading wrap"><h1>这一站还没到。</h1><p>这个页面不存在，先回到大巴的始发站吧。</p></header><DabaIllustration className="article-banner" /><div className="page-close"><Link className="btn btn-ink" href="/">回到首页</Link></div></main>;
}
