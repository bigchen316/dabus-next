import DesignArchive from "./DesignArchive";
const names = { pop: "贴纸主角", os: "司机操作台", cinema: "夜行主角" };
export default function IPLab({ variant }: { variant: keyof typeof names }) { return <DesignArchive previous={names[variant]} />; }
