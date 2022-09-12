// @typescript-eslint/ban-ts-comment
import LitJsSdk from 'lit-js-sdk';
import { ethers } from 'ethers';
import type { JsonRpcSigner, TransactionResponse } from '@ethersproject/providers';
import type { Upload, AuthSig, Metadata, EncryptedFile } from '../app';
import uploadFile from './uploadFile';
import generateEvmContractConditions from './generateEvmContractConditions';
import fetchContractAddresses from '../bipsea/fetchContractAddresses';
import fetchAbi from '../bipsea/fetchAbi';
import isValidMetadata from './isValidMetadata';
import switchProviderChain from './switchProviderChain';
import fetchChainIds from './fetchChainIds';

export default class Bipsea {
	/*
	 * Connect to lit nodes
	 * https://developer.litprotocol.com/ToolsAndExamples/SDKExamples/EncryptAndDecrypt/installation#instantiating-the-lit-client
	 */
	async init() {
		const client = new LitJsSdk.LitNodeClient();
		await client.connect();
		window.litNodeClient = client;
		// fetch contract addresses and abi from github
	}

	async getSigner(): Promise<JsonRpcSigner> {
		const { web3 } = await LitJsSdk.connectWeb3({ chain: 'mainnet' });
		return web3.getSigner();
	}

