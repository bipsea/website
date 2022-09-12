import fetchChainIds from './fetchChainIds';
import type { MetaMaskInpageProvider } from '@metamask/providers';

/**
 * Switch network to correct chain. If not listed, then add
 * @param _provider Metamask Provider
 * @param _chain  example: "ethereum", "polygon"
 */
export default async function switchProviderChain(_chain: string): Promise<boolean> {
	const chainIds = await fetchChainIds();
	const chainId = chainIds[_chain as keyof typeof chainIds].chainId;
	try {
		// make sure to connect. This only works for Metamask which has window.ethereum
		await window.ethereum.request({
			method: 'eth_requestAccounts'
		});
		// switch to correct chain
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId }]
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
