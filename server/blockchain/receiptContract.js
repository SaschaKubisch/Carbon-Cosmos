const { CosmWasmClient, Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey, makeSignBytes } = require("@cosmjs/sdk38");
const { Slip10RawIndex } = require("@cosmjs/crypto");
const { fromUtf8, fromBase64 } = require("@cosmjs/encoding");
const config = require("./config");

class ReceiptContractClient {
    constructor(wallet, cosmWasmClient, receiptContractAddress) {
        this.wallet = wallet;
        this.client = cosmWasmClient;
        this.receiptContractAddress = receiptContractAddress;
    }

    async getReceiptInfo(receiptId) {
        const result = await this.client.queryContractSmart(this.receiptContractAddress, { get_receipt_info: { receipt_id: receiptId }});
        return result;
    }

    async mintNftReceipt(transferInfo, timestamp) {
        const senderAddress = this.wallet.address;

        const handleMsg = {
            mint_nft_receipt: {
                transfer_info: transferInfo,
                timestamp: timestamp
            }
        };

        const fee = {
            amount: [
                {
                    amount: "2000",
                    denom: "ucosm"
                }
            ],
            gas: "100000"
        };

        const chainId = await this.client.getChainId();
        const { accountNumber, sequence } = await this.client.getNonce(senderAddress);
        const signBytes = makeSignBytes([handleMsg], fee, chainId, senderAddress, accountNumber, sequence);
        const signature = await this.wallet.sign(signBytes);
        const signedTx = {
            msg: [handleMsg],
            fee: fee,
            memo: "",
            signatures: [signature]
        };

        const { logs, transactionHash } = await this.client.postTx(signedTx);
        return { logs, transactionHash };
    }
}

module.exports = ReceiptContractClient;
