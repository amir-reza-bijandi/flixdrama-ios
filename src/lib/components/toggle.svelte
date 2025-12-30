<script lang="ts">
	import { tv } from '$lib/tv';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import type { VariantProps } from 'tailwind-variants';

	const getClass = tv({
		base: 'absolute top-1/2 left-1/2 -translate-1/2 transition-[opacity,scale] ease-overshoot-light',
		variants: {
			isActive: {
				false: 'scale-0 opacity-0'
			},
			mustRotate: {
				true: 'transition-[opacity,scale,rotate]'
			},
			speed: {
				slow: 'duration-1000',
				normal: 'duration-initial'
			}
		},
		compoundVariants: [
			{
				isActive: false,
				mustRotate: true,
				class: '-rotate-360'
			}
		],
		defaultVariants: {
			mustRotate: false,
			speed: 'normal'
		}
	});

	type Props = Omit<VariantProps<typeof getClass>, 'isActive'> & {
		isActive: NonNullable<VariantProps<typeof getClass>['isActive']>;
		active: Snippet;
		inactive: Snippet;
	};
	const { active, inactive, isActive, mustRotate, speed }: Props = $props();

	let contentWidth = $state(0);
	let contentHeight = $state(0);
</script>

<div
	style:--width={toRem(contentWidth)}
	style:--height={toRem(contentHeight)}
	class="relative h-(--height) w-(--width)"
>
	<div
		class={getClass({ isActive: !isActive, mustRotate, speed })}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render inactive()}
	</div>
	<div
		class={getClass({ isActive, mustRotate, speed })}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render active()}
	</div>
</div>
