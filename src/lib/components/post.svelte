<script lang="ts">
	import { resolve } from '$app/paths';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
	href={resolve('/media/[id]', {
		id: String(id)
	})}
	draggable="false"
>
	<div class="relative mb-1.5">
		<div
			class="relative overflow-hidden rounded-2xl outline -outline-offset-1 outline-stroke-secondary"
		>
			<img class="aspect-2/3 h-auto" src={image} alt="" draggable={false} />
			<div
				class="absolute top-2 left-2 flex items-center gap-0.5 rounded-full bg-accent-secondary p-1 pr-1.5 text-foreground-accent outline -outline-offset-1 outline-stroke-secondary"
			>
				<Icon class="size-3.5" src={Star} theme="solid" />
				<span class="translate-y-px text-xs leading-none font-bold">{score.toFixed(1)}</span>
			</div>
		</div>
		<img
			class="absolute -bottom-3 left-6 -z-10 h-16 w-20 opacity-75 blur-xl"
			src={image}
			alt=""
			draggable={false}
		/>
	</div>
	<div class="relative z-10 px-2 text-center">
		<div class="mb-0.5 line-clamp-2 text-sm leading-snug">{title}</div>
		{#if subtitle}
			<div
				class="line-clamp-1 text-xs leading-none font-medium text-foreground-secondary transition-colors duration-500"
			>
				{subtitle}
			</div>
		{/if}
	</div>
</a>
