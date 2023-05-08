use cosmwasm_std::{Binary, HumanAddr, Uint128};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {
    pub carbon_credits_pool: Vec<CarbonCreditsPool>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CarbonCreditsPool {
    pub carbon_credit_type: String,
    pub balance: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    OffsetTransaction {
        receiver_address: HumanAddr,
        amount: Uint128,
        receiver_network: u32,
        offset_type: OffsetType,
        offset_amount: Option<f64>,
        carbon_credit_type: String,
    },
    BurnCarbonCredits {
        amount: Uint128,
        carbon_credit_type: String,
    },
    AddCarbonCreditsToPool {
        amount: Uint128,
        carbon_credit_type: String,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    CarbonCreditsPool {},
    OffsetTransaction { transaction_id: String },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum OffsetType {
    Transaction,
    Custom,
}

impl std::str::FromStr for OffsetType {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "transaction" => Ok(OffsetType::Transaction),
            "custom" => Ok(OffsetType::Custom),
            _ => Err("Invalid offset type".to_string()),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OffsetTransactionResponse {
    pub transaction_id: String,
    pub receiver_address: HumanAddr,
    pub amount: Uint128,
    pub receiver_network: u32,
    pub offset_type: OffsetType,
    pub offset_amount: Option<f64>,
    pub carbon_credit_type: String,
    pub timestamp: String,
}
