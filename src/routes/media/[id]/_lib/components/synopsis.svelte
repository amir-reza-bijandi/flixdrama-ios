<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import PostSection from './post-section.svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	const MIN_TEXT_HEIGHT = 129;
	const EXPAND_BUTTON_PADDING = 8;
	const EXPAND_BUTTON_GAP = 4;

	let isExpanded = $state(false);
	let maxTextHeight = $state(0);
	let expandIconWidth = $state(0);
	let expandTextWidth = $state(0);
	const expandButtonWidth = $derived(expandIconWidth + expandTextWidth + EXPAND_BUTTON_GAP);

	const handleToggleExpand = () => (isExpanded = !isExpanded);
</script>

<PostSection heading="Synopsis">
	<div
		class="relative rounded-2xl bg-background-secondary text-sm leading-normal outline -outline-offset-1 outline-stroke-primary"
	>
		<div
			style:--height={isExpanded ? toRem(maxTextHeight) : toRem(MIN_TEXT_HEIGHT)}
			class={[
				'relative h-(--height) overflow-hidden mask-linear-0 mask-linear-from-transparent mask-linear-from-10% mask-linear-to-black transition-[height,mask-size] duration-[500ms,300ms] ease-[var(--ease-overshoot-light),var(--ease-out)]',
				isExpanded ? 'mask-size-[100%_500%]' : 'mask-size-[100%_100%]'
			]}
		>
			<div class="absolute inset-0 h-fit px-4 py-3" bind:clientHeight={maxTextHeight}>
				{@render children()}
			</div>
		</div>
		{#if maxTextHeight > MIN_TEXT_HEIGHT}
			<button
				style:--padding={toRem(EXPAND_BUTTON_PADDING)}
				style:--width={toRem(expandButtonWidth)}
				class="absolute -bottom-4 left-1/2 flex h-8 w-(--width) -translate-x-1/2 items-center overflow-hidden rounded-full bg-background-secondary leading-none font-bold shadow-absolute-content outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
				onclick={handleToggleExpand}
			>
				<div class="px-(--padding)" bind:clientWidth={expandIconWidth}>
					<ChevronDown
						class={[
							'size-4 stroke-3 transition-transform duration-750 ease-overshoot-medium',
							isExpanded && 'rotate-180'
						]}
					/>
					{#if isExpanded}
						{@render expandButtonText('Hide')}
					{:else}
						{@render expandButtonText('Show More')}
					{/if}
				</div>
			</button>
		{/if}
	</div>
</PostSection>

{#snippet expandButtonText(text: string)}
	<div
		class="absolute top-1/2 right-(--padding) translate-y-[calc(-50%+0.0625rem)] text-sm leading-none text-nowrap"
		bind:clientWidth={expandTextWidth}
		in:scale={{}}
		out:scale={{}}
	>
		{text}
	</div>
{/snippet}