	/*
	 * Call to encrypt and upload files to IPFS
	 * @param _args: data to upload
	 * @returns {Promise<string>} metadata uri
	 */
	async upload(_args: Upload): Promise<string> {
		// switch to correct chain
		const hasSwitched = await switchProviderChain(_args.chain);
		if (!hasSwitched) throw new Error('Could not switch to correct chain');
		// Sign auth message
		const authSig: AuthSig = await LitJsSdk.checkAndSignAuthMessage({ chain: _args.chain });
		// get seller address
		const seller = authSig.address;
		// geneate itemId, hopefully unique
		const itemId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(); // uint64ish
		// get price from args
		const price = ethers.utils.parseEther(_args.price.toString()).toString(); // convert to wei
		// fetch contract addresses from github
		const contractAddresses = await fetchContractAddresses();
		// generate lit contract conditions
		const evmContractConditions = generateEvmContractConditions({
			seller,
			itemId,
			price,
			contractAddress: contractAddresses[_args.chain as keyof typeof contractAddresses],
			chain: _args.chain
		});
		// encrypt file to sell
		const { encryptedFile, symmetricKey }: EncryptedFile = await LitJsSdk.encryptFile({
			file: _args.file
		});
		// upload encrypted file to IPFS
		const encryptedFileUri = await uploadFile(encryptedFile);
		// save encryption key to lit nodes
		const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
			evmContractConditions,
			symmetricKey,
			authSig,
			chain: _args.chain
		});
		// upload image to IPFS
		const imageUri = await uploadFile(_args.image);
		const chainIds = await fetchChainIds();
		// create metadata json
		const metadata: Metadata = {
			title: _args.title,
			description: _args.description,
			imageUri,
			chain: _args.chain,
			chainId: chainIds[_args.chain as keyof typeof chainIds].chainId,
			price, // wei
			symbol: chainIds[_args.chain as keyof typeof chainIds].nativeCurrency.symbol,
			seller, // seller address
			itemId, //
			filename: _args.file.name,
			encryptedFileUri: encryptedFileUri,
			evmContractConditions: evmContractConditions,
			encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16')
		};
		// upload metadata to IPFS
		const metadataUri = await uploadFile(
			new File([JSON.stringify(metadata)], 'metadata.json', {
				type: 'application/json'
			})
		);
		return metadataUri;
	}

	/*
	 * Call to fetch encrypted files from IPFS, decrypt and download
	 * @param _metadataUri: metadata uri
	 */
	async download(_metadataUri: string): Promise<boolean> {
		// fetch metadata json from IPFS
		const metadata: Metadata = await fetch(_metadataUri).then((res) => res.json());
		// get provider: https://github.com/LIT-Protocol/lit-js-sdk/blob/e148a0d76d706dbe1aaa06cfd2234b3918f2ec2e/src/utils/eth.js#L98
		const { web3 } = await LitJsSdk.connectWeb3({ chain: metadata.chain });
		// switch to correct chain
		const hasSwitched = await switchProviderChain(metadata.chain);
		if (!hasSwitched) throw new Error('Could not switch to correct chain');
		// check if metadata is valid
		if (!(await isValidMetadata(_metadataUri, metadata, web3))) throw 'Metadata is invalid';
		// get auth signature from lit nodes
		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: metadata.chain });
		// obtain decrypted symmetric key
		const symmetricKey = await window.litNodeClient.getEncryptionKey({
			evmContractConditions: metadata.evmContractConditions,
			toDecrypt: metadata.encryptedSymmetricKey,
			chain: metadata.chain,
			authSig
		});
		// fetch encrypted file from decentralized storage
		const encryptedfile = await fetch(metadata.encryptedFileUri).then((res) => res.blob());
		// decrypt file
		const decryptedFile = await LitJsSdk.decryptFile({
			file: encryptedfile,
			symmetricKey
		});
		// download file
		LitJsSdk.downloadFile({
			filename: metadata.filename,
			data: new Uint8Array(decryptedFile),
			memetype: 'application/octet-stream'
		});
		return true;
	}

	/*
	 * Call to buy item on chain
	 * @param _metadataUri: metadata uri
	 * @returns {Promise<TransactionResponse>} transaction hash
	 */
	async buy(_metadataUri: string): Promise<string> {
		// fetch metadata json from IPFS
		const metadata: Metadata = await fetch(_metadataUri).then((res) => res.json());
		// get provider: https://github.com/LIT-Protocol/lit-js-sdk/blob/e148a0d76d706dbe1aaa06cfd2234b3918f2ec2e/src/utils/eth.js#L98
		const { web3 } = await LitJsSdk.connectWeb3({ chain: metadata.chain });
		// switch to correct chain
		const hasSwitched = await switchProviderChain(metadata.chain);
		if (!hasSwitched) throw new Error('Could not switch to correct chain');
		// check if metadata is valid
		if (!(await isValidMetadata(_metadataUri, metadata, web3))) throw 'Metadata is invalid';
		// get signer
		const signer: JsonRpcSigner = await web3.getSigner();
		// fetch constants
		const contractAddresses = await fetchContractAddresses();
		const abi = await fetchAbi();
		// create buy tx data
		const contract = new ethers.Contract(
			contractAddresses[metadata.chain as keyof typeof contractAddresses],
			abi,
			signer
		);
		const transactionResponse: TransactionResponse = await contract['buy'](metadata.itemId, {
			value: ethers.BigNumber.from(metadata.price)
		});
		return transactionResponse.hash;
	}

	/*
	 * Call to sell item on chain. Either content creator or investor can sell
	 * @param _metadataUri: metadata uri
	 * @returns {Promise<TransactionResponse>} transaction hash
	 */
	async sell(_metadataUri: string): Promise<string> {
		// fetch metadata json from IPFS
		const metadata: Metadata = await fetch(_metadataUri).then((res) => res.json());
		// get provider: https://github.com/LIT-Protocol/lit-js-sdk/blob/e148a0d76d706dbe1aaa06cfd2234b3918f2ec2e/src/utils/eth.js#L98
		const { web3 } = await LitJsSdk.connectWeb3({ chain: metadata.chain });
		// switch to correct chain
		const hasSwitched = await switchProviderChain(metadata.chain);
		if (!hasSwitched) throw new Error('Could not switch to correct chain');
		// get signer
		const signer: JsonRpcSigner = await web3.getSigner();
		// get from address
		const from = await signer.getAddress();
		// fetch constants
		const contractAddresses = await fetchContractAddresses();
		const abi = await fetchAbi();
		// call sell function
		const contract = new ethers.Contract(
			contractAddresses[metadata.chain as keyof typeof contractAddresses],
			abi,
			signer
		);
		const transactionResponse: TransactionResponse = await contract['sell'](
			metadata.itemId,
			metadata.seller, // seller gets 99%
			from, // investor gets 1%
			_metadataUri,
			metadata.price // price in wei
		);
		return transactionResponse.hash;
	}

	/*
	 * Call to deslit item. Buyers cannot buy
	 * @param _metadataUri
	 * @returns {Promise<TransactionResponse>} transaction hash
	 */
	async delist(_metadataUri: string): Promise<string> {
		// fetch metadata json from IPFS
		const metadata: Metadata = await fetch(_metadataUri).then((res) => res.json());
		// get provider: https://github.com/LIT-Protocol/lit-js-sdk/blob/e148a0d76d706dbe1aaa06cfd2234b3918f2ec2e/src/utils/eth.js#L98
		const { web3 } = await LitJsSdk.connectWeb3({ chain: metadata.chain });
		// switch to correct chain
		const hasSwitched = await switchProviderChain(metadata.chain);
		if (!hasSwitched) throw new Error('Could not switch to correct chain');
		// check if metadata is valid
		if (!(await isValidMetadata(_metadataUri, metadata, web3))) throw 'Metadata is invalid';
		// get signer
		const signer: JsonRpcSigner = await this.getSigner();
		// fetch constants
		const contractAddresses = await fetchContractAddresses();
		const abi = await fetchAbi();
		// call withdraw function
		const contract = new ethers.Contract(
			contractAddresses[metadata.chain as keyof typeof contractAddresses],
			abi,
			signer
		);
		// check if item is listed
		const item = await contract['items'](metadata.itemId);
		if (!item.canBuy) throw new Error('Item already delisted');
		// call withdraw function
		const transactionResponse: TransactionResponse = await contract['delist'](metadata.itemId);
		return transactionResponse.hash;
	}
}
