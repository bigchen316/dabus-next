import type { Metadata } from "next";
import Link from "next/link";
import IPLab from "../../../components/IPLab";

export const metadata: Metadata = {
  title: "IP 自由探索 · 三版设计稿",
  description: "围绕大巴无眼镜耳机 IP，跳出原设计规范的三种个人网站视觉草案。",
};

export default function IPLabPage() {
  return (
    <main id="main-content">
      <div className="ip-lab-index">
        <header className="ip-lab-index-header">
          <Link href="/design-options/">← 返回三版方向</Link>
          <span>IP LAB · OUTSIDE THE SYSTEM</span>
        </header>
        <section className="ip-lab-index-intro">
          <span>DA BA · PERSONAL IP EXPLORATION</span>
          <h1>不按规范，<br /><em>只看这个人。</em></h1>
          <p>这组稿子保留你的无眼镜耳机 IP、内容和真实身份，但暂时放下交通黄、柏油黑、信号绿，探索三种更像“个人品牌”的表达。</p>
          <div className="ip-lab-index-note"><b>本轮只选气质</b><span>选中之后，再决定是否把它发展成正式首页。</span></div>
        </section>
        <section className="ip-lab-index-grid" aria-label="IP 自由探索三版方案">
          <article className="ip-lab-index-card ip-lab-index-card--pop">
            <div className="ip-lab-index-swatch"><span>DA BA</span><b>POP<br />DRIVER</b><i>01</i></div>
            <div><small>01 / DA BA POP</small><h2>贴纸主角</h2><p>把 IP 做成一张会说话的贴纸海报。轻松、亲近、第一眼就有记忆点。</p><Link href="/design-options/ip-lab/pop/">看这版稿子 ↗</Link></div>
          </article>
          <article className="ip-lab-index-card ip-lab-index-card--os">
            <div className="ip-lab-index-swatch"><span>DA BA</span><b>FIELD<br />OS</b><i>02</i></div>
            <div><small>02 / DA BA FIELD OS</small><h2>司机操作台</h2><p>把你变成一台内容操作系统。IP 是驾驶员，文章是正在运行的任务。</p><Link href="/design-options/ip-lab/os/">看这版稿子 ↗</Link></div>
          </article>
          <article className="ip-lab-index-card ip-lab-index-card--cinema">
            <div className="ip-lab-index-swatch"><span>DA BA</span><b>NIGHT<br />BUS</b><i>03</i></div>
            <div><small>03 / DA BA NIGHT BUS</small><h2>夜行主角</h2><p>把个人站做成一段夜间公路片。更沉浸、更有情绪，适合讲故事和做专题。</p><Link href="/design-options/ip-lab/cinema/">看这版稿子 ↗</Link></div>
          </article>
        </section>
        <footer className="ip-lab-index-footer"><Link href="/">先回正式网站 →</Link><span>本页是设计探索，不会自动替换正式站。</span></footer>
      </div>
    </main>
  );
}
