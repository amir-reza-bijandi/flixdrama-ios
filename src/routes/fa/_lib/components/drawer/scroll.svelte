<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import type { UIEventHandler } from 'svelte/elements';
	import { Tween } from 'svelte/motion';

	const DEFAULT_THRESHOLD = 1;
	const FADE_DURATION = 200;

	type Props = {
		children?: Snippet;
		height?: number;
		threshold?: number;
	};
	const { children, height = 100, threshold = DEFAULT_THRESHOLD }: Props = $props();

	const topAlpha = new Tween(1, {
		duration: FADE_DURATION
	});
	const bottomAlpha = new Tween(0, {
		duration: FADE_DURATION
	});

	const handleScroll: UIEventHandler<HTMLElement> = (e) => {
		const target = e.target as HTMLElement;
		if (target.scrollTop <= threshold) topAlpha.target = 1;
		else topAlpha.target = 0;
		if (target.scrollHeight - (target.scrollTop + target.clientHeight) <= threshold)
			bottomAlpha.target = 1;
		else bottomAlpha.target = 0;
	};
</script>

<div
	style:--height={toRem(height)}
	style:--top-alpha={topAlpha.current}
	style:--bottom-alpha={bottomAlpha.current}
	style="mask-image: linear-gradient(to bottom, rgba(0,0,0,var(--top-alpha)), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,var(--bottom-alpha)));"
	class="scrollbar-hidden h-(--height) overflow-y-scroll"
	onscroll={handleScroll}
>
	{@render children?.()}
</div>
