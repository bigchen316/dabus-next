export default function DabaIllustration({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <div className={"daba-illustration " + className}><img src="/illustrations/daba-c-bus.png" alt="大巴从黄色小巴车窗挥手，黑猫趴在车顶，一起探索 AI 和日常" width="1200" height="720" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" /></div>;
}
