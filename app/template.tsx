import ArrivalTransition from "../components/ArrivalTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition"><ArrivalTransition />{children}</div>;
}
