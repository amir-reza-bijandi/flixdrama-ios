<script lang="ts">
	import { page } from '$app/state';
	import { DATA_FA } from '$lib/constants/data';
	import { VideoCamera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';

	const media = DATA_FA[Number(page.params.id)] ?? DATA_FA[0];
</script>

<PageWrapper>
	<Backdrop image={media.backdrop}>
		<button
			class="flex h-full w-full flex-col items-center justify-center gap-1.5 transition-colors duration-300 active:bg-background-secondary"
		>
			<Icon class="size-9" src={VideoCamera} theme="solid" />
			<div class="font-bold">پیش‌نمایش</div>
		</button>
	</Backdrop>
</PageWrapper>
