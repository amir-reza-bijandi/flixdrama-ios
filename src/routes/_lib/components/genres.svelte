<script lang="ts">
	import * as Box from '$lib/components/box';

	type Props = {
		data: string[];
	};
	const { data }: Props = $props();
</script>

<div class="my-3 flex items-center gap-1">
	{#each data as genre}
		<div class="transition-colors">
			<button class="active-bounce text-sm leading-none">
				<Box.Root class="inline-block p-2">
					<Box.Visuals />
					<span class="inline-block translate-y-px">{genre}</span>
				</Box.Root>
			</button>
		</div>
	{/each}
</div>
