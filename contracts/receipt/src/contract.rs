use cosmwasm_std::{
    to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier, StdError,
    StdResult, Storage,
};
use cosmwasm_storage::{PrefixedStorage, ReadonlyPrefixedStorage};
use std::str::from_utf8;

use crate::msg::{HandleMsg, InitMsg, OffsetTransactionResponse, QueryMsg};
use crate::state::{
    config, config_read, create_transaction_id, store_transaction, CarbonCreditsPool,
    Transaction, CONFIG_KEY,
};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let config_data = config::Config {
        carbon_credits_pool: msg.carbon_credits_pool.clone(),
    };

    config(deps.storage).save(&config_data)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q
