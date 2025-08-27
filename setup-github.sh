#!/bin/bash

echo "🚀 FLOCK Token Supply API 部署脚本"
echo "=================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 flock-api 项目目录中运行此脚本"
    exit 1
fi

echo "📋 当前项目状态："
echo "   - 项目名称: flock-api"
echo "   - 版本: 1.0.0"
echo "   - 类型: module"
echo ""

# 检查 git 状态
if [ -d ".git" ]; then
    echo "✅ Git 仓库已初始化"
    echo "📝 最近的提交:"
    git log --oneline -3
    echo ""
else
    echo "❌ Git 仓库未初始化"
    exit 1
fi

# 检查远程仓库
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ 远程仓库已配置:"
    echo "   $(git remote get-url origin)"
    echo ""
    echo "🔄 推送最新代码..."
    git push origin main
else
    echo "⚠️  远程仓库未配置"
    echo ""
    echo "📝 请按照以下步骤操作："
    echo "1. 在 GitHub 上创建新仓库 'flock-api'"
    echo "2. 运行以下命令："
    echo "   git remote add origin https://github.com/YOUR_USERNAME/flock-api.git"
    echo "   git push -u origin main"
    echo ""
    echo "3. 然后访问 https://vercel.com 部署项目"
    echo ""
fi

echo "🎯 下一步："
echo "1. 确保代码已推送到 GitHub"
echo "2. 访问 https://vercel.com"
echo "3. 连接 GitHub 仓库并部署"
echo "4. 获取你的 API 链接"
echo ""
echo "📖 详细说明请查看 deploy.md 文件"
echo "🧪 本地测试请运行: node test-local.js"
