import { ethers } from "ethers";

// FLOCK token contract address
const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";

// ERC20 ABI (minimal)
const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)"
];

// Base mainnet RPC (official public node)
const RPC_URL = "https://mainnet.base.org";

// Cache duration: 30 minutes
const CACHE_DURATION = 30 * 60 * 1000;

// Memory cache
let cache = {
  data: null,
  timestamp: 0
};

// Set CORS headers
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=1800'); // 30 minutes cache
}

export default async function handler(req, res) {
  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    setCORSHeaders(res);
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    setCORSHeaders(res);
    res.status(405).json({ 
      error: 'Method not allowed. Only GET requests are supported.' 
    });
    return;
  }

  setCORSHeaders(res);

  try {
    // Check cache
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return res.status(200).json({
        ...cache.data,
        cached: true,
        cache_timestamp: cache.timestamp
      });
    }

    // Connect to Base network
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);

    // Query token information
    const [rawTotalSupply, decimals] = await Promise.all([
      token.totalSupply(),
      token.decimals()
    ]);

    // Format to readable numbers
    const totalSupply = Number(ethers.formatUnits(rawTotalSupply, decimals));
    
    // For most tokens, circulating supply equals total supply
    // If more precise calculation is needed, additional logic can be added
    const circulatingSupply = totalSupply;

    // Prepare response data
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

    // Update cache
    cache = {
      data: responseData,
      timestamp: now
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error('API Error:', error);
    
    // Return detailed error information
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString(),
      contract_address: TOKEN_ADDRESS
    });
  }
}
