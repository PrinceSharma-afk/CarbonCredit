const { ethers, network } = require("hardhat");
const connectDB = require("./db");
const Web3 = require("web3");
const cron = require('node-cron');

// Initialize Web3 with a compatible provider for the local Hardhat network
const providerUrl = network.config.url || "http://127.0.0.1:8545";  // Default Hardhat network URL
const web3 = new Web3(providerUrl); // Using HTTP provider for Web3

// Function to fetch and store blockchain data
async function fetchAndStoreData() {
    try {
        const db = await connectDB();
        const transactionsCollection = db.collection("transactions");

        // Fetch the latest block with full transactions
        const latestBlock = await web3.eth.getBlock("latest", true);

        // Prepare data from the latest block's transactions
        const transactions = latestBlock.transactions.map((tx) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: web3.utils.fromWei(tx.value, "ether"), // Convert value to Ether
            gasUsed: tx.gas,
        }));

        // Insert the transactions into MongoDB
        await transactionsCollection.insertMany(transactions);
        console.log("Transactions stored in MongoDB!");
    } catch (error) {
        console.error("Error fetching and storing data:", error);
    }
}

// Schedule the script to run every 15 seconds (adjust as needed)
cron.schedule('*/15 * * * * *', async () => {
    console.log('Fetching and storing blockchain data...');
    await fetchAndStoreData();
});
