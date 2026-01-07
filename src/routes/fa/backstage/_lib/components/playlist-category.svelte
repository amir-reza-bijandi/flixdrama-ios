<script lang="ts">
	import { Box } from '$lib/components/box';
	import Image, { type ImageSrcSet } from '$lib/components/image.svelte';
	import FadingIcon from '../../../../_lib/components/fading-icon.svelte';

	type Props = {
		href: string;
		title: string;
		body: string;
		icon: string;
		image: ImageSrcSet;
	};
	const { href, title, body, icon, image }: Props = $props();
</script>

<a {href}>
	<Box.Root class="relative p-5">
		<Box.Visuals class="rounded-2xl bg-background-tertiary">
			<Image
				class="inset-0 mask-linear-90 mask-linear-from-transparent mask-linear-from-25% mask-linear-to-black/25"
				srcSet={image}
				hasLoadingGlow
			/>
		</Box.Visuals>
		<div class="relative z-10 max-w-66">
			<div class="mb-1 text-sm leading-none font-bold">{title}</div>
			<div class="text-xs leading-normal text-foreground-secondary">{body}</div>
		</div>
		<FadingIcon class="top-1/2 left-5 -translate-y-1/2 mix-blend-overlay" src={icon} size={40} />
	</Box.Root>
</a>
