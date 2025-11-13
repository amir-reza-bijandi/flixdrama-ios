<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes;
	const { children, class: ClassValue, ...restOfProps }: Props = $props();
</script>

<button
	class={[
		'flex size-10 items-center justify-center rounded-full bg-background-secondary outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors',
		ClassValue
	]}
	{...restOfProps}
>
	{@render children?.()}
</button>
