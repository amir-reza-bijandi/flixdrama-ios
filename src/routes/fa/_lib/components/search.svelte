<script module>
	export type SearchStateChangeEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import { DATA_FA } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { HistoryIcon, SearchIcon } from '@lucide/svelte';
	import type { EventHandler } from 'svelte/elements';
	import { HASH } from '../constants/hash';
	import { sizeStore } from '../store/size-store.svelte';

	const MAX_HISTORY = 4;

	type Props = {
		onStateChange: SearchStateChangeEventHandler;
	};
	let { onStateChange }: Props = $props();

	let isActive = $state(false);
	let query = $state('');
	let history = $state<string[]>(DATA_FA.map(({ titleFa }) => titleFa).slice(0, MAX_HISTORY));
	let historyHeight = $state(0);
	let inputElm = $state<HTMLInputElement | null>(null);
	const showHistory = $derived(!query && isActive && history.length);
	const reversedHistory = $derived([...history].reverse());
	const height = $derived(sizeStore.SEARCH_INPUT_HEIGHT + (showHistory ? historyHeight : 0));

	const handleHashChange: EventHandler<HashChangeEvent, Window> = (e) => {
		const isNavigatingToSearch = e.newURL.includes(HASH.SEARCH);
		const isNavigatingFromSearch = e.oldURL.includes(HASH.SEARCH);
		if (isNavigatingToSearch || isNavigatingFromSearch) {
			if (isNavigatingToSearch) {
				isActive = true;
				inputElm?.focus();
			}
			if (isNavigatingFromSearch) {
				isActive = false;
				inputElm?.blur();
			}
			onStateChange(isActive);
		}
	};
</script>

<svelte:window onhashchange={handleHashChange} />

<div
	style:--top={toRem(sizeStore.headerHeight)}
	class="absolute top-(--top) left-1/2 z-40 w-full -translate-x-1/2"
>
	<form class="leading-non mt-6 px-content-padding text-sm">
		<Box.Root class="overflow-hidden">
			<Box.Visuals
				class={[
					'transition-[background-color,border-radius] duration-250',
					isActive ? 'bg-background-tertiary' : ' bg-background-secondary',
					showHistory ? 'rounded-2xl' : 'rounded-3xl'
				]}
			/>
			<div
				style:--height={toRem(height)}
				class={[
					'h-(--height) transition-[height]',
					showHistory ? 'ease-overshoot-light' : 'duration-300'
				]}
			>
				<a
					class={[
						'relative block border-b transition-[border-color] duration-250',
						showHistory ? 'border-stroke-primary' : 'border-transparent'
					]}
					href="#search"
				>
					<input
						style:--height={toRem(sizeStore.SEARCH_INPUT_HEIGHT)}
						class="peer h-(--height) w-full p-3 ps-9.5 outline-none not-placeholder-shown:transition-colors placeholder:text-foreground-secondary placeholder:transition-colors placeholder-shown:placeholder:transition-colors"
						name="query"
						type="text"
						autocomplete="off"
						placeholder="اسم فیلم یا سریال مورد نظرت رو وارد کن..."
						bind:value={query}
						bind:this={inputElm}
					/>
					<SearchIcon
						class="absolute start-3 top-1/2 size-5 -translate-y-1/2 transition-colors peer-placeholder-shown:text-foreground-secondary"
					/>
				</a>
				<div
					class={['absolute start-0 w-full transition-opacity', !showHistory && 'opacity-0']}
					bind:clientHeight={historyHeight}
				>
					{#each reversedHistory as item}
						<Pressable.Root class="block w-full text-foreground-secondary transition-colors">
							<Pressable.Content class="flex origin-[center_right] items-center gap-1.5 p-3">
								<HistoryIcon class="size-4" />
								{item}
							</Pressable.Content>
						</Pressable.Root>
					{/each}
				</div>
			</div>
		</Box.Root>
	</form>
	<div></div>
</div>
