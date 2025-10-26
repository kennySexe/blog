# AI-Powered Medical Image Clarity Enhancement Blog

这是一个关于 AI 驱动的医学图像清晰度增强的静态博客文章页面。

## 技术栈

- Next.js 16 (静态导出模式)
- React 19
- Tailwind CSS v4
- TypeScript

## 本地开发

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 构建静态文件

\`\`\`bash
# 生成静态 HTML 文件
npm run build
\`\`\`

构建完成后，静态文件将生成在 `out` 目录中。

## 部署到 GitHub Pages

详细的部署步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 文件。

### 快速部署步骤：

1. 运行 `npm run build` 生成静态文件
2. 将 `out` 目录中的内容上传到你的 GitHub Pages 仓库
3. 在 GitHub 仓库设置中启用 GitHub Pages

## 项目结构

\`\`\`
.
├── app/
│   ├── page.tsx          # 主博客文章页面
│   ├── layout.tsx        # 根布局
│   └── globals.css       # 全局样式
├── public/               # 静态资源（图片等）
├── next.config.mjs       # Next.js 配置（已配置静态导出）
└── package.json          # 项目依赖
\`\`\`

## 特性

- ✅ 完全静态，无需服务器
- ✅ 响应式设计，支持移动端
- ✅ 浮动目录导航（桌面端）
- ✅ 清晰的排版和可读性
- ✅ 优化的图片加载
- ✅ 可直接部署到 GitHub Pages

## License

MIT
