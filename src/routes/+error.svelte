<script>
	import Nav from '../components/Nav.svelte';
	import errorImg from '$lib/images/error.svg';
</script>

<div>
	<Nav />
	<section class="container items-center text-center">
		<div class="relative flex flex-col justify-center md:flex-row md:space-x-4">
			<img
				class="container items-center max-w-4xl px-5 mx-auto mt-16 text-center"
				src={errorImg}
				alt="Error"
			/>
		</div>
		<div class="m-0 text-xl lg:text-3xl md:text-2xl p-5 text-gray-700">404 Page Not Found</div>
	</section>
</div>
