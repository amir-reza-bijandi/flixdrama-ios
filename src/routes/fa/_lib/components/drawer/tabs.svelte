<script module>
	type Data = ReadonlyArray<{
		label: string;
		value: unknown;
	}>;
	type TabsDataValue<T extends Data> = T[number]['value'];
	export type { Data as TabsData, TabsDataValue };
</script>

<script lang="ts" generics="T extends Data">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import { toRem } from '$lib/utilities/general';

	type Props = {
		data: T;
		value: T[number]['value'];
	};
	let { data, value: currentValue = $bindable() }: Props = $props();

	const currentIndex = $derived.by(() => {
		const index = data.findIndex(({ value }) => value === currentValue);
		if (index < 0) throw new Error('Value does not exist on the provided data!');
		return index;
	});
	const tabElms = $state<HTMLElement[]>([]);
	const indicatorRect = $derived.by(() => {
		const x = tabElms[currentIndex]?.offsetLeft;
		const width = tabElms[currentIndex]?.clientWidth;
		return {
			x,
			width
		};
	});
	let hasTransition = $state(false);

	$effect(() => {
		requestAnimationFrame(() => {
			hasTransition = true;
		});
	});
</script>

<Box.Root class="p-1.5">
	<Box.Visuals class="bg-background-tertiary" />
	<div class="relative isolate flex gap-1.5">
		{#each data as { value, label }, index}
			<div class="flex-1" bind:this={tabElms[index]}>
				<Pressable.Root class="w-full" onClick={() => (currentValue = value)}>
					<Pressable.Content>
						<span class="grid place-items-center p-3.5 text-sm leading-none">{label}</span>
					</Pressable.Content>
				</Pressable.Root>
			</div>
		{/each}
		<div
			style:--width={toRem(indicatorRect.width)}
			style:--x={toRem(indicatorRect.x)}
			class={[
				'absolute top-0 left-0 -z-10 h-full w-(--width) translate-x-(--x) rounded-full bg-gradient bg-gradient-primary outline -outline-offset-1 outline-stroke-tertiary ease-overshoot-light',
				hasTransition && 'transition-transform'
			]}
		></div>
	</div>
</Box.Root>
