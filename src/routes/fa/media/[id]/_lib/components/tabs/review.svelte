<script lang="ts">
	import type { Asset } from '$app/types';
	import Button from '$lib/components/button.svelte';
	import { PencilIcon, ReplyIcon, TextQuoteIcon } from '@lucide/svelte';
	import Comment from '../../../../../_lib/components/comment.svelte';
	import { Feedback } from '../../../../../_lib/components/feedback';
	import Ratings from '../../../../../_lib/components/ratings.svelte';
	import { HASH } from '../../../../../_lib/constants/hash';
	import type { CommentInfo, CommentUser, ReviewData } from '../../../../../_lib/types/feedback';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';

	function formatCount(count: number) {
		return count === 0 ? '-' : toFarsi(count);
	}

	type DefaultProps = {
		type?: 'default';
		data: ReviewData<CommentUser>;
	};
	type ProfileProps = {
		type: 'profile';
		data: ReviewData<CommentInfo>;
	};
	type Props = (DefaultProps | ProfileProps) & {
		isEditable?: boolean;
		image?: Asset | Asset[];
	};
	const { data, type = 'default', image, isEditable }: Props = $props();

	let areReplysVisible = $state(false);

	const handleToggleReplys = () => (areReplysVisible = !areReplysVisible);
</script>

<Feedback.Root id={data.id} {image}>
	<Feedback.Container class={type !== 'default' && 'p-5'}>
		{#if type === 'default'}
			<Feedback.UserHeader {...data.data as CommentUser} date={data.date} />
		{:else if type === 'profile'}
			<Feedback.InfoHeader {...data.data as CommentInfo} />
		{/if}
		<Feedback.Body isSpoiler={data.isSpoiler}>
			<Feedback.Heading>{data.heading}</Feedback.Heading>
			{data.body}
		</Feedback.Body>
		<Ratings value={data.ratings} layout="compact" />
		<Feedback.Footer>
			<Feedback.Like isLiked={data.isLiked} likeCount={data.likeCount} />
			<Feedback.Group>
				{#if isEditable}
					<Button
						as="a"
						href={HASH.NEW_COMMENT}
						isCircle={true}
						isActive={false}
						variant="tertiary"
						icon={PencilIcon}
						hasBlur={false}
					/>
				{/if}
				<Button
					as="a"
					href={HASH.NEW_COMMENT}
					isCircle
					isActive={false}
					variant="secondary"
					icon={ReplyIcon}
					hasBlur={false}
				/>
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
