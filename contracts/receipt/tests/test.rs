use cosmwasm_std::testing::{mock_dependencies, mock_env};
use cosmwasm_std::{coins, Env, HumanAddr, StdError};

use crate::contract::{handle, init, query};
use crate::msg::{HandleMsg, InitMsg, QueryMsg};

#[test]
fn proper_initialization() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        contract_owner: HumanAddr::from("owner_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));

    let res = init(&mut deps, env, msg).unwrap();
    assert_eq!(0, res.messages.len());
}

#[test]
fn mint_and_query_nft() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        contract_owner: HumanAddr::from("owner_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));
    let _res = init(&mut deps, env.clone(), msg).unwrap();

    let mint_msg = HandleMsg::Mint {
        token_id: "token1".to_string(),
        owner: HumanAddr::from("recipient_address"),
        metadata: "Some metadata".to_string(),
    };

    let res = handle(&mut deps, env.clone(), mint_msg).unwrap();
    assert_eq!(0, res.messages.len());

    let query_msg = QueryMsg::NftInfo {
        token_id: "token1".to_string(),
    };
    let res = query(&deps, mock_env("anyone", &[]), query_msg).unwrap();
    let res: String = serde_json::from_slice(&res).unwrap();
    assert_eq!(res, "{\"owner\":\"recipient_address\",\"metadata\":\"Some metadata\"}");
}

#[test]
fn mint_unauthorized() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        contract_owner: HumanAddr::from("owner_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));
    let _res = init(&mut deps, env.clone(), msg).unwrap();

    let mint_msg = HandleMsg::Mint {
        token_id: "token1".to_string(),
        owner: HumanAddr::from("recipient_address"),
        metadata: "Some metadata".to_string(),
    };

    let env_unauthorized = mock_env("not_owner_address", &coins(1000, "earth"));
    let res = handle(&mut deps, env_unauthorized, mint_msg);
    assert!(res.is_err());
    assert_eq!(res.unwrap_err(), StdError::unauthorized());
}
