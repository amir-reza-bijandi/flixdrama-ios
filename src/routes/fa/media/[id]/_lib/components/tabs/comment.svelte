<script lang="ts">
	import Button from '$lib/components/button.svelte';

	import { ReplyIcon, TextQuoteIcon } from '@lucide/svelte';
	import { Feedback } from '../../../../../_lib/components/feedback';
	import type { CommentData } from '../../../../../_lib/types/feedback';
	import { formatCount } from '../../../../../_lib/utilities/format-count';
	import Comment from './comment.svelte';

	type Props = {
		data: CommentData;
		isReply?: boolean;
	};
	const { data, isReply = false }: Props = $props();

	let areReplysVisible = $state(false);

	const handleToggleReplys = () => (areReplysVisible = !areReplysVisible);
</script>

<Feedback.Root id={data.id} hasVisuals={!isReply}>
	<Feedback.Container>
		<Feedback.UserHeader {...data.user} date={data.date} />
		<Feedback.Body isSpoiler={data.isSpoiler}>
			{#if data.recipient}
				<Feedback.Recipient data={data.recipient} />
			{/if}
			{data.body}
		</Feedback.Body>
		<Feedback.Footer>
			<Feedback.Like isLiked={data.isLiked} likeCount={data.likeCount} />
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
