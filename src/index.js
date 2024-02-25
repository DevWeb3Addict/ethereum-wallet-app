const WalletManager = require('./walletManager');
async function main() {
  console.log("Welcome to the Ethereum Wallet Application!\n");
  const wallet = await WalletManager.createWallet();
  console.log(`Created wallet address: ${wallet.address}`);
}
main();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(query) {
    return new Promise(resolve => readline.question(query, ans => {
      readline.close();
      resolve(ans);
    }));
  }
  async function main() {
    console.log("Welcome to the Ethereum Wallet Application!\n");
    
    // Ask the user what action they want to perform
    const action = await askQuestion("Please select the action you want to perform: \n1. Create Wallet\n2. Check Balance\n3. Transfer Ether\nYour choice: ");
    
    switch(action) {
      case '1': // Wallet Creation
        await WalletManager.createWallet();
        break;
      case '2': // Balance Checking
        const address = await askQuestion("Enter the wallet address you want to query: ");
        await WalletManager.getBalance(address);
        break;
      case '3': // Ether Transfer
        const senderPrivateKey = await askQuestion("Enter the private key of the sending wallet: ");
        const recipientAddress = await askQuestion("Enter the recipient wallet address: ");
        const amount = await askQuestion("Enter the amount of ETH you want to transfer: ");
        await WalletManager.sendEther(senderPrivateKey, recipientAddress, amount);
        break;
      default:
        console.log("Invalid operation.");
    }
  }
  
  main();
