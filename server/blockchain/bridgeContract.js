const ethers = require('ethers');

class BridgeContract {
  constructor(providerUrl, privateKey) {
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.bridgeContract = new ethers.Contract('BridgeContractAddress', 'ABI', this.wallet);
  }

  async offsetTransaction(receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType) {
    let tx = await this.bridgeContract.offsetTransaction(receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType);
    let receipt = await tx.wait();
    return receipt;
  }

  async burnCarbonCredits(amount, carbonCreditType) {
    let tx = await this.bridgeContract.burnCarbonCredits(amount, carbonCreditType);
    let receipt = await tx.wait();
    return receipt;
  }

  async addCarbonCreditsToPool(amount, carbonCreditType) {
    let tx = await this.bridgeContract.addCarbonCreditsToPool(amount, carbonCreditType);
    let receipt = await tx.wait();
    return receipt;
  }

  async getCarbonCreditsPool() {
    let pool = await this.bridgeContract.carbonCreditsPool();
    return pool;
  }

  async getOffsetTransaction(transactionId) {
    let transaction = await this.bridgeContract.offsetTransaction(transactionId);
    return transaction;
  }
}

module.exports = BridgeContract;
