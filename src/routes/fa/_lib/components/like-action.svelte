<script module>
	type ToggleHandler = (isLiked: boolean) => void;
	export type { ToggleHandler as LikeActionToggleHandler };
</script>

<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { Heart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Props = {
		isLiked: boolean;
		onToggle: ToggleHandler;
	};
	const { isLiked, onToggle }: Props = $props();

	let isActive = $state(isLiked);

	const handleClick = () => {
		isActive = !isActive;
		onToggle(isActive);
	};
</script>

<Button isCircle onClick={handleClick} variant="danger" {isActive}>
	<Toggle {isActive}>
		{#snippet active()}
			<Icon class="size-5" src={Heart} theme="solid" />
		{/snippet}
		{#snippet inactive()}
			<Icon class="size-5" src={Heart} theme="outline" />
		{/snippet}
	</Toggle>
</Button>
