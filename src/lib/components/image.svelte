<script module>
	type SrcSet = {
		small: string;
		medium: string;
		large: string;
	};
	export type { SrcSet as ImageSrcSet };
</script>

<script lang="ts">
	import { tv } from '$lib/tv';
	import type { EventHandler } from 'svelte/elements';
	import { type ClassValue, type VariantProps } from 'tailwind-variants';

	const getClass = tv({
		base: 'overflow-hidden transition-colors',
		variants: {
			hasOutline: {
				true: 'outline -outline-offset-1'
			},
			hasLoadingGlow: {
				true: 'bg-linear-110 from-background-tertiary from-20% via-background-secondary via-30% to-background-tertiary to-40% bg-size-[400%,200%]'
			}
		}
	});

	type SrcProps = {
		src: string;
	};
	type SrcSetProps = {
		srcSet: SrcSet;
	};
	type Props = VariantProps<typeof getClass> &
		(SrcProps | SrcSetProps) & {
			style?: string;
			class?: ClassValue;
			hasOutline?: boolean;
			hasLoadingGlow?: boolean;
		};
	const {
		hasOutline = false,
		hasLoadingGlow = false,
		style,
		class: extraClass,
		...restOfProps
	}: Props = $props();

	let isLoading = $state(true);
	const handleLoad: EventHandler<Event, Element> = () => {
		isLoading = false;
	};
</script>

<div
	{style}
	class={getClass({
		hasLoadingGlow,
		hasOutline,
		class: [
			hasOutline && (isLoading ? 'outline-stroke-primary' : 'outline-stroke-secondary'),
			isLoading && hasLoadingGlow && 'animate-shine',
			extraClass
		]
	})}
>
	<img
		class={[
			'relative -z-10 size-full object-cover transition-opacity duration-500',
			isLoading && 'opacity-0'
		]}
		{...'src' in restOfProps
			? {
					src: restOfProps.src
				}
			: {
					src: restOfProps.srcSet.small,
					srcset: `${restOfProps.srcSet.small} 1x, ${restOfProps.srcSet.medium} 1.5x, ${restOfProps.srcSet.large} 2x`
				}}
		alt=""
		onload={handleLoad}
		draggable="false"
	/>
</div>

<style>
	.animate-shine {
		animation: shine 4s linear infinite;
	}
	@keyframes shine {
		to {
			background-position-x: -400%;
		}
	}
</style>
