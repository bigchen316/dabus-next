import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "乘车指南" };

// TODO: 各平台主页直达链接拿到后，填进 href 即可变成可点击的车票
const stops = [
  {
    no: "NO.001",
    name: "微信公众号",
    handle: "大巴的公路志",
    note: "微信搜索即可关注，更新第一时间到站。",
    href: "",
  },
  {
    no: "NO.002",
    name: "小红书",
    handle: "大巴的副驾",
    note: "搜索「大巴的副驾」，最近的 AI 工具实测都在这。",
    href: "",
  },
  {
    no: "NO.003",
    name: "Bilibili",
    handle: "大巴bus",
    note: "搜索「大巴bus」，视频版内容逐步上线。",
    href: "",
  },
  {
    no: "NO.004",
    name: "抖音",
    handle: "大巴bus",
    note: "搜索「大巴bus」，碎片时间刷到我。",
    href: "",
  },
  {
    no: "NO.005",
    name: "邮箱直通车",
    handle: "wangc98316@gmail.com",
    note: "合作、建议、唠嗑都欢迎，看到就会回。",
    href: "mailto:wangc98316@gmail.com",
  },
];

export default function Contact() {
  return (
    <main id="main-content" className="editorial-page editorial-contact">
      <div className="wrap page-head editorial-page-head">
        <span className="label-caps">Tickets · Boarding</span>
        <h1>乘车指南</h1>
        <p className="hand">五条上车通道，挑一条顺眼的。</p>
      </div>

      <section className="editorial-contact-section">
        <div className="wrap">
          <div className="tickets">
            {stops.map((s, i) => {
              const inner = (
                <>
                  <div className="ticket-stub">
                    <span>DA BA BUS</span>
                  </div>
                  <div className="ticket-body">
                    <span className="ticket-no">{s.no} · SINGLE TRIP</span>
                    <h3>{s.name}</h3>
                    <span className="ticket-handle">{s.handle}</span>
                    <p>{s.note}</p>
                  </div>
                </>
              );
              return (
                <Reveal key={s.no} delay={i * 0.08}>
                  {s.href ? (
                    <a className="ticket" href={s.href}>
                      {inner}
                    </a>
                  ) : (
                    <div className="ticket">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <p className="ticket-note">
            * 平台主页直达链接整理中，现阶段用站名搜索最稳；邮箱那一站是直达的。
          </p>
          <div className="editorial-contact-next">
            <p>第一次来？先从首页认识这趟车。</p>
            <Link href="/">回到始发站 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
