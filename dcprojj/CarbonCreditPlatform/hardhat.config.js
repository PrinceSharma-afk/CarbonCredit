require('@nomiclabs/hardhat-ethers');
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  solidity: {
    version: "0.8.20", // Update this to match OpenZeppelin's required version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Fetch Alchemy API URL from .env
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Fetch private key from .env
    },
  },
};
