use cosmwasm_std::{Order, Storage};
use cosmwasm_storage::{PrefixedStorage, ReadonlyPrefixedStorage};
use serde::{Deserialize, Serialize};

pub static CONFIG_KEY: &[u8] = b"config";
pub static TRANSACTIONS_KEY: &[u8] = b"transactions";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub carbon_credits_pool: Vec<CarbonCreditsPool>,
}

pub fn config<S: Storage>(storage: &mut S) -> PrefixedStorage<S> {
    PrefixedStorage::new(CONFIG_KEY, storage)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlyPrefixedStorage<S> {
    ReadonlyPrefixedStorage::new(CONFIG_KEY, storage)
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CarbonCreditsPool {
    pub carbon_credit_type: String,
    pub balance: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Transaction {
    pub receiver_address: HumanAddr,
    pub amount: Uint128,
    pub receiver_network: u32,
    pub offset_type: OffsetType,
    pub offset_amount: Option<f64>,
    pub carbon_credit_type: String,
    pub timestamp: String,
}

pub fn create_transaction_id() -> String {
    // Implement the logic to generate a unique transaction ID
    // ...
}

pub fn store_transaction<S: Storage>(
    storage: &mut S,
    transaction_id: &String,
    transaction: &Transaction,
) -> StdResult<()> {
    let mut tx_store = PrefixedStorage::new(TRANSACTIONS_KEY, storage);
    tx_store.set(transaction_id.as_bytes(), &serde_json::to_vec(transaction)?);
    Ok(())
}

pub fn read_transaction<S: Storage>(
    storage: &S,
    transaction_id: &String,
) -> StdResult<Option<Transaction>> {
    let tx_store = ReadonlyPrefixedStorage::new(TRANSACTIONS_KEY, storage);
    match tx_store.get(transaction_id.as_bytes()) {
        Some(data) => Ok(Some(serde_json::from_slice(&data)?)),
        None => Ok(None),
    }
}
