<script lang="ts">
	import type { ClassValue } from 'tailwind-variants';

	type Props = {
		class?: ClassValue;
	};
	const { class: extraClass }: Props = $props();
</script>

<svg
	width="199"
	height="315"
	viewBox="0 0 199 315"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={[extraClass]}
>
	<path
		opacity="0.5"
		d="M2.86102e-06 314.905L26.7997 177.185L149.232 0.000242814L198.099 28.2139L105.869 222.836L2.86102e-06 314.905Z"
		fill="currentColor"
	/>
</svg>
