<script lang="ts">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';

	type Props = {
		data: string[];
	};
	const { data }: Props = $props();
</script>

<div class="my-3 flex items-center gap-1">
	{#each data as genre}
		<div class="transition-colors">
			<Pressable.Root class="text-sm leading-none">
				<Pressable.Content>
					<Box.Root class="inline-block p-2">
						<Box.Visuals />
						<span class="inline-block translate-y-px">{genre}</span>
					</Box.Root>
				</Pressable.Content>
			</Pressable.Root>
		</div>
	{/each}
</div>
