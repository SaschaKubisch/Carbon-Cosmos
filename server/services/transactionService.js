const { DirectSecp256k1Wallet, SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { Transaction } = require('../db/models/Transaction');
const { Receipt } = require('../db/models/Receipt');
const { CarbonCredit } = require('../db/models/CarbonCredit');

class TransactionService {
  constructor(chainId, endpoint, privateKey) {
    this.chainId = chainId;
    this.endpoint = endpoint;
    this.privateKey = privateKey;
  }

  async init() {
    const wallet = await DirectSecp256k1Wallet.fromKey(this.privateKey);
    const [account] = await wallet.getAccounts();

    this.client = await SigningCosmWasmClient.connectWithSigner(this.endpoint, wallet);
    this.senderAddress = account.address;
  }

  async offsetTransaction(transactionDetails) {
    try {
      const transaction = await Transaction.create(transactionDetails);
      const result = await this.client.execute(this.senderAddress, transaction.contractAddress, {
        offset_transaction: {
          transaction_id: transaction.id,
          // Other transaction details as needed
        },
      });

      const receipt = await Receipt.create({ transactionId: transaction.id });

      return { result, receipt };
    } catch (error) {
      console.error('Error offsetting transaction:', error);
      throw new Error('Failed to offset transaction');
    }
  }

  async burnCarbonCredits(amount, carbonCreditType) {
    try {
      const result = await this.client.execute(this.senderAddress, carbonCreditType.contractAddress, {
        burn_carbon_credits: { amount, carbon_credit_type: carbonCreditType },
      });

      return result;
    } catch (error) {
      console.error('Error burning carbon credits:', error);
      throw new Error('Failed to burn carbon credits');
    }
  }

  async addCarbonCreditsToPool(amount, carbonCreditType) {
    try {
      const result = await this.client.execute(this.senderAddress, carbonCreditType.contractAddress, {
        add_carbon_credits_to_pool: { amount, carbon_credit_type: carbonCreditType },
      });

      return result;
    } catch (error) {
      console.error('Error adding carbon credits to pool:', error);
      throw new Error('Failed to add carbon credits to pool');
    }
  }

  async getCarbonCreditsPool(carbonCreditType) {
    try {
      const result = await this.client.queryContractSmart(carbonCreditType.contractAddress, {
        carbon_credits_pool: {},
      });

      return result;
    } catch (error) {
      console.error('Error getting carbon credits pool:', error);
      throw new Error('Failed to get carbon credits pool');
    }
  }

  async getOffsetTransaction(transactionId) {
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        throw new Error(`Transaction with id ${transactionId} not found.`);
      }

      const result = await this.client.queryContractSmart(transaction.contractAddress, {
        offset_transaction: { transaction_id: transaction.id },
      });

      return result;
    } catch (error) {
      console.error('Error getting offset transaction:', error);
      throw new Error('Failed to get offset transaction');
    }
  }

  async getUserTransactions(userAddress) {
    try {
      const transactions = await Transaction.findAll({ where: { userAddress } });
      return transactions;
    } catch (error) {
      console.error('Error getting user transactions:', error);
      throw new Error('Failed to get user transactions');
    }
  }

  async getUserCarbonCreditBalance(userAddress) {
    try {
      const balance = await CarbonCredit.sum('balance', { where: { userAddress } });
      return balance || 0;
    } catch (error) {
      console.error('Error getting user carbon credit balance:', error);
      throw new Error('Failed to get user carbon credit balance');
    }
  }
}

module.exports = TransactionService;
