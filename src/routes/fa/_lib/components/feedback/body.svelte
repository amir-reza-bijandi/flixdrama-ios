<script lang="ts">
	import { Box } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import { toRem } from '$lib/utilities/general';
	import { TriangleAlert } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		isSpoiler: boolean;
	};
	const { children, isSpoiler }: Props = $props();

	let isTextVisible = $state(!isSpoiler);
	let width = $state(0);
	let textHeight = $state(0);
	let height = $derived(isTextVisible ? textHeight : width);
	let hasTransition = $state(false);

	$effect(() => {
		requestAnimationFrame(() => {
			hasTransition = true;
		});
	});

	const handleClick = () => (isTextVisible = true);
</script>

<div
	style:--height={toRem(height)}
	class={[
		'relative mb-3 h-(--height) ease-overshoot-extra-light',
		hasTransition && 'transition-[height]'
	]}
	bind:clientWidth={width}
>
	{#if !isTextVisible}
		<Pressable.Root class="absolute inset-0 z-10" onClick={handleClick}>
			<Pressable.Content class="size-full">
				<Box.Root class="isolate grid size-full place-items-center">
					<Box.Visuals class="rounded-2xl bg-background-tertiary" hasBlur={false} />
					<div class="flex flex-col items-center justify-center text-accent-secondary-tint">
						<TriangleAlert class="mb-4 size-12 stroke-[1.25]" />
						<div class="mb-2 font-bold">خطر لو رفتن داستان!</div>
						<div class="text-xs leading-none">برای خوندن متن اینجا کلیک کن...</div>
					</div>
				</Box.Root>
			</Pressable.Content>
		</Pressable.Root>
	{/if}
	<div class="grid size-full place-items-center">
		<div
			class={[
				'text-sm leading-normal transition-[scale,opacity] ease-overshoot-light',
				!isTextVisible && 'scale-75 opacity-0'
			]}
			bind:clientHeight={textHeight}
		>
			{@render children?.()}
		</div>
	</div>
</div>
