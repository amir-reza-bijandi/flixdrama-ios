<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import Swiper from './swiper.svelte';
	import PostSkeleton from './post-skeleton.svelte';

	type Props = {
		postCount?: number;
	};

	const { postCount = 5 }: Props = $props();
</script>

<div class="mt-6 px-5">
	<Skeleton class="mb-2 h-7 w-32" rounded="lg" />
	<div class="mt-2 mb-4 flex gap-2">
		<Skeleton class="h-8 w-20" rounded="full" />
		<Skeleton class="h-8 w-20" rounded="full" />
		<Skeleton class="h-8 w-16" rounded="full" />
	</div>
	<Swiper gap={8} padding={20}>
		{#each Array(postCount) as _}
			<PostSkeleton />
		{/each}
	</Swiper>
</div>
