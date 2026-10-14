export default function DabaIllustration({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <div className={"daba-illustration " + className}><img src="/illustrations/daba-wave-01.png" alt="大巴 IP 的第一个招手动作：黑发少年穿黑色服装，微笑挥手" width="1185" height="1327" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" /></div>;
}
