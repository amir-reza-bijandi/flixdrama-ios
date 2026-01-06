<script lang="ts">
	import { page } from '$app/state';
	import { Box } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import Separator from '$lib/components/separator.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import {
		COUNTRY_LABEL_MAP_FA,
		MEDIA_FA,
		TYPE_ICON_MAP,
		TYPE_LABEL_MAP_FA
	} from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, GlobeIcon, ListPlusIcon, ListVideoIcon } from '@lucide/svelte';
	import { VideoCamera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBellCheck, IconBellPlus } from '@tabler/icons-svelte';
	import type { Component } from 'svelte';
	import Button from '../../../../lib/components/button.svelte';
	import Score from '../../../_lib/components/score.svelte';
	import { backgroundStore } from '../../../_lib/store/background-store.svelte';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import { Post, type PostInfoData } from '../../_lib/components/post';
	import type { LikeToggleEventHandler } from '../../_lib/components/post/like.svelte';
	import { HASH } from '../../_lib/constants/hash';
	import { sizeStore } from '../../_lib/store/size-store.svelte';
	import { toFarsi } from '../../_lib/utilities/to-farsi';
	import AddToListDrawer from './_lib/components/add-to-list-drawer.svelte';
	import NewCommentDrawer from './_lib/components/new-comment-drawer.svelte';
	import NewPlaylistDrawer from './_lib/components/new-playlist-drawer.svelte';
	import NewReviewDrawer from './_lib/components/new-review-drawer.svelte';
	import BackstageTab from './_lib/components/tabs/backstage-tab.svelte';
	import CommentsTab from './_lib/components/tabs/comments-tab.svelte';
	import InfoTab from './_lib/components/tabs/info-tab.svelte';
	import ReviewsTab from './_lib/components/tabs/reviews-tab.svelte';

	const SELECT_OPTIONS = [
		{
			label: 'مشخصات',
			value: 'info'
		},
		{
			label: 'دیدگاه‌ها',
			value: 'comments'
		},
		{
			label: 'نقدها',
			value: 'reviews'
		},
		{
			label: 'پشت صحنه',
			value: 'backstage'
		}
	] as const satisfies Option[];
	const OPTION_TAB_MAP: Record<OptionsValue<typeof SELECT_OPTIONS>, Component> = {
		info: InfoTab,
		comments: CommentsTab,
		reviews: ReviewsTab,
		backstage: BackstageTab
	};
	const { titleFa, titleEn, backdrop, type, country, year, genres, score } =
		MEDIA_FA.find(({ id }) => Number(page.params.id) === id) ?? MEDIA_FA[0];

	let currentTab = $state<OptionsValue<typeof SELECT_OPTIONS>>('info');
	let isLiked = $state(false);
	let isNotificationsActive = $state(false);
	const postInfoData = $derived<PostInfoData>([
		{
			icon: TYPE_ICON_MAP[type],
			label: TYPE_LABEL_MAP_FA[type]
		},
		{
			icon: GlobeIcon,
			label: COUNTRY_LABEL_MAP_FA[country]
		},
		{
			icon: CalendarIcon,
			label: toFarsi(year, {
				useGrouping: false
			})
		}
	]);
	const Tab = $derived(OPTION_TAB_MAP[currentTab]);

	$effect(() => {
		backgroundStore.current = backdrop;
	});

	const handleLikeToggle: LikeToggleEventHandler = (isActive) => (isLiked = isActive);
	const handleNotificationsToggle = () => (isNotificationsActive = !isNotificationsActive);
</script>

<PageWrapper showBackButton>
	{#snippet actions()}
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
	{/snippet}
	<Backdrop image={backdrop}>
		<div class="h-full w-full transition-colors">
			<Pressable.Root class="h-full w-full">
				<Pressable.Content class="flex flex-col items-center justify-center gap-1.5">
					<Icon class="size-9" src={VideoCamera} theme="solid" />
					<div class="font-bold">پیش‌نمایش</div>
				</Pressable.Content>
			</Pressable.Root>
		</div>
	</Backdrop>
	<Box.Root
		--padding-bottom={toRem(sizeStore.navigationHeight)}
		class="box-container relative z-20 mt-49 min-h-screen pb-(--padding-bottom)"
	>
		<Box.Visuals class="bg-background-tertiary" roundedSide="top" />
		<Post.Root class="p-6">
			<Post.Like value={673} isActive={isLiked} onToggle={handleLikeToggle} />
			<Post.Heading>{titleFa}</Post.Heading>
			<Post.Subheading>{titleEn}</Post.Subheading>
			<div class="my-3 flex items-center gap-2">
				<Post.Info data={postInfoData} />
				<Separator size={10} variant="primary" />
				<Score value={score} />
			</div>
			<Post.Genres data={genres} />
			<Button icon={ListVideoIcon}>لیست قسمت‌ها</Button>
			<Select options={SELECT_OPTIONS} alignment="center" bind:value={currentTab} />
			<div>
				<Tab />
			</div>
		</Post.Root>
	</Box.Root>
</PageWrapper>
<AddToListDrawer />
<NewPlaylistDrawer />
<NewCommentDrawer />
<NewReviewDrawer />
