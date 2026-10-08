import type { Metadata } from "next";
import IPLab from "../../../../components/IPLab";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ variant: "pop" }, { variant: "os" }, { variant: "cinema" }];
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const names: Record<string, string> = { pop: "贴纸主角", os: "司机操作台", cinema: "夜行主角" };
  return {
    title: `${names[variant] || "IP 自由探索"} · 设计稿`,
    description: "围绕大巴个人 IP 的自由视觉探索稿。",
  };
}

export default async function IPLabVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  return <IPLab variant={variant as "pop" | "os" | "cinema"} />;
}
