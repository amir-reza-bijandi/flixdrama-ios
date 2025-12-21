<script module>
	export type Option<T = unknown> = Readonly<{
		name: string;
		value: T;
	}>;
	type Options = ReadonlyArray<Option>;
	export type SelectEventHandler<T extends Options> = (
		value: T[number]['value'],
		index: number
	) => void;
</script>

<script lang="ts" generics="T extends Options">
	import * as Pressable from '$lib/components/pressable';
	import * as Swiper from '$lib/components/swiper';
	import { langStore } from '$lib/store/lang-store.svelte';
	import { Lang } from '$lib/types/general';
	import type { SwiperRootProps } from './swiper/root.svelte';

	const DEFAULT_SELECTED_INDEX = 0;

	type Props = Pick<SwiperRootProps, 'offset'> & {
		options: T;
		alignment?: 'start' | 'center';
		onSelect?: SelectEventHandler<T>;
	};
	let { options, alignment = 'start', offset, onSelect }: Props = $props();

	const optionElms = $state<HTMLElement[]>([]);
	let selectedIndex = $state(DEFAULT_SELECTED_INDEX);
	let isSliderMoving = $state(false);

	const handleTouchMove = () => {
		isSliderMoving = true;
	};
	const handleTouchEnd = () => (isSliderMoving = false);
</script>

<Swiper.Root
	class="mt-3 mb-4"
	{offset}
	spaceBetween={8}
	onTouchMove={handleTouchMove}
	onTouchEnd={handleTouchEnd}
>
	<Swiper.Wrapper class={isSliderMoving && 'pointer-events-none'}>
		{#each options as { name, value }, index (value)}
			<Swiper.Slide>
				<div bind:this={optionElms[index]}>
					<Pressable.Root
						class="inline-block"
						onClick={() => {
							selectedIndex = index;
							onSelect?.(value, index);
						}}
					>
						<Pressable.Content
							class={[
								'p-2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient before:bg-gradient-primary before:outline before:-outline-offset-1 before:outline-stroke-tertiary before:transition-[scale,opacity] before:ease-overshoot-light',
								index !== selectedIndex && 'before:scale-25 before:opacity-0'
							]}
						>
							<span
								class={[
									'inline-block text-sm leading-none transition-colors duration-250',
									langStore.current === Lang.En && 'translate-y-px',
									index === selectedIndex && 'text-foreground-accent'
								]}
							>
								{name}
							</span>
						</Pressable.Content>
					</Pressable.Root>
				</div>
			</Swiper.Slide>
		{/each}
	</Swiper.Wrapper>
</Swiper.Root>
