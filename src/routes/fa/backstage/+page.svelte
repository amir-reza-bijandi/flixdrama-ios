<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { toRem } from '$lib/utilities/general';
	import { pageIconStore } from '../../_lib/store/page-icon-store.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import { sizeStore } from '../_lib/store/size-store.svelte';

	const SELECT_OFFSET = 20;

	const TABS = [
		{
			label: 'اخبار',
			value: 'news'
		},
		{
			label: 'موسیقی متن',
			value: 'soundtrack'
		},
		{
			label: 'پیش‌نمایش',
			value: 'preview'
		},
		{
			label: 'لیست پخش',
			value: 'playlist'
		}
	] as const satisfies Option[];

	let currentTab = $state<OptionsValue<typeof TABS>>('news');

	$effect(() => {
		pageIconStore.current = asset('/image/icon/page/sparkle.svg');
	});
</script>

<PageWrapper
	--padding-bottom={toRem(sizeStore.navigationHeight)}
	class="pb-(--padding-bottom)"
	icon={asset('/image/icon/page/sparkle.svg')}
>
	<div class="px-content-padding pt-3 pb-content-padding">
		<Select offset={SELECT_OFFSET} options={TABS} bind:value={currentTab} />
		<div class="grid grid-cols-1 gap-3">
			{#each { length: 4 }, index}
				<PostCard
					class="w-full"
					title="لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از"
					href={resolve(`/fa/news/[id]`, {
						id: String(index + 1)
					})}
					image={asset(`/image/news/${index + 1}.png`)}
					aspectRatio="video"
					textAlignment="right"
					date={new Date()}
				/>
			{/each}
		</div>
	</div>
</PageWrapper>
