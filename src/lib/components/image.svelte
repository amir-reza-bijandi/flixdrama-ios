<script lang="ts">
	import type { ClassValue, EventHandler } from 'svelte/elements';
	import { cn } from 'tailwind-variants';

	type Props = {
		style?: string;
		class?: ClassValue;
		width?: number;
		height?: number;
		outline?: boolean;
		loadingGlow?: boolean;
		src: string;
	};
	const {
		outline = false,
		loadingGlow = false,
		style,
		class: extraClass,
		width,
		height,
		src
	}: Props = $props();

	let isLoading = $state(true);
	const handleLoad: EventHandler<Event, Element> = () => {
		isLoading = false;
	};
</script>

<div
	{style}
	class={cn([
		'overflow-hidden transition-colors',
		loadingGlow &&
			'bg-linear-110 from-background-tertiary from-20% via-background-secondary via-30% to-background-tertiary to-40% bg-size-[400%,200%]',
		isLoading && loadingGlow && 'animate-shine',
		outline && 'outline -outline-offset-1',
		isLoading && outline && 'outline-stroke-primary',
		!isLoading && outline && 'outline-stroke-secondary',
		extraClass
	])}
>
	<img
		class={['size-full object-cover transition-opacity duration-500', isLoading && 'opacity-0']}
		{src}
		alt=""
		onload={handleLoad}
		draggable="false"
		{width}
		{height}
	/>
</div>
