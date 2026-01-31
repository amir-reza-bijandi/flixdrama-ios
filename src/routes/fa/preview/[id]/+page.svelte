<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import { toLocaleDateString } from '$lib/utilities/date';
	import { CalendarIcon, HeartIcon, InfoIcon, MessageCircleIcon, PlusIcon } from '@lucide/svelte';
	import { Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import LikeAction, {
		type LikeActionToggleHandler
	} from '../../_lib/components/actions/like-action.svelte';
	import Comment from '../../_lib/components/comment.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import { Post, type PostInfoData } from '../../_lib/components/post';
	import { HASH } from '../../_lib/constants/hash';
	import { generateRandomNumber, generateUserMockComment } from '../../_lib/utilities/comment';

	const IMAGE = asset('/image/preview/1.png');
	const POST_INFO_DATA = [
		{
			label: toLocaleDateString(new Date()),
			icon: CalendarIcon
		},
		{
			label: '۵۲ لایک',
			icon: HeartIcon
		},
		{
			label: '۵۹ دیدگاه',
			icon: MessageCircleIcon
		}
	] as const satisfies PostInfoData;
	const comments = Array.from({ length: generateRandomNumber(20) }).map(() =>
		generateUserMockComment()
	);

	let isLiked = $state(false);

	const handleLikeToggle: LikeActionToggleHandler = (isActive) => (isLiked = isActive);
</script>

<PageWrapper background={IMAGE} hasBottomPadding>
	{#snippet actions()}
		<LikeAction {isLiked} onToggle={handleLikeToggle} />
		<Button
			as="a"
			href={resolve('/fa/media/[id]', {
				id: String(1)
			})}
			icon={InfoIcon}
			variant="tertiary"
			isCircle
			isActive={false}
		/>
	{/snippet}
	<Post.Root class="pb-0">
		<div class="mb-3">
			<div class="relative">
				<Image
					class="mb-4 aspect-video h-auto w-full rounded-2xl"
					src={IMAGE}
					hasLoadingGlow
					hasOutline
				/>
				<Pressable.Root class="absolute inset-0 transition-colors">
					<Pressable.Content class="flex flex-col items-center justify-center gap-1.5">
						<Icon class="size-9" src={Play} theme="solid" />
						<div class="font-bold">تماشا</div>
					</Pressable.Content>
				</Pressable.Root>
			</div>
			<Post.Heading class="mb-2">پیش‌نمایش بازی مرکب</Post.Heading>
			<Post.Info data={POST_INFO_DATA} />
		</div>
		<div class="mb-5 leading-normal">
			لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
			چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
			مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
			درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
			بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
			کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ
			به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
			موجود طراحی اساسا مورد استفاده قرار گیرد.
		</div>
		<Button as="a" href={HASH.NEW_COMMENT} variant="tertiary" icon={PlusIcon}>دیدگاه جدید</Button>
		<div class="mt-3 space-y-3">
			{#each comments as comment}
				<Comment data={comment} />
			{/each}
		</div>
	</Post.Root>
</PageWrapper>
