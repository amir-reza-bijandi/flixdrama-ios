<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { MEDIA_FA } from '$lib/constants/data';
	import Playlists, { type PlaylistsData } from '../../../../../_lib/components/playlists.svelte';
	import { Post } from '../../../../../_lib/components/post';
	import { generateRandomNumber } from '../../../../../_lib/utilities/comment';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';

	const PLAYLISTS_DATA: PlaylistsData = Array.from({ length: 8 }).map((_, index) => ({
		href: resolve(`/fa/playlist/[id]`, {
			id: String(index + 1)
		}),
		images: Array.from({ length: 4 }).map(
			() => MEDIA_FA[generateRandomNumber(MEDIA_FA.length)].poster
		),
		title: 'عنوان لیست پخش',
		subtitle: 'نام کاربری'
	}));
</script>

<Post.Group spacing={16}>
	<Post.Section heading="پیشنمایش‌ها">
		<Swiper.Root>
			<Swiper.Wrapper>
				{#each { length: 6 }, index}
					<Swiper.Slide>
						<PostCard
							class="w-48"
							title="قسمت {toFarsi(index + 1)}"
							href={resolve(`/fa/preview/[id]`, {
								id: String(index + 1)
							})}
							image={asset(`/image/preview/${index + 1}.png`)}
							aspectRatio="video"
							comments={generateRandomNumber(100)}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Post.Section>
	<Post.Section heading="موسیقی متن">
		<Swiper.Root>
			<Swiper.Wrapper>
				{#each { length: 3 }, index}
					<Swiper.Slide>
						<PostCard
							class="w-44"
							title="عنوان آلبوم"
							href={resolve(`/fa/soundtrack/[id]`, {
								id: String(index + 1)
							})}
							image={asset(`/image/album/${13 + index}.png`)}
							aspectRatio="square"
							likes={generateRandomNumber(100)}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Post.Section>
	<Post.Section heading="اخبار">
		<Swiper.Root>
			<Swiper.Wrapper>
				{#each { length: 4 }, index}
					<Swiper.Slide>
						<PostCard
							class="w-64"
							title="لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از"
							href={resolve(`/fa/news/[id]`, {
								id: String(index + 1)
							})}
							image={asset(`/image/news/${index + 1}.png`)}
							aspectRatio="video"
							textAlignment="right"
							date={new Date()}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Post.Section>
	<Post.Section heading="لیست‌های پخش">
		<Playlists data={PLAYLISTS_DATA} />
	</Post.Section>
</Post.Group>
