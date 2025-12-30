<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { DATA_FA, ROLE_LABEL_MAP } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { Post, type PostAdditionalInfoData } from '../../../../../_lib/components/post';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';

	const SWIPER_OFFSET = 24;
	const SWIPER_SPACE_BETWEEN = 8;

	const { synopsis, personnel, nextEpisodeDate, releaseDate, network, episodeCount, rating } =
		DATA_FA.find(({ id }) => Number(page.params.id) === id) ?? DATA_FA[0];

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
	] as const satisfies PostAdditionalInfoData;
</script>

<Post.Section heading="خلاصهٔ داستان">
	<Post.Expandable>
		{synopsis}
	</Post.Expandable>
</Post.Section>
<Post.Section heading="عوامل" --margin-top={toRem(24)}>
	<Swiper.Root offset={SWIPER_OFFSET} spaceBetween={SWIPER_SPACE_BETWEEN}>
		<Swiper.Wrapper>
			{#each personnel as { id, name, image, role }}
				<Swiper.Slide>
					<PostCard
						href={resolve(`/fa/actor/[id]`, {
							id: String(id)
						})}
						{image}
						subtitle={role.map((role) => ROLE_LABEL_MAP[role]).join(' / ')}
						title={name}
					/>
				</Swiper.Slide>
			{/each}
		</Swiper.Wrapper>
	</Swiper.Root>
</Post.Section>
<Post.Section heading="اطلاعات تکمیلی" --margin-top={toRem(24)}>
	<Post.AdditionalInfo data={additionalInfoData} />
</Post.Section>
{#if nextEpisodeDate}
	<Post.Countdown date={nextEpisodeDate} />
{/if}
