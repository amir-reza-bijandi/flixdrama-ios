<script lang="ts">
	import { Lang } from '$lib/types/general';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { toFarsi } from '../../fa/_lib/utilities/to-farsi';

	type Props = {
		lang: Lang;
		value: number;
	};
	const { value, lang }: Props = $props();
</script>

<div
	class="flex items-center gap-1 text-accent-secondary transition-colors dark:text-accent-secondary-tint"
>
	<Icon class="size-4" src={Star} theme="micro" />
	<span class="translate-y-px text-sm leading-none font-bold">
		{lang === Lang.En ? value : toFarsi(value)}
	</span>
</div>
