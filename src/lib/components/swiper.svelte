<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PointerEventHandler } from 'svelte/elements';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	let isSwiping = $state(false);
	let swiperElm = $state<HTMLElement | null>(null);

	let isPointerDown = false;
	let initialClientX = 0;
	let initialScrollLeft = 0;
	const handlePointerDown: PointerEventHandler<HTMLElement> = ({ clientX }) => {
		isPointerDown = true;
		initialClientX = clientX;
		initialScrollLeft = swiperElm?.scrollLeft ?? 0;

		document.body.addEventListener('pointermove', handlePointerMove);
		document.body.addEventListener('pointerleave', handlePointerUpOrLeave);
		document.body.addEventListener('pointerup', handlePointerUpOrLeave);
	};
	const handlePointerMove = ({ clientX: currentClientX }: PointerEvent) => {
		if (swiperElm && isPointerDown) {
			isSwiping = true;
			swiperElm.scrollLeft = initialScrollLeft + (currentClientX - initialClientX) * -1;
		}
	};
	const handlePointerUpOrLeave = () => {
		isSwiping = false;
		isPointerDown = false;
		document.body.removeEventListener('pointermove', handlePointerMove);
		document.body.removeEventListener('pointerleave', handlePointerUpOrLeave);
		document.body.removeEventListener('pointerup', handlePointerUpOrLeave);
	};
</script>

<div
	class={['scrollbar-hidden touch-pan-y overflow-x-auto', isSwiping && 'pointer-events-none']}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	bind:this={swiperElm}
>
	{@render children()}
</div>
