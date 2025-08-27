# 部署指南

## 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称填写：`flock-api`
4. 选择 "Public"（公开）
5. 不要勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

## 步骤 2: 连接本地仓库到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/flock-api.git

# 推送代码到 GitHub
git push -u origin main
```

## 步骤 3: 部署到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的 `flock-api` 仓库
5. 保持默认设置，点击 "Deploy"

## 步骤 4: 获取 API 链接

部署完成后，你会得到一个类似这样的链接：
```
https://flock-api-xxxxx.vercel.app
```

你的 API 端点将是：
```
https://flock-api-xxxxx.vercel.app/api/supply
```

## 步骤 5: 测试 API

使用以下命令测试 API：

```bash
curl https://flock-api-xxxxx.vercel.app/api/supply
```

或者在浏览器中访问：
```
https://flock-api-xxxxx.vercel.app/api/supply
```

## 注意事项

- 确保你的 GitHub 仓库是公开的
- Vercel 会自动检测到 `vercel.json` 配置
- API 将在几分钟内可用
- 如果需要自定义域名，可以在 Vercel 项目设置中配置

## 故障排除

如果遇到问题：

1. 检查 GitHub 仓库是否为公开
2. 确认 `vercel.json` 文件存在且格式正确
3. 查看 Vercel 部署日志
4. 确保所有依赖都已正确安装
