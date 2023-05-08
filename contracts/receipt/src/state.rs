use cosmwasm_std::HumanAddr;
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub contract_name: String,
}

pub fn config<S: cosmwasm_std::Storage>(storage: &mut S) -> Singleton<S, Config> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: cosmwasm_std::Storage>(storage: &S) -> ReadonlySingleton<S, Config> {
    singleton_read(storage, CONFIG_KEY)
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Receipt {
    pub receipt_id: String,
    pub sender: HumanAddr,
    pub receiver: HumanAddr,
    pub nft_id: String,
    pub nft_contract_address: HumanAddr,
    pub offset_transaction_id: String,
    pub timestamp: String,
}
