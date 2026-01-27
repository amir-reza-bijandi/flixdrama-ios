<script module>
	type Context = {
		id: symbol;
	};
	const [get, set] = createContext<Context>();
	export { get as getDrawerGroupContext };
</script>

<script lang="ts">
	import { Box } from '$lib/components/box';
	import { createContext, type Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		showDivider?: boolean;
	};
	const { children, showDivider = true }: Props = $props();

	const context: Context = {
		id: Symbol()
	};
	set(context);
</script>

<Box.Root class="flex flex-col">
	<Box.Visuals class="rounded-3xl bg-background-tertiary" hasBlur={false} />
	<div class={['divide-y', showDivider ? 'divide-stroke-primary' : 'divide-transparent']}>
		{@render children?.()}
	</div>
</Box.Root>
