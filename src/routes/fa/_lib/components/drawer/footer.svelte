<script module>
	type DataItem = ButtonProps & {
		id: symbol;
	};
	export type Data = DataItem[];
	export type { Data as FooterData, DataItem as FooterDataItem };
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';

	import { TRANSITION } from '$lib/constants/transition';
	import { scale } from 'svelte/transition';
	import type { ButtonProps } from '../button.svelte';
	import Button from '../button.svelte';

	type Props = {
		data: Data;
	};
	const { data }: Props = $props();
</script>

<div class="flex gap-2">
	{#each data as buttonProps (buttonProps.id)}
		<div
			class="flex-1"
			animate:flip={{
				duration: TRANSITION.DURATION
			}}
			transition:scale={{
				duration: TRANSITION.DURATION
			}}
		>
			<Button {...buttonProps} />
		</div>
	{/each}
</div>
