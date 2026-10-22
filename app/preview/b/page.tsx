import type { Metadata } from "next";
import Link from "next/link";
import { email, latest, pillars, platforms } from "../content";
export const metadata: Metadata = { title: "预览 B · 人物在左" };

export default function PreviewB() {
  return <main id="main-content" className="pb">
    <section className="pb-hero wrap" aria-labelledby="pb-title">
      <div className="pb-stage"><img src="/landing/hero-cutout.webp" alt="大巴 3D 形象：黑色运动套装，胸前黄色小 W，微笑站立" width={546} height={1311} fetchPriority="high" /></div>
      <div className="pb-copy">
        <p className="pb-tag">始发站 · 大巴Bus</p>
        <h1 id="pb-title">一个普通上班族，<br />把 AI 讲成人话。</h1>
        <p>我是大巴。AI 爱好者，也是资深动漫观众。用下班后的时间，亲手试 AI 工具，把能干嘛、怎么上手、值不值一次说清。</p>
        <div className="pb-actions"><Link className="btn btn-ink" href="/articles/">阅读实测</Link><Link className="pb-link" href="/contact/">乘车指南 ›</Link></div>
      </div>
    </section>

    <section className="pb-route wrap" aria-labelledby="pb-route">
      <div className="pb-route-head"><h2 id="pb-route">这条线路的三个站</h2><p>不卷更新频率，卷每一条的质量。</p></div>
      <ol>{pillars.map((p, i) => <li key={p.title}>
        <span className="pb-stop" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
        <div className="pb-stop-copy"><h3>{p.title}</h3><p>{p.text}</p></div>
        <img src={p.img} alt={p.alt} width={900} height={900} loading="lazy" decoding="async" />
      </li>)}</ol>
    </section>

    <section className="pb-band">
      <div className="wrap pb-band-inner">
        <Link href={latest.href}><span>最新到站</span><h2>{latest.title}</h2><p>{latest.text}</p></Link>
        <img src="/landing/daba-car.webp" alt="大巴开着一辆白色带黄色 W 的小车" width={1200} height={800} loading="lazy" decoding="async" />
      </div>
    </section>

    <section className="pb-contact wrap" aria-labelledby="pb-contact">
      <h2 id="pb-contact">下一站，找到大巴</h2>
      <ul>{platforms.map(p => <li key={p.name}><span>{p.name}</span><strong>{p.handle}</strong></li>)}</ul>
      <a className="pb-email" href={`mailto:${email}`}>写封邮件：{email}</a>
    </section>
  </main>;
}
