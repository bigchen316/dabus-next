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
  if (pathname === "/") {
    return <nav className="nav nav--home" aria-label="主导航"><div className="nav-inner">
      <div className="home-nav-group"><Link href="/articles/">文章</Link><Link href="#products">探索</Link></div>
      <Link className="nav-logo" href="/" aria-label="大巴，回到首页">大巴<span aria-hidden="true">DABA</span></Link>
      <div className="home-nav-group">{links.slice(1).map(link => <Link key={link.href} href={link.href}>{link.href === "/about/" ? "关于" : "联系"}</Link>)}</div>
    </div></nav>;
  }
  return <nav className="nav" aria-label="主导航"><div className="nav-inner">
    <Link className="nav-logo" href="/" aria-label="大巴，回到首页">大巴</Link>
    <div className="nav-links">{links.map(link => {
      const active = pathname.startsWith(link.href);
      return <Link key={link.href} href={link.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{link.label}</Link>;
    })}</div>
  </div></nav>;
}
