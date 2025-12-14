<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import type { TrailerInfo } from '$lib/types/api';
	import { ArrowDownTray, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Props = {
		backdrop: string;
		trailer?: TrailerInfo;
	};
	const { backdrop, trailer }: Props = $props();

	/**
	 * Opens the trailer link for streaming in a new tab
	 */
	function handleStreamTrailer() {
		if (trailer?.link) {
			window.open(trailer.link, '_blank');
		}
	}

	/**
	 * Opens the trailer link for downloading in a new tab
	 */
	function handleDownloadTrailer() {
		if (trailer?.link) {
			window.open(trailer.link, '_blank');
		}
	}
</script>

<div class="absolute top-0 left-1/2 w-132 -translate-x-1/2">
	<Image
		style="mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"
		class="aspect-video h-auto w-full"
		src={backdrop}
		loadingGlow
	/>
	<div class="absolute top-29.5 left-1/2 -translate-x-1/2">
		<div
			class="flex items-center gap-2 rounded-full bg-background-secondary p-3 outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors"
		>
			<button onclick={handleStreamTrailer} disabled={!trailer?.link}>
				<Icon class="size-5" src={Play} theme="solid" />
			</button>
			<Separator variant="primary" size={12} />
			<button onclick={handleDownloadTrailer} disabled={!trailer?.link}>
				<Icon class="size-5" src={ArrowDownTray} theme="micro" />
			</button>
		</div>
		<div class="mt-2 text-center text-sm leading-none font-bold">Trailer</div>
	</div>
</div>
