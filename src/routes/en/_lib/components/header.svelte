<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ChevronLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../../../../lib/components/button.svelte';
	import Branding from './branding.svelte';
	import ModeToggle from './mode-toggle.svelte';

	const isMediaRoute = $derived(page.url.pathname.includes(resolve('/en/media')));
	const handleBack = () => window.history.back();
</script>

<div class="relative z-10 flex items-center justify-between px-7">
	{#if !isMediaRoute}
		<Branding />
	{:else}
		<Button variant="neutral" isActive={false} isCircle onClick={handleBack}>
			<Icon class="size-6" src={ChevronLeft} theme="mini" />
		</Button>
	{/if}
	<ModeToggle />
</div>
