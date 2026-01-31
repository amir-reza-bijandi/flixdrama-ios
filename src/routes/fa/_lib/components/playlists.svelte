<script module>
	type Data = {
		images: string[];
		title: string;
		subtitle?: string;
		href: ResolvedPathname;
	}[];
	export type { Data as PlaylistsData };
</script>

<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import { type ClassValue } from 'tailwind-variants';
	import List from './list.svelte';

	type Props = {
		data: Data;
		class?: ClassValue;
		imageAspectRatio?: 'photo' | 'square';
	};
	const { data, class: extraClass, imageAspectRatio = 'photo' }: Props = $props();
</script>

<List class={extraClass}>
	{#each data as { title, subtitle, href, images }}
		<Pressable.Root as="a" class="block" {href}>
			<Pressable.Content>
				<Box.Root class="flex items-center justify-between p-4">
					<Box.Visuals class="rounded-2xl bg-background-tertiary" />
					<div class="flex flex-col gap-2">
						<div class={[subtitle && 'font-bold']}>{title}</div>
						{#if subtitle}
							<div class="text-xs leading-none text-foreground-secondary">{subtitle}</div>
						{/if}
					</div>
					<div
						class="flex w-44.5 gap-1.5 mask-linear-90 mask-linear-from-black mask-linear-to-transparent"
					>
						{#each images as image}
							<Image
								class={[
									'rounded-lg',
									imageAspectRatio === 'photo' ? 'aspect-2/3 w-10' : 'aspect-square w-12'
								]}
								src={image}
								hasLoadingGlow
								hasOutline
							/>
						{/each}
					</div>
				</Box.Root>
			</Pressable.Content>
		</Pressable.Root>
	{/each}
</List>
