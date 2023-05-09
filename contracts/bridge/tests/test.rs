use cosmwasm_std::testing::{mock_dependencies, mock_env, MockApi, MockQuerier, MockStorage};
use cosmwasm_std::{coins, BankMsg, CosmosMsg, HumanAddr};

use crate::contract::{handle, init, query};
use crate::msg::{HandleMsg, InitMsg, QueryMsg};

#[test]
fn proper_initialization() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        relayer: HumanAddr::from("relay_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));

    // we can just call .unwrap() to assert this was a success
    let res = init(&mut deps, env, msg).unwrap();
    assert_eq!(0, res.messages.len());
}

#[test]
fn relay_transaction() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        relayer: HumanAddr::from("relay_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));
    let _res = init(&mut deps, env, msg).unwrap();

    let env = mock_env("relay_address", &coins(1000, "earth"));

    let relay_msg = HandleMsg::Relay {
        to: HumanAddr::from("destination_address"),
        amount: coins(50, "earth"),
    };

    let res = handle(&mut deps, env.clone(), relay_msg).unwrap();
    assert_eq!(1, res.messages.len());
    assert_eq!(
        res.messages[0],
        CosmosMsg::Bank(BankMsg::Send {
            from_address: env.contract.address.clone(),
            to_address: HumanAddr::from("destination_address"),
            amount: coins(50, "earth"),
        })
    );
}

#[test]
fn unauthorized_relay() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        relayer: HumanAddr::from("relay_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));
    let _res = init(&mut deps, env, msg).unwrap();

    let env = mock_env("not_relay_address", &coins(1000, "earth"));

    let relay_msg = HandleMsg::Relay {
        to: HumanAddr::from("destination_address"),
        amount: coins(50, "earth"),
    };

    let res = handle(&mut deps, env, relay_msg);
    assert!(res.is_err());
}

#[test]
fn query_relayer() {
    let mut deps = mock_dependencies(20, &[]);

    let msg = InitMsg {
        relayer: HumanAddr::from("relay_address"),
    };
    let env = mock_env("creator", &coins(1000, "earth"));
    let _res = init(&mut deps, env, msg).unwrap();

    let query_msg = QueryMsg::GetRelayer {};
    let res = query(&deps, mock_env("anyone", &[]), query_msg).unwrap();
    let res: String = serde_json::from_slice(&res).unwrap();
    assert_eq!(res, "relay_address");
}
