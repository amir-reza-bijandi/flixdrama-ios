<script module>
	type Options = ReadonlyArray<{
		label: string;
		value: unknown;
	}>;
	type SingleSelectOptionsValue<T extends Options> = T[number]['value'];
	export type { Options as SingleSelectOptions, SingleSelectOptionsValue };
</script>

<script lang="ts" generics="T extends Options">
	import Group from './group.svelte';
	import Radio, { type RadioSelectEventHandler } from './radio.svelte';

	type Props = {
		options: T;
		value: SingleSelectOptionsValue<T>;
	};
	let { options, value: currentValue = $bindable() }: Props = $props();

	const handleSelect: RadioSelectEventHandler = (value) => (currentValue = value);
</script>

<Group>
	{#each options as { value, label }}
		<Radio {value} isActive={value === currentValue} onSelect={handleSelect}>{label}</Radio>
	{/each}
</Group>
