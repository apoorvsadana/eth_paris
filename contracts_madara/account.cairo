#[starknet::contract]
mod Account {
    use array::{ArrayTrait, SpanTrait};
    use box::BoxTrait;
    use ecdsa::check_ecdsa_signature;
    use option::OptionTrait;
    use starknet::account::Call;
    use starknet::{ContractAddress, call_contract_syscall};
    use zeroable::Zeroable;
    use array::ArraySerde;
    use starknet::{
        EthAddressZeroable, Felt252TryIntoEthAddress, EthAddressIntoFelt252,
        ContractAddressIntoFelt252, EthAddress
    };
    use starknet::secp256_trait::{recover_public_key, verify_eth_signature};
    use starknet::secp256k1::{Secp256k1Point, Secp256k1PointImpl};
    use traits::{Into, TryInto};

    #[storage]
    struct Storage {
        public_key: EthAddress
    }

    #[constructor]
    fn constructor(ref self: ContractState, public_key_: felt252) {
        let eth_address: EthAddress = public_key_.try_into().unwrap();
        self.public_key.write(eth_address);
    }

    trait StorageTrait {
        fn validate_transaction(self: @ContractState) -> felt252;
    }
    impl StorageImpl of StorageTrait {
        fn validate_transaction(self: @ContractState) -> felt252 {
            let tx_info = starknet::get_tx_info().unbox();
            let signature = tx_info.signature;
            assert(signature.len() == 5_u32, 'INVALID_SIGNATURE_LENGTH');

            let r_low: felt252 = *signature[0_u32].into();
            let r_high: felt252 = *signature[1_u32].into();
            let s_low: felt252 = *signature[2_u32].into();
            let s_high: felt252 = *signature[3_u32].into();
            let v: felt252 = *signature[4_u32].into();

            let r: u256 = u256 { low: r_low.try_into().unwrap(), high: r_high.try_into().unwrap() };
            let s: u256 = u256 { low: s_low.try_into().unwrap(), high: s_high.try_into().unwrap() };

            let mut parity = true;
            if v == 0 {
                parity = false;
            }
            verify_eth_signature::<Secp256k1Point>(
                tx_info.transaction_hash.into(), r, s, parity, self.public_key.read()
            );

            starknet::VALIDATED
        }
    }


    #[external(v0)]
    fn __validate_deploy__(
        self: @ContractState,
        class_hash: felt252,
        contract_address_salt: felt252,
        public_key_: felt252
    ) -> felt252 {
        starknet::VALIDATED
    }

    #[external(v0)]
    impl AccountContractImpl of starknet::account::AccountContract<ContractState> {
        fn __validate_declare__(self: @ContractState, class_hash: felt252) -> felt252 {
            self.validate_transaction()
        }

        fn __validate__(ref self: ContractState, calls: Array<Call>) -> felt252 {
            self.validate_transaction()
        }

        fn __execute__(ref self: ContractState, mut calls: Array<Call>) -> Array<Span<felt252>> {
            // Validate caller.
            assert(starknet::get_caller_address().is_zero(), 'INVALID_CALLER');

            // Check the tx version here, since version 0 transaction skip the __validate__ function.
            let tx_info = starknet::get_tx_info().unbox();
            assert(tx_info.version != 0, 'INVALID_TX_VERSION');

            let mut result = ArrayTrait::new();
            loop {
                match calls.pop_front() {
                    Option::Some(call) => {
                        let mut res = call_contract_syscall(
                            address: call.to,
                            entry_point_selector: call.selector,
                            calldata: call.calldata.span()
                        )
                            .unwrap_syscall();
                        result.append(res);
                    },
                    Option::None(()) => {
                        break; // Can't break result; because of 'variable was previously moved'
                    },
                };
            };
            result
        }
    }
}
// #[test]
// #[available_gas(500000)]
// fn init_account() {
//     Account::constructor(
//         2113945856403601709601285997182104414416763146820435544165012146633133630199
//     );
// }


