import type {
	EvmContractCondition,
	EvmContractOperatorCondition,
	EvmContractConditionArgs
} from '../app';

/**
 * Returns a json object to grant access to a file
 * @see https://developer.litprotocol.com/AccessControlConditions/EVM/customContractCalls
 * @param _args : EvmContractConditionArgs
 * @returns : EvmContractConditions
 */
export default function generateEvmContractConditions(
	_args: EvmContractConditionArgs
): (EvmContractCondition | EvmContractOperatorCondition)[] {
	return [
		{
			contractAddress: _args.contractAddress,
			chain: _args.chain,
			functionName: 'items',
			functionParams: [_args.itemId],
			functionAbi: {
				inputs: [
					{
						internalType: 'uint256',
						name: '',
						type: 'uint256'
					}
				],
				name: 'items',
				outputs: [
					{
						internalType: 'address',
						name: 'seller',
						type: 'address'
					},
					{
						internalType: 'address',
						name: 'investor',
						type: 'address'
					},
					{
						internalType: 'string',
						name: 'uri',
						type: 'string'
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256'
					}
				],
				stateMutability: 'view',
				type: 'function'
			},
			returnValueTest: {
				key: 'seller',
				comparator: '=',
				value: _args.seller
			}
		},
		{ operator: 'and' },
		{
			contractAddress: _args.contractAddress,
			chain: _args.chain,
			functionName: 'items',
			functionParams: [_args.itemId],
			functionAbi: {
				inputs: [
					{
						internalType: 'uint256',
						name: '',
						type: 'uint256'
					}
				],
				name: 'items',
				outputs: [
					{
						internalType: 'address',
						name: 'seller',
						type: 'address'
					},
					{
						internalType: 'address',
						name: 'investor',
						type: 'address'
					},
					{
						internalType: 'string',
						name: 'uri',
						type: 'string'
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256'
					}
				],
				stateMutability: 'view',
				type: 'function'
			},
			returnValueTest: {
				key: 'price',
				comparator: '=',
				value: _args.price
			}
		},
		{ operator: 'and' },
		{
			contractAddress: _args.contractAddress,
			chain: _args.chain,
			functionName: 'purchase',
			functionParams: [_args.itemId, ':userAddress'],
			functionAbi: {
				inputs: [
					{
						internalType: 'uint256',
						name: '',
						type: 'uint256'
					},
					{
						internalType: 'address',
						name: '',
						type: 'address'
					}
				],
				name: 'purchase',
				outputs: [
					{
						internalType: 'bool',
						name: '',
						type: 'bool'
					}
				],
				stateMutability: 'view',
				type: 'function'
			},
			returnValueTest: {
				key: '',
				comparator: '=',
				value: 'true'
			}
		}
	];
}
