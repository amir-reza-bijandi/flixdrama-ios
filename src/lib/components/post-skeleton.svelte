<script lang="ts">
	import Skeleton from './skeleton.svelte';
</script>

<div class="block w-32 shrink-0">
	<div class="relative mb-1.5">
		<Skeleton class="aspect-2/3 h-auto w-full" rounded="2xl" />
	</div>
	<div class="relative z-10 px-2 text-center">
		<Skeleton class="mx-auto mb-1 h-4 w-24" rounded="md" />
		<Skeleton class="mx-auto h-3 w-16" rounded="md" />
	</div>
</div>
