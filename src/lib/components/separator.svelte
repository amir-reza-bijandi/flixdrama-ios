<script lang="ts">
	import { tv } from '$lib/tv';
	import { toRem } from '$lib/utilities/general';
	import type { VariantProps } from 'tailwind-variants';

	const getClass = tv({
		base: 'h-(--height) w-px shrink-0 grow-0 transition-colors',
		variants: {
			variant: {
				primary: 'bg-stroke-primary',
				secondary: 'bg-stroke-secondary',
				tertiary: 'bg-stroke-tertiary'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	});

	type Props = VariantProps<typeof getClass> & {
		size: number;
	};
	const { size, variant }: Props = $props();
</script>

<span style:--height={toRem(size)} class={getClass({ variant })}></span>
