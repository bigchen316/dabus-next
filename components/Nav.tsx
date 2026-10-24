import Link from "next/link";

export default function Nav() {
  return <nav className="nav nav--home" aria-label="主导航"><div className="nav-inner">
    <Link className="nav-logo" href="/" aria-label="大巴，回到首页">大巴<span aria-hidden="true">DABA</span></Link>
  </div></nav>;
}
