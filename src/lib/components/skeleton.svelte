<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		style?: string;
		rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
	};

	const { class: classValue, style, rounded = '2xl' }: Props = $props();

	const roundedClasses = {
		none: '',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		full: 'rounded-full'
	};
</script>

<div
	{style}
	class={[
		'animate-shine bg-linear-110 from-background-tertiary from-20% via-background-secondary via-30% to-background-tertiary to-40% bg-size-[400%,200%]',
		roundedClasses[rounded],
		classValue
	]}
></div>
