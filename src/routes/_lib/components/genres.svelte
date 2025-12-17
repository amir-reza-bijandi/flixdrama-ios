<script lang="ts">
	import Box from '$lib/components/box.svelte';

	type Props = {
		data: string[];
	};
	const { data }: Props = $props();
</script>

<div class="my-3 flex items-center gap-1">
	{#each data as genre}
		<div class="transition-colors">
			<button
				class="box-container inline-block active-bounce rounded-full p-2 text-sm leading-none"
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
		</div>
	{/each}
</div>
