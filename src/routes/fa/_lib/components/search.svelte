<script module>
	export type SearchStateChangeEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import { Box } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import { MEDIA_FA } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { HistoryIcon, SearchIcon } from '@lucide/svelte';
	import { sizeStore } from '../store/size-store.svelte';

	const MAX_HISTORY = 4;

	type Props = {
		isActive: boolean;
	};
	const { isActive }: Props = $props();

	let query = $state('');
	let history = $state<string[]>(MEDIA_FA.map(({ titleFa }) => titleFa).slice(0, MAX_HISTORY));
	let historyHeight = $state(0);
	let isOnTop = $state(false);
	const showHistory = $derived(!query && isActive && history.length);
	const reversedHistory = $derived([...history].reverse());
	const height = $derived(sizeStore.SEARCH_INPUT_HEIGHT + (showHistory ? historyHeight : 0));
	const handleTransitionEnd = () => {
		if (!isActive) isOnTop = false;
	};
	const handleTransitionStart = () => {
		if (isActive) isOnTop = true;
	};
</script>

<div
	style:--header-height={toRem(sizeStore.headerHeight)}
	style:--padding-bottom={toRem(sizeStore.navigationHeight)}
	class={[
		'absolute top-0 left-0 scrollbar-hidden w-full pt-(--header-height) pb-(--padding-bottom)',
		isOnTop && 'z-30'
	]}
	bind:clientHeight={sizeStore.searchHeight}
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
				ontransitionstart={handleTransitionStart}
				ontransitionend={handleTransitionEnd}
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
						<Pressable.Root
							class="block w-full text-foreground-secondary transition-colors"
							onClick={() => (query = item)}
						>
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
</div>
