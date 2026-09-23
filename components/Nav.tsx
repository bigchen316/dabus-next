"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/about/", label: "司机档案" },
  { href: "/contact/", label: "乘车指南" },
];

function norm(p: string) {
  const q = p.replace(/\/+$/, "");
  return q === "" ? "/" : q;
}

export default function Nav() {
  const pathname = norm(usePathname() || "/");
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-logo" href="/">
          <span className="dot" />
          <b>大巴Bus</b>
          <span className="route">ROUTE 01</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === norm(l.href) ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
          <Link className="board" href="/contact/">
            上车
          </Link>
        </div>
      </div>
    </nav>
  );
}
