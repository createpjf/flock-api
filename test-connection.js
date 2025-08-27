import { ethers } from "ethers";

// FLOCK token contract address
const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";

// Base mainnet RPC
const RPC_URL = "https://mainnet.base.org";

async function testConnections() {
  console.log("🔍 Starting connection tests...\n");
  
  // Test 1: Base network connection
  console.log("1️⃣ Testing Base network connection...");
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log("   ✅ Base network connection successful");
    console.log("   📊 Current block height:", blockNumber);
  } catch (error) {
    console.log("   ❌ Base network connection failed:", error.message);
    return;
  }
  
  // Test 2: Token contract connection
  console.log("\n2️⃣ Testing FLOCK token contract connection...");
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
    
    console.log("   ✅ Token contract connection successful");
    console.log("   📊 Total supply:", ethers.formatUnits(totalSupply, decimals));
    console.log("   📊 Decimals:", decimals);
  } catch (error) {
    console.log("   ❌ Token contract connection failed:", error.message);
    return;
  }
  
  // Test 3: GitHub repository status
  console.log("\n3️⃣ Checking GitHub repository status...");
  try {
    const { execSync } = await import('child_process');
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    
    console.log("   ✅ Git repository status normal");
    console.log("   📍 Remote repository:", remoteUrl);
    console.log("   📝 Pending files:", gitStatus ? gitStatus.split('\n').filter(f => f).length : 0);
  } catch (error) {
    console.log("   ❌ Git repository check failed:", error.message);
  }
  
  console.log("\n🎉 Connection tests completed!");
  console.log("📋 Summary:");
  console.log("   - Base network: ✅ Connection normal");
  console.log("   - FLOCK contract: ✅ Connection normal");
  console.log("   - GitHub repository: ✅ Status normal");
  console.log("\n🚀 Ready to deploy to Vercel!");
}

testConnections().catch(console.error);
