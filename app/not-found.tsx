import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="home not-found">
    <h1>这一站还没到。</h1>
    <p>这个页面不存在，先回到大巴的始发站吧。</p>
    <Link className="home-explore" href="/">回到首页<span aria-hidden="true">→</span></Link>
  </main>;
}
