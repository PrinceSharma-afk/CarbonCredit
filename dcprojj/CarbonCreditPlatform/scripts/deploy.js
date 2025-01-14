const hre = require("hardhat");

async function main() {
    const CarbonCreditPlatform = await hre.ethers.getContractFactory("CarbonCreditPlatform");

    // Deploy with initial balance (replace with actual value)
    const carbonCredit = await CarbonCreditPlatform.deploy(1000);

    await carbonCredit.deployed();
    console.log("CarbonCreditPlatform deployed to:", carbonCredit.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
