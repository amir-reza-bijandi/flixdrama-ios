<script module>
	type Props = {
		label: string;
		icon: LucideIcon;
		showCheckBadge?: boolean;
		isActiveDefault?: boolean;
		children?: Snippet;
	};
	export type { Props as DrawerAccordionProps };

	const areAccordionsActive = $state<SvelteMap<symbol, SvelteMap<symbol, boolean>>>(
		new SvelteMap()
	);
</script>

<script lang="ts">
	import { Pressable } from '$lib/components/pressable';
	import { TRANSITION } from '$lib/constants/transition';
	import type { LucideIcon } from '$lib/types/icon';
	import { CheckIcon, ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { SvelteMap } from 'svelte/reactivity';
	import { scale } from 'svelte/transition';
	import Expandable from '../expandable.svelte';
	import { getDrawerGroupContext } from './group.svelte';

	let { label, icon: Icon, showCheckBadge, isActiveDefault = false, children }: Props = $props();

	const { id: groupId } = getDrawerGroupContext();
	const id = Symbol();
	let currentGroup = areAccordionsActive.get(groupId);
	if (currentGroup) currentGroup.set(id, isActiveDefault);
	else {
		areAccordionsActive.set(groupId, new SvelteMap());
		currentGroup = areAccordionsActive.get(groupId);
		currentGroup!.set(id, isActiveDefault);
	}

	const isActive = $derived(currentGroup?.get(id) ?? isActiveDefault);

	const handleClick = () => {
		if (currentGroup) {
			const isActive = currentGroup.get(id);
			if (!isActive) {
				currentGroup.keys().forEach((key) => currentGroup.set(key, false));
				currentGroup.set(id, true);
			} else currentGroup.set(id, false);
		}
	};
</script>

<div>
	<Pressable.Root
		class={[
			'w-full border-b transition-colors duration-300',
			isActive ? 'border-stroke-primary' : 'border-transparent'
		]}
		onClick={handleClick}
	>
		<Pressable.Content class="relative flex h-14.5 items-center gap-2.5 px-4">
			<div class="flex items-center gap-1.5">
				<Icon class="size-5" />
				{label}
			</div>
			{#if showCheckBadge}
				<span
					transition:scale={{
						duration: TRANSITION.DURATION,
						easing: backOut
					}}
					class="grid size-3.5 place-items-center rounded-full bg-gradient bg-gradient-primary"
				>
					<CheckIcon class="size-2.5 stroke-3" />
				</span>
			{/if}
			<ChevronDown
				class={[
					'absolute left-4 size-4 stroke-[2.5] transition-transform ease-overshoot-light',
					isActive && 'rotate-180'
				]}
			/>
		</Pressable.Content>
	</Pressable.Root>
	<Expandable {isActive}>
		{@render children?.()}
	</Expandable>
</div>
