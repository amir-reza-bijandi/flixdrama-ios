<script lang="ts">
	import Box from '$lib/components/box.svelte';

	type Props = {
		data: string[];
	};
	const { data }: Props = $props();
</script>

<div class="mt-3 flex items-center gap-1">
	{#each data as genre}
		<button
			class="box-container inline-block rounded-full p-2 text-sm leading-none transition-transform duration-750 ease-overshoot-heavy active:scale-90"
		>
			<Box
				background="secondary"
				roundness="full"
				border={{
					color: 'primary',
					side: 'all'
				}}
			/>
			<span class="inline-block translate-y-px">{genre}</span>
		</button>
	{/each}
</div>
