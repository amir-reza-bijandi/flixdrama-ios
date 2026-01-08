<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { MEDIA_FA } from '$lib/constants/data';
	import { toLocaleDateString } from '$lib/utilities/date';
	import { CakeIcon, CalendarIcon, FilmIcon, PlusIcon } from '@lucide/svelte';
	import Comment from '../../_lib/components/comment.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import { Post, type PostInfoData } from '../../_lib/components/post';
	import { HASH } from '../../_lib/constants/hash';
	import { generateMockComment, generateRandomNumber } from '../../_lib/utilities/comment';
	import { toFarsi } from '../../_lib/utilities/to-farsi';

	const IMAGE = asset('/image/personnel/1.webp');
	const SWIPER_OFFSET = 20;
	const POST_INFO_DATA = [
		{
			label: toLocaleDateString(new Date()),
			icon: CakeIcon
		},
		{
			label: '۵۲ ساله',
			icon: CalendarIcon
		},
		{
			label: '۵۹ فیلم و سریال',
			icon: FilmIcon
		}
	] as const satisfies PostInfoData;
	const comments = Array.from({ length: generateRandomNumber(20) }).map(() =>
		generateMockComment()
	);
</script>

<PageWrapper background={IMAGE} hasBottomPadding>
	<Post.Root>
		<div class="mb-4 flex flex-col items-center">
			<Image
				class="mb-4 aspect-2/3 h-auto w-40 rounded-2xl"
				src={IMAGE}
				hasLoadingGlow
				hasOutline
			/>
			<Post.Heading class="mb-2">لی جونگ جائه</Post.Heading>
			<Post.Info data={POST_INFO_DATA} />
		</div>
		<Post.Expandable>
			لی جونگ جائه (이정재) یک بازیگر اهل کره جنوبی است. او که در ۱۵ دسامبر ۱۹۷۲ به دنیا آمد، در سال
			۱۹۹۳ فعالیت خود را با مدلینگ آغاز کرد، پیش از آنکه اولین نقش‌های بازیگری خود را در فیلم مرد
			جوان (The Young Man) در سال ۱۹۹۴ و سریال‌های تلویزیونی احساسات (Feelings) در سال ۱۹۹۴ و ساعت
			شنی (Sandglass) در سال ۱۹۹۵ به دست آورد.
		</Post.Expandable>
		<Swiper.Root class="mt-10 mb-6" offset={SWIPER_OFFSET}>
			<Swiper.Wrapper>
				{#each MEDIA_FA as { id, poster, titleFa, score }}
					<Swiper.Slide>
						<PostCard
							href={resolve('/fa/media/[id]', {
								id: String(id)
							})}
							image={poster}
							subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
							title={titleFa}
							{score}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
		<Button as="a" href={HASH.NEW_COMMENT} variant="tertiary" icon={PlusIcon}>دیدگاه جدید</Button>
		<div class="mt-3 space-y-3">
			{#each comments as comment}
				<Comment data={comment} />
			{/each}
		</div>
	</Post.Root>
</PageWrapper>
