<script module>
	export type LikeToggleEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { Heart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { formatCount } from '../../utilities/format-count';

	type Props = {
		likeCount: number;
		isLiked: boolean;
		onToggle?: LikeToggleEventHandler;
	};
	let { likeCount = $bindable(), isLiked = $bindable() }: Props = $props();

	const handleToggleLike = () => {
		isLiked = !isLiked;
		if (isLiked) likeCount++;
		else likeCount--;
	};
</script>

<Button
	class="w-fit"
	label={formatCount(likeCount)}
	isActive={isLiked}
	variant="danger"
	onClick={handleToggleLike}
	hasBlur={false}
>
	<Toggle isActive={isLiked} speed="normal" mustRotate={false}>
		{#snippet active()}
			<Icon class="size-5" src={Heart} theme="mini" />
		{/snippet}
		{#snippet inactive()}
			<Icon class="size-5" src={Heart} />
		{/snippet}
	</Toggle>
</Button>
