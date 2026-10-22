import type { Metadata } from "next";
import "./preview.css";

// 临时预览：选定一版后整个 app/preview 目录删除或并入首页。
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
