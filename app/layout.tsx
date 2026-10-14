import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "大巴Bus · 分享 AI 工具的普通上班族",
    template: "%s · 大巴Bus",
  },
  description:
    "大巴Bus 的个人站——用大白话分享 AI 工具实测、效率折腾手册和动漫副驾日常。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
