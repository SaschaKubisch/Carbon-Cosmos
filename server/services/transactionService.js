const { DirectSecp256k1Wallet, SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

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

    async offsetTransaction(contractAddress, transactionDetails) {
        const result = await this.client.execute(this.senderAddress, contractAddress, {
            offset_transaction: transactionDetails,
        });

        return result;
    }

    async burnCarbonCredits(contractAddress, amount, carbonCreditType) {
        const result = await this.client.execute(this.senderAddress, contractAddress, {
            burn_carbon_credits: { amount, carbon_credit_type: carbonCreditType },
        });

        return result;
    }

    async addCarbonCreditsToPool(contractAddress, amount, carbonCreditType) {
        const result = await this.client.execute(this.senderAddress, contractAddress, {
            add_carbon_credits_to_pool: { amount, carbon_credit_type: carbonCreditType },
        });

        return result;
    }

    async getCarbonCreditsPool(contractAddress) {
        const result = await this.client.queryContractSmart(contractAddress, {
            carbon_credits_pool: {},
        });

        return result;
    }

    async getOffsetTransaction(contractAddress, transactionId) {
        const result = await this.client.queryContractSmart(contractAddress, {
            offset_transaction: { transaction_id: transactionId },
        });

        return result;
    }

    async getUserTransactions(contractAddress, userAddress) {
        const result = await this.client.queryContractSmart(contractAddress, {
            user_transactions: { user_address: userAddress },
        });

        return result;
    }

    async getUserCarbonCreditBalance(contractAddress, userAddress) {
        const result = await this.client.queryContractSmart(contractAddress, {
            user_carbon_credit_balance: { user_address: userAddress },
        });

        return result;
    }
}

}

module.exports = TransactionService;
