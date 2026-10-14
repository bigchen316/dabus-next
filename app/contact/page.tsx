import type { Metadata } from "next";
import Link from "next/link";
import DabaIllustration from "../../components/DabaIllustration";
export const metadata: Metadata = { title: "乘车指南" };
const stops = [
  { name: "微信公众号", handle: "大巴的公路志", note: "微信搜索即可关注，更新第一时间到站。" },
  { name: "小红书", handle: "大巴的副驾", note: "搜索「大巴的副驾」，最近的 AI 工具实测都在这。" },
  { name: "Bilibili", handle: "大巴bus", note: "搜索「大巴bus」，视频版内容逐步上线。" },
  { name: "抖音", handle: "大巴bus", note: "搜索「大巴bus」，碎片时间刷到我。" },
];
export default function Contact() {
  return <main id="main-content" className="content-page">
    <header className="page-heading wrap"><h1>下一站，找到大巴。</h1><p>合作、建议、唠嗑，都欢迎。</p></header>
    <section className="contact-intro wrap"><div className="email-panel"><h2>直接写封邮件</h2><a className="email-address" href="mailto:wangc98316@gmail.com">wangc98316@gmail.com</a><p>看到就会回。说说你想聊的事就好。</p></div><DabaIllustration className="contact-illustration" /></section>
    <section className="tone-section"><div className="wrap"><div className="section-heading"><h2>也可以在这些地方见</h2><p>平台主页链接整理中，搜索下面的名字即可。</p></div>
      <dl className="platform-list">{stops.map(stop => <div key={stop.name}><dt>{stop.name}</dt><dd><strong>{stop.handle}</strong><p>{stop.note}</p><span className="subtle">站内搜索</span></dd></div>)}</dl>
    </div></section>
    <section className="page-close wrap"><h2>第一次来？</h2><p>先看看我亲手试过的工具和项目。</p><Link className="btn btn-ink" href="/articles/">阅读实测</Link></section>
  </main>;
}
