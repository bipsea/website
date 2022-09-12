<script type="ts">
	import type Bipsea from '../bipsea';
	import type { ItemUI } from '../app.d';
	import fetchChainIds from '../bipsea/fetchChainIds';
	export let item: ItemUI;
	export let isProfileOwner: boolean;
	export let bipsea: Bipsea;

	async function handleDelist() {
		const txHash = await bipsea.delist(item.metadataUri);
		const chainIds = await fetchChainIds();
		window.open(chainIds[item.chain].blockExplorerUrls[0] + '/tx/' + txHash);
	}
</script>

<div>
	<a href="/buy?chain={item.chain}&itemId={item.itemId}" class="group">
		<div
			class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
		>
			<img
				src={item.imageUri}
				alt={item.description}
				class="w-full h-full object-center object-cover group-hover:opacity-75"
			/>
		</div>
		<h3 class="mt-4 text-mm text-gray-700">{item.title}</h3>
		<h3 class="mt-4 text-sm text-gray-700">
			Chain: {item.chain.charAt(0).toUpperCase() + item.chain.slice(1)}
		</h3>
		<p class="mt-1 text-lg font-medium text-gray-900">{item.price} {item.currency}</p>
	</a>
	{#if isProfileOwner}
		<button
			class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
			on:click={handleDelist}>Delist</button
		>
	{/if}
</div>
