use cosmwasm_std::{Api, Extern, HumanAddr, Querier, StdResult, Storage};
use cosmwasm_storage::{PrefixedStorage, ReadonlyPrefixedStorage};
use std::str::from_utf8;

use crate::msg::{CarbonCreditsPool, OffsetType, Transaction};

pub static CONFIG_KEY: &[u8] = b"config";

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, Config> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, Config> {
    singleton_read(storage, CONFIG_KEY)
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub carbon_credits_pool: Vec<CarbonCreditsPool>,
}

pub fn create_transaction_id() -> String {
    let mut rng = rand::thread_rng();
    let id: u64 = rng.gen_range(1_000_000_000_000..9_999_999_999_999);
    id.to_string()
}

pub fn store_transaction<S: Storage>(
    storage: &mut S,
    transaction_id: &str,
    transaction: &Transaction,
) -> StdResult<()> {
    let mut tx_store = PrefixedStorage::new(CONFIG_KEY, storage);
    tx_store.set(transaction_id.as_bytes(), &serde_json::to_vec(&transaction)?);
    Ok(())
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Transaction {
    pub receiver_address: HumanAddr,
    pub amount: u128,
    pub receiver_network: u32,
    pub offset_type: OffsetType,
    pub offset_amount: Option<f64>,
    pub carbon_credit_type: String,
    pub timestamp: String,
}
