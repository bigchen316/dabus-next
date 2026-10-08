import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata: Metadata = {
  title: "同一个个人站，两轮 AI 协作：从 Work Buddy 到 Codex",
  description:
    "用大巴个人网站和 IP 形象的真实迭代，记录 Work Buddy 的视觉起稿与 Codex 的代码优化。",
};

export default function WorkBuddyVsCodexArticle() {
  return (
    <main id="main-content" className="article-page">
      <header className="article-hero wrap">
        <span className="label-caps">AI TOOL REVIEW · PROJECT NOTES</span>
        <h1>同一个个人站，<br />两轮 AI 协作</h1>
        <p className="article-dek">
          从 Work Buddy 的视觉起稿，到 Codex 对网站代码、设计规范和 IP 形象的继续优化，
          这是一次真实的个人项目迭代记录。
        </p>
        <div className="article-meta">
          <span>大巴Bus</span><span>个人项目复盘</span><span>2026.09</span>
        </div>
      </header>

      <article className="article-body wrap">
        <aside className="article-note">
          <b>先说明比较范围</b>
          <p>
            这不是同一提示词、同一条件下的工具排名。Work Buddy 和 Codex 参与的是这个项目的不同阶段，
            下文只对照留下来的页面、头像和代码产物。
          </p>
        </aside>

        <Reveal>
          <section className="article-section">
            <span className="sec-num">01</span>
            <h2>第一轮：先把网站的样子搭出来</h2>
            <p>
              Work Buddy 帮我把“分享 AI 工具的普通上班族”这个定位，变成了一套完整的巴士主题视觉：
              有单页 Landing，也有首页、内容站、司机档案和联系页组成的多页稿。车票、站牌、路线图、
              到站广播这些元素，让个人网站从一开始就有了统一的叙事线。
            </p>
            <p>
              早期 IP 也走矢量路线：挡风玻璃当脸，头顶有黄色线路牌，黑色衣服配绿色细节，圆眼镜沿用了参考图的感觉。
              它轮廓简洁，适合放进网页和规范里继续改。
            </p>
            <div className="article-callout">
              <b>这一轮留下的价值</b>
              <p>品牌方向、页面模块和视觉母题先成形，我可以先看整套方案，再决定哪些值得继续做。</p>
            </div>
            <p>
              但起稿不等于内容已经准备好。旧稿里的头像还是占位图，文章卡片没有真实文章可读，
              一些社交入口也还是空链接。它清楚地展示了网站可以长什么样，也把待补的真实内容暴露了出来。
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-section">
            <span className="sec-num">02</span>
            <h2>第二轮：把方案继续变成可维护的网站</h2>
            <p>
              后续我在 Codex 里继续改造实际项目，把站点整理成 Next.js 页面和可复用组件，
              并将设计规范更新到 v1.1。首页、司机档案和乘车指南使用同一套样式与导航，
              手机布局、键盘焦点和减少动态效果等细节也纳入实现。
            </p>
            <p>
              IP 形象也跟着我的反馈迭代：我本人不戴眼镜，所以新版去掉眼镜，加入耳机，
              最后选了抱臂版作为网站统一形象。原来的黄牌、巴士脸、黑色主体和绿色提示灯仍然保留，
              新形象的表情和耳机细节更突出。
            </p>
            <div className="article-callout">
              <b>这一轮留下的价值</b>
              <p>不只调整页面观感，也把选中的形象接进网站，让首页和个人档案实际使用同一份素材。</p>
            </div>
            <p>
              这次整理也有取舍：当前站点的页面结构更精简，但旧稿里“内容站”的想法还没有变成完整的文章归档。
              所以这篇复盘既是一次项目记录，也是网站第一篇可阅读的实测内容。
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-section">
            <span className="sec-num">03</span>
            <h2>放在一起看，差异更像是阶段差异</h2>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr><th>观察项</th><th>Work Buddy 初稿</th><th>Codex 当前迭代</th></tr>
                </thead>
                <tbody>
                  <tr><th>网站形态</th><td>单页方案和多页静态稿，页面构想比较展开</td><td>Next.js 实际项目，组件和页面更便于持续维护</td></tr>
                  <tr><th>内容状态</th><td>结构和卡片先搭好，文章及部分链接仍是占位</td><td>首页与个人档案已落地，文章归档还可以继续补齐</td></tr>
                  <tr><th>IP 形象</th><td>矢量巴士角色，圆眼镜、黄牌、黑衣和绿色点缀</td><td>无眼镜耳机巴士，细节更丰富，已用于网站首页和档案页</td></tr>
                  <tr><th>适合留下的东西</th><td>视觉探索、页面骨架、早期品牌方向</td><td>项目代码、响应式实现、统一规范和后续修改入口</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              IP 素材也各有特点：矢量版本缩放和改色方便；新版 PNG 的表情和耳机细节更多。
              对现在的网站来说，我先用新版做统一主形象，矢量稿仍然适合以后做小图标、贴纸或动画拆件。
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-section">
            <span className="sec-num">04</span>
            <h2>这次改版让我更确定的一件事</h2>
            <p>
              个人网站真正变丰富，不是页面越多越好，而是每个入口背后都有真实内容。Work Buddy 帮我先看见了
              “大巴的站”可以是什么样；Codex 帮我把选中的方向接进实际项目，并继续按我的反馈改细节。
              接下来最值得补的，是持续更新的实测文章和可以直达的平台链接。
            </p>
            <p>
              这篇先从我自己的改版过程开始。后面我会继续记录 AI 工具怎么融进普通上班族的工作和生活，
              亲自试过，再把好用和不好用的地方讲清楚。
            </p>
          </section>
        </Reveal>

        <footer className="article-end">
          <span className="chip">下一站 · AI 工具实测</span>
          <p>如果你也在搭个人网站，欢迎来聊聊你卡在哪一站。</p>
          <Link className="btn btn-ink" href="/contact/">去乘车指南 →</Link>
        </footer>
      </article>
    </main>
  );
}
