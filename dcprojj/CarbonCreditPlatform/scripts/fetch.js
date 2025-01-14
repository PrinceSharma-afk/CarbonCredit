const Web3 = require("web3");
const connectDB = require("./db");

const web3 = new Web3("http://192.168.0.133:3000"); // Replace with your local blockchain URL

async function fetchAndStoreData() {
    const db = await connectDB();
    const transactionsCollection = db.collection("transactions");

    const latestBlock = await web3.eth.getBlock("latest", true);

    const transactions = latestBlock.transactions.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: web3.utils.fromWei(tx.value, "ether"),
        gasUsed: tx.gas,
    }));

    await transactionsCollection.insertMany(transactions);
    console.log("Transactions stored in MongoDB!");
}

fetchAndStoreData().catch(console.error);
