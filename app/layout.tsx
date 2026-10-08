import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ArrivalTransition from "../components/ArrivalTransition";

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
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fira+Code:wght@400;500&family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <ArrivalTransition />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
