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

export default async function handler(req, res) {
  try {
    // 连接 Base
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

    res.status(200).json({
      token: "FLOCK",
      contract: TOKEN_ADDRESS,
      total_supply: totalSupply,
      circulating_supply: circulatingSupply,
      decimals: decimals
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
