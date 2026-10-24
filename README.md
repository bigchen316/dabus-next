# dabus-next · 大巴Bus 个人站（Next.js 版）

大巴Bus 的个人站。纯静态导出，构建产物可直接部署到任何静态托管。项目不设固定设计规范，样式和交互按需要随时调整。

## 技术栈

- **Next.js 15**（App Router + TypeScript）
- **静态导出**（`output: "export"`）— 零服务端依赖，`out/` 目录扔哪都能跑
- **零 UI 依赖** — 样式写在 `app/globals.css`（颜色等放在顶部 CSS 变量），不引 Tailwind / 组件库
- **单页站点** — 只有首页（3D 公仔与星空）和 404 页

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发模式 http://localhost:3000
npm run serve      # 本地预览 out/ http://localhost:4173
```

发布前运行 `npm run build`，再运行 `node scripts/check-export-links.cjs` 检查有没有坏链接或丢失的图片。

素材脚本（需要时运行）：
- `node scripts/make-home-images.cjs "E:\个人IP形象文件"`：从形象资料导出首页 3D 图和基础款转盘帧到 `public/home/`。基础款通过 Blender 绕头部中心的竖轴渲染，所有角度共用固定机位与裁切；不要手动替换生成图片。首次生成需要本机 Blender（默认 5.2，可用 `BLENDER_PATH` 指定路径），之后使用临时缓存；模型或渲染脚本改变时自动重新生成。
- `node scripts/make-starfield.cjs`：重新生成首页星空 SVG

## 页面结构

| 路由 | 内容 | 布局模式 |
|---|---|---|
| `/` | 首页：基础款转盘、产品、AI skill 实测、推荐、关于我、联系方式 | 星空背景、杂志式首屏、五类内容原地切换、桌面三列项目卡片 |

## 内容待补（TODO）

后续补齐各平台的真实主页 URL；当前保留账号搜索说明和可直达的邮箱。文章、司机档案、乘车指南三个页面已于 2026-10-24 删除，需要时可从 Git 历史恢复。

首页转盘只响应拖动、左右按钮与方向键，没有自动播放，Home 回到正面、End 到最后一帧。分类点击后在同一区域淡入切换，黄色指示条跟随当前分类；支持方向键、Home、End 切换分类，直接链接和浏览器返回也会恢复对应分类。系统开启“减少动态效果”时关闭滚动和过渡动画。

首页项目统一维护在 `content/home-cards.json`，每项包含名称和介绍，网址和封面可选；填了网址整张卡片可以打开对应网站或静态 HTML，不填就只展示、不可点击。以后增加网站或交互插图，参见[添加首页项目](./docs/个人网站/添加首页项目.md)。

当前整合版只推送 `preview/hero-turntable`，由该分支自动更新预览，不直接推送 `main`。推荐清单保留“整理中”占位，待有真实内容后补齐。

## 项目资料

维护指南和部署指南已集中整理在 [`docs/个人网站/`](./docs/个人网站/README.md)。Next.js 页面、组件、静态资源和构建配置保留在项目根目录，确保现有构建与部署流程不变。

## 版权

- 代码与品牌内容：© 2026 大巴Bus
- 设计方法论：ESTHER不二 / esther-design-system（CC BY-NC-SA 4.0，需署名、禁商用、相同方式共享）
