<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import heroImg from '$lib/images/hero.svg';
	import infoAgeImg from '$lib/images/information-age.svg';
	import powerOfMathImg from '$lib/images/power-of-math.svg';
	import sellDigitalImg from '$lib/images/sell-digital.svg';
	import perksImg from '$lib/images/perks.svg';
	import filecoinImg from '$lib/images/filecoin.png';
	import ipfsImg from '$lib/images/ipfs.png';
	import polygonImg from '$lib/images/polygon.png';
	import litImg from '$lib/images/lit.png';
	import optimismImg from '$lib/images/optimism.png';
	import graphImg from '$lib/images/graph.png';
</script>

<div>
	<Nav />
	<!-- Hero -->
	<section class="px-2 pt-32 bg-white md:px-0">
		<div class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
			<h1
				class="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center"
			>
				<span class="block">
					Sell Digital <span class="block mt-1 text-indigo-500 lg:inline lg:mt-0">
						Earn Crypto
					</span></span
				>
			</h1>
			<p
				class="w-full mx-auto text-base text-left text-gray-500 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center"
			>
				With Bipsea, anyone can earn cryptocurrency. Simply upload a file, set a price, and get
				paid. That’s it.
			</p>
			<div class="relative flex flex-col justify-center md:flex-row md:space-x-4">
				<a
					href="/sell"
					class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto"
				>
					Start Selling
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5 ml-1"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" class="" />
					</svg>
				</a>
			</div>
		</div>
		<div class="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
			<img alt="" src={heroImg} />
		</div>
	</section>

	<!-- Information Age -->
	<section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
		<div
			class="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16"
		>
			<!-- Image -->
			<div
				class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10"
			>
				<img alt="" src={infoAgeImg} class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
			</div>
			<!-- Content -->
			<div
				class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none"
			>
				<h2
					class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
				>
					An Information Age
				</h2>
				<p
					class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg"
				>
					We live in an information age. An age towards equal opportunity for billions of people.
					Individuals like us will have the same tools as multi-billion dollar corporations.
					Creative entrepreneurs will be rewarded for their work. Financial independence starts
					small. Start here. You’re at the right place.
				</p>
			</div>
			<!-- End  Content -->
		</div>
	</section>

	<!-- Sell All Digital Forms -->
	<section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
		<div
			class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16"
		>
			<!-- Content -->
			<div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
				<h2
					class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
				>
					Sell All Digital Forms
				</h2>
				<p>&nbsp;</p>
				<ul class="p-0 m-0 leading-6 border-0 border-gray-300">
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> 3D models
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> Animations
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> Apps
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> e-Books
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> Games
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> PDFs
					</li>
				</ul>
			</div>
			<!-- End  Content -->
			<!-- Image -->
			<div
				class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"
			>
				<img alt="" src={sellDigitalImg} class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" />
			</div>
		</div>
	</section>

	<!-- The Power of Math -->
	<section
		class="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16"
	>
		<!-- Image -->
		<div
			class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10"
		>
			<img alt="" src={powerOfMathImg} class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
		</div>
		<!-- Content -->
		<div
			class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none"
		>
			<h2
				class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
			>
				Power of Math
			</h2>
			<p
				class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg"
			>
				This platform will not be possible without primitives such as cryptography, immutable
				storage, content identifiers, smart contracts, micro-transactions and other fancy words.
				This means:
			</p>
			<ul class="p-0 m-0 leading-6 border-0 border-gray-300">
				<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
					<span
						class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
						><span class="text-sm font-bold">✓</span></span
					> Me upload file.
				</li>
				<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
					<span
						class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
						><span class="text-sm font-bold">✓</span></span
					> Me make money.
				</li>
				<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
					<span
						class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
						><span class="text-sm font-bold">✓</span></span
					> Me make stuff for everybody.
				</li>
			</ul>
		</div>
		<!-- End  Content -->
	</section>

	<!-- Some Perks -->
	<section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
		<div
			class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16"
		>
			<!-- Content -->
			<div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
				<h2
					class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
				>
					Some Perks
				</h2>
				<p
					class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg"
				>
					Pay a few cents to sell and earn 100% of the revenue. Don’t have cryptocurrency? No
					problem. We’ll list for you for 1%.
				</p>
				<ul class="p-0 m-0 leading-6 border-0 border-gray-300">
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> No Monthly Fee
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> No Bank Account. Just install Metamask
					</li>
					<li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
						<span
							class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-400 rounded-full"
							><span class="text-sm font-bold">✓</span></span
						> No Limit on what you sell.
					</li>
				</ul>
			</div>
			<!-- End  Content -->
			<!-- Image -->
			<div
				class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"
			>
				<img alt="" src={perksImg} class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" />
			</div>
		</div>
	</section>

	<!-- Tech -->
	<section class="relative py-20 overflow-hidden bg-white">
		<div class="relative px-16 mx-auto max-w-5xl">
			<h2
				class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
			>
				The Tech
			</h2>
			<p>&nbsp;</p>
			<div class="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={filecoinImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>Filecoin</h3>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={ipfsImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>IPFS</h3>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={polygonImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>Polygon</h3>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={litImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>Lit Protocol</h3>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={optimismImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>Optimism</h3>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center col-span-1">
					<div class="relative p-5">
						<div
							class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full rounded-tr-none bg-blue-50"
						/>
						<img alt="" class="relative z-20 w-full rounded-full" src={graphImg} />
					</div>
					<div class="mt-3 space-y-2 text-center">
						<div class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
							<h3>The Graph</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<Footer />
</div>
