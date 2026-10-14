import type { Metadata } from "next";
import DesignArchive from "../../../components/DesignArchive";
export const metadata: Metadata = { title: "IP 设计记录" };
export default function IPLabPage() { return <DesignArchive previous="IP 自由探索" pose="thinking" />; }
