/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出：构建产物可直接部署到任何静态托管（也兼容本机 serve.js 预览）
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
