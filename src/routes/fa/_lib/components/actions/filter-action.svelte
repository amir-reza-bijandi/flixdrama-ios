<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { SlidersHorizontalIcon } from '@lucide/svelte';
	import { HASH } from '../../constants/hash';
</script>

<Button as="a" href={HASH.FILTER} variant="neutral" isActive={false} isCircle>
	<SlidersHorizontalIcon class="size-5 stroke-[1.5]" />
</Button>
