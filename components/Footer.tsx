"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  if ((usePathname() || "/") === "/") return null;
  return <footer className="site-footer">
    <div className="wrap footer-main"><div><Link className="footer-brand" href="/">大巴</Link><p>分享 AI 工具、效率折腾和动漫日常。</p></div>
      <div className="footer-links"><Link href="/articles/">文章</Link><Link href="/about/">司机档案</Link><Link href="/contact/">乘车指南</Link></div>
      <a className="footer-email" href="mailto:wangc98316@gmail.com">wangc98316@gmail.com</a>
    </div>
    <div className="wrap footer-bottom"><span>© 2026 大巴Bus · 慢慢开，站站停</span><span>早期设计参考：ESTHER不二 / esther-design-system（CC BY-NC-SA 4.0）</span></div>
  </footer>;
}
