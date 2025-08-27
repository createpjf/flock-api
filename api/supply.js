import { ethers } from "ethers";

// FLOCK token 合约地址
const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";

// ERC20 ABI（最小化）
const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// Base 主网 RPC（官方公共节点）
const RPC_URL = "https://mainnet.base.org";

// 缓存配置 - 30分钟缓存，符合 CoinGecko 轮询要求
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
let cache = {
  data: null,
  timestamp: 0
};

// 简单的内存 rate limiting
const rateLimit = {
  requests: new Map(),
  maxRequests: 100, // 每小时最多100个请求
  windowMs: 60 * 60 * 1000 // 1小时窗口
};

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = rateLimit.requests.get(ip) || [];
  
  // 清理过期的请求记录
  const validRequests = userRequests.filter(time => now - time < rateLimit.windowMs);
  
  if (validRequests.length >= rateLimit.maxRequests) {
    return true;
  }
  
  // 添加新请求
  validRequests.push(now);
  rateLimit.requests.set(ip, validRequests);
  return false;
}

function getClientIP(req) {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown';
}

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    res.status(405).json({ 
      error: 'Method not allowed. Only GET requests are supported.' 
    });
    return;
  }
  
  // Rate limiting 检查
  const clientIP = getClientIP(req);
  if (isRateLimited(clientIP)) {
    res.status(429).json({ 
      error: 'Rate limit exceeded. Please try again later.',
      retry_after: 3600 // 1小时后重试
    });
    return;
  }
  
  try {
    // 检查缓存
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      res.status(200).json({
        ...cache.data,
        cached: true,
        cache_timestamp: cache.timestamp
      });
      return;
    }
    
    // 连接 Base 网络
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
    
    // 查询 totalSupply & decimals
    const [rawTotalSupply, decimals] = await Promise.all([
      token.totalSupply(),
      token.decimals()
    ]);
    
    // 格式化成可读数字
    const totalSupply = Number(ethers.formatUnits(rawTotalSupply, decimals));
    
    // Circulating supply (这里直接等于 total supply，后续可加逻辑)
    const circulatingSupply = totalSupply;
    
    // 准备响应数据
    const responseData = {
      token: "FLOCK",
      symbol: "FLOCK",
      contract: TOKEN_ADDRESS,
      network: "Base",
      total_supply: totalSupply,
      circulating_supply: circulatingSupply,
      decimals: decimals,
      timestamp: now,
      last_updated: new Date(now).toISOString()
    };
    
    // 更新缓存
    cache = {
      data: responseData,
      timestamp: now
    };
    
    res.status(200).json(responseData);
    
  } catch (err) {
    console.error('FLOCK Supply API Error:', err);
    
    // 如果有缓存数据，在出错时返回缓存数据
    if (cache.data) {
      res.status(200).json({
        ...cache.data,
        cached: true,
        cache_timestamp: cache.timestamp,
        warning: "Using cached data due to current error"
      });
      return;
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch token supply data',
      message: err.message,
      timestamp: Date.now()
    });
  }
}
