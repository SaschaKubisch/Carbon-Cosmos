use cosmwasm_std::{
    coins, BankMsg, Env, Event, MessageInfo, Response, WasmMsg,
};
use cosmwasm_vm::testing::{mock_dependencies, mock_env, mock_info};
use offset::{contract, msg::*, state::*};

// Helper function to initialize the contract
fn init_contract() -> (Env, MessageInfo, ContractState) {
    let mut deps = mock_dependencies(&[]);
    let env = mock_env();
    let info = mock_info("sender", &[]);
    let init_msg = InitMsg {
        regen_pool_address: "regen_pool".to_string(),
    };
    let res = contract::instantiate(deps.as_mut(), env.clone(), info.clone(), init_msg).unwrap();
    let contract_state: ContractState =
        deps.api.canonical_address(&deps.api.addr_validate("regen_pool").unwrap()).unwrap();
    (env, info, contract_state)
}

#[test]
fn test_offset_transaction() {
    let (env, info, contract_state) = init_contract();
    let mut deps = mock_dependencies(&[]);

    let offset_msg = ExecuteMsg::OffsetTransaction {
        receiver_address: "receiver".to_string(),
        amount: 100,
        receiver_network: 1,
        offset_type: OffsetType::Transaction,
        offset_amount: None,
        carbon_credit_type: CarbonCreditType::Regen,
    };

    let res = contract::execute(deps.as_mut(), env.clone(), info.clone(), offset_msg).unwrap();

    // Check that the transaction was successful and funds were sent
    assert_eq!(
        res.messages,
        vec![
            BankMsg::Send {
                from_address: info.sender.to_string(),
                to_address: "receiver".to_string(),
                amount: coins(100, "uscrt"),
            }
            .into(),
            WasmMsg::Execute {
                contract_addr: contract_state.regen_pool_address.to_string(),
                msg: to_binary(&RegenPoolExecuteMsg::Burn {
                    amount: 10,
                    sender: info.sender.to_string(),
                })
                .unwrap(),
                funds: vec![],
            }
            .into(),
        ]
    );

    // Check that the carbon offset event was emitted
    let offset_event = res
        .events
        .iter()
        .find(|e| e.ty == "carbon_offset")
        .expect("Expected a carbon offset event");
    assert_eq!(
        offset_event.attributes,
        vec![
            attr("offset_type", "transaction"),
            attr("carbon_credit_type", "regen"),
        ]
    );
}

// Add more tests for different scenarios and functions here
