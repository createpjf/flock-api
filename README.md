# FLOCK Token Supply API

This is an API that provides circulating supply and total supply data for FLOCK token, meeting CoinGecko requirements.

## Features

- ✅ Public access, no API key required
- ✅ CORS support, can be called from any domain
- ✅ 30-minute cache mechanism, supports polling every 30 minutes
- ✅ Real-time data from Base blockchain
- ✅ Includes decimals information
- ✅ Compliant with CoinGecko API standards

## API Endpoint

### Get Token Supply Information

```
GET /api/supply
```

**Response Example:**

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

## Deploy to Vercel

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Add FLOCK token supply API"
git push origin main
```

### 2. Connect Vercel

1. Visit [vercel.com](https://vercel.com)
2. Login with GitHub account
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

### 3. Configure Environment Variables (Optional)

If you need to customize RPC nodes, you can set environment variables in Vercel:

- `RPC_URL`: Custom Base network RPC address

## Usage

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

## Technical Details

- **Network**: Base mainnet
- **Token Contract**: `0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691`
- **Cache Time**: 30 minutes
- **RPC Node**: `https://mainnet.base.org`
- **Framework**: Vercel Serverless Functions
- **Dependencies**: ethers.js v6

## CoinGecko Compliance

- ✅ Public access, no authentication required
- ✅ Includes decimals information
- ✅ Supports polling every 30 minutes
- ✅ Data from on-chain sources
- ✅ Simple REST API endpoint

## Notes

1. Currently circulating supply equals total supply, additional logic can be added for more precise calculation
2. API uses memory cache, will refetch data on Vercel cold start
3. Recommend using more reliable RPC nodes in production environment

## License

MIT License
