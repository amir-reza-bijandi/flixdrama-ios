<script lang="ts">
	import Skeleton from '$lib/components/skeleton.svelte';
	import PostSkeleton from '$lib/components/post-skeleton.svelte';
	import { toRem } from '$lib/utilities/general';
	import { navigationStore } from '../../../../_lib/stores/navigation-store.svelte';
</script>

<div class="flex flex-1 flex-col">
	<!-- Backdrop skeleton -->
	<div class="relative h-49 w-full overflow-hidden">
		<Skeleton class="h-full w-full" rounded="none" />
	</div>

	<div
		style:--bottom-padding={toRem(navigationStore.requiredSpace)}
		class="relative mt-49 flex-1 p-6 pb-(--bottom-padding)"
	>
		<div
			class="absolute inset-0 rounded-t-3xl border-t border-stroke-primary bg-background-tertiary backdrop-blur-lg transition-colors"
		></div>
		<div class="relative z-10">
			<!-- Title skeleton -->
			<Skeleton class="mb-3 h-8 w-3/4" />

			<!-- Score skeleton -->
			<div class="mb-4 flex items-center gap-2">
				<Skeleton class="h-5 w-5" rounded="sm" />
				<Skeleton class="h-5 w-16" />
			</div>

			<!-- Short info skeleton -->
			<div class="mb-4 flex items-center gap-4">
				<div class="flex items-center gap-2">
					<Skeleton class="h-4 w-4" rounded="sm" />
					<Skeleton class="h-4 w-20" />
				</div>
				<div class="flex items-center gap-2">
					<Skeleton class="h-4 w-4" rounded="sm" />
					<Skeleton class="h-4 w-24" />
				</div>
				<div class="flex items-center gap-2">
					<Skeleton class="h-4 w-4" rounded="sm" />
					<Skeleton class="h-4 w-16" />
				</div>
			</div>

			<!-- Genres skeleton -->
			<div class="mb-6 flex flex-wrap gap-2">
				<Skeleton class="h-6 w-20" rounded="full" />
				<Skeleton class="h-6 w-24" rounded="full" />
				<Skeleton class="h-6 w-16" rounded="full" />
			</div>

			<div class="flex flex-col gap-4">
				<!-- Synopsis skeleton -->
				<div class="space-y-2">
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-3/4" />
				</div>

				<!-- Recommendations section skeleton -->
				<div class="mt-4">
					<Skeleton class="mb-4 h-6 w-40" />
					<div class="flex gap-2 overflow-hidden">
						{#each Array(4) as _, i (i)}
							<div class="shrink-0">
								<PostSkeleton />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
