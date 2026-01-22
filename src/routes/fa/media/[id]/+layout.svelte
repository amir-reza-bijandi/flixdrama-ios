<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Pressable } from '$lib/components/pressable';
	import Toggle from '$lib/components/toggle.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import { TRANSITION } from '$lib/constants/transition';
	import { DownloadIcon, EyeIcon, EyeOffIcon, ListPlusIcon } from '@lucide/svelte';
	import { VideoCamera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBellCheck, IconBellPlus } from '@tabler/icons-svelte';
	import { backOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Button from '../../../../lib/components/button.svelte';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import PageHeader from '../../_lib/components/page-header.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import { HASH } from '../../_lib/constants/hash';
	import { formatCount } from '../../_lib/utilities/format-count';

	const FLY_Y = 64;
	const SCALE_START = 0.25;
	const SCALE_DURATION = 350;

	const { children } = $props();

	const { backdrop, titleFa, episodeCount } =
		MEDIA_FA.find(({ id }) => Number(page.params.id) === id) ?? MEDIA_FA[0];

	let isNotificationsActive = $state(false);
	let isEveryEpisodeWatched = $state(false);
	const isEpisodesRoute = $derived(
		page.url.pathname ===
			resolve('/fa/media/[id]/episodes', {
				id: page.params.id ?? ''
			})
	);

	const handleNotificationsToggle = () => (isNotificationsActive = !isNotificationsActive);
	const handleEveryEpisodeWatchedToggle = () => (isEveryEpisodeWatched = !isEveryEpisodeWatched);
</script>

<PageWrapper background={backdrop} showBackButton>
	{#snippet actions()}
		{#if isEpisodesRoute}
			<Button
				isCircle
				onClick={handleEveryEpisodeWatchedToggle}
				variant="secondary"
				isActive={isEveryEpisodeWatched}
			>
				<Toggle isActive={isEveryEpisodeWatched}>
					{#snippet active()}
						<EyeOffIcon class="size-5 stroke-[1.5]" />
					{/snippet}
					{#snippet inactive()}
						<EyeIcon class="size-5 stroke-[1.5]" />
					{/snippet}
				</Toggle>
			</Button>
			<Button isCircle as="a" href={HASH.SELECT_QUALITY} variant="primary" isActive={false}>
				<DownloadIcon class="size-5 stroke-[1.5]" />
			</Button>
		{:else}
			<Button
				isCircle
				onClick={handleNotificationsToggle}
				variant="secondary"
				isActive={isNotificationsActive}
			>
				<Toggle isActive={isNotificationsActive}>
					{#snippet active()}
						<IconBellCheck class="size-5 stroke-[1.5]" />
					{/snippet}
					{#snippet inactive()}
						<IconBellPlus class="size-5 stroke-[1.5]" />
					{/snippet}
				</Toggle>
			</Button>
			<Button isCircle as="a" href={HASH.ADD_TO_LIST} variant="tertiary" isActive={false}>
				<ListPlusIcon class="size-5 stroke-[1.5]" />
			</Button>
		{/if}
	{/snippet}
	<Backdrop image={backdrop}>
		{#key isEpisodesRoute}
			<div
				class="absolute inset-0 grid place-items-center"
				out:scale={{
					duration: SCALE_DURATION,
					start: SCALE_START
				}}
				in:fly={{
					y: FLY_Y,
					duration: TRANSITION.DURATION,
					easing: backOut
				}}
			>
				{#if isEpisodesRoute}
					<PageHeader heading={titleFa} subheading="{formatCount(episodeCount)} قسمت" />
				{:else}
					<div class="h-full w-full transition-colors">
						<Pressable.Root class="h-full w-full">
							<Pressable.Content class="flex flex-col items-center justify-center gap-1.5">
								<Icon class="size-9" src={VideoCamera} theme="solid" />
								<div class="font-bold">پیش‌نمایش</div>
							</Pressable.Content>
						</Pressable.Root>
					</div>
				{/if}
			</div>
		{/key}
	</Backdrop>
	{@render children()}
</PageWrapper>
