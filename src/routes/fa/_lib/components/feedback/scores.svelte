<script lang="ts">
	import { Box } from '$lib/components/box';
	import { SCORES } from '../../constants/feedback';
	import type { Score, Scores } from '../../types/feedback';

	const SCORE_LABEL_MAP: Record<Score, string> = {
		storyline: 'خط داستانی',
		acting: 'توانایی بازیگر‌ها',
		rewatchability: 'ارزش تماشای دوباره',
		soundtracks: 'موسیقی متن'
	} as const;

	type Props = {
		data: Scores;
	};
	const { data }: Props = $props();
</script>

<Box.Root class="space-y-2">
	<Box.Visuals class="rounded-2xl bg-background-tertiary" hasBlur={false} />
	{#each SCORES as score}
		<div class="flex items-center justify-between">
			<div>{SCORE_LABEL_MAP[score]}</div>
			<div>{data[score]}</div>
		</div>
	{/each}
</Box.Root>
