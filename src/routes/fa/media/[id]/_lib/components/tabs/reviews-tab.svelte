<script lang="ts">
	import { PlusIcon } from '@lucide/svelte';
	import Button from '../../../../../../../lib/components/button.svelte';
	import { HASH } from '../../../../../_lib/constants/hash';
	import { WATCHING_STATUS } from '../../../../../_lib/constants/media';
	import { SUBSCRIPTIONS } from '../../../../../_lib/constants/user';
	import type { ReviewData } from '../../../../../_lib/types/feedback';
	import { AVATAR_COUNT, AVATARS } from '../../constants/comment';
	import { generateMockComment, generateRandomNumber } from '../../utilities/comment';
	import Review from './review.svelte';

	function generateMockReview(): ReviewData {
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
			scores: {
				storyline: generateRandomNumber(5),
				acting: generateRandomNumber(5),
				rewatchability: generateRandomNumber(5),
				soundtracks: generateRandomNumber(5)
			},
			user: {
				displayName: DISPLAY_NAME,
				avatar: AVATARS[generateRandomNumber(AVATAR_COUNT - 1)],
				subscription: SUBSCRIPTIONS[generateRandomNumber(SUBSCRIPTIONS.length - 1)],
				userName: 'username'
			},
			replies: Array.from({ length: generateRandomNumber(10) }).map(() =>
				generateMockComment({
					feedbackId: id,
					displayName: DISPLAY_NAME
				})
			)
		};
	}
	const reviews = Array.from({ length: generateRandomNumber(20) }).map(() => generateMockReview());
</script>

<Button as="a" href={HASH.NEW_REVIEW} variant="tertiary" icon={PlusIcon}>نقد جدید</Button>
<div class="mt-3 space-y-3">
	{#each reviews as review}
		<Review data={review} />
	{/each}
</div>
