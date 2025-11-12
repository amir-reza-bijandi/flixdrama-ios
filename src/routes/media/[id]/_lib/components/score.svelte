<script lang="ts">
	import { asset } from '$app/paths';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div
	class="absolute -top-6 right-6 rounded-full bg-accent-secondary p-1.5 pb-2 shadow-[0px_0px_2.25rem_--alpha(var(--color-background-primary)/33%)] transition-shadow"
>
	<div class="relative isolate mb-2 overflow-hidden rounded-full bg-foreground-accent p-2">
		<div
			style="background-image: url({asset('/image/star-pattern.svg')});"
			class="absolute inset-0 z-10"
		></div>
		<Icon class="size-5 text-accent-secondary" src={Star} theme="mini" />
	</div>
	<div class="text-center">
		<div class="text-sm leading-none font-bold">{@render children()}</div>
		<div class="text-[0.625rem] leading-none">Score</div>
	</div>
</div>
