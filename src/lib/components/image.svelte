<script lang="ts">
	import type { ClassValue, EventHandler } from 'svelte/elements';

	type Props = {
		style?: string;
		class?: ClassValue;
		width?: number;
		height?: number;
		outline?: boolean;
		loadingGlow?: boolean;
		/** When true, keeps the previous image visible while loading a new one (useful for background images) */
		keepVisibleOnLoad?: boolean;
		src: string;
	};
	const {
		outline = false,
		loadingGlow = false,
		keepVisibleOnLoad = false,
		style,
		class: classValue,
		width,
		height,
		src
	}: Props = $props();

	let isLoading = $state(true);

	// Reset loading state when src changes (only if not keeping visible)
	$effect(() => {
		src; // track src dependency
		if (!keepVisibleOnLoad) {
			isLoading = true;
		}
	});

	const handleLoad: EventHandler<Event, Element> = () => {
		isLoading = false;
	};
</script>

<div
	{style}
	class={[
		'overflow-hidden transition-colors',
		loadingGlow &&
			'bg-linear-110 from-background-tertiary from-20% via-background-secondary via-30% to-background-tertiary to-40% bg-size-[400%,200%]',
		isLoading && loadingGlow && 'animate-shine',
		outline && 'outline -outline-offset-1',
		isLoading && outline && 'outline-stroke-primary',
		!isLoading && outline && 'outline-stroke-secondary',
		classValue
	]}
>
	<img
		class={[
			'size-full object-cover transition-opacity duration-500',
			isLoading && !keepVisibleOnLoad && 'opacity-0'
		]}
		{src}
		alt=""
		onload={handleLoad}
		draggable="false"
		{width}
		{height}
	/>
</div>
