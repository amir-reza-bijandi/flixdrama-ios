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
	import { toRem } from '$lib/utilities/general';

	const DEFAULT_SELECTED_INDEX = 0;
	const DATASET_KEY = 'selected';

	type Props = {
		options: T;
		onSelect?: SelectEventHandler<T>;
		maxOptionWidth?: number;
	};
	let { options, maxOptionWidth = 92, onSelect }: Props = $props();

	type IndicatorRect = {
		x: number;
		width: number;
	};

	let selectElm = $state<HTMLElement | null>(null);
	let selectedIndex = $state(DEFAULT_SELECTED_INDEX);
	const optionElms = $state<HTMLButtonElement[]>([]);
	const indicatorRect = $derived.by<IndicatorRect>(() => {
		const selectedOptionElm = optionElms[selectedIndex];
		if (selectElm && selectedOptionElm) return calculateIndicatorRect(selectElm, selectedOptionElm);
		else
			return {
				x: 0,
				width: maxOptionWidth
			};
	});

	function calculateIndicatorRect(parent: HTMLElement, child: HTMLElement): IndicatorRect {
		const parentRect = parent.getBoundingClientRect();
		const childRect = child.getBoundingClientRect();

		return {
			x: childRect.x - parentRect.x,
			width: childRect.width
		};
	}
</script>

<div class="relative isolate mt-2 mb-4 flex gap-2" bind:this={selectElm}>
	{#each options as { name, value }, index (value)}
		<button
			style="max-width: {toRem(maxOptionWidth)};"
			class={[
				'inline-block cursor-pointer p-2 text-sm leading-none transition-colors duration-300',
				index === selectedIndex && 'text-foreground-accent'
			]}
			onclick={() => {
				selectedIndex = index;
				onSelect?.(value, index);
			}}
			bind:this={optionElms[index]}
			{...{
				[`data-${DATASET_KEY}`]: selectedIndex === index
			}}
		>
			<span class="inline-block translate-y-px">{name}</span>
		</button>
	{/each}
	<span
		style:--width={toRem(indicatorRect.width)}
		style:--x="{indicatorRect.x}px"
		class="absolute left-(--x) -z-10 h-full w-(--width) rounded-full border border-stroke-secondary bg-accent-primary transition-[width,left] ease-overshoot-light"
	></span>
</div>
