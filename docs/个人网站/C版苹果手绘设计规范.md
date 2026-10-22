# C 版：苹果式简洁页面与清爽手绘 IP

更新：2026-10-15。用户已确认 C 版，并授权按内容配置不同静态动作，缺少的动作可以按现有 IP 补画。

## 视觉

- 页面白 #FFFFFF，辅助面 #F5F5F7，正文 #1D1D1F，次要文字 #6E6E73。
- 黄色 #FFD233 来自 IP 点缀与当前导航标记，不再铺满品牌三色。
- 系统无衬线字体，不加载外部字体；短标题、大留白，正文阅读优先。
- 只有插图带手绘笔触；界面不用撕纸、车票边框、投影、渐变或玻璃。
- 角色身份统一，动作按语境选择，不再每页都用同一张招手图。黑发、黑黄服装、不戴眼镜、二维手绘质感必须保持。
- 首页保留透明底 daba-wave-01.png；其余已有动作由 daba-ip-24-actions-transparent.png 在页面中分区呈现，只加载一份动作表。动作边界集中管理在 components/daba-poses.json。
- AI 项目复盘使用 public/illustrations/daba-laptop-transparent.png；电脑、人物和服装保持同一手绘语言。
- 插图以透明画布直接融入页面，不带浅灰色纸底、矩形底板、白边或光晕；人物、鞋和道具中的浅色细节保留。使用真实 PNG alpha，不通过混合模式模拟透明；原始素材保留以便恢复。
- 每处插图都应能解释其作用，同一页不重复动作，不覆盖文字和按钮。正文插图小于页面主视觉，手机优先保证阅读空间。

## 动作与内容

| 位置 | 动作 | 用意 |
| --- | --- | --- |
| 首页 | 招手 | 欢迎读者 |
| 首页赛博盲盒预留位 | 惊讶捧脸 | 预告即将揭晓的惊喜 |
| 司机档案 | 背包 | 介绍一起出发的人 |
| 为什么叫大巴 | 乘坐小巴 | 呼应名字与内容路线 |
| AI 工具实测介绍 | 手机 | 亲手体验工具 |
| 效率介绍 | 伸展身体 | 把省下的时间还给生活 |
| 动漫介绍 | 陪黑猫 | 下班后的兴趣与陪伴 |
| 邮箱入口 | 写字 | 认真写下想聊的事 |
| 平台账号 | 平板 | 浏览内容与保持联系 |
| 阅读入口 | 指路 | 指向下一站 |
| 文章列表 | 阅读 | 进入真实文章 |
| 项目复盘头图 | 使用电脑 | 真实 AI 与网页工作场景 |
| 设计起稿内容 | 画本与黑猫 | 展示 IP 设计 |
| 文章结尾 | 点赞 | 鼓励亲自尝试 |
| 404 页面 | 望远镜 | 寻找正确页面 |
| 旧方案归档 | 回望、行走、休息、跑步、思考、跃起、系鞋带、远望 | 各地址动作不同，保留回到正式站的入口 |

不为摆满页面而加图，不将角色做成按钮，不引入动画。

## 页面

- 首页：首屏固定一屏高度，中央手绘主角、阅读实测按钮、最新文章。首屏下方是赛博盲盒预留位（2026-10-22 用户确认），内容未做好前显示“即将上线”，不加点击交互。桌面和手机均适配。
- 图片：页面使用 WebP（`node scripts/make-webp.cjs` 由 PNG 生成），PNG 保留为源素材和回退。
- 文章列表：只列真实文章，不使用设计图 B 中的占位文章或日期。
- 文章详情：窄列正文、清晰标题、可横向查看的对比表。历史文章内容保留，注明记录时间。
- 司机档案：手绘形象、自介、内容方向和联系方式入口。
- 乘车指南：真实邮箱直接链接，其他平台保留真实账号搜索说明，不伪造主页地址。
- 旧设计链接：统一 C 版外观与归档说明，旧素材、规范和代码历史可从项目记录找回。
- 404 页面：同一套视觉、明确返回首页入口。

## 行为

