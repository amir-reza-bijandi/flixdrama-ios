<script lang="ts">
	import { asset } from '$app/paths';
	import Image from '$lib/components/image.svelte';
	import { fade } from 'svelte/transition';
	import { backgroundStore } from '../store/background-store.svelte';
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	{#key backgroundStore.current}
		<div
			class="absolute size-full"
			transition:fade={{
				duration: 1000
			}}
		>
			<Image class="h-screen w-screen scale-125 blur-[128px]" src={backgroundStore.current} />
		</div>
	{/key}
	<div
		style="background-image: url({asset('/image/noise.png')});"
		class="absolute inset-0 bg-background-primary/70 transition-colors"
	></div>
</div>
