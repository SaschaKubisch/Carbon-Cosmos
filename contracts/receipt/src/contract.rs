use cosmwasm_std::{
    to_binary,
    Api,
    Binary,
    Env,
    Extern,
    HandleResponse,
    HumanAddr,
    InitResponse,
    Querier,
    StdError,
    StdResult,
    Storage,
    Uint128,
};
use cosmwasm_storage::{ PrefixedStorage, ReadonlyPrefixedStorage };
use std::str::from_utf8;

use crate::msg::{ HandleMsg, InitMsg, QueryMsg, ReceiptInfoResponse, TransferNftInfo };
use crate::state::{
    config,
    config_read,
    create_receipt_id,
    store_nft_receipt,
    CONFIG_KEY,
    NftReceipt,
};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    msg: InitMsg
) -> StdResult<InitResponse> {
    let config_data = config::Config {
        contract_name: msg.contract_name,
    };

    config(deps.storage).save(&config_data)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::MintNftReceipt { transfer_info, timestamp } =>
            handle_mint_nft_receipt(deps, env, transfer_info, timestamp),
    }
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    _env: Env,
    msg: QueryMsg
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetReceiptInfo { receipt_id } => {
            to_binary(&query_receipt_info(deps, receipt_id)?)
        }
    }
}

fn handle_mint_nft_receipt<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    transfer_info: TransferNftInfo,
    timestamp: String
) -> StdResult<HandleResponse> {
    let receipt_id = create_receipt_id();
    let nft_receipt = NftReceipt {
        receipt_id: receipt_id.clone(),
        sender: transfer_info.sender,
        receiver: transfer_info.receiver,
        nft_id: transfer_info.nft_id,
        nft_contract_address: transfer_info.nft_contract_address,
        offset_transaction_id: transfer_info.offset_transaction_id,
        timestamp,
    };

    store_nft_receipt(deps.storage, &receipt_id, &nft_receipt)?;

    Ok(HandleResponse::default())
}

fn query_receipt_info<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    receipt_id: String
) -> StdResult<ReceiptInfoResponse> {
    let receipt_store = ReadonlyPrefixedStorage::new(CONFIG_KEY, deps.storage);
    let data = receipt_store.get(receipt_id.as_bytes());
    let nft_receipt = match data {
        Some(data) =>
            from_utf8(&data).map_err(|_| StdError::generic_err("Error parsing receipt data"))?,
        None => {
            return Err(StdError::generic_err("Receipt not found"));
        }
    };

    let nft_receipt: NftReceipt = serde_json::from_str(nft_receipt)?;

    Ok(ReceiptInfoResponse {
        receipt_id: nft_receipt.receipt_id,
        sender: nft_receipt.sender,
        receiver: nft_receipt.receiver,
        nft_id: nft_receipt.nft_id,
        nft_contract_address: nft_receipt.nft_contract_address,
        offset_transaction_id: nft_receipt.offset_transaction_id,
        timestamp: nft_receipt.timestamp,
    })
}