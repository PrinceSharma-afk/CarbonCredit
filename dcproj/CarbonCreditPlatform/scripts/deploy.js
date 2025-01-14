const hre = require("hardhat");

async function main() {
    // Get the ContractFactory and Signer
    const CarbonCreditPlatform = await hre.ethers.getContractFactory("CarbonCreditPlatform");
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying the contract with the account:", deployer.address);

    // Deploy the contract with an initial balance of 1000
    const contract = await CarbonCreditPlatform.deploy(1000);
    await contract.deployed();

    console.log("Contract deployed to address:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
