<script lang="ts">
	import IconButton from '$lib/components/icon-button.svelte';
	import { Moon as MoonIcon, Sun as SunIcon } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<IconButton class="absolute top-1/2 right-7 z-50 -translate-y-1/2" onClick={toggleMode}>
	<Icon
		src={SunIcon}
		theme="solid"
		class={[
			'absolute top-1/2 left-1/2 size-5 -translate-1/2 text-accent-secondary-tint transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			mode.current === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-360 opacity-0'
		]}
	/>
	<Icon
		src={MoonIcon}
		theme="solid"
		class={[
			'absolute top-1/2 left-1/2 size-5 -translate-1/2 text-accent-primary-tint transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			mode.current === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-360 opacity-0'
		]}
	/>
</IconButton>
