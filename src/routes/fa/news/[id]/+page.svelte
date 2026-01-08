<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { MEDIA_FA } from '$lib/constants/data';
	import { toLocaleDateString } from '$lib/utilities/date';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, MessageCircleIcon, PencilIcon, PlusIcon } from '@lucide/svelte';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import Comment from '../../_lib/components/comment.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import {
		Post,
		type PostInfoData,
		type PostLikeToggleEventHandler
	} from '../../_lib/components/post';
	import { HASH } from '../../_lib/constants/hash';
	import { sizeStore } from '../../_lib/store/size-store.svelte';
	import { generateMockComment, generateRandomNumber } from '../../_lib/utilities/comment';

	const BACKDROP_IMAGE = asset('/image/news/1.png');
	const POST_INFO_DATA: PostInfoData = [
		{
			label: 'بتمیو',
			icon: PencilIcon
		},
		{
			label: toLocaleDateString(new Date()),
			icon: CalendarIcon
		},
		{
			label: '۴۴ دیدگاه',
			icon: MessageCircleIcon
		}
	];
	const comments = Array.from({ length: generateRandomNumber(20) }).map(() =>
		generateMockComment()
	);

	let isLiked = $state(false);
	let likeCount = $state(674);

	const handleLikeToggle: PostLikeToggleEventHandler = (isActive) => {
		if (isActive) likeCount++;
		else likeCount--;
		isLiked = isActive;
	};
</script>

<PageWrapper background={BACKDROP_IMAGE} showBackButton>
	<Backdrop image={BACKDROP_IMAGE} />
	<Box.Root
		--padding-bottom={toRem(sizeStore.navigationHeight)}
		class="box-container relative z-20 mt-49 min-h-screen pb-(--padding-bottom)"
	>
		<Box.Visuals class="bg-background-tertiary" roundedSide="top" />
		<Post.Root class="p-6">
			<Post.Like value={likeCount} isActive={isLiked} onToggle={handleLikeToggle} />
			<Post.Heading class="mb-1.5 max-w-70 text-base leading-[135%]">
				بازگشت «ییم سی وان» و «سئول این آه» به کمدی رمانتیک با درام جدید tvN
			</Post.Heading>
			<Post.Info data={POST_INFO_DATA} />
			<div class="mt-3 mb-4 text-sm leading-normal">
				سئول، کره جنوبی – طرفداران سریال‌های کره‌ای آماده‌ی یک خبر هیجان‌انگیز باشند! پس از سال‌ها
				دوری از ژانر کمدی رمانتیک، بازیگران محبوب، ییم سی وان (Im Siwan) و سئول این آه (Seol In Ah)،
				با درام جدید شبکه‌ی tvN به نام «لحظه‌های شیرین ما» (Our Sweet Moments) به این ژانر باز
				خواهند گشت. بر اساس اعلام رسمی امروز صبح (۱ دسامبر)، این دو ستاره برای ایفای نقش‌های اصلی در
				این سریال ۱۰ قسمتی که قرار است در اوایل سال ۲۰۲۶ پخش شود، قرارداد امضا کرده‌اند. این اولین
				باری است که این دو بازیگر سرشناس روبروی هم قرار می‌گیرند و انتظار می‌رود شیمی منحصر به فرد
				آن‌ها، قلب بینندگان را تسخیر کند.
			</div>
			<Post.Section heading="فیلم و سریال‌های مرتبط">
				<Swiper.Root>
					<Swiper.Wrapper>
						{#each MEDIA_FA as { id, poster, titleFa, score }}
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
			<Post.Section heading="دیدگاه‌ها">
				<Button as="a" href={HASH.NEW_COMMENT} variant="tertiary" icon={PlusIcon}
					>دیدگاه جدید</Button
				>
				<div class="mt-3 space-y-3">
					{#each comments as comment}
						<Comment data={comment} />
					{/each}
				</div>
			</Post.Section>
		</Post.Root>
	</Box.Root>
</PageWrapper>
