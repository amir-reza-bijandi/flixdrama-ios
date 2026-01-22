<script lang="ts">
	import { asset } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Toggle from '$lib/components/toggle.svelte';
	import { CaptionsIcon, EyeIcon, EyeOffIcon } from '@lucide/svelte';
	import List from '../../../_lib/components/list.svelte';
	import { HASH } from '../../../_lib/constants/hash';
	import SelectQualityDrawer from './_lib/component/select-quality-drawer.svelte';

	type Episode = {
		label: string;
		image: string;
		isSubbed: boolean;
		isWatched: boolean;
	};
	const episodes = $state<Episode[]>(
		Array.from({ length: 6 }, (_, index) => ({
			label: `قسمت ${index + 1}`,
			image: asset(`/image/preview/${index + 1}.png`),
			isSubbed: true,
			isWatched: false
		}))
	);
</script>

<List class="relative z-20 mt-49 px-content-padding">
	{#each episodes as { label, image, isSubbed, isWatched }, index}
		{@const episode = episodes[index]}
		<div class="relative">
			<Pressable.Root class="w-full" as="a" href={HASH.SELECT_QUALITY}>
				<Pressable.Content>
					<Box.Root class="flex items-center gap-3 p-4">
						<Box.Visuals class="rounded-2xl bg-background-tertiary" />
						<Image class="aspect-video h-12 rounded-lg" src={image} hasOutline hasLoadingGlow />
						<div>
							<div class="mb-1 text-right font-bold">{label}</div>
							{#if isSubbed}
								<div class="flex items-center gap-0.75 text-xs text-success-tint">
									<CaptionsIcon class="size-3.5 translate-y-px stroke-[1.75]" />
									زیرنویس فارسی
								</div>
							{/if}
						</div>
					</Box.Root>
					<Button
						class="absolute top-1/2 left-4 -translate-y-1/2"
						isCircle
						onClick={() => (episode.isWatched = !episode.isWatched)}
						variant="secondary"
						isActive={isWatched}
						stopPropagation
					>
						<Toggle isActive={isWatched}>
							{#snippet active()}
								<EyeOffIcon class="size-5 stroke-[1.5]" />
							{/snippet}
							{#snippet inactive()}
								<EyeIcon class="size-5 stroke-[1.5]" />
							{/snippet}
						</Toggle>
					</Button>
				</Pressable.Content>
			</Pressable.Root>
		</div>
	{/each}
</List>
<SelectQualityDrawer />
