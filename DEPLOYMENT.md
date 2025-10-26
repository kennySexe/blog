# 部署到 GitHub Pages 的步骤

## 1. 构建静态文件

在项目根目录运行以下命令来生成静态 HTML 文件：

\`\`\`bash
npm run build
\`\`\`

这将在项目中创建一个 `out` 目录，包含所有静态 HTML、CSS 和 JavaScript 文件。

## 2. 部署到 GitHub Pages

### 方法一：手动部署

1. 将 `out` 目录中的所有文件复制到你的 GitHub Pages 仓库
2. 提交并推送到 GitHub
3. 在仓库设置中启用 GitHub Pages，选择主分支作为源

### 方法二：使用 GitHub Actions 自动部署

在你的仓库中创建 `.github/workflows/deploy.yml` 文件：

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
\`\`\`

## 3. 访问你的网站

部署完成后，你的网站将在以下地址可用：
- `https://[你的用户名].github.io/[仓库名]/`

## 注意事项

- 确保 `next.config.mjs` 中已设置 `output: 'export'`
- 所有图片已设置为 `unoptimized: true`
- 如果你的仓库不是根目录部署，需要在 `next.config.mjs` 中添加 `basePath`
