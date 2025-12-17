<script lang="ts">
	import { resolve } from '$app/paths';
	import { langStore } from '$lib/store/lang-store.svelte';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { toFarsi } from '../../routes/fa/_lib/utilities/to-farsi';
	import Image from './image.svelte';

	type Props = {
		id: number;
		image: string;
		title: string;
		subtitle?: string;
		score: number;
	};
	const { id, image, score, title, subtitle }: Props = $props();
</script>

<a
	class="block w-32 shrink-0"
	href={resolve(`/${langStore.current}/media/[id]`, {
		id: String(id)
	})}
	draggable="false"
>
	<div class="relative mb-1.5">
		<div class="relative overflow-hidden transition-colors">
			<Image
				class="aspect-2/3 h-auto rounded-2xl"
				src={image}
				width={128}
				height={192}
				outline
				loadingGlow
			/>
			<div
				class="absolute start-2 top-2 flex items-center gap-0.5 rounded-full bg-gradient-secondary p-1 pe-1.5 text-foreground-accent outline -outline-offset-1 outline-stroke-tertiary"
			>
				<Icon class="size-3.5" src={Star} theme="solid" />
				<span class="translate-y-px text-xs leading-none font-bold">
					{langStore.current === 'en' ? score.toFixed(1) : toFarsi(parseFloat(score.toFixed(1)))}
				</span>
			</div>
		</div>
		<Image class="absolute -bottom-3 left-6 -z-10 h-16 w-20 opacity-75 blur-xl" src={image} />
	</div>
	<div class="relative z-10 px-2 text-center">
		<div class="mb-0.5 line-clamp-2 text-sm leading-normal font-bold">{title}</div>
		{#if subtitle}
			<div
				class="line-clamp-1 text-xs leading-none font-medium text-foreground-secondary transition-colors"
			>
				{subtitle}
			</div>
		{/if}
	</div>
</a>
