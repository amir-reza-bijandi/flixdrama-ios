<script lang="ts">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import { tv } from '$lib/tv';
	import { type VariantProps } from 'tailwind-variants';
	import type { PressableProps } from './pressable/root.svelte';

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

	type Props = VariantProps<typeof getClass> & PressableProps;
	const { children, class: extraClass, variant, isActive, ...restOfProps }: Props = $props();
</script>

<Pressable.Root class={extraClass} {...restOfProps}>
	<Pressable.Content>
		<Box.Root class="flex size-10 items-center justify-center rounded-full">
			<Box.Visuals class={getClass({ variant, isActive })} />
			{@render children?.()}
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>
