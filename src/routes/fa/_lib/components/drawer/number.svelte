<script lang="ts">
	import { Box } from '$lib/components/box';
	import IconButton from '$lib/components/icon-button.svelte';
	import { MinusIcon, PlusIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	const MIN_VALUE = 1;
	const DIGIT_MAP: Record<string, string> = {
		'0': '۰',
		'1': '۱',
		'2': '۲',
		'3': '۳',
		'4': '۴',
		'5': '۵',
		'6': '۶',
		'7': '۷',
		'8': '۸',
		'9': '۹'
	};
	const REVERSE_MAP = Object.fromEntries(Object.entries(DIGIT_MAP).map(([en, fa]) => [fa, en]));

	export function convertDigits(input: string | number | null, target: 'en' | 'fa'): string {
		const str = String(input);
		if (target === 'fa') {
			return str.replace(/[0-9]/g, (d) => DIGIT_MAP[d]);
		} else {
			return str.replace(/[۰-۹]/g, (d) => REVERSE_MAP[d]);
		}
	}
	function validateValue(value: number | null) {
		return value !== null ? Math.max(MIN_VALUE, Math.min(value, max)) : null;
	}

	type Props = {
		value: number | null;
		max: number;
		children: Snippet;
		isDisabled?: boolean;
	};
	let { value: currentEnValue = $bindable(), max, children, isDisabled = true }: Props = $props();

	currentEnValue = validateValue(currentEnValue);
	let currentFaValue = $state(convertDigits(currentEnValue, 'fa'));

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		const value = e.currentTarget.value;
		const numberValue = Number(convertDigits(value, 'en'));
		if (numberValue) {
			currentEnValue = validateValue(numberValue);
			currentFaValue = convertDigits(currentEnValue, 'fa');
		} else {
			currentEnValue = null;
			currentFaValue = '';
		}
	};
	const handleIncrement = () => {
		if (currentEnValue !== null) {
			currentEnValue = validateValue(currentEnValue + 1);
		} else currentEnValue = 1;
		currentFaValue = convertDigits(currentEnValue, 'fa');
	};
	const handleDecrement = () => {
		if (currentEnValue !== null) {
			currentEnValue = validateValue(currentEnValue - 1);
		} else currentEnValue = 1;
		currentFaValue = convertDigits(currentEnValue, 'fa');
	};
</script>

<Box.Root
	class={[
		'flex h-16 items-center justify-between ps-5 pe-3 transition-opacity',
		isDisabled && 'pointer-events-none opacity-50'
	]}
>
	<Box.Visuals class="bg-background-tertiary" blur={false} />
	{@render children()}
	<div class="relative">
		<div class="flex gap-1.5 ps-1.5">
			<IconButton onClick={handleIncrement} blur={false}>
				<PlusIcon class="size-4" />
			</IconButton>
			<IconButton onClick={handleDecrement} blur={false}>
				<MinusIcon class="size-4" />
			</IconButton>
		</div>
		<div class="absolute top-1/2 right-0 translate-x-full -translate-y-1/2">
			<input
				style="direction: ltr;"
				class="h-10 w-15 max-w-full min-w-10 rounded-full border border-stroke-primary bg-background-tertiary px-1.5 text-center outline-2 outline-offset-4 outline-transparent transition-[outline,outline-offset,background-color] duration-250 focus-visible:outline-offset-0 focus-visible:outline-accent-primary-tint"
				type="text"
				autocomplete="off"
				inputmode="numeric"
				bind:value={currentFaValue}
				oninput={handleInput}
			/>
		</div>
	</div>
</Box.Root>
