const hre = require("hardhat");
async function main() {
  console.log("Deploying KeyEscrow to", hre.network.name, "...");
  const KeyEscrow = await hre.ethers.getContractFactory("KeyEscrow");
  const escrow = await KeyEscrow.deploy();
  await escrow.waitForDeployment();
  const address = await escrow.getAddress();
  console.log("KeyEscrow deployed to:", address);
  console.log("Add to .env: NEXT_PUBLIC_KEY_ESCROW_CONTRACT=" + address);
}
main().catch(e => { console.error(e); process.exitCode = 1; });
