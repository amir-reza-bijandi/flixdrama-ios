<script lang="ts">
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import { MinusIcon, PlusIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { NumberInputProps } from '../number-input.svelte';
	import NumberInput from '../number-input.svelte';

	const MIN_VALUE = 0;

	type Props = NumberInputProps & {
		isDisabled?: boolean;
		children: Snippet;
	};
	let {
		value = $bindable(0),
		max = Number.MAX_SAFE_INTEGER,
		min = MIN_VALUE,
		children,
		isDisabled = true
	}: Props = $props();

	const handleIncrement = () => (value += 1);
	const handleDecrement = () => (value -= 1);
</script>

<Box.Root
	class={[
		'flex h-16 items-center justify-between ps-5 pe-3 transition-opacity',
		isDisabled && 'pointer-events-none opacity-50'
	]}
>
	<Box.Visuals class="bg-background-tertiary" hasBlur={false} />
	{@render children()}
	<div class="relative">
		<div class="flex gap-1.5 ps-1.5">
			<Button
				isCircle
				variant="neutral"
				isActive={false}
				onClick={handleIncrement}
				hasBlur={false}
				isDisabled={value === max}
			>
				<PlusIcon class="size-4" />
			</Button>
			<Button
				isCircle
				variant="neutral"
				isActive={false}
				onClick={handleDecrement}
				hasBlur={false}
				isDisabled={value === min}
			>
				<MinusIcon class="size-4" />
			</Button>
		</div>
		<div class="absolute top-1/2 right-0 translate-x-full -translate-y-1/2">
			<NumberInput class="h-10 w-15 rounded-full text-center" bind:value {max} />
		</div>
	</div>
</Box.Root>
