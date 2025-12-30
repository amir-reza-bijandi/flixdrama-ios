<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { Moon as MoonIcon, Sun as SunIcon } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<Button
	isCircle
	variant="neutral"
	isActive={false}
	class="absolute top-1/2 right-7 z-50 -translate-y-1/2"
	onClick={toggleMode}
>
	<Toggle isActive={mode.current === 'dark'} speed="slow" mustRotate>
		{#snippet active()}
			<Icon src={SunIcon} class="size-5 text-accent-secondary-tint" theme="mini" />
		{/snippet}
		{#snippet inactive()}
			<Icon src={MoonIcon} class="size-5 text-accent-primary-tint" theme="mini" />
		{/snippet}
	</Toggle>
</Button>
