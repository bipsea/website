<script lang="ts">
	import { ethers } from 'ethers';
	import fetchChainIds from '../../bipsea/fetchChainIds';
	import Nav from '../../components/Nav.svelte';
	import Footer from '../../components/Footer.svelte';
	import Loading from '../../components/Loading.svelte';
	import { onMount } from 'svelte';
	import Bipsea from '../../bipsea';

	const bipsea = new Bipsea();

	onMount(() => {
		bipsea.init();
	});

	let address: string,
		title: string,
		description: string,
		price: string,
		file: HTMLInputElement,
		image: HTMLInputElement,
		chain: string,
		imageName: string,
		fileName: string,
		isLoading = false, // true when user clicks sell
		isConfirmed = false, // true when tx is confirmed
		receipt = '';

	async function upload() {
		if (
			!title ||
			!description ||
			!price ||
			!chain ||
			!file.files ||
			!image.files ||
			!file.files.length ||
			!image.files.length
		)
			return alert('Please complete form');

		try {
			isLoading = true;
			const metadataUri = await bipsea.upload({
				title,
				description,
				price,
				chain,
				file: file.files[0],
				image: image.files[0]
			});
			console.log(metadataUri);
			const signer = await bipsea.getSigner();
			address = await signer.getAddress();
			const txHash = await bipsea.sell(metadataUri);
			const chainIds = await fetchChainIds();
			receipt = chainIds[chain].blockExplorerUrls[0] + '/tx/' + txHash;
			isConfirmed = await isTxConfirmed(txHash);
			isLoading = false;
		} catch (e) {
			isLoading = false;
			console.error(e);
		}
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
		for (let i = 0; i < 120; i++) {
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
	<Nav />

	<div class="container items-center max-w-6xl px-5 mx-auto space-y-6">
		<section class="h-auto bg-white">
			<div class="max-w-7xl mx-auto py-16 px-10 sm:py-24 sm:px-6 lg:px-8 sm:text-center">
				<p
					class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
				>
					Upload and Sell
				</p>
				<p class="max-w-3xl mt-5 mx-auto text-xl text-gray-500">for the price you deserve</p>
			</div>
		</section>

		<div class="pb-20">
			<div class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Information</h3>
						<p class="mt-1 text-sm text-gray-600">
							Your file will be encrypted and uploaded to a permanent storage network. Bipsea will
							connect the encrypted file to a smart contract and list on a decentralized
							marketplace.
						</p>
					</div>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<div class="shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
							<!-- Title -->
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="title" class="block text-sm font-medium text-gray-700"> Title </label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="title"
											id="title"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="My Title"
											bind:value={title}
										/>
									</div>
								</div>
							</div>

							<!-- Description -->
							<div>
								<label for="description" class="block text-sm font-medium text-gray-700">
									Description
								</label>
								<div class="mt-1">
									<textarea
										id="description"
										name="description"
										rows="3"
										class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
										placeholder="This is a description"
										bind:value={description}
									/>
								</div>
							</div>

							<!-- Price -->
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="price" class="block text-sm font-medium text-gray-700"> Price </label>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											type="number"
											name="price"
											id="price"
											class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
											placeholder="1.23 ETH"
											bind:value={price}
										/>
									</div>
								</div>
							</div>

							<!-- Chain -->
							<div class="col-span-6 sm:col-span-3">
								<label for="chain" class="block text-sm font-medium text-gray-700">Chain</label>
								<select
									id="chain"
									name="chain"
									autocomplete="chain-name"
									class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={chain}
								>
									<option value="goerli">Goerli</option>
									<option value="polygon">Polygon</option>
									<option value="optimism">Optimism</option>
									<option value="harmony">Harmony</option>
								</select>
							</div>

							<!-- Upload Image -->
							<div>
								<div class="block text-sm font-medium text-gray-700">Cover Photo</div>
								<div
									class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
								>
									<div class="space-y-1 text-center">
										<svg
											class="mx-auto h-12 w-12 text-gray-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										<div class="text-sm text-gray-600">
											<label
												for="image-upload"
												class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
											>
												<span>{imageName || 'Upload an Image'}</span>
												<input
													id="image-upload"
													name="image-upload"
													type="file"
													class="sr-only"
													bind:value={imageName}
													bind:this={image}
												/>
											</label>
										</div>
										<p class="text-xs text-gray-500">PNG, JPG</p>
									</div>
								</div>
							</div>

							<!-- Upload File -->
							<div>
								<div class="block text-sm font-medium text-gray-700">File to Encrypt & Sell</div>
								<div
									class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
								>
									<div class="space-y-1 text-center">
										<svg
											class="mx-auto h-12 w-12 text-gray-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										<div class="text-sm text-gray-600">
											<label
												for="file-upload"
												class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
											>
												<span>{fileName || 'Upload a File to Sell'}</span>

												<input
													id="file-upload"
													name="file-upload"
													type="file"
													class="sr-only"
													bind:value={fileName}
													bind:this={file}
												/>
											</label>
										</div>
										<p class="text-xs text-gray-500">PNG, GIF, PDF, MP3, MP4, OBJ</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Submit Section -->
						<div class="px-4 py-3 bg-gray-50 text-left sm:px-6">
							<!-- Sell button -->
							{#if isLoading}
								<button
									disabled
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									on:click={upload}>Uploading</button
								>
								<Loading />
							{/if}
							{#if !isLoading}
								<button
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									on:click={upload}>Sell</button
								>
							{/if}

							<!-- Receipt -->
							<div
								class="text-center text-sm text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
							>
								<a href={receipt} target="_blank">{!receipt ? '' : 'View Receipt'}</a>
							</div>
						</div>

						<!-- Profile -->
						{#if isConfirmed}
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
								<a href="/profile?address={address}">
									<button
										class="inline-flex justify-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>View Profile</button
									>
								</a>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>
