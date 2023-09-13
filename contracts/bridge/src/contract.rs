use cosmwasm_std::{
    attr, to_binary, Api, Binary, CosmosMsg, Env, Extern, HandleResponse, InitResponse, Querier,
    StdError, StdResult, Storage, WasmMsg,
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

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::OffsetTransaction {
            receiver_address,
            amount,
            receiver_network,
            offset_type,
            offset_amount,
            carbon_credit_type,
        } => handle_offset_transaction(
            deps,
            env,
            receiver_address,
            amount,
            receiver_network,
            offset_type,
            offset_amount,
            carbon_credit_type,
        ),
        HandleMsg::BurnCarbonCredits { amount, carbon_credit_type } => {
            handle_burn_carbon_credits(deps, amount, carbon_credit_type)
        }
        HandleMsg::AddCarbonCreditsToPool { amount, carbon_credit_type } => {
            handle_add_carbon_credits_to_pool(deps, amount, carbon_credit_type)
        }
    }
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::CarbonCreditsPool {} => to_binary(&query_carbon_credits_pool(deps)?),
        QueryMsg::OffsetTransaction { transaction_id } => {
            to_binary(&query_offset_transaction(deps, transaction_id)?)
        }
    }
}

fn handle_offset_transaction<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    receiver_address: String,
    amount: u128,
    receiver_network: u32,
    offset_type: String,
    offset_amount: Option<f64>,
    carbon_credit_type: String,
) -> StdResult<HandleResponse> {
    // Perform transaction offset logic
    // ...

    // Save the transaction
    let transaction = Transaction {
        receiver_address: receiver_address.clone(),
        amount,
        receiver_network,
        offset_type,
        offset_amount,
        carbon_credit_type,
        timestamp: env.block.time.to_rfc3339(),
    };

    let transaction_id = create_transaction_id();
    store_transaction(deps.storage, &transaction_id, &transaction)?;

    // Burn carbon credits
    let burn_msg = HandleMsg::BurnCarbonCredits {
        amount: 10, // Replace this with the actual amount to burn
        carbon_credit_type: transaction.carbon_credit_type.clone(),
    };
    handle(deps
        , env.clone(), burn_msg)?;

        Ok(HandleResponse {
            messages: vec![],
            attributes: vec![
                attr("action", "offset_transaction"),
                attr("transaction_id", transaction_id),
                attr("receiver_address", receiver_address),
                attr("amount", amount),
                attr("receiver_network", receiver_network),
                attr("offset_type", &transaction.offset_type),
                attr("offset_amount", offset_amount.unwrap_or(0.0)),
                attr("carbon_credit_type", &transaction.carbon_credit_type),
                attr("timestamp", &transaction.timestamp),
            ],
            data: None,
        })
    }
    
    fn handle_burn_carbon_credits<S: Storage, A: Api, Q: Querier>(
        deps: &mut Extern<S, A, Q>,
        amount: u128,
        carbon_credit_type: String,
    ) -> StdResult<HandleResponse> {
        let mut config_data = config_read(deps.storage).load()?;
        let carbon_credit = config_data
            .carbon_credits_pool
            .iter_mut()
            .find(|credit| credit.carbon_credit_type == carbon_credit_type);
    
        match carbon_credit {
            Some(credit) => {
                if credit.balance < amount {
                    return Err(StdError::generic_err("Insufficient carbon credits in the pool."));
                }
                credit.balance -= amount;
            }
            None => {
                return Err(StdError::generic_err(
                    "Carbon credit type not found in the pool.",
                ));
            }
        }
    
        config(deps.storage).save(&config_data)?;
        Ok(HandleResponse::default())
    }
    
    fn handle_add_carbon_credits_to_pool<S: Storage, A: Api, Q: Querier>(
        deps: &mut Extern<S, A, Q>,
        amount: u128,
        carbon_credit_type: String,
    ) -> StdResult<HandleResponse> {
        let mut config_data = config_read(deps.storage).load()?;
        let carbon_credit = config_data
            .carbon_credits_pool
            .iter_mut()
            .find(|credit| credit.carbon_credit_type == carbon_credit_type);
    
        match carbon_credit {
            Some(credit) => {
                credit.balance += amount;
            }
            None => {
                return Err(StdError::generic_err(
                    "Carbon credit type not found in the pool.",
                ));
            }
        }
    
        config(deps.storage).save(&config_data)?;
        Ok(HandleResponse::default())
    }
    
    fn query_carbon_credits_pool<S: Storage, A: Api, Q: Querier>(
        deps: &Extern<S, A, Q>,
    ) -> StdResult<Vec<CarbonCreditsPool>> {
        let config_data = config_read(deps.storage).load()?;
        Ok(config_data.carbon_credits_pool)
    }
    
    fn query_offset_transaction<S: Storage, A: Api, Q: Querier>(
        deps: &Extern<S, A, Q>,
        transaction_id: String,
    ) -> StdResult<OffsetTransactionResponse> {
        let tx_store = ReadonlyPrefixedStorage::new(CONFIG_KEY, deps.storage);
        let data = tx_store.get(transaction_id.as_bytes());
        let transaction = match data {
            Some(data) => from_utf8(&data)
                .map_err(|_| StdError::generic_err("Error parsing transaction data"))?,
            None => return Err(StdError::generic_err("Transaction not found")),
        };
    
        let transaction: Transaction = serde_json::from_str(transaction)?;
    
        Ok(OffsetTransactionResponse {
            transaction_id,
            receiver_address: transaction.receiver_address,
            amount: transaction.amount,
            receiver_network: transaction.receiver_network,
            offset_type: transaction.offset_type,
            offset_amount: transaction.offset_amount,
    