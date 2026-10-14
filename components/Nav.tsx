"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/articles/", label: "文章" },
  { href: "/about/", label: "司机档案" },
  { href: "/contact/", label: "乘车指南" },
];
export default function Nav() {
  const pathname = usePathname() || "/";
  return <nav className="nav" aria-label="主导航"><div className="nav-inner">
    <Link className="nav-logo" href="/" aria-label="大巴，回到首页">大巴</Link>
    <div className="nav-links">{links.map(link => {
      const active = pathname.startsWith(link.href);
      return <Link key={link.href} href={link.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{link.label}</Link>;
    })}</div>
  </div></nav>;
}
