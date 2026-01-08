<script lang="ts">
	import { Box } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import Toggle from '$lib/components/toggle.svelte';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { RATING_OPTIONS } from '../constants/feedback';
	import type { RatingOption, RatingsValue } from '../types/ratings';

	const SCORE_LABEL_MAP: Record<RatingOption, string> = {
		storyline: 'خط داستانی',
		acting: 'توانایی بازیگر‌ها',
		rewatchability: 'ارزش تماشای دوباره',
		soundtracks: 'موسیقی متن'
	} as const;

	type Props = {
		value: RatingsValue;
		isInteractable?: boolean;
		layout: 'compact' | 'loose';
	};
	const { value = $bindable(), isInteractable = false, layout }: Props = $props();
</script>

<Box.Root
	class={['flex flex-col text-sm leading-none', layout === 'compact' ? 'gap-2 p-3' : 'gap-3 p-4']}
>
	<Box.Visuals
		class={[layout === 'compact' ? 'rounded-2xl' : 'rounded-3xl', 'bg-background-tertiary']}
		hasBlur={false}
	/>
	{#each RATING_OPTIONS as score}
		<div class="flex items-center justify-between">
			<div>{SCORE_LABEL_MAP[score]}</div>
			<div class="flex items-center gap-0.5 ltr">
				{#each { length: 5 }, index}
					<Pressable.Root
						onClick={() => (value[score] = index + 1)}
						class={[!isInteractable && 'pointer-events-none']}
					>
						<Pressable.Content mustBounceOnClick={isInteractable}>
							<Toggle isActive={value[score] >= index + 1}>
								{#snippet active()}
									<Icon
										src={Star}
										class={[
											layout === 'compact' ? 'size-5' : 'size-6',
											'text-accent-secondary-tint'
										]}
										theme="mini"
									/>
								{/snippet}
								{#snippet inactive()}
									<Icon
										src={Star}
										class={[
											layout === 'compact' ? 'size-5' : 'size-6',
											'text-foreground-primary/25'
										]}
										theme="mini"
									/>
								{/snippet}
							</Toggle>
						</Pressable.Content>
					</Pressable.Root>
				{/each}
			</div>
		</div>
	{/each}
</Box.Root>
