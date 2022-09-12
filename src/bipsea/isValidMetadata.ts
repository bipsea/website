import type { Metadata } from '../app';
import { ethers } from 'ethers';
import fetchAbi from './fetchAbi';
import fetchContractAddresses from './fetchContractAddresses';
import fetchChainIds from './fetchChainIds';
import type { Provider } from '@ethersproject/providers';

/**
 * Validate Lit evmContractConditions with on chain data
 * @param _uri uri on IPFS
 * @param _metadata JSON metadata from IPFS
 * @param _provider metamask provider
 * @returns true if valid, false if not
 */
export default async function isValidMetadata(
	_uri: string,
	_metadata: Metadata,
	_provider: Provider
): Promise<boolean> {
	// fetch chainIds from github
	const chainIds = await fetchChainIds();
	// fetch abis from github
	const abi = await fetchAbi();
	// fetch contract addresses from github
	const contractAddresses = await fetchContractAddresses();
	// wrap metamask provider: https://docs.ethers.io/v5/api/providers/other/#Web3Provider
	const contractAddress = contractAddresses[_metadata.chain as keyof typeof contractAddresses];
	// get contract
	const contract = new ethers.Contract(contractAddress, abi, _provider);
	// get item on chain
	const chainItem = await contract.callStatic['items'](_metadata.itemId);
	// validate contract address
	const isValidContractAddress: boolean =
		'contractAddress' in _metadata.evmContractConditions[0] &&
		'contractAddress' in _metadata.evmContractConditions[2] &&
		'contractAddress' in _metadata.evmContractConditions[4] &&
		contractAddress.toLowerCase() ===
			_metadata.evmContractConditions[0].contractAddress.toLowerCase() &&
		contractAddress.toLowerCase() ===
			_metadata.evmContractConditions[2].contractAddress.toLowerCase() &&
		contractAddress.toLowerCase() ===
			_metadata.evmContractConditions[4].contractAddress.toLowerCase();
	// validate chainId
	const isValidChainId: boolean =
		_metadata.chainId === chainIds[_metadata.chain as keyof typeof chainIds].chainId;
	// validate chain
	const isValidChain: boolean =
		'chain' in _metadata.evmContractConditions[0] &&
		'chain' in _metadata.evmContractConditions[2] &&
		'chain' in _metadata.evmContractConditions[4] &&
		_metadata.chain === _metadata.evmContractConditions[0].chain &&
		_metadata.chain === _metadata.evmContractConditions[2].chain &&
		_metadata.chain === _metadata.evmContractConditions[4].chain;
	// validate uri
	const isValidUri: boolean = _uri === chainItem.uri;
	// validate seller
	const isValidSeller: boolean =
		'functionName' in _metadata.evmContractConditions[0] &&
		'items' === _metadata.evmContractConditions[0].functionName &&
		'seller' === _metadata.evmContractConditions[0].returnValueTest.key &&
		'=' === _metadata.evmContractConditions[0].returnValueTest.comparator &&
		chainItem.seller.toLowerCase() ===
			_metadata.evmContractConditions[0].returnValueTest.value.toLowerCase();
	// validate price
	const isValidPrice: boolean =
		'functionName' in _metadata.evmContractConditions[2] &&
		'items' === _metadata.evmContractConditions[2].functionName &&
		'price' === _metadata.evmContractConditions[2].returnValueTest.key &&
		'=' === _metadata.evmContractConditions[2].returnValueTest.comparator &&
		chainItem.price.toString() === _metadata.evmContractConditions[2].returnValueTest.value;
	// validate can buy
	const isValidBuy: boolean =
		'functionName' in _metadata.evmContractConditions[4] &&
		'purchase' === _metadata.evmContractConditions[4].functionName &&
		'=' === _metadata.evmContractConditions[4].returnValueTest.comparator &&
		'true' === _metadata.evmContractConditions[4].returnValueTest.value;

	return (
		isValidContractAddress &&
		isValidUri &&
		isValidSeller &&
		isValidPrice &&
		isValidBuy &&
		isValidChainId &&
		isValidChain
	);
}
