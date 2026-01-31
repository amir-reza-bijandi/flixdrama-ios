<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import { toLocaleDateString, toLocaleTimeString } from '$lib/utilities/date';
	import type { CommentUser } from '../../types/feedback';
	import type { Subscription } from '../../types/user';
	import Avatar from '../avatar.svelte';

	export const SUBSCRIPTION_IMAGE_MAP: Record<Subscription, string> = {
		dragon: asset('/image/subscription/1.svg'),
		panda: asset('/image/subscription/2.svg'),
		sakura: asset('/image/subscription/3.svg'),
		fox: asset('/image/subscription/4.svg')
	};

	type Props = CommentUser & {
		date: Date;
	};
	const { displayName, userName, avatar, date, subscription }: Props = $props();
</script>

<div class="mb-2">
	<Image
		style="mask-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))"
		class="absolute top-4 left-4 w-20"
		src={SUBSCRIPTION_IMAGE_MAP[subscription]}
	/>
	<div class="flex items-center gap-2">
		<Pressable.Root
			as="a"
			href={resolve('/fa/user/[id]', {
				id: userName
			})}
		>
			<Pressable.Content>
				<Avatar image={avatar} />
			</Pressable.Content>
		</Pressable.Root>
		<div>
			<div class="mb-1.5 font-bold">{displayName}</div>
			<div class="text-xs leading-none text-foreground-secondary">
				{toLocaleDateString(date)} - {toLocaleTimeString(date)}
			</div>
		</div>
	</div>
</div>
