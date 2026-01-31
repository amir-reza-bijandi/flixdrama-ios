<script lang="ts">
	import { PlusIcon } from '@lucide/svelte';
	import Button from '../../../../../../../lib/components/button.svelte';
	import Comment from '../../../../../_lib/components/comment.svelte';
	import { HASH } from '../../../../../_lib/constants/hash';
	import {
		generateRandomNumber,
		generateUserMockComment
	} from '../../../../../_lib/utilities/comment';

	const comments = Array.from({ length: generateRandomNumber(20) }).map(() =>
		generateUserMockComment()
	);
</script>

<Button as="a" href={HASH.NEW_COMMENT} variant="tertiary" icon={PlusIcon}>دیدگاه جدید</Button>
<div class="mt-3 space-y-3">
	{#each comments as comment}
		<Comment data={comment} />
	{/each}
</div>
