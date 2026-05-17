require("@nomicfoundation/hardhat-ethers");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const CALIBRATION_RPC = process.env.FILECOIN_CALIBRATION_RPC_URL || "https://api.calibration.node.glif.io/rpc/v1";

/** @type {import('hardhat/config').HardhatUserConfig} */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    hardhat: {},
    calibration: {
      url: CALIBRATION_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 314159,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
