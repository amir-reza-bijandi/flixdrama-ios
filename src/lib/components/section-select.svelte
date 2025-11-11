<script module>
	export type Option<T = unknown> = Readonly<{
		name: string;
		value: T;
	}>;
	type OptionList = ReadonlyArray<Option>;
	export type SelectEventHandler<T extends OptionList> = (value: T[number]['value']) => void;
</script>

<script lang="ts" generics="T extends OptionList">
	import { toRem } from '$lib/utilities/general';

	const MAX_OPTION_WIDTH = 92;
	const DEFAULT_SELECTED_INDEX = 0;
	const DATASET_KEY = 'selected';

	type Props = {
		optionList: T;
		onSelect?: SelectEventHandler<T>;
	};
	let { optionList }: Props = $props();

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
				width: MAX_OPTION_WIDTH
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

<div class="relative isolate mt-3 mb-4 flex gap-2 px-5" bind:this={selectElm}>
	{#each optionList as { name, value }, index (value)}
		<button
			style="max-width: {toRem(MAX_OPTION_WIDTH)};"
			class={[
				'inline-block cursor-pointer p-2 text-sm leading-none transition-colors duration-300',
				index === selectedIndex && 'text-foreground-accent'
			]}
			onclick={() => (selectedIndex = index)}
			bind:this={optionElms[index]}
			{...{
				[`data-${DATASET_KEY}`]: selectedIndex === index
			}}
		>
			{name}
		</button>
	{/each}
	<span
		style:--width={toRem(indicatorRect.width)}
		style:--x="{indicatorRect.x}px"
		class="absolute left-(--x) -z-10 h-full w-(--width) rounded-full border border-stroke-secondary bg-accent-primary transition-[width,left] duration-500 ease-overshoot-light"
	></span>
</div>
