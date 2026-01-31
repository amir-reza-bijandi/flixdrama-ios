<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import type { Option, OptionsValue } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import Comment from '../../_lib/components/comment.svelte';
	import List from '../../_lib/components/list.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import { WATCHING_STATUS } from '../../_lib/constants/media';
	import type { CommentInfo, ReviewData } from '../../_lib/types/feedback';
	import { generateRandomNumber, generateUserMockComment } from '../../_lib/utilities/comment';
	import { generateMediaPostInfo, generatePersonnelPostInfo } from '../../_lib/utilities/post-info';
	import Review from '../../media/[id]/_lib/components/tabs/review.svelte';

	const PRESERVATION_KEY = 'feedback-tab';
	const TABS = [
		{
			label: 'دیدگاه‌ها',
			value: 'comments'
		},
		{
			label: 'نقدها',
			value: 'reviews'
		}
	] as const satisfies Option[];
	type Tab = OptionsValue<typeof TABS>;

	function generateInfoMockReview(): ReviewData<CommentInfo> {
		const DISPLAY_NAME = 'نام کاربر';
		const id = generateRandomNumber(100_000);
		return {
			id,
			date: new Date(),
			isLiked: generateRandomNumber(10) % 2 === 0 ? true : false,
			likeCount: generateRandomNumber(999),
			heading: 'عنوان نقد',
			body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
			isSpoiler: generateRandomNumber(10) % 2 === 0 ? true : false,
			watchingStatus: WATCHING_STATUS[generateRandomNumber(WATCHING_STATUS.length - 1)],
			ratings: {
				storyline: generateRandomNumber(5),
				acting: generateRandomNumber(5),
				rewatchability: generateRandomNumber(5),
				soundtracks: generateRandomNumber(5)
			},
			data: {
				title: media.titleFa,
				subtitle: media.titleEn,
				href: resolve('/fa/media/[id]', {
					id: String(media.id)
				}),
				postInfo: generateMediaPostInfo(media.type, media.country, media.year),
				score: media.score
			},
			replies: Array.from({ length: generateRandomNumber(10) }).map(() =>
				generateUserMockComment({
					feedbackId: id,
					displayName: DISPLAY_NAME
				})
			)
		};
	}

	let currentTab = $state<Tab>('comments');

	const media = MEDIA_FA[0];
	const personnel = media.personnel[0];
</script>

<PageWrapper
	icon={asset('/image/icon/fade/chat.svg')}
	hasBottomPadding
	showBackButton
	hasContentPadding
>
	<Select class="mt-6" options={TABS} bind:value={currentTab} preservationKey={PRESERVATION_KEY} />
	<List>
		{#if currentTab === 'comments'}
			<Comment
				type="profile"
				image={media.backdrop}
				data={{
					id: 1,
					body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
					date: new Date(),
					isLiked: false,
					isSpoiler: false,
					likeCount: generateRandomNumber(100),
					data: {
						title: media.titleFa,
						subtitle: media.titleEn,
						postInfo: generateMediaPostInfo(media.type, media.country, media.year),
						score: media.score,
						href: resolve('/fa/media/[id]', {
							id: String(media.id)
						})
					},
					replies: [],
					recipient: null
				}}
				isEditable={true}
			/>

			<Comment
				type="profile"
				image={MEDIA_FA.slice(0, 4).map(({ poster }) => poster)}
				data={{
					id: 2,
					body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
					date: new Date(),
					isLiked: true,
					isSpoiler: false,
					likeCount: generateRandomNumber(100),
					data: {
						title: 'عنوان لیست پخش',
						subtitle: 'نام کاربری',
						href: resolve('/fa/playlist/media/[id]', {
							id: String(media.id)
						})
					},
					replies: [],
					recipient: null
				}}
				isEditable={true}
			/>

			<Comment
				type="profile"
				data={{
					id: 2,
					body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
					date: new Date(),
					isLiked: true,
					isSpoiler: false,
					likeCount: generateRandomNumber(100),
					data: {
						title: 'لی جونگ جائه',
						subtitle: 'Lee Jung-jae',
						postInfo: generatePersonnelPostInfo(new Date(), 53, 69),
						href: resolve('/fa/personnel/[id]', {
							id: String(personnel.id)
						})
					},
					replies: [],
					recipient: null
				}}
				isEditable={true}
				image={personnel.image}
			/>
		{:else}
			<Review
				type="profile"
				data={generateInfoMockReview()}
				isEditable={true}
				image={media.backdrop}
			/>
		{/if}
	</List>
</PageWrapper>
