import Link from "next/link";

type IPVariant = "pop" | "os" | "cinema";

const variantNames: Record<IPVariant, string> = {
  pop: "贴纸主角",
  os: "司机操作台",
  cinema: "夜行主角",
};

function LabHeader({ variant }: { variant: IPVariant }) {
  return (
    <header className="ip-lab-header">
      <Link href="/design-options/ip-lab/" className="ip-lab-brand"><span>大</span><b>大巴Bus</b><small>IP LAB / {variantNames[variant]}</small></Link>
      <nav><Link href="/about/">司机档案</Link><Link href="/articles/workbuddy-vs-codex/">改版实测</Link><Link href="/contact/">乘车指南</Link></nav>
      <Link className="ip-lab-back" href="/design-options/ip-lab/">三版稿子 ↗</Link>
    </header>
  );
}

function LabSwitch({ current }: { current: IPVariant }) {
  return <div className="ip-lab-switch">{(Object.keys(variantNames) as IPVariant[]).filter((item) => item !== current).map((item) => <Link key={item} href={`/design-options/ip-lab/${item}/`}>再看：{variantNames[item]} ↗</Link>)}</div>;
}

function PopLab() {
  return (
    <main className="ip-lab ip-lab--pop">
      <LabHeader variant="pop" />
      <section className="ip-pop-hero">
        <div className="ip-pop-copy"><span className="ip-pop-label">PERSONAL IP / ISSUE 01</span><h1>这个人，<br /><em>专讲复杂的。</em></h1><p>我是大巴。白天上班，晚上把 AI 工具、效率折腾和动漫日常，整理成你能看懂的东西。</p><div className="ip-pop-tags"><span>AI 实测</span><span>普通上班族</span><span>不戴眼镜</span></div><Link href="#pop-routes" className="ip-pop-cta">跟着大巴走 <span>↓</span></Link></div>
        <div className="ip-pop-hero-art"><span className="ip-pop-sticker ip-pop-sticker--top">本人驾驶<br />安心上车</span><div className="ip-pop-avatar"><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /></div><span className="ip-pop-sticker ip-pop-sticker--side">NO<br />BORING<br />TUTORIAL</span><b className="ip-pop-art-label">DA BA<br /><i>2026</i></b></div>
      </section>
      <section className="ip-pop-routes" id="pop-routes"><div className="ip-pop-section-title"><small>THE DA BA MIXTAPE</small><h2>三种内容，<br /><em>一个主角。</em></h2></div><div className="ip-pop-route-list"><article><b>01</b><div><small>AI TOOLS</small><h3>AI 工具实测</h3><p>亲手试过再说，能干嘛、怎么上手、值不值得。</p></div><span>↗</span></article><article><b>02</b><div><small>WORKFLOW</small><h3>效率折腾手册</h3><p>把重复劳动交给 AI，把时间还给生活。</p></div><span>↗</span></article><article><b>03</b><div><small>ANIME SEAT</small><h3>动漫副驾频道</h3><p>下班路上的追番碎碎念和冷门安利。</p></div><span>↗</span></article></div></section>
      <section className="ip-pop-feature"><div className="ip-pop-feature-mark">NEW<br />DROP</div><div><small>FIRST REVIEW / PROJECT NOTES</small><h2>同一个个人站，<br />两轮 AI 协作。</h2><p>从 Work Buddy 的视觉起稿，到 Codex 优化网站和大巴 IP，记录一次真实改版。</p><Link href="/articles/workbuddy-vs-codex/">拆开看这次改版 →</Link></div></section>
      <footer className="ip-lab-footer"><Link href="/">大巴Bus <small>慢慢开，站站停</small></Link><LabSwitch current="pop" /></footer>
    </main>
  );
}

