#!/bin/bash

# FLOCK Token Supply API 快速部署脚本
# 使用方法: ./deploy.sh

echo "🚀 FLOCK Token Supply API 快速部署脚本"
echo "=========================================="

# 检查 Git 状态
echo "📋 检查 Git 状态..."
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 工作目录干净，没有未提交的更改"
else
    echo "⚠️  发现未提交的更改，正在添加..."
    git add .
    git commit -m "Update: $(date)"
fi

# 检查远程仓库
echo "🔍 检查远程仓库配置..."
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ 远程仓库已配置: $(git remote get-url origin)"
else
    echo "❌ 远程仓库未配置"
    echo "请先在 GitHub 上创建仓库，然后运行以下命令："
    echo "git remote add origin https://github.com/你的用户名/flock-api.git"
    exit 1
fi

# 推送代码到 GitHub
echo "📤 推送代码到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码推送成功！"
else
    echo "❌ 代码推送失败，请检查网络连接和权限"
    exit 1
fi

echo ""
echo "🎉 部署到 GitHub 完成！"
echo ""
echo "📋 下一步操作："
echo "1. 登录 Vercel: https://vercel.com"
echo "2. 点击 'New Project'"
echo "3. 选择 'Import Git Repository'"
echo "4. 选择你的 flock-api 仓库"
echo "5. 配置项目并点击 'Deploy'"
echo ""
echo "🔗 或者使用 Vercel CLI 部署："
echo "npm i -g vercel"
echo "vercel --prod"
echo ""
echo "📚 详细部署指南请查看: GITHUB_DEPLOYMENT.md"
