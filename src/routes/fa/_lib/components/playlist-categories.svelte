<script lang="ts">
	import type { Asset, ResolvedPathname } from '$app/types';
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import FadingIcon from '../../../_lib/components/fading-icon.svelte';

	type Category = {
		href: ResolvedPathname;
		title: string;
		body: string;
		icon: Asset;
		image: Asset;
	};
	type Props = {
		mediaHref: ResolvedPathname;
		soundtrackHref: ResolvedPathname;
	};
	const { mediaHref, soundtrackHref }: Props = $props();
</script>

{@render category({
	href: mediaHref,
	image: '/image/collage/media.png',
	title: 'فیلم و سریال',
	body: 'مجموعه‌هایی که باید دید: بهترین فیلم‌ها و سریال‌های آسیایی، دسته‌بندی شده و آماده تماشا.',
	icon: '/image/icon/fade/film.svg'
})}
{@render category({
	href: soundtrackHref,
	image: '/image/collage/soundtrack.png',
	title: 'موسیقی متن',
	body: 'آهنگ‌هایی که خاطره شدن: غرق در ملودی‌هایی شو که روح درام‌های مورد علاقه‌ت رو داخل‌شون دارن.',
	icon: '/image/icon/fade/music.svg'
})}

{#snippet category({ href, title, body, icon, image }: Category)}
	<Pressable.Root as="a" {href}>
		<Pressable.Content>
			<Box.Root class="p-5">
				<Box.Visuals class="rounded-2xl bg-background-tertiary">
					<Image
						class="absolute inset-0 mask-linear-90 mask-linear-from-transparent mask-linear-from-25% mask-linear-to-black/25"
						src={image}
						hasLoadingGlow
					/>
				</Box.Visuals>
				<div class="relative z-10 max-w-66">
					<div class="mb-1 font-bold">{title}</div>
					<div class="text-xs leading-normal text-foreground-secondary">{body}</div>
				</div>
				<FadingIcon class="top-1/2 left-5 -translate-y-1/2 opacity-25" src={icon} />
			</Box.Root>
		</Pressable.Content>
	</Pressable.Root>
{/snippet}