function OsLab() {
  return (
    <main className="ip-lab ip-lab--os">
      <LabHeader variant="os" />
      <section className="ip-os-hero"><div className="ip-os-copy"><span>DA BA FIELD OS / BOOT 001</span><h1>把复杂的东西，<strong>跑起来。</strong></h1><p>一个普通上班族的个人操作台：把工具放进真实工作流，再留下能跟着做的结论。</p><div className="ip-os-actions"><Link href="#os-channels">打开频道 <b>↘</b></Link><Link href="/contact/">联系司机 <b>↗</b></Link></div></div><div className="ip-os-console"><div className="ip-os-console-bar"><span><i /> SYSTEM ONLINE</span><b>DRIVER_001</b></div><div className="ip-os-screen"><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /><span className="ip-os-cross ip-os-cross--a" /><span className="ip-os-cross ip-os-cross--b" /><b>DA BA<br /><small>CONTENT DRIVER</small></b></div><div className="ip-os-readout"><span>STATUS <b>READY</b></span><span>SHIFT <b>AFTER WORK</b></span><span>MODE <b>PLAIN TALK</b></span></div></div></section>
      <section className="ip-os-channels" id="os-channels"><div className="ip-os-section-heading"><span>01 / CHANNEL MATRIX</span><h2>正在运行的内容进程</h2><p>不是知识库，是我真的试过的一天。</p></div><div className="ip-os-channel-grid"><article><span>CH_A</span><h3>AI 工具实测</h3><p>把新工具放进工作流，记录输入、过程和结论。</p><div><i style={{ width: "76%" }} /><b>76%</b></div></article><article><span>CH_B</span><h3>效率折腾手册</h3><p>从一个上班族的时间预算出发，拆掉重复劳动。</p><div><i style={{ width: "52%" }} /><b>52%</b></div></article><article><span>CH_C</span><h3>动漫副驾频道</h3><p>下班以后，给生活留一点不需要效率的时间。</p><div><i style={{ width: "31%" }} /><b>31%</b></div></article></div></section>
      <section className="ip-os-log"><div><span>02 / ACTIVITY LOG</span><h2>司机不是专家，<br />只是先替你跑一遍。</h2><Link href="/about/">查看司机档案 ↗</Link></div><ol><li><time>09:12</time><b>INPUT</b><span>收到一个新工具</span></li><li><time>18:27</time><b>TEST</b><span>放进真实工作流</span></li><li><time>22:04</time><b>OUTPUT</b><span>留下能跟着做的结论</span></li><li className="ip-os-log-live"><time>NOW</time><b>LIVE</b><span>等待下一次发车</span></li></ol></section>
      <footer className="ip-lab-footer"><Link href="/">大巴Bus <small>FIELD OS / OFF DUTY</small></Link><LabSwitch current="os" /></footer>
    </main>
  );
}

function CinemaLab() {
  return (
    <main className="ip-lab ip-lab--cinema">
      <LabHeader variant="cinema" />
      <section className="ip-cinema-hero"><div className="ip-cinema-hero-copy"><span>DA BA NIGHT BUS / A PERSONAL FILM</span><h1>下班以后，<br /><em>故事才开始。</em></h1><p>一辆没有终点的夜行大巴，载着 AI 工具、效率折腾和动漫日常，慢慢穿过普通人的生活。</p><Link href="#cinema-chapters" className="ip-cinema-cta">播放这段旅程 <span>→</span></Link></div><div className="ip-cinema-hero-art"><div className="ip-cinema-orbit ip-cinema-orbit--one" /><div className="ip-cinema-orbit ip-cinema-orbit--two" /><img src="/avatars/daba-headphones-confident.png" alt="大巴的无眼镜耳机 IP 形象" /><span>DRIVER<br /><b>DA BA</b></span></div><div className="ip-cinema-frame-no">FRAME 001 / 003</div></section>
      <section className="ip-cinema-chapters" id="cinema-chapters"><div className="ip-cinema-chapter-intro"><span>CHAPTERS</span><h2>这趟车的三幕。</h2><p>每一幕都从真实体验开始，停在一个能带走的结论。</p></div><article><div className="ip-cinema-chapter-no">01</div><div><small>THE TOOL</small><h3>先把 AI 放到桌面上</h3><p>不追热点，先看它能不能帮普通人完成一件具体的事。</p></div><b>↗</b></article><article><div className="ip-cinema-chapter-no">02</div><div><small>THE WORKFLOW</small><h3>再放进真实的一天</h3><p>从上班、下班到临睡前，看看效率到底换来了什么。</p></div><b>↗</b></article><article><div className="ip-cinema-chapter-no">03</div><div><small>THE AFTERGLOW</small><h3>最后留一点动漫时间</h3><p>不是所有事情都需要被优化，副驾也可以只负责快乐。</p></div><b>↗</b></article></section>
      <section className="ip-cinema-feature"><span>EPISODE 001 / ARCHIVE</span><h2>同一个个人站，<br />两轮 AI 协作。</h2><Link href="/articles/workbuddy-vs-codex/">观看改版复盘 ↗</Link></section>
      <footer className="ip-lab-footer"><Link href="/">大巴Bus <small>NIGHT BUS / KEEP MOVING</small></Link><LabSwitch current="cinema" /></footer>
    </main>
  );
}

export default function IPLab({ variant }: { variant: IPVariant }) {
  if (variant === "os") return <OsLab />;
  if (variant === "cinema") return <CinemaLab />;
  return <PopLab />;
}
