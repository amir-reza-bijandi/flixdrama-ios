<script lang="ts">
	import { Moon as MoonIcon, Sun as SunIcon } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<button class="relative" onclick={toggleMode}>
	<Icon
		src={SunIcon}
		theme="solid"
		class={[
			'absolute top-1/2 left-1/2 size-6 -translate-1/2 text-accent-secondary-tint transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			mode.current === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-360 opacity-0'
		]}
	/>
	<Icon
		src={MoonIcon}
		theme="solid"
		class={[
			'absolute top-1/2 left-1/2 size-6 -translate-1/2 text-accent-primary-tint transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			mode.current === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-360 opacity-0'
		]}
	/>
</button>
