import { ethers } from "ethers";

// 测试 FLOCK Token Supply API
async function testFlockSupplyAPI() {
  console.log('🚀 测试 FLOCK Token Supply API...\n');
  
  // FLOCK token 合约地址
  const TOKEN_ADDRESS = "0x5aB3D4c385B400F3aBB49e80DE2fAF6a88A7B691";
  
  // ERC20 ABI（最小化）
  const ERC20_ABI = [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];
  
  // Base 主网 RPC（官方公共节点）
  const RPC_URL = "https://mainnet.base.org";
  
  try {
    console.log('📡 连接到 Base 网络...');
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    console.log('🔍 获取 FLOCK Token 合约...');
    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
    
    console.log('📊 查询代币信息...');
    const [rawTotalSupply, decimals] = await Promise.all([
      token.totalSupply(),
      token.decimals()
    ]);
    
    // 格式化成可读数字
    const totalSupply = Number(ethers.formatUnits(rawTotalSupply, decimals));
    const circulatingSupply = totalSupply; // 目前等于 total supply
    
    console.log('\n✅ FLOCK Token 信息获取成功:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`代币名称: ${'FLOCK'.padEnd(20)} | 符号: ${'FLOCK'.padEnd(15)}`);
    console.log(`合约地址: ${TOKEN_ADDRESS}`);
    console.log(`网络: ${'Base (Ethereum L2)'.padEnd(20)} | 精度: ${decimals}`);
    console.log(`总供应量: ${totalSupply.toLocaleString()} FLOCK`);
    console.log(`流通供应量: ${circulatingSupply.toLocaleString()} FLOCK`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 模拟 API 响应格式 - 确保所有值都是可序列化的
    const apiResponse = {
      token: "FLOCK",
      symbol: "FLOCK",
      contract: TOKEN_ADDRESS,
      network: "Base",
      total_supply: totalSupply,
      circulating_supply: circulatingSupply,
      decimals: Number(decimals), // 确保是 Number 类型
      timestamp: Date.now(),
      last_updated: new Date().toISOString()
    };
    
    console.log('\n📋 API 响应格式预览:');
    console.log(JSON.stringify(apiResponse, null, 2));
    
    // 验证数据有效性
    console.log('\n🔍 数据验证:');
    console.log(`✓ 总供应量 > 0: ${totalSupply > 0 ? '是' : '否'}`);
    console.log(`✓ 精度在合理范围: ${decimals >= 0 && decimals <= 18 ? '是' : '否'}`);
    console.log(`✓ 流通供应量 ≤ 总供应量: ${circulatingSupply <= totalSupply ? '是' : '否'}`);
    
    if (totalSupply > 0 && decimals >= 0 && decimals <= 18 && circulatingSupply <= totalSupply) {
      console.log('\n🎉 所有验证通过！API 数据有效。');
    } else {
      console.log('\n⚠️  部分验证失败，请检查数据。');
    }
    
    // 显示实际数值详情
    console.log('\n📊 数值详情:');
    console.log(`原始总供应量: ${rawTotalSupply.toString()}`);
    console.log(`格式化后总供应量: ${totalSupply}`);
    console.log(`精度: ${decimals}`);
    console.log(`代币单位: ${ethers.formatUnits(1, decimals)} FLOCK`);
    
  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行测试
testFlockSupplyAPI().catch(console.error);
