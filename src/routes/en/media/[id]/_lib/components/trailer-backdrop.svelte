<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import { ArrowDownTray, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Props = {
		backdrop: string;
	};
	const { backdrop }: Props = $props();
</script>

<div class="absolute top-0 left-1/2 w-132 -translate-x-1/2">
	<Image
		style="mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"
		class="aspect-video h-auto w-full"
		src={backdrop}
		hasLoadingGlow
	/>
	<div class="absolute top-29.5 left-1/2 -translate-x-1/2">
		<div
			class="flex items-center gap-2 rounded-full bg-background-secondary p-3 outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors"
		>
			<button>
				<Icon class="size-5" src={Play} theme="solid" />
			</button>
			<Separator variant="primary" size={12} />
			<button>
				<Icon class="size-5" src={ArrowDownTray} theme="micro" />
			</button>
		</div>
		<div class="mt-2 text-center text-sm leading-none font-bold">Trailer</div>
	</div>
</div>
