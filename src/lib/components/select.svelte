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
	import { toRem } from '$lib/utilities/general';

	const DEFAULT_SELECTED_INDEX = 0;
	const DATASET_KEY = 'selected';

	type Props = {
		options: T;
		alignment?: 'start' | 'center';
		onSelect?: SelectEventHandler<T>;
	};
	let { options, alignment = 'start', onSelect }: Props = $props();

	type IndicatorRect = {
		x: number;
		width: number;
	};

	let selectElm = $state<HTMLElement | null>(null);
	const optionElms = $state<HTMLElement[]>([]);
	let selectedIndex = $state(DEFAULT_SELECTED_INDEX);
	let hasTransition = $state(false);
	const indicatorRect = $state<IndicatorRect>({
		x: 0,
		width: 0
	});

	$effect(() => {
		void selectedIndex;
		requestAnimationFrame(() => {
			const selectedOptionElm = optionElms[selectedIndex];
			if (selectElm && selectedOptionElm) {
				const parentRect = selectElm.getBoundingClientRect();
				const childRect = selectedOptionElm.getBoundingClientRect();
				indicatorRect.x = childRect.x - parentRect.x;
				indicatorRect.width = childRect.width;
				requestAnimationFrame(() => {
					hasTransition = true;
				});
			}
		});
	});
</script>

<div
	class={['relative isolate mt-3 mb-4 flex gap-2', alignment === 'center' && 'justify-center']}
	bind:this={selectElm}
>
	{#each options as { name, value }, index (value)}
		<div bind:this={optionElms[index]}>
			<Pressable.Root
				class="inline-block shrink-0"
				onClick={() => {
					selectedIndex = index;
					onSelect?.(value, index);
				}}
			>
				<Pressable.Content>
					<div
						class={[
							'cursor-pointer p-2 text-sm leading-none transition-[scale,color] duration-[750ms,250ms]',
							index === selectedIndex && 'text-foreground-accent'
						]}
						{...{
							[`data-${DATASET_KEY}`]: selectedIndex === index
						}}
					>
						<span class="inline-block translate-y-px">{name}</span>
					</div>
				</Pressable.Content>
			</Pressable.Root>
		</div>
	{/each}
	<span
		style:--width={toRem(indicatorRect.width)}
		style:--x="{indicatorRect.x}px"
		class={[
			'absolute left-(--x) -z-10 h-full w-(--width) rounded-full bg-gradient bg-gradient-primary outline -outline-offset-1 outline-stroke-tertiary ease-overshoot-light',
			hasTransition && 'transition-[width,left]'
		]}
	></span>
</div>
