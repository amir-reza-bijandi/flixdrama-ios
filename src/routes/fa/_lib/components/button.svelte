<script module>
	const getClass = tv({
		base: 'active:scale-scale-95 flex items-center justify-center gap-1.5 rounded-full bg-gradient bg-gradient-primary p-3 text-sm leading-none text-foreground-accent outline -outline-offset-1 outline-stroke-tertiary',
		variants: {
			variant: {
				neutral: 'bg-gradient-neutral/25',
				secondary: 'bg-gradient-secondary',
				tertiary: 'bg-gradient-tertiary',
				success: 'bg-gradient-success',
				danger: 'bg-gradient-danger'
			}
		}
	});
	type Props = VariantProps<typeof getClass> &
		PressableProps & {
			icon: LucideIcon;
			label?: string;
			children?: Snippet;
			'--margin-bottom'?: string;
		};
	export type { Props as ButtonProps };
</script>

<script lang="ts">
	import * as Pressable from '$lib/components/pressable';
	import type { PressableProps } from '$lib/components/pressable/root.svelte';
	import { tv } from '$lib/tv';
	import type { LucideIcon } from '$lib/types/icon';
	import type { Snippet } from 'svelte';
	import { cn, type VariantProps } from 'tailwind-variants';

	const {
		icon: Icon,
		children,
		variant,
		label,
		class: extraClass,
		...restOfProps
	}: Props = $props();
</script>

<Pressable.Root class={cn('mb-(--margin-bottom) w-full', extraClass)} {...restOfProps}>
	<Pressable.Content class={getClass({ variant })}>
		<Icon class="size-4" />
		{label}
		{@render children?.()}
	</Pressable.Content>
</Pressable.Root>
