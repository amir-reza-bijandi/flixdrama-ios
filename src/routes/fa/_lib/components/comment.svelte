<script lang="ts">
	import Button from '$lib/components/button.svelte';

	import type { Asset } from '$app/types';
	import { PencilIcon, ReplyIcon, TextQuoteIcon } from '@lucide/svelte';
	import { HASH } from '../constants/hash';
	import type { CommentData, CommentInfo, CommentUser } from '../types/feedback';
	import { formatCount } from '../utilities/format-count';
	import Comment from './comment.svelte';
	import { Feedback } from './feedback';

	type DefaultProps = {
		type?: 'default';
		data: CommentData<CommentUser>;
	};
	type ProfileProps = {
		type: 'profile';
		data: CommentData<CommentInfo>;
	};
	type Props = (DefaultProps | ProfileProps) & {
		isReply?: boolean;
		isEditable?: boolean;
		image?: Asset | Asset[];
	};
	const {
		data,
		isReply = false,
		type = 'default',
		isEditable = type === 'default' ? false : true,
		image
	}: Props = $props();

	let areReplysVisible = $state(false);

	const handleToggleReplys = () => (areReplysVisible = !areReplysVisible);
</script>

<Feedback.Root id={data.id} hasVisuals={!isReply} {image}>
	<Feedback.Container class={type !== 'default' && 'p-5'}>
		{#if type === 'default'}
			<Feedback.UserHeader {...data.data as CommentUser} date={data.date} />
		{:else if type === 'profile'}
			<Feedback.InfoHeader {...data.data as CommentInfo} />
		{/if}
		<Feedback.Body isSpoiler={data.isSpoiler}>
			{#if data.recipient}
				<Feedback.Recipient data={data.recipient} />
			{/if}
			{data.body}
		</Feedback.Body>
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
