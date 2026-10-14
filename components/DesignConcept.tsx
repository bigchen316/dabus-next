import DesignArchive from "./DesignArchive";
const names = { station: "硬派站牌", editorial: "公路编辑部", signal: "夜间信号台" };
export default function DesignConcept({ variant }: { variant: keyof typeof names }) { return <DesignArchive previous={names[variant]} />; }
