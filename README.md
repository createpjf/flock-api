# FLOCK Token Supply API

这是一个为 FLOCK 代币提供 circulating supply 和 total supply 数据的 API，符合 CoinGecko 的要求。

## 功能特性

- ✅ 公开访问，无需 API key
- ✅ 支持 CORS，可从任何域名调用
- ✅ 30分钟缓存机制，支持每30分钟轮询
- ✅ 从 Base 区块链实时获取数据
- ✅ 包含 decimals 信息
- ✅ 符合 CoinGecko API 标准

## API 端点

### 获取代币供应信息

```
GET /api/supply
```

**响应示例：**

```json
{
  "token": "FLOCK",
  "symbol": "FLOCK",
  "contract_address": "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691",
  "network": "Base",
  "total_supply": 1000000000,
  "circulating_supply": 1000000000,
  "decimals": 18,
  "last_updated": "2024-08-27T10:00:00.000Z",
  "source": "on-chain",
  "api_version": "1.0.0"
}
```

## 部署到 Vercel

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Add FLOCK token supply API"
git push origin main
```

### 2. 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

### 3. 配置环境变量（可选）

如果需要自定义 RPC 节点，可以在 Vercel 中设置环境变量：

- `RPC_URL`: 自定义 Base 网络 RPC 地址

## 使用方法

### JavaScript/Node.js

```javascript
const response = await fetch('https://your-vercel-app.vercel.app/api/supply');
const data = await response.json();
console.log(`FLOCK Total Supply: ${data.total_supply}`);
console.log(`FLOCK Circulating Supply: ${data.circulating_supply}`);
```

### Python

```python
import requests

response = requests.get('https://your-vercel-app.vercel.app/api/supply')
data = response.json()
print(f"FLOCK Total Supply: {data['total_supply']}")
print(f"FLOCK Circulating Supply: {data['circulating_supply']}")
```

### cURL

```bash
curl https://your-vercel-app.vercel.app/api/supply
```

## 技术细节

- **网络**: Base 主网
- **代币合约**: `0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691`
- **缓存时间**: 30分钟
- **RPC 节点**: `https://mainnet.base.org`
- **框架**: Vercel Serverless Functions
- **依赖**: ethers.js v6

## 符合 CoinGecko 要求

- ✅ 公开访问，无需认证
- ✅ 包含 decimals 信息
- ✅ 支持每30分钟轮询
- ✅ 从链上数据源获取
- ✅ 简单的 REST API 端点

## 注意事项

1. 当前 circulating supply 等于 total supply，如需更精确计算可添加额外逻辑
2. API 使用内存缓存，在 Vercel 冷启动时会重新获取数据
3. 建议在生产环境中使用更可靠的 RPC 节点

## 许可证

MIT License
