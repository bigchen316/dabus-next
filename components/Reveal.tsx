/** 保留既有布局容器；内容直接显示，不再观察滚动或播放入场动画。 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={`reveal${className ? ` ${className}` : ""}`}>{children}</div>;
}
