import { AVATAR_COUNT, AVATARS } from '../../media/[id]/_lib/constants/comment';
import { SUBSCRIPTIONS } from '../constants/user';
import type { CommentData, CommentUser, Recipient } from '../types/feedback';

export function generateRandomNumber(max: number) {
	return Math.floor(1 + Math.random() * (max - 1));
}
export function generateUserMockComment(recipient?: Recipient): CommentData<CommentUser> {
	const DISPLAY_NAME = 'نام کاربر';
	const id = generateRandomNumber(100_000);
	return {
		id,
		date: new Date(),
		isLiked: generateRandomNumber(10) % 2 === 0 ? true : false,
		likeCount: generateRandomNumber(999),
		recipient: recipient ?? null,
		body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
		isSpoiler: generateRandomNumber(10) % 2 === 0 ? true : false,
		data: {
			displayName: DISPLAY_NAME,
			avatar: AVATARS[generateRandomNumber(AVATAR_COUNT - 1)],
			subscription: SUBSCRIPTIONS[generateRandomNumber(SUBSCRIPTIONS.length - 1)],
			userName: 'username'
		},
		replies: !recipient
			? Array.from({ length: generateRandomNumber(10) }).map(() =>
					generateUserMockComment({
						feedbackId: id,
						displayName: DISPLAY_NAME
					})
				)
			: []
	};
}
