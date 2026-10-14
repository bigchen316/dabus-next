import DesignArchive from "./DesignArchive";
import type { DabaPose } from "./DabaIllustration";
const names = { station: "硬派站牌", editorial: "公路编辑部", signal: "夜间信号台" };
const actions: Record<keyof typeof names, DabaPose> = { station: "walking", editorial: "sleep", signal: "running" };
export default function DesignConcept({ variant }: { variant: keyof typeof names }) { return <DesignArchive previous={names[variant]} pose={actions[variant]} />; }
