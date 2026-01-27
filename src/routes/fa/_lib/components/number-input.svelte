<script module>
	type ChangeEvent = {
		value: number;
		isValid: boolean;
	};
	type ChangeEventHandler = (event: ChangeEvent) => void;
	type Props = {
		value?: number;
		max?: number;
		min?: number;
		class?: ClassValue;
		isValid?: boolean;
		onChange?: ChangeEventHandler;
	};
	export type { ChangeEventHandler as NumberInputChangeEventHandler, Props as NumberInputProps };
</script>

<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import { cn, type ClassValue } from 'tailwind-variants';

	const MIN_VALUE = 0;
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
	function convertDigits(input: string | number, target: 'en' | 'fa'): string {
		const string = String(input);
		if (target === 'fa') {
			return string.replace(/[0-9]/g, (d) => DIGIT_MAP[d]);
		} else {
			return string.replace(/[۰-۹]/g, (d) => REVERSE_MAP[d]);
		}
	}
	function isValueValid(value: number) {
		return value === toValidValue(value, min, max);
	}
	function toValidValue(value: number, rangeMin = MIN_VALUE, rangeMax = max) {
		return Math.max(rangeMin, Math.min(value, rangeMax));
	}
	function formatValue(unformatedValue: number) {
		unformatedValue = Math.floor(unformatedValue);
		if (Number.isNaN(unformatedValue)) {
			convertedValue = String(convertDigits(lastValidValue, 'fa'));
		} else {
			lastValidValue = unformatedValue;
			value = toValidValue(unformatedValue);
			convertedValue = convertDigits(value, 'fa');
		}
	}

	let {
		value = $bindable(0),
		isValid = $bindable(true),
		min = MIN_VALUE,
		max = Number.MAX_SAFE_INTEGER,
		class: extraClass,
		onChange
	}: Props = $props();

	let convertedValue = $state(convertDigits(value, 'fa'));

	$effect(() => {
		isValid = isValueValid(value);
		formatValue(value);
	});

	let lastValidValue = value;
	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		const rawValue = e.currentTarget.value;
		const numberValue = Number(convertDigits(rawValue, 'en'));
		formatValue(numberValue);
	};
</script>

<input
	class={cn(
		'border border-stroke-primary bg-background-tertiary outline-2 outline-offset-4 outline-transparent transition-[outline,outline-offset,background-color] duration-250 ltr focus-visible:outline-offset-0',
		isValid ? 'focus-visible:outline-accent-primary-tint' : 'focus-visible:outline-danger-tint',
		extraClass
	)}
	type="text"
	autocomplete="off"
	inputmode="numeric"
	bind:value={convertedValue}
	oninput={handleInput}
	onchange={() => onChange?.({ value, isValid })}
/>
