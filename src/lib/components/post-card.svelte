<script module>
	TimeAgo.addDefaultLocale(fa);
</script>

<script lang="ts">
	import { langStore } from '$lib/store/lang-store.svelte';
	import type { HeroIcon } from '$lib/types/icon';
	import { ChatBubbleLeftRight, Clock, Heart, Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import TimeAgo from 'javascript-time-ago';
	import fa from 'javascript-time-ago/locale/fa';
	import { cn, tv, type ClassValue, type VariantProps } from 'tailwind-variants';
	import { formatCount } from '../../routes/fa/_lib/utilities/format-count';
	import { toFarsi } from '../../routes/fa/_lib/utilities/to-farsi';
	import Image from './image.svelte';

	const getPostCardClass = tv({
		base: 'h-auto w-full',
		variants: {
			aspectRatio: {
				square: 'aspect-square',
				photo: 'aspect-2/3',
				video: 'aspect-video'
			},
			isFullyRounded: {
				true: 'rounded-full',
				false: 'rounded-2xl'
			}
		},
		defaultVariants: {
			aspectRatio: 'photo',
			isFullyRounded: false
		}
	});
	const getBadgeClass = tv({
		base: 'flex items-center gap-0.5 rounded-full bg-gradient p-1 pe-1.5 text-foreground-accent outline -outline-offset-1 outline-stroke-tertiary',
		variants: {
			variant: {
				secondary: 'bg-gradient-secondary',
				tertiary: 'bg-gradient-tertiary',
				danger: 'bg-gradient-danger',
				success: 'bg-gradient-success'
			}
		}
	});

	type Props = VariantProps<typeof getPostCardClass> & {
		href: string;
		image: string;
		title: string;
		subtitle?: string;
		score?: number;
		likes?: number;
		comments?: number;
		date?: Date;
		class?: ClassValue;
		textAlignment?: 'center' | 'right';
	};
	const {
		image: src,
		score,
		likes,
		comments,
		date,
		title,
		subtitle,
		href,
		class: extraClass,
		aspectRatio,
		isFullyRounded,
		textAlignment = 'center'
	}: Props = $props();

	const timeAgo = new TimeAgo('fa-IR');
	const dateInAgoFormat = $derived(date ? timeAgo.format(date) : 'نامشخص');
</script>

<a class={cn('block w-32 shrink-0', extraClass)} {href} draggable="false">
	<div class="relative mb-1.5">
		<div class="relative z-10 overflow-hidden">
			<Image
				class={getPostCardClass({ aspectRatio, isFullyRounded })}
				{src}
				hasOutline
				hasLoadingGlow
			/>
			<div class="absolute start-2 top-2">
				{#if score}
					{@render badge({
						variant: 'secondary',
						icon: Star,
						value:
							langStore.current === 'en' ? score.toFixed(1) : toFarsi(parseFloat(score.toFixed(1)))
					})}
				{/if}
				{#if likes}
					{@render badge({
						variant: 'danger',
						icon: Heart,
						value: formatCount(likes)
					})}
				{/if}
				{#if comments}
					{@render badge({
						variant: 'success',
						icon: ChatBubbleLeftRight,
						value: formatCount(comments)
					})}
				{/if}
				{#if date}
					{@render badge({
						variant: 'tertiary',
						icon: Clock,
						value: dateInAgoFormat
					})}
				{/if}
			</div>
		</div>
		<Image class="absolute -bottom-3 left-6 -z-10 h-16 w-20 opacity-75 blur-xl" {src} />
	</div>
	<div class={['relative z-10 px-2', textAlignment === 'center' ? 'text-center' : 'text-start']}>
		<div
			class={[
				'mb-0.5 line-clamp-2 text-sm leading-normal transition-colors',
				subtitle && 'font-bold'
			]}
		>
			{title}
		</div>
		{#if subtitle}
			<div
				class="line-clamp-1 text-xs leading-none font-medium text-foreground-secondary transition-colors"
			>
				{subtitle}
			</div>
		{/if}
	</div>
</a>

{#snippet badge({
	variant,
	icon,
	value
}: VariantProps<typeof getBadgeClass> & { icon: HeroIcon; value: string | number })}
	<div class={getBadgeClass({ variant })}>
		<Icon class="size-3.5" src={icon} theme="solid" />
		<span class="translate-y-px text-xs leading-none font-bold">
			{value}
		</span>
	</div>
{/snippet}
