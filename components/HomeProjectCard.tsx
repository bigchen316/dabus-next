import Link from "next/link";
import HomeBlindboxCard from "./HomeBlindboxCard";

export type HomeCard = {
  id: string;
  title: string;
  description: string;
  url: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
  action?: string;
  interactive?: "blindbox";
};

export default function HomeProjectCard({ card }: { card: HomeCard }) {
  if (card.interactive === "blindbox") return <HomeBlindboxCard card={card} />;
  // 静态 HTML 项目使用普通链接，避免把 public/projects 下的网页交给 Next 路由。
  const CardLink = /^\/(articles|about|contact)\//.test(card.url) ? Link : "a";
  return <CardLink href={card.url} className="home-card home-project-card">
    <div className="home-card-head"><h3>{card.title}</h3><span className="home-arrow" aria-hidden="true">↗</span></div>
    {card.tag && <span className="home-project-tag">{card.tag}</span>}
    <p>{card.description}</p>
    {card.image && <div className="home-project-visual"><img src={card.image} alt={card.imageAlt || card.title} width={900} height={675} loading="lazy" decoding="async" /></div>}
    {card.action && <span className="home-project-action">{card.action}</span>}
  </CardLink>;
}
