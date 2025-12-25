<script module>
	import { tv } from '$lib/tv';

	const getClass = tv({
		base: 'pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden bg-background-secondary transition-colors',
		variants: {
			roundedSide: {
				all: 'rounded-full outline -outline-offset-1 outline-stroke-primary',
				top: 'rounded-t-4xl before:absolute before:top-0 before:left-0 before:block before:h-8 before:w-full before:rounded-t-4xl before:mask-linear-180 before:mask-linear-from-black before:mask-linear-to-black/0 before:outline before:-outline-offset-1 before:outline-stroke-primary'
			}
		},
		defaultVariants: {
			roundedSide: 'all'
		}
	});

	type Props = VariantProps<typeof getClass> & {
		children?: Snippet;
		class?: ClassValue;
		blur?: boolean;
	};
	export type { Props as VisualProps };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type ClassValue, type VariantProps } from 'tailwind-variants';

	const { children, class: extraClass, blur = true, roundedSide }: Props = $props();
</script>

<div class={getClass({ roundedSide, class: extraClass })}>
	<div
		class={['absolute inset-0 -z-10 backdrop-blur-2xl transition-opacity', !blur && 'opacity-0']}
	>
		{@render children?.()}
	</div>
</div>
