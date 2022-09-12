<script lang="ts">
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import Bipsea from '../../bipsea';
	import fetchContractAddresses from '../../bipsea/fetchContractAddresses';
	import fetchAbi from '../../bipsea/fetchAbi';
	import fetchChainIds from '../../bipsea/fetchChainIds';

	const bipsea = new Bipsea();

	let chain: string | null,
		itemId: string | null,
		metadataUri: string,
		title = '',
		description = '',
		imageUri = '',
		price = '',
		symbol = '',
		seller = '',
		receipt = '';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		chain = params.get('chain');
		itemId = params.get('itemId');
		if (!chain || !itemId) return (window.location.href = '/404');
		bipsea.init();
		fetchData();
	});

	// fetch data for DOM
	async function fetchData() {
		if (!chain) return;
		try {
			const contractAddresses = await fetchContractAddresses();
			const abi = await fetchAbi();
			const chainIds = await fetchChainIds();
			const provider = new ethers.providers.JsonRpcProvider(chainIds[chain].rpcUrls[0]);
			const contract = new ethers.Contract(contractAddresses[chain], abi, provider);
			const item = await contract.callStatic['items'](itemId);
			metadataUri = item.uri;
			// fetch metadata from metadataUri
			const metadata = await fetch(metadataUri).then((res) => res.json());
			title = metadata.title;
			description = metadata.description;
			imageUri = metadata.imageUri;
			price = ethers.utils.formatUnits(metadata.price, 'ether');
			symbol = metadata.symbol;
			seller = metadata.seller;
		} catch (e) {
			window.location.href = '/404';
		}
	}

	// when user clicks buy button
	async function handleBuy(e: Event) {
		e.preventDefault();
		const signer = await bipsea.getSigner();
		const buyerAddress = await signer.getAddress();
		const hasPurchased = await getHasPurchased(buyerAddress);
		if (hasPurchased) {
			const downloaded = await bipsea.download(metadataUri);
		} else {
			const txHash = await bipsea.buy(metadataUri);
			const chainIds = await fetchChainIds();
			if (!chain) return;
			receipt = chainIds[chain].blockExplorerUrls[0] + '/tx/' + txHash;
			await isTxConfirmed(txHash);
			await bipsea.download(metadataUri);
		}
	}

	async function getHasPurchased(_address: string): Promise<boolean> {
		if (!chain) return false;
		const contractAddresses = await fetchContractAddresses();
		const abi = await fetchAbi();
		const chainIds = await fetchChainIds();
		const provider = new ethers.providers.JsonRpcProvider(chainIds[chain].rpcUrls[0]);
		const contract = new ethers.Contract(contractAddresses[chain], abi, provider);
		const hasPurchased = await contract.callStatic['purchase'](itemId, _address);
		return hasPurchased;
	}

	// check until there's a tx confirmation
	async function isTxConfirmed(_txHash: string): Promise<boolean> {
		// get rpc
		if (!chain) return false;
		const chainIds = await fetchChainIds();
		const provider = new ethers.providers.JsonRpcProvider(chainIds[chain].rpcUrls[0]);
		// get tx receipt
		let transactionReceipt: ethers.providers.TransactionReceipt;
		// check every second for 30 seconds
		for (let i = 0; i < 30; i++) {
			try {
				transactionReceipt = await provider.getTransactionReceipt(_txHash);
				if (transactionReceipt.confirmations > 1) return true;
				await new Promise((resolve) => setTimeout(resolve, 1000));
			} catch (err) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				console.error(err);
			}
		}
		return false;
	}
</script>

<div>
	<div class="relative z-10" role="dialog" aria-modal="true">
		<div class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
		<div class="fixed z-10 inset-0 overflow-y-auto">
			<div
				class="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4"
			>
				<div
					class="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl"
				>
					<div
						class="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
					>
						<div
							class="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8"
						>
							<div
								class="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5"
							>
								<img src={imageUri} alt={title} class="object-center object-cover" />
							</div>
							<div class="sm:col-span-8 lg:col-span-7">
								<!-- Title -->
								<h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{title}</h2>

								<section aria-labelledby="information-heading" class="mt-2">
									<!-- Price -->
									<p class="text-2xl text-gray-900">{price} {symbol}</p>

									<!-- Seller Profile -->
									<div class="mt-6">
										<h4 class="sr-only">Seller</h4>
										<div class="flex items-center">
											<div class="text-sm">Seller:&nbsp;</div>
											<a
												href="/profile?address={seller}"
												class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Profile</a
											>
										</div>
									</div>

									<!-- Chain -->
									<div class="text-sm">
										Chain: {chain ? chain.charAt(0).toUpperCase() + chain.slice(1) : ''}
									</div>

									<!-- ItemId -->
									<div class="text-sm">
										Item Id: {itemId ? itemId : ''}
									</div>
								</section>

								<section aria-labelledby="options-heading" class="mt-10">
									<form>
										<!-- File Description -->
										<div class="lg:min-h-[10rem]">
											<h4 class="text-sm text-gray-900 font-medium">{description}</h4>
										</div>

										<!-- Buy/Download -->
										<button
											type="submit"
											class="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											on:click={handleBuy}>Buy / Download</button
										>

										<div
											class="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 text-center"
										>
											<a href={receipt} target="_blank"> {!receipt ? '' : 'View Receipt'} </a>
										</div>
									</form>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
