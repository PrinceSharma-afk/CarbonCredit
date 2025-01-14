// Import the Hardhat Runtime Environment
const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CarbonCreditPlatform = await hre.ethers.getContractFactory("CarbonCreditPlatform");

  // Deploy the contract with an initial balance (e.g., 1000 units)
  const initialBalance = 1000;
  const carbonCreditPlatform = await CarbonCreditPlatform.deploy(initialBalance);

  // Wait for the deployment to finish
  await carbonCreditPlatform.deployed();

  // Log the contract address
  console.log("CarbonCreditPlatform deployed to:", carbonCreditPlatform.address);
}

// Handle errors and run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
