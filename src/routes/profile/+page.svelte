<script lang="ts">
	import { ethers } from 'ethers';
	import Nav from '../../components/Nav.svelte';
	import Items from '../../components/Items.svelte';
	import { onMount } from 'svelte';
	import Bipsea from '../../bipsea';
	import fetchSubgraphs from '../../bipsea/fetchSubgraphs';
	import type { ItemUI, Subgraph } from '../../app.d';

	const bipsea = new Bipsea();
	let address: string | null,
		items: ItemUI[] = [],
		isProfileOwner = false;

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		address = params.get('address');
		// fetch
		const subgraphs = await fetchSubgraphs();
		for (let subgraph of subgraphs) {
			fetchItems(subgraph);
		}
		// connect to wallet
		bipsea.init();
		const signer = await bipsea.getSigner();
		const walletAddress = await signer.getAddress();
		if (!address) window.location.href = `/profile?address=${walletAddress}`;
		isProfileOwner = walletAddress === address;
	});

	async function fetchItems(_subgraph: Subgraph) {
		if (!address) return;
		try {
			// fetch subgraph data on the blockchain
			const subgraphData = await fetch(_subgraph.uri, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: `{"query":"query GetSellerItems {\\n  items(where: {seller: \\"${address.toLowerCase()}\\", canBuy: true}) {\\n    price\\n    seller\\n    uri\\n    itemId\\n  }\\n}","variables":null,"operationName":"GetSellerItems","extensions":{"headers":null}}`
			})
				.then((res) => res.json())
				.then((json) => json.data.items);
			// create an array of items
			for (let data of subgraphData) {
				const metadata = await fetch(data.uri).then((res) => res.json());
				items = [
					...items,
					{
						title: metadata.title,
						description: metadata.description,
						imageUri: metadata.imageUri,
						chain: metadata.chain,
						price: ethers.utils.formatUnits(metadata.price.toString()).toString(),
						itemId: metadata.itemId,
						metadataUri: data.uri,
						currency: _subgraph.currency
					}
				];
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<div>
	<Nav />
	<div class="bg-white">
		<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<div
				class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
			>
				{#each items as item}
					<Items {item} {isProfileOwner} {bipsea} />
				{/each}
			</div>
		</div>
	</div>
</div>
