# FLOCK Token Supply API

这是一个为 FLOCK Token 提供 circulating supply 和 total supply 数据的 REST API，完全符合 CoinGecko 的要求。

## 代币信息

- **代币名称**: FLOCK
- **合约地址**: `0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691`
- **网络**: Base (Ethereum L2)
- **区块浏览器**: [BaseScan](https://basescan.org/token/0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691)

## API 端点

### 获取代币供应量信息

```
GET /api/supply
```

**响应示例:**
```json
{
  "token": "FLOCK",
  "symbol": "FLOCK",
  "contract": "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691",
  "network": "Base",
  "total_supply": 1000000000,
  "circulating_supply": 1000000000,
  "decimals": 18,
  "timestamp": 1703123456789,
  "last_updated": "2023-12-21T10:30:56.789Z"
}
```

## 特性

### ✅ CoinGecko 合规要求

- **无需认证**: 完全公开访问，无需 API key
- **REST API**: 简单的 HTTP GET 端点
- **包含 decimals**: 响应中包含代币精度信息
- **30分钟轮询支持**: 缓存机制确保支持每30分钟轮询一次
- **公开访问**: 无需密码或认证

### 🚀 技术特性

- **智能缓存**: 30分钟缓存，减少区块链查询
- **Rate Limiting**: 每小时最多100个请求，防止滥用
- **CORS 支持**: 支持跨域请求
- **错误处理**: 优雅的错误处理和降级机制
- **实时数据**: 直接从 Base 区块链获取最新数据

## 部署

### Vercel 部署

1. 确保已安装 Vercel CLI
2. 在项目根目录运行:
   ```bash
   vercel --prod
   ```

### 本地开发

1. 安装依赖:
   ```bash
   npm install
   ```

2. 启动开发服务器:
   ```bash
   npm run dev
   ```

## 使用示例

### JavaScript/Node.js

```javascript
const response = await fetch('https://your-domain.vercel.app/api/supply');
const data = await response.json();

console.log(`FLOCK Total Supply: ${data.total_supply}`);
console.log(`FLOCK Circulating Supply: ${data.circulating_supply}`);
console.log(`Decimals: ${data.decimals}`);
```

### cURL

```bash
curl -X GET "https://your-domain.vercel.app/api/supply" \
  -H "Accept: application/json"
```

### Python

```python
import requests

response = requests.get('https://your-domain.vercel.app/api/supply')
data = response.json()

print(f"FLOCK Total Supply: {data['total_supply']}")
print(f"FLOCK Circulating Supply: {data['circulating_supply']}")
print(f"Decimals: {data['decimals']}")
```

## Rate Limiting

- **限制**: 每小时最多100个请求
- **窗口**: 1小时滚动窗口
- **超出限制**: 返回 429 状态码，1小时后重试

## 缓存策略

- **缓存时间**: 30分钟
- **缓存内容**: 代币供应量数据
- **缓存失效**: 自动过期或手动清除
- **降级机制**: 出错时返回缓存数据

## 错误处理

| 状态码 | 说明 |
|--------|------|
| 200 | 成功获取数据 |
| 405 | 不支持的 HTTP 方法 |
| 429 | 请求频率超限 |
| 500 | 服务器内部错误 |

## 网络要求

- **RPC 节点**: Base 主网官方节点
- **连接**: 需要访问 `https://mainnet.base.org`
- **超时**: 建议设置合理的请求超时时间

## 监控和维护

- **日志**: 所有错误都会记录到控制台
- **性能**: 缓存机制确保快速响应
- **可用性**: 支持降级到缓存数据

## 联系信息

如有问题或需要支持，请联系开发团队。

---

**注意**: 此 API 直接从区块链获取数据，确保数据的准确性和实时性。建议在生产环境中设置适当的监控和告警机制。
