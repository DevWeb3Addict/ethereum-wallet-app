const EthereumWallet = require('ethereum-wallet-interactor');
const { ethers } = require('ethers');

class WalletManager {
    static provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
  static async createWallet() {
    const wallet = EthereumWallet.create();
    console.log(`Cüzdan oluşturuldu: ${wallet.address}`);
    return wallet;
  }
  static async getBalance(address) {
    const balance = await WalletManager.provider.getBalance(address);
    console.log(`Cüzdan Bakiyesi: ${ethers.utils.formatEther(balance)} ETH`);
    return balance;
  }
  static async sendEther(senderPrivateKey, recipientAddress, amount) {
    const wallet = new ethers.Wallet(senderPrivateKey, WalletManager.provider);
    const transaction = await wallet.sendTransaction({
      to: recipientAddress,
      value: ethers.utils.parseEther(amount)
    });
    console.log(`Transfer işlemi gönderildi: ${transaction.hash}`);
    return transaction;
  }
}

module.exports = WalletManager;
