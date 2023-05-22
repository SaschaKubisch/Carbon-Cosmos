const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-launchpad");

class BridgeContract {
  constructor(url, chainId, mnemonic) {
    this.client = undefined;
    this.url = url;
    this.chainId = chainId;
    this.mnemonic = mnemonic;
  }

  async connect() {
    this.client = await SigningCosmWasmClient.connectWithSigner(this.url, this.mnemonic);
  }

  async offsetTransaction(contractAddress, receiverAddress, amount, receiverNetwork, offsetType, offsetAmount, carbonCreditType) {
    const msg = {
      offset_transaction: {
        receiver_address: receiverAddress,
        amount: amount,
        receiver_network: receiverNetwork,
        offset_type: offsetType,
        offset_amount: offsetAmount,
        carbon_credit_type: carbonCreditType,
      },
    };

    const result = await this.client.execute(contractAddress, msg);
    return result;
  }

  async burnCarbonCredits(contractAddress, amount, carbonCreditType) {
    const msg = {
      burn_carbon_credits: {
        amount: amount,
        carbon_credit_type: carbonCreditType,
      },
    };

    const result = await this.client.execute(contractAddress, msg);
    return result;
  }

  async addCarbonCreditsToPool(contractAddress, amount, carbonCreditType) {
    const msg = {
      add_carbon_credits_to_pool: {
        amount: amount,
        carbon_credit_type: carbonCreditType,
      },
    };

    const result = await this.client.execute(contractAddress, msg);
    return result;
  }

  async getCarbonCreditsPool(contractAddress) {
    const msg = {
      carbon_credits_pool: {},
    };

    const result = await this.client.queryContractSmart(contractAddress, msg);
    return result;
  }

  async getOffsetTransaction(contractAddress, transactionId) {
    const msg = {
      offset_transaction: { transaction_id: transactionId },
    };

    const result = await this.client.queryContractSmart(contractAddress, msg);
    return result;
  }
}

module.exports = BridgeContract;
