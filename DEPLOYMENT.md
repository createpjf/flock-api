# FLOCK Token Supply API 部署指南

## 🚀 快速部署

### 1. Vercel 部署（推荐）

#### 前置要求
- 安装 [Vercel CLI](https://vercel.com/cli)
- 拥有 Vercel 账户

#### 部署步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署到生产环境**
   ```bash
   vercel --prod
   ```

4. **配置环境变量（如需要）**
   ```bash
   vercel env add RPC_URL
   vercel env add CACHE_DURATION
   ```

### 2. 本地开发

#### 启动开发服务器
```bash
npm run dev
```

#### 测试 API
```bash
npm test
```

## 📋 部署检查清单

### ✅ 基础配置
- [ ] 项目依赖已安装 (`npm install`)
- [ ] 环境变量已配置
- [ ] 网络连接正常（可访问 Base 网络）

### ✅ API 功能测试
- [ ] 端点可访问 (`/api/supply`)
- [ ] 返回正确的 JSON 格式
- [ ] 包含所有必需字段
- [ ] 错误处理正常工作

### ✅ 性能测试
- [ ] 响应时间 < 2秒
- [ ] 缓存机制正常工作
- [ ] Rate limiting 生效

### ✅ 安全测试
- [ ] CORS 配置正确
- [ ] 无敏感信息泄露
- [ ] 输入验证有效

## 🔧 环境配置

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `RPC_URL` | `https://mainnet.base.org` | Base 网络 RPC 节点 |
| `CACHE_DURATION` | `1800000` | 缓存时间（毫秒） |
| `RATE_LIMIT_MAX` | `100` | 每小时最大请求数 |

### 配置示例

```bash
# .env.local
RPC_URL=https://mainnet.base.org
CACHE_DURATION=1800000
RATE_LIMIT_MAX=100
```

## 📊 监控和日志

### 日志配置
- 所有错误都会记录到控制台
- 建议配置日志聚合服务（如 Vercel Analytics）

### 性能监控
- 响应时间监控
- 错误率监控
- 缓存命中率监控

## 🚨 故障排除

### 常见问题

#### 1. RPC 连接失败
**症状**: 500 错误，无法连接到 Base 网络
**解决方案**: 
- 检查网络连接
- 验证 RPC URL 是否正确
- 尝试备用 RPC 节点

#### 2. 缓存不工作
**症状**: 每次请求都查询区块链
**解决方案**:
- 检查缓存配置
- 验证内存状态
- 重启服务

#### 3. Rate Limiting 过于严格
**症状**: 频繁返回 429 错误
**解决方案**:
- 调整 `RATE_LIMIT_MAX` 值
- 增加 `RATE_LIMIT_WINDOW` 时间

### 调试模式

启用详细日志：
```javascript
// 在 supply.js 中添加
const DEBUG = process.env.DEBUG === 'true';

if (DEBUG) {
  console.log('Debug mode enabled');
  console.log('Request details:', req.method, req.url);
}
```

## 🔄 更新和维护

### 代码更新
1. 推送代码到 Git 仓库
2. 重新部署: `vercel --prod`

### 依赖更新
```bash
npm update
npm audit fix
```

### 监控更新
- 定期检查 API 响应时间
- 监控错误率
- 检查缓存效率

## 📈 扩展建议

### 性能优化
- 实现 Redis 缓存
- 添加 CDN 支持
- 实现数据库存储

### 功能扩展
- 添加历史数据查询
- 实现 WebSocket 实时更新
- 添加多代币支持

### 安全增强
- 实现 API 密钥认证
- 添加请求签名验证
- 实现 IP 白名单

## 📞 支持

如遇到部署问题，请：
1. 检查错误日志
2. 验证配置参数
3. 联系开发团队

---

**注意**: 生产环境部署前请务必进行充分测试！
