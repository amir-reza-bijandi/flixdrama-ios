<script module>
	import type { Recipient } from '../../types/feedback';

	const SCROLL_OFFSET = 24;

	type Data = Recipient;
	export type { Data as RecipientData };
</script>

<script lang="ts">
	import { generateFeedbackId } from '../../utilities/generate-feedback-id';

	type Props = {
		data: Data;
	};
	const { data }: Props = $props();

	const handleClick = () => {
		const feedbackElm = document.getElementById(generateFeedbackId(data.feedbackId));
		if (feedbackElm) {
			const { y } = feedbackElm.getBoundingClientRect();
			window.scrollTo({
				top: window.scrollY + y - SCROLL_OFFSET,
				behavior: 'smooth'
			});
		}
	};
</script>

<button
	class="cursor-pointer text-accent-primary-shade dark:text-accent-primary-tint-extra"
	onclick={handleClick}
>
	خطاب به {data.displayName}:
</button>
