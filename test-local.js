#!/usr/bin/env node

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

async function testTokenSupply() {
  try {
    console.log("🔍 正在测试 FLOCK Token Supply API...");
    console.log("📍 合约地址:", TOKEN_ADDRESS);
    console.log("🌐 网络: Base");
    console.log("⏳ 连接中...\n");

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
    const circulatingSupply = totalSupply;

    console.log("✅ 查询成功！");
    console.log("📊 代币信息:");
    console.log(`   - 名称: FLOCK`);
    console.log(`   - 总供应量: ${totalSupply.toLocaleString()}`);
    console.log(`   - 流通供应量: ${circulatingSupply.toLocaleString()}`);
    console.log(`   - 小数位数: ${decimals}`);
    console.log(`   - 原始数据: ${rawTotalSupply.toString()}`);
    console.log("\n🚀 API 已准备就绪，可以部署到 Vercel！");

  } catch (error) {
    console.error("❌ 测试失败:", error.message);
    console.error("请检查网络连接和合约地址是否正确");
  }
}

// 运行测试
testTokenSupply();
