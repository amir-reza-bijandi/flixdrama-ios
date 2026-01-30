<script module>
	import type { ResolvedPathname } from '$app/types';
	import { Box } from '$lib/components/box';
	import { Pressable } from '$lib/components/pressable';
	import type { HeroIcon } from '$lib/types/icon';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type ClassValue } from 'tailwind-variants';

	type Data = {
		label: string;
		icon: HeroIcon;
		href: ResolvedPathname;
	}[];
	export type { Data as MenuData };
</script>

<script lang="ts">
	type Props = {
		data: Data;
		class?: ClassValue;
	};
	const { data, class: extraClass }: Props = $props();
</script>

<Box.Root class={extraClass}>
	<Box.Visuals class="rounded-3xl bg-background-tertiary" />
	<div class="divide-y divide-stroke-primary">
		{#each data as { label, icon, href }}
			<Pressable.Root class="block" as="a" {href}>
				<Pressable.Content class="flex items-center gap-2 p-5">
					<Icon class="size-5" src={icon} />
					{label}
				</Pressable.Content>
			</Pressable.Root>
		{/each}
	</div>
</Box.Root>
