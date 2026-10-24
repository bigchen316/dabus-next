# dabus-next · 大巴Bus 个人站（Next.js 版）

大巴Bus 的个人站。纯静态导出，构建产物可直接部署到任何静态托管。项目不设固定设计规范，样式和交互按需要随时调整。

## 技术栈

- **Next.js 15**（App Router + TypeScript）
- **静态导出**（`output: "export"`）— 零服务端依赖，`out/` 目录扔哪都能跑
- **零 UI 依赖** — 样式写在 `app/globals.css`（颜色等放在顶部 CSS 变量），不引 Tailwind / 组件库
- **统一 IP、不同动作** — 首页使用 3D 公仔形象与星空；其余页面和内容区按语境使用手绘 24 动作图，项目复盘使用电脑工作姿势

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发模式 http://localhost:3000
npm run serve      # 本地预览 out/ http://localhost:4173
```

发布前运行 `npm run build`，再运行 `node scripts/check-export-links.cjs` 检查有没有坏链接或丢失的图片。

素材脚本（需要时运行）：
- `node scripts/make-home-images.cjs "E:\个人IP形象文件"`：从形象资料导出首页 3D 图、基础款与熬夜款转盘帧到 `public/home/`。基础款通过 Blender 绕头部中心的竖轴渲染，所有角度共用固定机位与裁切；不要手动替换生成图片。首次生成需要本机 Blender（默认 5.2，可用 `BLENDER_PATH` 指定路径），之后使用临时缓存；模型或渲染脚本改变时自动重新生成。
- `node scripts/make-starfield.cjs`：重新生成首页星空 SVG
- `node scripts/make-webp.cjs`：内容页手绘插图 PNG 转 WebP

## 页面结构

| 路由 | 内容 | 布局模式 |
|---|---|---|
| `/` | 首页：基础款转盘、产品、AI skill 实测、推荐、关于我、联系方式 | 星空背景、杂志式首屏、五类内容原地切换、桌面三列项目卡片 |
| `/about/` | 司机档案：背包 IP、自介与内容方向配图 | 留白分栏 / 文本内容 |
| `/contact/` | 乘车指南：邮箱与平台账号 | 邮箱入口 / 清晰账号列表 |
| `/articles/` | 真实文章列表 | 文章主视觉与阅读入口 |
| `/articles/workbuddy-vs-codex/` | Work Buddy 与 Codex 共同迭代个人网站和 IP 的项目复盘 | 长文 / 横向比较表 |

## 内容待补（TODO）

后续补齐各平台的真实主页 URL；当前保留账号搜索说明和可直达的邮箱。文章列表只展示已发布内容，不使用占位文章或虚构日期。

首页转盘只响应拖动、左右按钮与方向键，没有自动播放，Home 回到正面、End 到最后一帧。分类点击后在同一区域淡入切换，黄色指示条跟随当前分类；支持方向键、Home、End 切换分类，直接链接和浏览器返回也会恢复对应分类。系统开启“减少动态效果”时关闭滚动和过渡动画。

首页项目统一维护在 `content/home-cards.json`，每项包含名称、介绍和目标网址，封面可选；整张卡片可以打开对应网站或静态 HTML。以后增加网站或交互插图，参见[添加首页项目](./docs/个人网站/添加首页项目.md)。

当前整合版只推送 `preview/hero-turntable`，由该分支自动更新预览，不直接推送 `main`。推荐清单保留“整理中”占位，待有真实内容后补齐。

## 项目资料

维护指南和部署指南已集中整理在 [`docs/个人网站/`](./docs/个人网站/README.md)。Next.js 页面、组件、静态资源和构建配置保留在项目根目录，确保现有构建与部署流程不变。

## 版权

- 代码与品牌内容：© 2026 大巴Bus
- 设计方法论：ESTHER不二 / esther-design-system（CC BY-NC-SA 4.0，需署名、禁商用、相同方式共享）
