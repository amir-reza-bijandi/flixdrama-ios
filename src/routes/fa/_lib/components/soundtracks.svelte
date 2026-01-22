<script module>
	type Data = {
		id: number;
		title: string;
		artist: string;
		image?: string;
	}[];
	export type { Data as SoundtracksData };
</script>

<script lang="ts">
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Toggle from '$lib/components/toggle.svelte';
	import { Pause, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ClassValue } from 'tailwind-variants';
	import List from './list.svelte';

	type Props = {
		data: Data;
		class?: ClassValue;
	};
	const { data, class: extraClass }: Props = $props();

	let currentId = $state<number | null>(null);
</script>

<List class={extraClass}>
	{#each data as { id, title, artist, image }}
		<Pressable.Root onClick={() => (currentId = currentId !== id ? id : null)}>
			<Pressable.Content>
				<Box.Root class="flex items-center justify-end gap-3 p-4">
					<Box.Visuals class="rounded-2xl bg-background-tertiary" />
					<div class="flex items-center gap-2">
						<div class="flex translate-y-0.5 flex-col items-start gap-1 ltr">
							<div class="font-bold">{title}</div>
							<div class="text-xs leading-none text-foreground-secondary">{artist}</div>
						</div>
						{#if image}
							<Image class="size-12 rounded-lg" src={image} hasOutline hasLoadingGlow />
						{/if}
					</div>
					<Toggle isActive={id === currentId}>
						{#snippet active()}
							<Icon class="size-5" src={Pause} theme="solid" />
						{/snippet}
						{#snippet inactive()}
							<Icon class="size-5" src={Play} theme="solid" />
						{/snippet}
					</Toggle>
				</Box.Root>
			</Pressable.Content>
		</Pressable.Root>
	{/each}
</List>