保留真实导航、文章及邮箱链接、键盘焦点与跳过导航。无入场、跳页、滚动、悬停、角色互动或循环动画。任何恢复动画的改动都需要用户重新确认。

## 素材生成

2026-10-14 更新：使用内置 image_gen，对用户提供的 24 动作图做透明背景提取。提示词：只提取左上角第一格站立微笑招手人物，一只手在画面左侧举起，另一只手插兜；保留原角色面容、黑发黄色笔触、黑色上衣长裤、黄色胸口点缀与白黄鞋，以及二维铅笔漫画质感；保留招手旁的小黄色符号；移除其他 23 个动作、纸张背景和地面笔迹；完整保留头发、举起的手和双鞋，输出真实透明背景，不重新设计，不添加巴士、猫、眼镜、耳机、道具、文字、水印、阴影或三维效果。

## 设计方法

2026-10-15 透明画布更新：使用内置 image_gen 编辑动作表和电脑动作；原素材未覆盖，生成文件保存为 public/illustrations/daba-ip-24-actions-transparent.png 和 public/illustrations/daba-laptop-transparent.png。提示词：

```text
Use case: background-extraction. EDIT TARGET: the supplied 1536x1024 IP sprite sheet of 24 poses in 6 columns and 4 rows. Primary request: remove ONLY the pale gray/off-white paper backdrop to create a genuine transparent-alpha sprite sheet for website illustrations, NOT a redraw. Keep exact 1536x1024 canvas, all 24 original poses in their exact original pixel positions, sizes and order; no layout shifts, cropping or rescaling. Preserve character identity and every drawing, including face and opaque pale face/white eyes/white-and-yellow shoes, black clothing, yellow highlights, cats, bus, props, yellow expressive marks. Distinguish white interiors of characters/objects from the paper backdrop: interiors must remain opaque. Remove paper texture and rectangular light-gray backing fully everywhere around and between figures. Preserve black/yellow pencil edges without a pale paper halo. No new illustration, checkerboard drawn into image, background, frame, text, watermark, extra characters, 3D, or invented elements. Genuine transparent background ONLY.
```

```text
Use case: background-extraction. EDIT ONLY the existing IP boy at desk with laptop. Remove the entire soft pale/gray halo and stray white glyph at lower right. Create a clean true transparent cutout: outside the boy, chair, laptop and desk, alpha must be zero, including holes between chair/desk legs. Preserve the exact original boy identity, pose, desk, drawing, 1536x1024 landscape canvas, subject placement and size. Keep opaque pale face, white/yellow sneakers, pencil/crayon white interior strokes and every black/yellow object detail. Do NOT redraw or restyle the character, change composition, or add cats, bus, shadow, halo, paper texture, background rectangle, text, watermark, ground or 3D. Only remove peripheral backdrop/halo and stray glyph; no other changes.
```

新增电脑动作由内置 image_gen 生成，参考原 24 动作图。提示词：

```text
Use case: illustration-story. Make ONE new static 2D hand-drawn IP action for a personal website's AI project-review article. Input sheet is CHARACTER AND STYLE REFERENCE, not an edit target. Use the SAME boy: messy short black hair with yellow strokes, large black oval eyes, small rosy cheeks, black zip hoodie with yellow chest patch, black pants, white-and-yellow sneakers, no glasses or headphones. Match the sheet's pencil/crayon ink texture and proportions faithfully; no glossy surfaces or 3D. New pose: seated at a compact simple desk, focused but smiling, both hands naturally typing on a laptop. Laptop mostly gray-black with a small yellow accent, screen lid visible from a slight front-side angle. Full seated boy and both shoes visible. Only boy, desk and laptop; no cat, bus or extra props. Tightly composed landscape cutout on GENUINE TRANSPARENT alpha background. No scenery, rectangle background, text, symbols, watermark, shadows or animation.
```

延续 design-taste-frontend 公开版中的短标题、真实内容、主视觉集中、去装饰原则，使用 frontend-design 落地。旧 v1.1 规范已从当前项目删除，可从 Git 历史恢复。本文件是网站唯一现行设计规范；旧探索稿与动效契约均不作为实现依据。
