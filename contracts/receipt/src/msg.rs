use cosmwasm_std::{Binary, HumanAddr};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {
    pub contract_name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    MintReceipt {
        sender: HumanAddr,
        receiver: HumanAddr,
        nft_id: String,
        nft_contract_address: HumanAddr,
        offset_transaction_id: String,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    ReceiptInfo { receipt_id: String },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ReceiptInfoResponse {
    pub receipt_id: String,
    pub sender: HumanAddr,
    pub receiver: HumanAddr,
    pub nft_id: String,
    pub nft_contract_address: HumanAddr,
    pub offset_transaction_id: String,
    pub timestamp: String,
}
