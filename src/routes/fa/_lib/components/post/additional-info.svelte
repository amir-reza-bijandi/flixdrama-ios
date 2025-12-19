<script module>
	export type AdditionalInfoData = {
		label: string;
		value: string;
	}[];
</script>

<script lang="ts">
	import Box from '$lib/components/box.svelte';

	type Props = {
		data: AdditionalInfoData;
	};
	const { data }: Props = $props();
</script>

<div class="box-container text-sm leading-none">
	<Box class="rounded-2xl bg-background-tertiary" />
	{#each data as { label, value }, index}
		{#if value}
			<div>
				<div class="grid grid-cols-2 justify-items-center transition-colors">
					<div class="p-4">{label}</div>
					<div class="p-4">{value}</div>
				</div>
				{#if index != data.length - 1}
					<div class="h-px bg-linear-to-r from-transparent via-stroke-primary to-transparent"></div>
				{/if}
			</div>
		{/if}
	{/each}
	<div
		class="absolute top-0 left-1/2 z-10 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-stroke-primary to-transparent"
	></div>
</div>
