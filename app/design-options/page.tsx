import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "三版个人网站设计方向",
  description: "以大巴的交通黄、柏油黑和信号绿为核心，为个人网站设计的三种大胆视觉方向。",
};

const options = [
  { id: "station", no: "01", name: "硬派站牌", english: "BOLD BUS STOP", text: "黑底与交通黄强碰撞，像一张大巴主题的城市海报。大胆、醒目、记忆点最强。", colors: ["#1a1a1a", "#ffc400", "#00c853"], mark: "大巴\n正在发车" },
  { id: "editorial", no: "02", name: "公路编辑部", english: "ROAD JOURNAL", text: "大标题、杂志式留白和绿色路线标记。更像一个持续更新、有观点的个人内容品牌。", colors: ["#fefcf6", "#1a1a1a", "#00c853"], mark: "把复杂的\n讲成人话" },
  { id: "signal", no: "03", name: "夜间信号台", english: "NIGHT SIGNAL", text: "深色控制台配信号绿和交通黄。科技氛围更浓，适合突出 AI 工具和实测内容。", colors: ["#151821", "#00c853", "#ffc400"], mark: "AI TOOL\nSIGNAL ON" },
];

export default function DesignOptions() {
  return (
    <main id="main-content" className="options-page">
      <header className="options-header">
        <Link href="/">← 回到大巴个人站</Link>
        <span>BRAND COLORS · 3 DESIGN DIRECTIONS</span>
      </header>
      <section className="options-intro">
        <span className="label-caps">DA BA · DESIGN STUDIES</span>
        <h1>同一辆大巴，<br /><span>三种开法。</span></h1>
        <p>围绕交通黄、柏油黑、信号绿，重新设计现有个人站。三版都保留你的真实定位、IP 形象和首篇文章，重点比较视觉方向与内容呈现。</p>
        <div className="options-palette" aria-label="品牌三色">
          <span><i style={{ backgroundColor: "#ffc400" }} />交通黄 · #FFC400</span>
          <span><i style={{ backgroundColor: "#1a1a1a" }} />柏油黑 · #1A1A1A</span>
          <span><i style={{ backgroundColor: "#00c853" }} />信号绿 · #00C853</span>
        </div>
      </section>
      <section className="options-grid" aria-label="三版设计方案">
        {options.map((option) => (
          <article className={`option-card option-card--${option.id}`} key={option.id}>
            <div className="option-preview" style={{ "--swatch-a": option.colors[0], "--swatch-b": option.colors[1], "--swatch-c": option.colors[2] } as React.CSSProperties}>
              <span className="option-preview-top">DA BA BUS <i>ROUTE 01</i></span>
              <b>{option.mark.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</b>
              <span className="option-preview-track"><i /><i /><i /></span>
              <span className="option-preview-bottom">{option.english}</span>
            </div>
            <div className="option-card-copy">
              <span className="option-number">方向 {option.no} / {option.english}</span>
              <h2>{option.name}</h2>
              <p>{option.text}</p>
              <Link href={`/design-options/${option.id}/`}>查看完整首页方案 <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>
      <footer className="options-footer">
        <p>这是三种可浏览的设计提案。选中方向后，再把它应用到正式首页与其余页面。</p>
        <Link href="/">先回当前网站 →</Link>
      </footer>
    </main>
  );
}
