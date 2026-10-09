"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/";
  if (pathname === "/" || pathname.startsWith("/design-options")) return null;

  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <b>大巴Bus</b>
            <p>
              一辆开在内容公路上的大巴车——分享 AI 工具、效率折腾和动漫日常，
              乘客是愿意一起往前走的人。
            </p>
          </div>
          <div>
            <span className="f-title">Stops · 站点</span>
            <ul className="f-list">
              <li><Link href="/">首页</Link></li>
              <li><Link href="/about/">司机档案</Link></li>
              <li><Link href="/contact/">乘车指南</Link></li>
            </ul>
          </div>
          <div>
            <span className="f-title">Follow · 关注</span>
            <ul className="f-list">
              <li><span className="plat">公众号</span>大巴的公路志</li>
              <li><span className="plat">小红书</span>大巴的副驾</li>
              <li><span className="plat">B 站</span>大巴bus</li>
              <li><span className="plat">抖音</span>大巴bus</li>
              <li>
                <span className="plat">邮箱</span>
                <a href="mailto:wangc98316@gmail.com">wangc98316@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <span>© 2026 大巴Bus · 慢慢开，站站停</span>
          <span>设计方法论来源：ESTHER不二 / esther-design-system（CC BY-NC-SA 4.0）</span>
        </div>
      </div>
    </footer>
  );
}
