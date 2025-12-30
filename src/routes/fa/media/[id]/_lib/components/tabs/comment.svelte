<script module>
	type Data = {
		id: number;
		isLiked: boolean;
		likeCount: number;
		user: User;
		text: string;
		replies: Data[];
		date: Date;
		recipient: FeedbackRecipientData | null;
	};
	export type { Data as CommentData };
</script>

<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { Heart } from '@steeze-ui/heroicons';

	import Toggle from '$lib/components/toggle.svelte';
	import { ReplyIcon, TextQuoteIcon } from '@lucide/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Feedback, type FeedbackRecipientData } from '../../../../../_lib/components/feedback';
	import type { User } from '../../../../../_lib/types/feedback';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';
	import Comment from './comment.svelte';

	function formatCount(count: number) {
		return count === 0 ? '-' : toFarsi(count);
	}

	type Props = {
		data: Data;
		isReply?: boolean;
	};
	const { data, isReply = false }: Props = $props();

	let isLiked = $state(data.isLiked);
	let likes = $state(data.likeCount);
	let areReplysVisible = $state(false);

	const handleToggleLike = () => {
		isLiked = !isLiked;
		if (isLiked) likes++;
		else likes--;
	};
	const handleToggleReplys = () => (areReplysVisible = !areReplysVisible);
</script>

<Feedback.Root id={data.id} hasVisuals={!isReply}>
	<Feedback.Container>
		<Feedback.UserHeader {...data.user} date={data.date} />
		<Feedback.Body>
			{#if data.recipient}
				<Feedback.Recipient data={data.recipient} />
			{/if}
			{data.text}
		</Feedback.Body>
		<Feedback.Footer>
			<Button
				class="w-fit"
				label={formatCount(likes)}
				isActive={isLiked}
				variant="danger"
				onClick={handleToggleLike}
				hasBlur={false}
			>
				<Toggle isActive={isLiked} speed="normal" mustRotate={false}>
					{#snippet active()}
						<Icon class="size-5" src={Heart} theme="mini" />
					{/snippet}
					{#snippet inactive()}
						<Icon class="size-5" src={Heart} />
					{/snippet}
				</Toggle>
			</Button>
			<Feedback.Group>
				<Button
					isCircle={!isReply}
					isActive={false}
					variant="secondary"
					icon={ReplyIcon}
					hasBlur={false}
				>
					{#if isReply}
						پاسخ دادن
					{/if}
				</Button>
				{#if !isReply}
					<Button
						isActive={areReplysVisible}
						variant="primary"
						icon={TextQuoteIcon}
						onClick={handleToggleReplys}
						hasBlur={false}
						isDisabled={!data.replies.length}
					>
						پاسخ‌ها ({formatCount(data.replies.length)})
					</Button>
				{/if}
			</Feedback.Group>
		</Feedback.Footer>
	</Feedback.Container>
	{#if !isReply}
		<Feedback.Expandable isActive={areReplysVisible}>
			{#each data.replies as replyData}
				<Comment data={replyData} isReply />
			{/each}
		</Feedback.Expandable>
	{/if}
</Feedback.Root>
