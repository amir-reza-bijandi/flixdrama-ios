<script lang="ts">
	import { asset } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import { TRANSITION } from '$lib/constants/transition';
	import { toLocaleDateString, toLocaleTimeString } from '$lib/utilities/date';
	import { toRem } from '$lib/utilities/general';
	import { XIcon } from '@lucide/svelte';
	import { backOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import FadingIcon from '../../../_lib/components/fading-icon.svelte';
	import { HASH } from '../constants/hash';
	import { hashStore } from '../store/hash-store.svelte';
	import { sizeStore } from '../store/size-store.svelte';
	import List from './list.svelte';

	const TYPE_ICON_MAP = {
		reply: asset('/image/icon/fade/chat.svg'),
		episode: asset('/image/icon/fade/play.svg'),
		preview: asset('/image/icon/fade/video.svg'),
		news: asset('/image/icon/fade/rss.svg'),
		soundtrack: asset('/image/icon/fade/music.svg'),
		follow: asset('/image/icon/fade/user-plus.svg')
	} as const satisfies Record<NotificationType, ReturnType<typeof asset>>;

	type NotificationType = 'reply' | 'episode' | 'preview' | 'news' | 'soundtrack' | 'follow';
	type Notification = {
		type: NotificationType;
		date: Date;
		heading: string;
		body: string;
		image: string;
	};
	const NOTIFICATIONS: Notification[] = [
		{
			type: 'reply',
			date: new Date(),
			heading: 'پاسخ جدید به نظر شما',
			body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  و با استفاده از  طراحان گرافیک است  چاپگرها و متون بلکه روزنامه و مجله در ستون و  سطرآنچنان که لازم است.',
			image: asset('/image/avatar/1.png')
		},
		{
			type: 'episode',
			date: new Date(),
			heading: 'قسمت جدید',
			body: 'الان می‌تونی قسمت جدید سریال فلان رو از فلکیس‌دراما دریافت کنی.',
			image: asset('/image/backdrop/1.jpg')
		},
		{
			type: 'preview',
			date: new Date(),
			heading: 'پیش‌نمایش جدید',
			body: 'پیش‌نمایش قسمت جدید سریال فلان اضافه شد.',
			image: asset('/image/preview/1.png')
		},
		{
			type: 'news',
			date: new Date(),
			heading: 'خبر جدید',
			body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  و با استفاده از  طراحان گرافیک است  چاپگرها و متون بلکه روزنامه و مجله در ستون و  سطرآنچنان که لازم است.',
			image: asset('/image/news/1.png')
		},
		{
			type: 'soundtrack',
			date: new Date(),
			heading: 'موسیقی متن جدید',
			body: 'موسیقی متن ابتدایی سریال فلان اضافه شد.',
			image: asset('/image/album/1.png')
		},
		{
			type: 'follow',
			date: new Date(),
			heading: 'درخواست دوستی جدید',
			body: 'کاربر زهرا کوچک‌مهر بهت درخواست دوستی داده. قبولی می‌کنی؟',
			image: asset('/image/avatar/2.png')
		}
	];

	const isActive = $derived(hashStore.current === HASH.NOTIFICATIONS);
</script>

{#if isActive}
	<div
		style:--padding-top={toRem(sizeStore.headerHeight)}
		style:--min-height={toRem(window.innerHeight)}
		class="absolute top-0 z-40 min-h-(--min-height) w-full p-content-padding pt-(--padding-top)"
		bind:clientHeight={sizeStore.notificationsHeight}
	>
		{#if NOTIFICATIONS.length}
			<List class="pt-6">
				{#each NOTIFICATIONS as { type, date, heading, body, image }, index}
					<div
						transition:fly|global={{
							duration: TRANSITION.DURATION,
							y: 32,
							delay: isActive ? index * 50 : 0,
							easing: backOut
						}}
					>
						<Pressable.Root class="block w-full">
							<Pressable.Content mustBounceOnClick={type !== 'follow'}>
								<Box.Root class="grid gap-3 p-4">
									<FadingIcon class="top-4 left-4 opacity-50" size={40} src={TYPE_ICON_MAP[type]} />
									<Box.Visuals class="rounded-2xl bg-background-tertiary" hasBlur={false} />
									<div class="grid gap-2">
										<div class="flex items-center gap-2">
											<Pressable.Root stopPropagation={type === 'reply'}>
												<Pressable.Content
													mustBounceOnClick={type === 'reply' || type === 'follow'}
												>
													<Image
														class={[
															'h-10',
															type === 'reply' || type === 'follow' || type === 'soundtrack'
																? 'w-10'
																: 'aspect-video',
															type === 'reply' || type === 'follow' ? 'rounded-full' : 'rounded-lg'
														]}
														src={image}
														hasLoadingGlow
														hasOutline
													/>
												</Pressable.Content>
											</Pressable.Root>
											<div class="grid gap-1.5 text-start">
												<div class="font-bold">{heading}</div>
												<div class="text-xs leading-none text-foreground-secondary">
													{toLocaleDateString(date)} - {toLocaleTimeString(date)}
												</div>
											</div>
										</div>
										<div class="text-start leading-normal">
											{body}
										</div>
									</div>
									{#if type === 'follow'}
										<div class="flex items-center gap-2">
											<Button variant="danger" icon={XIcon}>رد کردن</Button>
											<Button variant="success" icon={XIcon}>قبول کردن</Button>
										</div>
									{/if}
								</Box.Root>
							</Pressable.Content>
						</Pressable.Root>
					</div>
				{/each}
			</List>
		{:else}
			<div
				class="absolute top-1/2 left-1/2 max-w-64 -translate-1/2 text-center"
				in:scale|global={{
					duration: TRANSITION.DURATION,
					easing: backOut
				}}
				out:scale|global={{
					duration: TRANSITION.DURATION
				}}
			>
				<div class="mb-2 text-base leading-none font-bold">اعلانی برای نمایش وجود نداره!</div>
				<div class="text-xs leading-normal text-foreground-secondary">
					برای دریافت اعلان‌ها می‌تونی گزینهٔ زنگوله رو برای فیلم‌ها و سریال‌ها فعال کنی...
				</div>
			</div>
		{/if}
	</div>
{/if}
