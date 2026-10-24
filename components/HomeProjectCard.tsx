import HomeBlindboxCard from "./HomeBlindboxCard";

export type HomeCard = {
  id: string;
  title: string;
  description: string;
  url?: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
  action?: string;
  interactive?: "blindbox";
};

export default function HomeProjectCard({ card }: { card: HomeCard }) {
  if (card.interactive === "blindbox") return <HomeBlindboxCard card={card} />;
  const body = <>
    <div className="home-card-head"><h3>{card.title}</h3>{card.url && <span className="home-arrow" aria-hidden="true">↗</span>}</div>
    {card.tag && <span className="home-project-tag">{card.tag}</span>}
    <p>{card.description}</p>
    {card.image && <div className="home-project-visual"><img src={card.image} alt={card.imageAlt || card.title} width={900} height={675} loading="lazy" decoding="async" /></div>}
    {card.url && card.action && <span className="home-project-action">{card.action}</span>}
  </>;
  // 没有网址的卡片只做介绍，不可点击。静态 HTML 项目用普通链接，不交给 Next 路由。
  if (!card.url) return <div className="home-card home-project-card">{body}</div>;
  return <a href={card.url} className="home-card home-project-card">{body}</a>;
}
