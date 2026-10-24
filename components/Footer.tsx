"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  if ((usePathname() || "/") === "/") return null;
  return <footer className="site-footer">
    <div className="wrap footer-main"><div><Link className="footer-brand" href="/">大巴</Link><p>分享 AI 工具、效率折腾和动漫日常。</p></div>
      <a className="footer-email" href="mailto:wangc98316@gmail.com">wangc98316@gmail.com</a>
    </div>
    <div className="wrap footer-bottom"><span>© 2026 大巴Bus · 慢慢开，站站停</span></div>
  </footer>;
}
