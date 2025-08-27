# 🚀 GitHub 到 Vercel 部署指南

## 📋 前置要求

1. **GitHub 账户** - 如果没有，请先注册 [GitHub](https://github.com)
2. **Vercel 账户** - 如果没有，请先注册 [Vercel](https://vercel.com)
3. **本地 Git 配置** - 确保已配置用户名和邮箱

## 🔧 步骤 1: 配置 Git 用户信息

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱地址"
```

## 📁 步骤 2: 在 GitHub 上创建仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `flock-api`
   - **Description**: `FLOCK Token Supply API - 符合 CoinGecko 要求的 circulating supply API`
   - **Visibility**: 选择 Public 或 Private
   - **不要**勾选 "Add a README file"（我们已经有了）
4. 点击 "Create repository"

## 🔗 步骤 3: 连接本地仓库到 GitHub

复制 GitHub 提供的命令（类似这样）：

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/flock-api.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## ☁️ 步骤 4: 在 Vercel 上部署

### 方法 1: 通过 Vercel Dashboard（推荐）

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 找到并选择你的 `flock-api` 仓库
5. 配置项目：
   - **Project Name**: `flock-api`（或自定义名称）
   - **Framework Preset**: 选择 "Other"
   - **Root Directory**: `./`（保持默认）
   - **Build Command**: 留空（不需要构建）
   - **Output Directory**: 留空
   - **Install Command**: `npm install`
6. 点击 "Deploy"

### 方法 2: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

## ⚙️ 步骤 5: 配置环境变量（可选）

在 Vercel Dashboard 中：

1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加以下变量（如果需要自定义）：

```bash
RPC_URL=https://mainnet.base.org
CACHE_DURATION=1800000
RATE_LIMIT_MAX=100
```

## 🔄 步骤 6: 自动部署设置

### 启用自动部署

1. 在 Vercel Dashboard 中，进入项目设置
2. 选择 "Git"
3. 确保 "Auto Deploy" 已启用
4. 选择部署分支（通常是 `main` 或 `master`）

### 部署触发器

- **Push to main**: 每次推送到主分支时自动部署
- **Pull Request**: 创建 PR 时部署预览版本
- **Manual**: 手动触发部署

## 📱 步骤 7: 测试部署

部署完成后，你会得到一个 Vercel 域名，类似：
```
https://flock-api-xxx.vercel.app
```

### 测试 API 端点

```bash
# 测试 API 是否正常工作
curl https://你的域名.vercel.app/api/supply
```

## 🚨 常见问题解决

### 问题 1: 部署失败

**症状**: 构建失败或部署错误
**解决方案**:
- 检查 `vercel.json` 配置
- 确认 `package.json` 中的依赖
- 查看 Vercel 构建日志

### 问题 2: API 返回 500 错误

**症状**: API 端点返回服务器错误
**解决方案**:
- 检查 Base 网络连接
- 验证 RPC 节点可用性
- 查看 Vercel 函数日志

### 问题 3: 缓存不工作

**症状**: 每次请求都查询区块链
**解决方案**:
- 检查缓存配置
- 确认环境变量设置
- 重启部署

## 🔧 高级配置

### 自定义域名

1. 在 Vercel Dashboard 中进入项目设置
2. 选择 "Domains"
3. 添加你的自定义域名
4. 配置 DNS 记录

### 环境配置

```bash
# 开发环境
vercel --env RPC_URL=https://mainnet.base.org

# 生产环境
vercel --prod --env RPC_URL=https://mainnet.base.org
```

## 📊 监控和维护

### 部署状态监控

- Vercel Dashboard 实时状态
- 部署历史记录
- 性能指标

### 日志查看

```bash
# 查看实时日志
vercel logs

# 查看特定函数的日志
vercel logs api/supply
```

## 🎯 最佳实践

1. **分支策略**: 使用 `main` 分支作为生产分支
2. **测试**: 在推送到主分支前进行充分测试
3. **监控**: 定期检查 API 性能和可用性
4. **备份**: 重要配置和代码要备份到 GitHub
5. **文档**: 保持 README 和部署文档的更新

## 🚀 快速部署检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] 自动部署已启用
- [ ] API 端点测试通过
- [ ] 环境变量已配置（如需要）
- [ ] 自定义域名已配置（如需要）

## 📞 获取帮助

- **Vercel 文档**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub 帮助**: [help.github.com](https://help.github.com)
- **项目 Issues**: 在 GitHub 仓库中创建 Issue

---

**恭喜！** 🎉 你的 FLOCK Token Supply API 现在已经通过 GitHub 自动部署到 Vercel 了！

每次你推送代码到 GitHub 主分支时，Vercel 都会自动重新部署你的 API。
