<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import type { SystemModeValue } from 'mode-watcher';
	import { mode } from 'mode-watcher';
	import { fade } from 'svelte/transition';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		src: string;
		size: number;
		class?: ClassValue;
	};
	const { src, size, class: extraClass }: Props = $props();
</script>

{#if mode.current === 'dark'}
	{@render icon('dark')}
{:else}
	{@render icon('light')}
{/if}

{#snippet icon(mode: Exclude<SystemModeValue, undefined>)}
	<div
		class={cn('absolute top-0 left-0', extraClass)}
		transition:fade={{ duration: TRANSITION.DURATION }}
	>
		<Image
			--size={toRem(size)}
			class={[
				'size-(--size) mask-linear-180 mask-linear-from-foreground-primary mask-linear-to-transparent',
				mode === 'dark' ? 'opacity-25 invert-100' : 'opacity-50'
			]}
			{src}
		/>
	</div>
{/snippet}
