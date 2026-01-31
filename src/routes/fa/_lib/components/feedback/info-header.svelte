<script lang="ts">
	import { asset } from '$app/paths';
	import Button from '$lib/components/button.svelte';
	import Separator from '$lib/components/separator.svelte';
	import { MoveUpLeftIcon } from '@lucide/svelte';
	import PostInfo from '../../../../_lib/components/post-info.svelte';
	import Score from '../../../../_lib/components/score.svelte';
	import type { CommentInfo } from '../../types/feedback';
	import type { Subscription } from '../../types/user';

	export const SUBSCRIPTION_IMAGE_MAP: Record<Subscription, string> = {
		dragon: asset('/image/subscription/1.svg'),
		panda: asset('/image/subscription/2.svg'),
		sakura: asset('/image/subscription/3.svg'),
		fox: asset('/image/subscription/4.svg')
	};

	type Props = CommentInfo;
	const { title, subtitle, href, postInfo, score }: Props = $props();
</script>

<div class="relative mb-2">
	<Button class="absolute top-0 left-0" variant="neutral" as="a" {href} isActive={false} isCircle>
		<MoveUpLeftIcon class="size-5" />
	</Button>
	<div class="mb-2 text-xl leading-none font-bold">{title}</div>
	<div class="mb-2.5 text-xs leading-none text-foreground-secondary">{subtitle}</div>
	{#if postInfo}
		<div class="my-3 flex items-center gap-2">
			<PostInfo data={postInfo} />
			{#if score}
				<Separator size={10} variant="primary" />
				<Score value={score} />
			{/if}
		</div>
	{/if}
</div>
