<script module>
	type Options = ReadonlyArray<{
		label: string;
		value: unknown;
		isActive: boolean;
	}>;
	type MultiSelectOptionsValues<T extends Options> = T[number]['value'][];
	export type { Options as MultiSelectOptions, MultiSelectOptionsValues };
</script>

<script lang="ts" generics="T extends Options">
	import Group from './group.svelte';

	import type { SwitchSelectEventHandler } from './switch.svelte';
	import Switch from './switch.svelte';

	type Props = {
		options: T;
		values: MultiSelectOptionsValues<T>;
	};
	let { options, values = $bindable() }: Props = $props();

	const handleSelect: SwitchSelectEventHandler = (currentValue, isActive) =>
		(values = isActive
			? [...values, currentValue]
			: values.filter((value) => value !== currentValue));
</script>

<Group>
	{#each options as { value, label }}
		<Switch {value} isActive={values.includes(value)} onSelect={handleSelect}>{label}</Switch>
	{/each}
</Group>
