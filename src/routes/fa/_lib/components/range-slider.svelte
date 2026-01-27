<script lang="ts">
	import { Pressable } from '$lib/components/pressable';
	import type { Range } from '$lib/types/general';
	import { toRem } from '$lib/utilities/general';

	const THUMB_SIZE = 20;
	const PADDING = 6;
	const MIN_RANGE_SIZE = THUMB_SIZE + PADDING * 2;
	const RANGE_DIRECTION_MAP: Record<keyof Range, Direction> = {
		min: 'right',
		max: 'left'
	};

	type Props = {
		value?: Range<number>;
		min?: number;
		max?: number;
	};
	let {
		value = $bindable({
			min: 0,
			max: Number.MAX_SAFE_INTEGER
		}),
		min = 0,
		max = Number.MAX_SAFE_INTEGER
	}: Props = $props();

	type Direction = 'left' | 'right';
	type Target = keyof Range;
	type Position = Record<Direction, number>;

	let elm = $state<HTMLElement | null>(null);
	const elmWidth = $derived(elm?.clientWidth ?? 0);
	let rangeWidth = $state(0);

	let currentTarget = $state<Target>('max');
	const oppositeTarget = $derived<Target>(currentTarget === 'max' ? 'min' : 'max');
	const position = $derived.by<Position>(() => {
		const rangeLength = max - min;
		const rangeMin = Math.abs(value.min - min);
		const rangeMax = Math.abs(value.max - max);

		const width = elmWidth - MIN_RANGE_SIZE;
		const right = Math.trunc((rangeMin * width) / rangeLength);
		const left = Math.trunc((rangeMax * width) / rangeLength);
		return {
			right,
			left
		};
	});

	const handlePointerDown = (target: Target) => {
		currentTarget = target;
		document.body.addEventListener('pointermove', handlePointerMove);
		document.body.addEventListener('pointerup', handlePointerUpOrLeave);
		document.body.addEventListener('pointerleave', handlePointerUpOrLeave);
	};
	const handlePointerMove = (e: PointerEvent) => {
		if (!elm) return;

		const { left, width } = elm.getBoundingClientRect();
		const { clientX, movementX } = e;

		const rangeLength = max - min;
		const valueChange = (movementX * rangeLength) / width;

		const currentTargetValue = value[currentTarget];
		const oppositeTargetValue = value[oppositeTarget];

		const updatedCurrentTargetValue = currentTargetValue - valueChange;
		const updatedOppositeTargetValue = oppositeTargetValue - valueChange;

		if (left <= clientX && left + width >= clientX) {
			if (value.min >= value.max) {
				if (
					(currentTarget === 'min' && valueChange < 0) ||
					(currentTarget === 'max' && valueChange > 0)
				)
					if (updatedOppositeTargetValue >= 0) value[oppositeTarget] = updatedCurrentTargetValue;

				if (currentTarget === 'min' && value.max === 0 && movementX < 0) return;
				else if (currentTarget === 'max' && value.min === 0 && movementX > 0) return;
			}
			value[currentTarget] = updatedCurrentTargetValue;
		} else {
			if (rangeLength / 2 > currentTargetValue - min) value[currentTarget] = min;
			else value[currentTarget] = max;
		}

		value = {
			min: Math.max(min, Math.min(value.min, max)),
			max: Math.max(min, Math.min(value.max, max))
		};
	};
	const handlePointerUpOrLeave = () => {
		document.body.removeEventListener('pointermove', handlePointerMove);
		document.body.removeEventListener('pointerup', handlePointerUpOrLeave);
		document.body.removeEventListener('pointerleave', handlePointerUpOrLeave);
	};
</script>

<div
	style:--range-height={toRem(MIN_RANGE_SIZE)}
	style:--padding={toRem(PADDING)}
	style:--thumb-size={toRem(THUMB_SIZE)}
	class="relative isolate h-(--range-height) flex-1 touch-pan-y"
	bind:this={elm}
>
	<div
		style:--left={toRem(position.left)}
		style:--right={toRem(position.right)}
		class="absolute top-1/2 right-(--right) left-(--left) flex h-full min-w-(--range-height) -translate-y-1/2 items-center rounded-full bg-gradient bg-gradient-primary px-(--padding)"
		bind:clientWidth={rangeWidth}
	>
		<Pressable.Root
			class="absolute right-(--padding) block"
			onPointerDown={() => handlePointerDown('min')}
		>
			<Pressable.Content class="size-(--thumb-size) rounded-full bg-foreground-accent"
			></Pressable.Content>
		</Pressable.Root>
		<Pressable.Root
			class="absolute left-(--padding) block"
			onPointerDown={() => handlePointerDown('max')}
		>
			<Pressable.Content class="size-(--thumb-size) rounded-full bg-foreground-accent"
			></Pressable.Content>
		</Pressable.Root>
	</div>
	<div
		class="absolute top-1/2 -z-10 h-1.5 w-full -translate-y-1/2 rounded-full bg-background-secondary"
	></div>
</div>
