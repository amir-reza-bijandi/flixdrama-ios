<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Box from '$lib/components/box.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Separator from '$lib/components/separator.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import {
		COUNTRY_LABEL_MAP_FA,
		DATA_FA,
		ROLE_LABEL_MAP,
		TYPE_ICON_MAP,
		TYPE_LABEL_MAP_FA
	} from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, GlobeIcon, ListVideoIcon } from '@lucide/svelte';
	import { VideoCamera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Score from '../../../_lib/components/score.svelte';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import Button from '../../_lib/components/button.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import type { AdditionalInfoData } from '../../_lib/components/post/additional-info.svelte';
	import * as Post from '../../_lib/components/post/index';
	import { sizeStore } from '../../_lib/store/size-store.svelte';
	import { toFarsi } from '../../_lib/utilities/to-farsi';

	const SELECT_OPTIONS = [
		{
			name: 'مشخصات',
			value: 'info'
		},
		{
			name: 'دیدگاه‌ها',
			value: 'comments'
		},
		{
			name: 'نقدها',
			value: 'reviews'
		},
		{
			name: 'پشت صحنه',
			value: 'backstage'
		}
	] as const satisfies Option[];
	const {
		titleFa,
		titleEn,
		backdrop,
		type,
		country,
		year,
		genres,
		score,
		synopsis,
		personnel,
		releaseDate,
		nextEpisodeDate,
		episodeCount,
		rating,
		network
	} = DATA_FA.find(({ id }) => Number(page.params.id) === id) ?? DATA_FA[0];
	const additionalInfoData = [
		{
			label: 'تاریخ پخش / اکران',
			value: releaseDate.toLocaleString('fa-IR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		},
		{
			label: 'شبکه',
			value: network ?? ''
		},
		{
			label: 'تعداد قسمت‌ها',
			value: toFarsi(episodeCount)
		},
		{
			label: 'ردهٔ سنی',
			value: `${toFarsi(rating)}+`
		}
	] as const satisfies AdditionalInfoData;

	const postInfoData = $derived<Post.InfoData>([
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
</script>

<PageWrapper>
	<Backdrop image={backdrop}>
		<div class="h-full w-full transition-colors">
			<button class="flex h-full w-full active-bounce flex-col items-center justify-center gap-1.5">
				<Icon class="size-9" src={VideoCamera} theme="solid" />
				<div class="font-bold">پیش‌نمایش</div>
			</button>
		</div>
	</Backdrop>
	<div
		style:--padding-bottom={toRem(sizeStore.navigationHeight)}
		class="box-container relative z-20 mt-49 min-h-screen pb-(--padding-bottom)"
	>
		<Box
			background="tertiary"
			border={{
				side: 'top',
				color: 'primary'
			}}
			roundness={{
				topLeft: 32,
				topRight: 32,
				bottomLeft: 0,
				bottomRight: 0
			}}
			hasBlur
		/>
		<Post.Root padding={24}>
			<Post.Heading>{titleFa}</Post.Heading>
			<Post.Subheading>{titleEn}</Post.Subheading>
			<div class="my-3 flex items-center gap-2">
				<Post.Info data={postInfoData} />
				<Separator size={10} variant="primary" />
				<Score value={score} />
			</div>
			<Post.Genres data={genres} />
			<Button icon={ListVideoIcon}>لیست قسمت‌ها</Button>
			<Select options={SELECT_OPTIONS} alignment="center" />
			<div>
				<Post.Section heading="خلاصهٔ داستان">
					<Post.Expandable>
						{synopsis}
					</Post.Expandable>
				</Post.Section>
				<Post.Section heading="عوامل" --margin-top={toRem(24)}>
					<Swiper gap={8} padding={24}>
						{#each personnel as { id, name, image, role }}
							<PostCard
								href={resolve(`/fa/actor/[id]`, {
									id: String(id)
								})}
								{image}
								subtitle={role.map((role) => ROLE_LABEL_MAP[role]).join(' / ')}
								title={name}
							/>
						{/each}
					</Swiper>
				</Post.Section>
				<Post.Section heading="اطلاعات تکمیلی" --margin-top={toRem(24)}>
					<Post.AdditionalInfo data={additionalInfoData} />
				</Post.Section>
				{#if nextEpisodeDate}
					<Post.Countdown date={nextEpisodeDate} />
				{/if}
			</div>
		</Post.Root>
	</div>
</PageWrapper>
