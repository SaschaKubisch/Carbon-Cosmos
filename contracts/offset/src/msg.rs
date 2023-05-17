use cosmwasm_std::{Binary, HumanAddr};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {
    pub carbon_credits_pool: Vec<CarbonCreditsPool>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    OffsetTransaction {
        receiver_address: HumanAddr,
        amount: u128,
        receiver_network: u32,
        offset_type: OffsetType,
        offset_amount: Option<f64>,
        carbon_credit_type: String,
    },
    BurnCarbonCredits {
        amount: u128,
        carbon_credit_type: String,
    },
    AddCarbonCreditsToPool {
        amount: u128,
        carbon_credit_type: String,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    CarbonCreditsPool {},
    OffsetTransaction {
        transaction_id: String,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CarbonCreditsPool {
    pub carbon_credit_type: String,
    pub balance: u128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OffsetTransactionResponse {
    pub transaction_id: String,
    pub receiver_address: HumanAddr,
    pub amount: u128,
    pub receiver_network: u32,
    pub offset_type: OffsetType,
    pub offset_amount: Option<f64>,
    pub carbon_credit_type: String,
    pub timestamp: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum OffsetType {
    Direct,
    Indirect,
}
