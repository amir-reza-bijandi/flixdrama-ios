<script module>
	export type LikeToggleEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import { CheckIcon, PlusIcon } from '@lucide/svelte';
	import { Heart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { toFarsi } from '../../utilities/to-farsi';
	import Toggle from '../toggle.svelte';

	type Props = {
		value: number;
		isActive: boolean;
		onToggle: LikeToggleEventHandler;
	};
	const { value, isActive, onToggle }: Props = $props();

	const handleClick = () => {
		onToggle(!isActive);
	};
</script>

<Pressable.Root class="absolute -top-6 left-6 isolate" onClick={handleClick}>
	<Pressable.Content>
		<Box.Root class="flex flex-col items-center gap-2 p-1.5 pb-3">
			<Box.Visuals
				class={[
					'overflow-hidden bg-transparent bg-gradient bg-gradient-neutral/25 shadow-absolute-content transition-[outline-color,box-shadow] duration-250 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient before:bg-gradient-danger before:transition-opacity before:duration-250',
					isActive
						? 'outline-stroke-tertiary before:opacity-100'
						: 'outline-stroke-primary before:opacity-0'
				]}
			/>
			<div
				style:--background-image="url({asset('/image/heart-pattern.svg')})"
				class={[
					'relative isolate p-2 duration-250 before:absolute before:inset-0 before:-z-20 before:rounded-full before:bg-danger before:transition-[opacity,scale] before:duration-250 after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-foreground-accent after:bg-(image:--background-image) after:transition-transform after:duration-250',
					isActive ? 'animate before:scale-150 before:opacity-0' : 'after:scale-0'
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

				<Toggle {isActive}>
					{#snippet active()}
						<CheckIcon class="size-3 stroke-2" />
					{/snippet}
					{#snippet inactive()}
						<PlusIcon class="size-3 stroke-2" />
					{/snippet}
				</Toggle>
			</div>
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>

<style>
	.animate::after {
		animation: moving-pattern 50s infinite both linear;
	}
	@keyframes moving-pattern {
		0% {
			background-position: 0% 1000%;
		}
		100% {
			background-position: 0% -1000%;
		}
	}
</style>
