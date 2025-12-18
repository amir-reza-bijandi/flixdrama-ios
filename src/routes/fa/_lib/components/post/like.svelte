<script module>
	export type LikeToggleEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import type { LucideIcon } from '$lib/types/icon';
	import { toRem } from '$lib/utilities/general';
	import { CheckIcon, PlusIcon } from '@lucide/svelte';
	import { Heart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { backOut } from 'svelte/easing';
	import { toFarsi } from '../../utilities/to-farsi';

	function rotate(node: HTMLElement) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: 0,
			duration: 750,
			easing: backOut,
			css: (t: number) => `transform: ${existingTransform} scale(${t}) rotate(${t * 360}deg)`
		};
	}

	type Props = {
		value: number;
		isActive: boolean;
		onToggle: LikeToggleEventHandler;
	};
	const { value, isActive, onToggle }: Props = $props();

	let iconSize = $state(0);

	const handleClick = () => {
		onToggle(!isActive);
	};
</script>

<div class="absolute -top-6 left-6 isolate active-bounce">
	<button
		class={[
			'flex flex-col items-center gap-2 overflow-hidden rounded-full bg-background-tertiary p-1.5 pb-3 outline -outline-offset-1 backdrop-blur-2xl transition-colors duration-250 before:absolute before:inset-0 before:-z-10 before:bg-gradient-danger before:transition-opacity',
			isActive
				? 'outline-stroke-tertiary before:opacity-100'
				: 'outline-stroke-primary before:opacity-0'
		]}
		onclick={handleClick}
	>
		<div
			style:--background-image="url({asset('/image/heart-pattern.svg')})"
			class={[
				'be relative isolate overflow-hidden rounded-full bg-danger p-2 duration-250 before:absolute before:inset-0 before:-z-10 before:bg-(image:--background-image) before:transition-[opacity,scale] after:absolute after:inset-0 after:-z-20 after:rounded-full after:bg-foreground-accent after:transition-transform after:duration-250',
				isActive
					? 'before:scale-100 before:opacity-100 after:scale-100'
					: 'before:scale-150 before:opacity-0 after:scale-0'
			]}
		>
			<Icon
				class={[
					'size-5 transition-colors duration-250',
					isActive ? 'text-danger' : 'text-foreground-accent'
				]}
				src={Heart}
				theme="mini"
			/>
		</div>
		<div
			class={[
				'flex flex-col items-center gap-0.5 transition-colors',
				isActive && 'text-foreground-accent'
			]}
		>
			<div class="text-xs font-bold">{toFarsi(value)}</div>
			<div style:--size={toRem(iconSize)} class="grid size-(--size) place-items-center">
				{#if isActive}
					{@render icon(CheckIcon)}
				{:else}
					{@render icon(PlusIcon)}
				{/if}
			</div>
		</div>
	</button>
</div>

{#snippet icon(src: LucideIcon)}
	{@const Src = src}
	<div class="absolute" bind:clientWidth={iconSize} transition:rotate>
		<Src class="size-3 stroke-2" />
	</div>
{/snippet}
