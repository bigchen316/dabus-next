# dabus-next · 大巴Bus 个人站（Next.js 版）

采用 C 版苹果式简洁页面与清爽手绘招手 IP 的 Next.js 实际项目。纯静态导出，构建产物可直接部署到任何静态托管。

## 技术栈

- **Next.js 15**（App Router + TypeScript）
- **静态导出**（`output: "export"`）— 零服务端依赖，`out/` 目录扔哪都能跑
- **零 UI 依赖** — 样式全部来自规范 token（CSS 变量），不引 Tailwind / 组件库
- **统一 IP、不同动作** — 首页保留招手形象，其余页面和内容区按语境使用 24 动作图；项目复盘新增电脑工作姿势

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发模式 http://localhost:3000
npm run serve      # 本地预览 out/ http://localhost:4173
```

替换插图 PNG 后运行 `node scripts/make-webp.cjs` 重新生成页面用的 WebP。发布前运行 `npm run build`，再运行 `node scripts/check-ip-poses.cjs` 与 `node scripts/check-export-links.cjs`。动作检查包含 C 版样式与无动画要求。

## 页面结构

| 路由 | 内容 | 布局模式 |
|---|---|---|
| `/` | 首页：手绘 IP、阅读实测与最新文章；下方为赛博盲盒预留位 | 首屏一屏、中央主角，下滚见盲盒 |
| `/about/` | 司机档案：背包 IP、自介与内容方向配图 | 留白分栏 / 文本内容 |
| `/contact/` | 乘车指南：邮箱与平台账号 | 邮箱入口 / 清晰账号列表 |
| `/articles/` | 真实文章列表 | 文章主视觉与阅读入口 |
| `/articles/workbuddy-vs-codex/` | Work Buddy 与 Codex 共同迭代个人网站和 IP 的项目复盘 | 长文 / 横向比较表 |
| `/design-options/` | 早期方案归档说明 | C 版统一外观 / 返回正式站 |

## 设计规范

所有视觉决策遵循唯一现行的 [C 版苹果手绘设计规范](./docs/个人网站/C版苹果手绘设计规范.md)。旧 v1.1 规范已删除，可从 Git 历史恢复。

- 白底 `#FFFFFF`、灰面 `#F5F5F7`、墨色 `#1D1D1F`，黄色仅作点缀
- 系统无衬线字体、响应式排版、二维手绘招手 IP
- 无装饰性互动或动画，保留正常链接和键盘焦点

## 内容待补（TODO）

后续补齐各平台的真实主页 URL；当前保留账号搜索说明和可直达的邮箱。文章列表只展示已发布内容，不使用占位文章或虚构日期。

## 项目资料

设计规范、维护指南和部署指南已集中整理在 [`docs/个人网站/`](./docs/个人网站/README.md)。Next.js 页面、组件、静态资源和构建配置保留在项目根目录，确保现有构建与部署流程不变。

## 版权

- 代码与品牌内容：© 2026 大巴Bus
- 设计方法论：ESTHER不二 / esther-design-system（CC BY-NC-SA 4.0，需署名、禁商用、相同方式共享）
