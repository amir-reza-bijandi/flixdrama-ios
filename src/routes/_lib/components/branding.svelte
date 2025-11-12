<script lang="ts">
	import { page } from '$app/state';
	import { ASSETS } from '$lib/assets';

	const showLogo = $derived(!page.url.pathname.includes('/media'));
</script>

<div class="relative">
	<img src={ASSETS.FLIXDRAMA} alt="" width="106" height="18" fetchpriority="high" />
	{#if showLogo}
		<img
			style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
			class="absolute -top-5 -left-3.25 -z-10 w-32 opacity-10"
			src={ASSETS.LOGO}
			alt=""
			width="106"
			height="110"
			fetchpriority="high"
		/>
	{/if}
</div>
