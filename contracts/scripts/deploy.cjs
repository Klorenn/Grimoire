const hre = require("hardhat");

async function main() {
  console.log("Deploying GrimoireRegistry to", hre.network.name, "...");

  const GrimoireRegistry = await hre.ethers.getContractFactory("GrimoireRegistry");
  const registry = await GrimoireRegistry.deploy();
  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log("GrimoireRegistry deployed to:", address);
  console.log("");
  console.log("Add this to your frontend .env:");
  console.log(`VITE_GRIMOIRE_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
