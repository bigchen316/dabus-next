import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "落地页预览" };
const versions = [
  { href: "/preview/a/", name: "A · 白色展台", note: "苹果式留白，公仔像展品一样居中，内容按卡片排开。" },
  { href: "/preview/b/", name: "B · 人物在左", note: "按形象规范的网站主视觉：人物在左、文字在右，内容像一条公交线路逐站展开。" },
  { href: "/preview/c/", name: "C · 巴黄海报", note: "巴黄大色块加贴纸边公仔，标题更大更有个性，适合做记忆点。" },
  { href: "/preview/c2/", name: "C2 · 巴黄海报 × 窄栏排版", note: "保留 C 的巴黄和贴纸公仔，参考 oiloil.org：窄栏、超大三行标题、大字分区导航、编号卡片与联系列表。" },
];
export default function PreviewIndex() {
  return <main id="main-content" className="pv-index wrap">
    <h1>三版落地页预览</h1>
    <p className="subtle">临时页面，不会被搜索引擎收录。选定后其余两版删除。</p>
    <ul>{versions.map(v => <li key={v.href}><Link href={v.href}><strong>{v.name}</strong><span>{v.note}</span></Link></li>)}</ul>
  </main>;
}
