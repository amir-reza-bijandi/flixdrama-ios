<script lang="ts">
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';

	type Props = {
		images: string[];
		title: string;
		subtitle: string;
		href: string;
	};
	const { images, title, subtitle, href }: Props = $props();
</script>

<a class="block" {href}>
	<Box.Root class="flex items-center justify-between p-4">
		<Box.Visuals class="rounded-2xl bg-background-tertiary" />
		<div class="flex flex-col gap-2">
			<div class="text-sm leading-none">{title}</div>
			<div class="text-xs leading-none text-foreground-secondary">{subtitle}</div>
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
