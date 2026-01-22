<script module>
	type Option<T = unknown> = {
		label: string;
		short?: string;
		badge?: string;
		description?: string;
		value: T;
	};
	type Options<T = unknown> = ReadonlyArray<Option<T>>;
	type SingleSelectOptionsValue<T extends Options> = T[number]['value'];
	export type {
		Option as SingleSelectOption,
		Options as SingleSelectOptions,
		SingleSelectOptionsValue
	};
</script>

<script lang="ts" generics="T extends Options">
	import { Box } from '$lib/components/box';

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
	{#each options as { value, label, short, badge, description }}
		<Radio {value} isActive={value === currentValue} onSelect={handleSelect}>
			<div class="flex items-center gap-2">
				{#if short}
					<Box.Root class="grid size-12 place-items-center text-xs font-bold">
						<Box.Visuals class="bg-background-tertiary" hasBlur={false} />
						{short}
					</Box.Root>
				{/if}
				<div class="grid gap-0.5 text-start">
					<div class="flex items-center gap-1.5">
						<div class="leading-normal font-bold">{label}</div>
						{#if badge}
							<div
								class="rounded-full bg-gradient bg-gradient-success p-1.5 text-2xs leading-none outline -outline-offset-1 outline-stroke-tertiary"
							>
								{badge}
							</div>
						{/if}
					</div>
					{#if description}
						<div class="text-xs leading-none text-foreground-secondary">{description}</div>
					{/if}
				</div>
			</div>
		</Radio>
	{/each}
</Group>
