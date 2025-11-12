<script lang="ts">
	type Props = {
		data: string[];
	};
	const { data }: Props = $props();
</script>

<div class="mt-3 flex items-center gap-1">
	{#each data as genre}
		<button
			class="inline-block translate-y-px rounded-full bg-background-secondary p-2 text-sm leading-none outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
		>
			<span class="inline-block translate-y-px">{genre}</span>
		</button>
	{/each}
</div>
