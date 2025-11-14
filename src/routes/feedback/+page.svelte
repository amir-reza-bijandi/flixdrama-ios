<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
</script>

<div
	style:--padding-bottom={toRem(navigationStore.requiredSpace)}
	class="relative z-10 flex flex-1 flex-col px-5 pt-6 pb-(--padding-bottom)"
>
	<div class="mb-1 text-2xl leading-none font-bold">Feedback</div>
	<div class="text-sm leading-normal">
		Love it or want to change it? We want to hear from you! Share your feedback and let us know how
		we're doing.
	</div>
	<textarea
		class="my-3 flex-1 resize-none rounded-2xl bg-background-tertiary p-4 text-sm outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors duration-300 focus:bg-background-secondary"
		placeholder="Write your feedback here..."
	></textarea>
	<button
		class="w-full rounded-full bg-background-tertiary p-3 text-sm outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors duration-150 active:bg-background-secondary"
	>
		Submit
	</button>
</div>
