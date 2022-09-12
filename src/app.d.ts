// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	interface Window {
		litNodeClient: LitJsSdk.LitNodeClient;
		ethereum: any;
	}
}

// used in profile.svelte and buy.svelte
export interface ItemUI {
	title: string;
	description: string;
	imageUri: string;
	chain: string;
	price: string;
	itemId: string;
	metadataUri: string;
	currency: string;
}

// used in profile.svelte
export interface Subgraph {
	chain: string;
	uri: string;
	currency: string;
}

export type Upload = {
	title: string;
	description: string;
	price: string;
	file: File;
	image: File;
	chain: string;
};

export type AuthSig = {
	sig: string;
	derivedVia: string;
	signedMessage: string;
	address: string;
};

export interface EncryptedFile {
	encryptedFile: File;
	symmetricKey: string;
}

export type EvmContractConditionArgs = {
	contractAddress: string;
	chain: string;
	itemId: string;
	price: string;
	seller: string;
};

// ============= METADATA =============>
export interface Metadata {
	title: string;
	description: string;
	imageUri: string;
	chain: string;
	chainId: string;
	price: string;
	symbol: string;
	seller: string;
	itemId: string;
	filename: string;
	encryptedFileUri: string;
	evmContractConditions: (EvmContractCondition | EvmContractOperatorCondition)[];
	encryptedSymmetricKey: string;
}
export interface Input {
	internalType: string;
	name: string;
	type: string;
}
export interface Output {
	internalType: string;
	name: string;
	type: string;
}
export interface FunctionAbi {
	inputs: Input[];
	name: string;
	outputs: Output[];
	stateMutability: string;
	type: string;
}
export interface ReturnValueTest {
	key: string;
	comparator: string;
	value: string;
}
export interface EvmContractCondition {
	contractAddress: string;
	chain: string;
	functionName: string;
	functionParams: string[];
	functionAbi: FunctionAbi;
	returnValueTest: ReturnValueTest;
}
export interface EvmContractOperatorCondition {
	operator: string;
}
// <============= METADATA =============
