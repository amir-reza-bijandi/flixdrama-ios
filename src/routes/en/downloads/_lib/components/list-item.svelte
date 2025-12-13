<script module>
	export type ListItemDeleteHandler = (id: number) => void;
</script>

<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { Snippet } from 'svelte';

	import type { PointerEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type Props = {
		id: number;
		children: Snippet;
		onDelete: ListItemDeleteHandler;
	};
	const { id, children, onDelete }: Props = $props();

	let itemWidth = $state(0);
	let translateX = $state(0);
	let isPointerDown = $state(false);
	const deleteSwipeThreshold = $derived(itemWidth / 3);

	let initialClientX = 0;
	let initialTranslateX = 0;
	const handlePointerDown: PointerEventHandler<HTMLElement> = ({ clientX }) => {
		isPointerDown = true;
		initialClientX = clientX;
		initialTranslateX = translateX;
		document.body.addEventListener('pointermove', handlePointerMove);
		document.body.addEventListener('pointerup', handlePointerUpOrLeave);
		document.body.addEventListener('pointerleave', handlePointerUpOrLeave);
	};
	const handlePointerMove = ({ clientX: currentClientX }: PointerEvent) => {
		if (isPointerDown) {
			let updatedTranslateX = initialTranslateX + (currentClientX - initialClientX);
			if (updatedTranslateX < 0) updatedTranslateX = 0;
			translateX = updatedTranslateX;
		}
	};
	const handlePointerUpOrLeave = () => {
		isPointerDown = false;
		if (translateX > deleteSwipeThreshold) onDelete(id);
		else translateX = 0;
		document.body.removeEventListener('pointermove', handlePointerMove);
		document.body.removeEventListener('pointerup', handlePointerUpOrLeave);
		document.body.removeEventListener('pointerleave', handlePointerUpOrLeave);
	};
</script>

<div
	style:--translate-x={toRem(translateX)}
	class="relative"
	out:fly={{
		x: itemWidth,
		duration: 150
	}}
>
	<div
		class={[
			'absolute top-0 left-0 flex h-full w-(--translate-x) items-center justify-center bg-red-600/25',
			!isPointerDown && 'transition-width duration-150'
		]}
	>
		<div
			style:--width={toRem(itemWidth)}
			class="absolute top-0 -left-(--width) h-full w-(--width) bg-red-600/25"
		></div>
		<div class="absolute inset-0 flex items-center justify-center overflow-hidden">
			<Icon class="size-6 shrink-0" src={Trash} theme="solid" />
		</div>
	</div>
	<div
		class={[
			'translate-x-(--translate-x) touch-pan-y p-4 duration-150 active:bg-background-tertiary',
			isPointerDown ? 'transition-colors' : 'transition-[background-color,translate]'
		]}
		onpointerdown={handlePointerDown}
		bind:clientWidth={itemWidth}
	>
		{@render children()}
	</div>
</div>
