<script lang="ts">
	import { toRem } from '$lib/utilities/general';

	type Props = {
		size: number;
		variant: 'primary' | 'secondary';
	};
	const { size, variant }: Props = $props();
</script>

<span
	style:--height={toRem(size)}
	class={[
		'h-(--height) w-px shrink-0 grow-0',
		variant === 'primary' ? 'bg-stroke-primary' : 'bg-stroke-secondary'
	]}
></span>
