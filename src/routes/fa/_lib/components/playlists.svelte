<script module>
	type Data = {
		images: string[];
		title: string;
		subtitle?: string;
		href: string;
	}[];
	export type { Data as PlaylistsData };
</script>

<script lang="ts">
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		data: Data;
		class?: ClassValue;
	};
	const { data, class: extraClass }: Props = $props();
</script>

<div class={cn('flex flex-col gap-2', extraClass)}>
	{#each data as { title, subtitle, href, images }}
		<a class="block" {href}>
			<Box.Root class="flex items-center justify-between p-4">
				<Box.Visuals class="rounded-2xl bg-background-tertiary" />
				<div class="flex flex-col gap-2">
					<div class={['text-sm leading-none', subtitle && 'font-bold']}>{title}</div>
					{#if subtitle}
						<div class="text-xs leading-none text-foreground-secondary">{subtitle}</div>
					{/if}
				</div>
				<div
					class="flex w-44.5 gap-1.5 mask-linear-90 mask-linear-from-black mask-linear-to-transparent"
				>
					{#each images as image}
						<Image class="aspect-2/3 w-10 rounded-lg" src={image} hasLoadingGlow hasOutline />
					{/each}
				</div>
			</Box.Root>
		</a>
	{/each}
</div>
