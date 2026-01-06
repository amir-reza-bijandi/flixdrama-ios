<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { DATA_FA, ROLE_LABEL_MAP } from '$lib/constants/data';
	import { Post, type PostAdditionalInfoData } from '../../../../../_lib/components/post';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';

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

<Post.Group>
	<Post.Section heading="خلاصهٔ داستان">
		<Post.Expandable>
			{synopsis}
		</Post.Expandable>
	</Post.Section>
	<Post.Section heading="عوامل">
		<Swiper.Root>
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
							aspectRatio="square"
							isFullyRounded
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Post.Section>
	<Post.Section heading="پیشنهادی‌ها">
		<Swiper.Root>
			<Swiper.Wrapper>
				{#each DATA_FA as { id, poster, titleFa, score }}
					<Swiper.Slide>
						<PostCard
							href={resolve('/fa/media/[id]', {
								id: String(id)
							})}
							image={poster}
							title={titleFa}
							{score}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Post.Section>
	<Post.Section heading="اطلاعات تکمیلی">
		<Post.AdditionalInfo data={additionalInfoData} />
		{#if nextEpisodeDate}
			<Post.Countdown date={nextEpisodeDate} />
		{/if}
	</Post.Section>
</Post.Group>
