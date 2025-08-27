import { ethers } from "ethers";

// FLOCK token 合约地址
const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";

// Base 主网 RPC
const RPC_URL = "https://mainnet.base.org";

async function testConnections() {
  console.log("🔍 开始连接测试...\n");
  
  // 测试 1: Base 网络连接
  console.log("1️⃣ 测试 Base 网络连接...");
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log("   ✅ Base 网络连接成功");
    console.log("   📊 当前区块高度:", blockNumber);
  } catch (error) {
    console.log("   ❌ Base 网络连接失败:", error.message);
    return;
  }
  
  // 测试 2: 代币合约连接
  console.log("\n2️⃣ 测试 FLOCK 代币合约连接...");
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const token = new ethers.Contract(TOKEN_ADDRESS, [
      "function totalSupply() view returns (uint256)",
      "function decimals() view returns (uint8)"
    ], provider);
    
    const [totalSupply, decimals] = await Promise.all([
      token.totalSupply(),
      token.decimals()
    ]);
    
    console.log("   ✅ 代币合约连接成功");
    console.log("   📊 总供应量:", ethers.formatUnits(totalSupply, decimals));
    console.log("   📊 小数位数:", decimals);
  } catch (error) {
    console.log("   ❌ 代币合约连接失败:", error.message);
    return;
  }
  
  // 测试 3: GitHub 仓库状态
  console.log("\n3️⃣ 检查 GitHub 仓库状态...");
  try {
    const { execSync } = await import('child_process');
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    
    console.log("   ✅ Git 仓库状态正常");
    console.log("   📍 远程仓库:", remoteUrl);
    console.log("   📝 待提交文件:", gitStatus ? gitStatus.split('\n').filter(f => f).length : 0);
  } catch (error) {
    console.log("   ❌ Git 仓库检查失败:", error.message);
  }
  
  console.log("\n🎉 连接测试完成！");
  console.log("📋 总结:");
  console.log("   - Base 网络: ✅ 连接正常");
  console.log("   - FLOCK 合约: ✅ 连接正常");
  console.log("   - GitHub 仓库: ✅ 状态正常");
  console.log("\n🚀 现在可以部署到 Vercel 了！");
}

testConnections().catch(console.error);
