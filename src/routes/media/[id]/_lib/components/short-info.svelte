<script module>
	import type { LucideIcon } from '$lib/types/icon';
	export type ShortInfoData = {
		label: string;
		icon: LucideIcon;
	}[];
</script>

<script lang="ts">
	type Props = {
		data: ShortInfoData;
	};
	const { data }: Props = $props();
</script>

<div class="mt-1 flex items-center gap-1.5">
	{#each data as { icon: Icon, label }, index}
		<div class="flex items-center gap-1 text-xs text-foreground-secondary">
			<Icon class="size-3 stroke-1" />
			<div class="translate-y-px">{label}</div>
		</div>
		{#if index < data.length - 1}
			<span class="size-0.5 rounded-full bg-foreground-secondary"></span>
		{/if}
	{/each}
</div>
