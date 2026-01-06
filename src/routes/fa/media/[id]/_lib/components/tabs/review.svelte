<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { ReplyIcon, TextQuoteIcon } from '@lucide/svelte';
	import { Feedback } from '../../../../../_lib/components/feedback';
	import type { ReviewData } from '../../../../../_lib/types/feedback';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';
	import Comment from './comment.svelte';

	function formatCount(count: number) {
		return count === 0 ? '-' : toFarsi(count);
	}

	type Props = {
		data: ReviewData;
	};
	const { data }: Props = $props();

	let areReplysVisible = $state(false);

	const handleToggleReplys = () => (areReplysVisible = !areReplysVisible);
</script>

<Feedback.Root id={data.id}>
	<Feedback.Container>
		<Feedback.UserHeader {...data.user} date={data.date} />
		<Feedback.Body isSpoiler={data.isSpoiler}>
			<Feedback.Heading>{data.heading}</Feedback.Heading>
			{data.body}
		</Feedback.Body>
		<Feedback.Ratings data={data.ratings} layout="compact" />
		<Feedback.Footer>
			<Feedback.Like isLiked={data.isLiked} likeCount={data.likeCount} />
			<Feedback.Group>
				<Button isCircle isActive={false} variant="secondary" icon={ReplyIcon} hasBlur={false} />
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
			</Feedback.Group>
		</Feedback.Footer>
	</Feedback.Container>
	<Feedback.Expandable isActive={areReplysVisible}>
		{#each data.replies as replyData}
			<Comment data={replyData} isReply />
		{/each}
	</Feedback.Expandable>
</Feedback.Root>
