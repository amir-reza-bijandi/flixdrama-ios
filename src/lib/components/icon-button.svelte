<script lang="ts">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import { tv } from '$lib/tv';
	import type { Snippet } from 'svelte';
	import { type ClassValue, type VariantProps } from 'tailwind-variants';

	const getClass = tv({
		base: 'bg-transparent before:absolute before:inset-0 before:-z-20 before:bg-gradient after:absolute after:inset-0 after:-z-10 after:bg-gradient after:transition-opacity',
		variants: {
			variant: {
				neutral: 'before:bg-gradient-neutral/25',
				primary: 'before:bg-gradient-primary/25 after:bg-gradient-primary',
				secondary: 'before:bg-gradient-secondary/25 after:bg-gradient-secondary',
				tertiary: 'before:bg-gradient-tertiary/25 after:bg-gradient-tertiary',
				danger: 'before:bg-gradient-danger/25 after:bg-gradient-danger',
				success: 'before:bg-gradient-success/25 after:bg-gradient-success'
			},
			isActive: {
				false: 'after:opacity-0',
				true: 'outline-stroke-tertiary'
			}
		},
		defaultVariants: {
			variant: 'neutral'
		}
	});

	type Props = VariantProps<typeof getClass> & {
		children: Snippet;
		class?: ClassValue;
		onClick?: () => void;
	};
	const { children, class: extraClass, variant, isActive, onClick }: Props = $props();
</script>

<Pressable.Root class={extraClass} {onClick}>
	<Pressable.Content>
		<Box.Root class="flex size-10 items-center justify-center rounded-full">
			<Box.Visuals class={getClass({ variant, isActive })} />
			{@render children?.()}
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>
