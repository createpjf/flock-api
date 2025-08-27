import { ethers } from "ethers";

// FLOCK token 合约地址
const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";

// ERC20 ABI（最小化）
const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)"
];

// Base 主网 RPC（官方公共节点）
const RPC_URL = "https://mainnet.base.org";

// 缓存时间：30分钟
const CACHE_DURATION = 30 * 60 * 1000;

// 内存缓存
let cache = {
  data: null,
  timestamp: 0
};

// 设置 CORS 头
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=1800'); // 30分钟缓存
}

export default async function handler(req, res) {
  // 处理 OPTIONS 请求（CORS preflight）
  if (req.method === 'OPTIONS') {
    setCORSHeaders(res);
    res.status(200).end();
    return;
  }

  // 只允许 GET 请求
  if (req.method !== 'GET') {
    setCORSHeaders(res);
    res.status(405).json({ 
      error: 'Method not allowed. Only GET requests are supported.' 
    });
    return;
  }

  setCORSHeaders(res);

  try {
    // 检查缓存
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return res.status(200).json({
        ...cache.data,
        cached: true,
        cache_timestamp: cache.timestamp
      });
    }

    // 连接 Base 网络
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);

    // 查询 token 信息
    const [rawTotalSupply, decimals] = await Promise.all([
      token.totalSupply(),
      token.decimals()
    ]);

    // 格式化成可读数字
    const totalSupply = Number(ethers.formatUnits(rawTotalSupply, decimals));
    
    // 对于大多数代币，circulating supply 等于 total supply
    // 如果需要更精确的计算，可以添加额外的逻辑
    const circulatingSupply = totalSupply;

    // 准备响应数据
    const responseData = {
      token: "FLOCK",
      symbol: "FLOCK",
      contract_address: TOKEN_ADDRESS,
      network: "Base",
      total_supply: totalSupply,
      circulating_supply: circulatingSupply,
      decimals: decimals,
      last_updated: new Date().toISOString(),
      source: "on-chain",
      api_version: "1.0.0"
    };

    // 更新缓存
    cache = {
      data: responseData,
      timestamp: now
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error('API Error:', error);
    
    // 返回详细的错误信息
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString(),
      contract_address: TOKEN_ADDRESS
    });
  }
}
