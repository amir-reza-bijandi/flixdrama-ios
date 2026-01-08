<script lang="ts">
	import { asset } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Toggle from '$lib/components/toggle.svelte';
	import { Heart, Pause, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import List from '../../_lib/components/list.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';

	type Soundtrack = {
		id: number;
		title: string;
		artist: string;
	};
	const SOUNDTRACKS: Soundtrack[] = [
		{ id: 1, title: 'Way Back Then', artist: 'Jung Jae-il' },
		{ id: 2, title: 'Round I', artist: 'Jung Jae-il' },
		{ id: 3, title: 'The Rope is Tied', artist: 'Jung Jae-il' },
		{ id: 4, title: 'Pink Soldiers', artist: '23' },
		{ id: 5, title: 'Hostage Crisis', artist: '23' },
		{ id: 6, title: 'I Remember My Name', artist: 'Jung Jae-il' },
		{ id: 7, title: 'Unfolded…', artist: 'Jung Jae-il' },
		{ id: 8, title: 'Needles and Dalgona', artist: 'Park Minju' },
		{ id: 9, title: 'The Fat and the Rats', artist: 'Park Minju' },
		{ id: 10, title: 'It Hurts So Bad', artist: 'Jung Jae-il' },
		{ id: 11, title: 'Delivery', artist: '23' },
		{ id: 12, title: 'Dead End', artist: '23' },
		{ id: 13, title: 'Round VI', artist: 'Jung Jae-il' },
		{ id: 14, title: 'Wife, Husband and 4.56 Billion', artist: 'Jung Jae-il' },
		{ id: 15, title: 'Murder Without Violence', artist: 'Park Minju' },
		{ id: 16, title: 'Slaughterhouse III', artist: 'Jung Jae-il' },
		{ id: 17, title: 'Owe', artist: 'Jung Jae-il' },
		{ id: 18, title: 'Uh…', artist: 'Jung Jae-il' },
		{ id: 19, title: 'Dawn', artist: 'Jung Jae-il' },
		{ id: 20, title: 'Let’s Go Out Tonight', artist: 'Jung Jae-il' }
	];

	let currentId = $state<number | null>(null);
	let isLiked = $state(false);

	const handleToggleLike = () => (isLiked = !isLiked);
</script>

<PageWrapper hasContentPadding hasBottomPadding showBackButton>
	{#snippet actions()}
		<Button isCircle onClick={handleToggleLike} variant="danger" isActive={isLiked}>
			<Toggle isActive={isLiked}>
				{#snippet active()}
					<Icon class="size-5" src={Heart} theme="solid" />
				{/snippet}
				{#snippet inactive()}
					<Icon class="size-5" src={Heart} theme="outline" />
				{/snippet}
			</Toggle>
		</Button>
	{/snippet}
	<Backdrop image={asset('/image/album/13.png')}>
		<div class="text-center">
			<div class="mb-2 text-2xl leading-none font-bold">بازی مرکب</div>
			<div class="text-xs leading-none font-bold text-foreground-secondary">۲۰ ترک موسیقی</div>
		</div>
	</Backdrop>
	<List class="relative z-20 mt-49 pb-content-padding">
		{#each SOUNDTRACKS as { id, title, artist }}
			<Pressable.Root onClick={() => (currentId = currentId !== id ? id : null)}>
				<Pressable.Content>
					<Box.Root class="flex items-center justify-between p-4">
						<Box.Visuals class="rounded-2xl bg-background-tertiary" />
						<Toggle isActive={id === currentId}>
							{#snippet active()}
								<Icon class="size-5" src={Pause} theme="solid" />
							{/snippet}
							{#snippet inactive()}
								<Icon class="size-5" src={Play} theme="solid" />
							{/snippet}
						</Toggle>
						<div class="flex flex-col items-start gap-1 ltr">
							<div class="text-sm leading-none font-bold">{title}</div>
							<div class="text-xs leading-none text-foreground-secondary">{artist}</div>
						</div>
					</Box.Root>
				</Pressable.Content>
			</Pressable.Root>
		{/each}
	</List>
</PageWrapper>
