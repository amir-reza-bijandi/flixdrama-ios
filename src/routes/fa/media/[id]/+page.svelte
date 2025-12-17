<script lang="ts">
	import { page } from '$app/state';
	import Box from '$lib/components/box.svelte';
	import Separator from '$lib/components/separator.svelte';
	import {
		COUNTRY_LABEL_MAP_FA,
		DATA_FA,
		TYPE_ICON_MAP,
		TYPE_LABEL_MAP_FA
	} from '$lib/constants/data';
	import { Lang } from '$lib/types/general';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, GlobeIcon } from '@lucide/svelte';
	import { VideoCamera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import * as Post from '../../_lib/components/post/index';
	import { sizeStore } from '../../_lib/store/size-store.svelte';
	import { toFarsi } from '../../_lib/utilities/to-farsi';

	const { titleFa, titleEn, backdrop, type, country, year, genres, score } =
		DATA_FA[Number(page.params.id)] ?? DATA_FA[0];
	const postInfoData = $derived<Post.InfoData>([
		{
			icon: TYPE_ICON_MAP[type],
			label: TYPE_LABEL_MAP_FA[type]
		},
		{
			icon: GlobeIcon,
			label: COUNTRY_LABEL_MAP_FA[country]
		},
		{
			icon: CalendarIcon,
			label: toFarsi(year, {
				useGrouping: false
			})
		}
	]);
</script>

<PageWrapper>
	<Backdrop image={backdrop}>
		<button
			class="flex h-full w-full flex-col items-center justify-center gap-1.5 transition-transform duration-750 ease-overshoot-heavy active:scale-90"
		>
			<Icon class="size-9" src={VideoCamera} theme="solid" />
			<div class="font-bold">پیش‌نمایش</div>
		</button>
	</Backdrop>
	<div
		style:--padding-bottom={toRem(sizeStore.navigationHeight)}
		class="box-container relative z-20 mt-49 min-h-screen pb-(--padding-bottom)"
	>
		<Box
			background="tertiary"
			border={{
				side: 'top',
				color: 'primary'
			}}
			roundness={{
				topLeft: 32,
				topRight: 32,
				bottomLeft: 0,
				bottomRight: 0
			}}
			hasBlur
		/>
		<Post.Root padding={24}>
			<Post.Heading>{titleFa}</Post.Heading>
			<Post.Subheading>{titleEn}</Post.Subheading>
			<div class="my-3 flex items-center gap-2">
				<Post.Info lang={Lang.Fa} data={postInfoData} />
				<Separator size={10} variant="primary" />
				<Post.Score lang={Lang.Fa} value={score} />
			</div>
			<Post.Genres data={genres} />
		</Post.Root>
	</div>
</PageWrapper>
