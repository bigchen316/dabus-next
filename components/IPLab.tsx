import DesignArchive from "./DesignArchive";
import type { DabaPose } from "./DabaIllustration";
const names = { pop: "贴纸主角", os: "司机操作台", cinema: "夜行主角" };
const actions: Record<keyof typeof names, DabaPose> = { pop: "jump", os: "tieShoes", cinema: "lookout" };
export default function IPLab({ variant }: { variant: keyof typeof names }) { return <DesignArchive previous={names[variant]} pose={actions[variant]} />; }
