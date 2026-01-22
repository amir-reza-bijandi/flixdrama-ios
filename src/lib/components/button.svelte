<script module>
	const getClass = tv({
		base: 'active:scale-scale-95 isolate flex items-center justify-center gap-1.5 rounded-full bg-transparent bg-gradient before:absolute before:inset-0 before:-z-20 before:bg-gradient after:absolute after:inset-0 after:-z-10 after:bg-gradient after:transition-opacity',
		variants: {
			isActive: {
				false: 'after:opacity-0',
				true: 'outline-stroke-tertiary'
			},
			variant: {
				neutral: 'before:bg-gradient-neutral/25',
				primary: 'before:bg-gradient-primary/25 after:bg-gradient-primary',
				secondary: 'before:bg-gradient-secondary/25 after:bg-gradient-secondary',
				tertiary: 'before:bg-gradient-tertiary/25 after:bg-gradient-tertiary',
				danger: 'before:bg-gradient-danger/25 after:bg-gradient-danger',
				success: 'before:bg-gradient-success/25 after:bg-gradient-success'
			}
		},
		defaultVariants: {
			isActive: true,
			isSquare: false,
			variant: 'primary'
		}
	});
	type Props = VariantProps<typeof getClass> &
		PressableProps &
		Pick<BoxVisualsProps, 'hasBlur'> & {
			icon?: LucideIcon;
			label?: string;
			children?: Snippet;
			isCircle?: boolean;
			isDisabled?: boolean;
		};
	export type { Props as ButtonProps };
</script>

<script lang="ts">
	import { Box, type BoxVisualsProps } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import type { PressableProps } from '$lib/components/pressable/root.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { tv } from '$lib/tv';
	import type { LucideIcon } from '$lib/types/icon';
	import type { DirectionFactor } from '$lib/types/transition';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cn, type VariantProps } from 'tailwind-variants';

	const {
		icon: Icon,
		children,
		variant,
		isActive = true,
		isCircle = false,
		label,
		hasBlur,
		class: extraClass,
		isDisabled = false,
		...restOfProps
	}: Props = $props();

	let labelWidth = $state(0);
	let labelHeight = $state(0);
	let directionFactor = $state<DirectionFactor>(-1);

	const handleClick = () => {
		directionFactor = directionFactor === 1 ? -1 : 1;
		if ('onClick' in restOfProps) restOfProps.onClick?.();
	};
</script>

<Pressable.Root
	class={cn(
		'block h-10 leading-none',
		isCircle ? 'w-10 shrink-0' : 'w-full',
		isActive && 'text-foreground-accent',
		isDisabled && 'pointer-events-none opacity-50',
		extraClass
	)}
	{...restOfProps}
	onClick={handleClick}
>
	<Pressable.Content class="h-full">
		<Box.Root
			class={cn(
				'flex h-full items-center justify-center gap-1.5 rounded-full',
				!isCircle && 'px-3'
			)}
		>
			<Box.Visuals class={getClass({ variant, isActive })} {hasBlur} />
			{#if Icon}
				<Icon class="size-4" />
			{/if}
			{@render children?.()}
			{#if label}
				<div
					style:--width={toRem(labelWidth)}
					style:--height={toRem(labelHeight)}
					class="relative h-(--height) w-(--width)"
				>
					{#key label}
						<div
							in:fly={{
								duration: TRANSITION.DURATION / 2,
								y: labelHeight * directionFactor
							}}
							out:fly={{
								duration: TRANSITION.DURATION / 2,
								y: -labelHeight * directionFactor
							}}
							class="absolute whitespace-nowrap"
							bind:clientHeight={labelHeight}
							bind:clientWidth={labelWidth}
						>
							{label}
						</div>
					{/key}
				</div>
			{/if}
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>
