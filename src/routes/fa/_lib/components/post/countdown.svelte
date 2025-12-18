<script lang="ts">
	import Separator from '$lib/components/separator.svelte';
	import { toLocaleDateString, toLocaleTimeString } from '$lib/utilities/date';
	import countdown from 'countdown';
	import { SvelteDate } from 'svelte/reactivity';
	import { toFarsi } from '../../utilities/to-farsi';

	type Props = {
		date: Date;
	};
	const { date: targetDate }: Props = $props();

	type CountdownData = {
		label: string;
		value: number;
	}[];

	let reactiveDate = new SvelteDate();
	let timespan = $derived(countdown(reactiveDate, targetDate));
	let data = $derived<CountdownData>(
		typeof timespan === 'object'
			? [
					{
						label: 'ثانیه',
						value: timespan.seconds ?? 0
					},
					{
						label: 'دقیقه',
						value: timespan.minutes ?? 0
					},
					{
						label: 'ساعت',
						value: timespan.hours ?? 0
					},
					{
						label: 'روز',
						value: timespan.days ?? 0
					}
				]
			: []
	);

	$effect(() => {
		const timer = setInterval(() => {
			if (targetDate.getTime() > reactiveDate.getTime()) reactiveDate.setTime(Date.now());
			else clearInterval(timer);
		}, 1000);
		() => clearInterval(timer);
	});
</script>

<div class="mt-6">
	<div class="flex items-center justify-center gap-6">
		{#if data.length}
			{#each data as { label, value }, index}
				<div class="flex flex-col items-center">
					<div class="text-xl leading-none transition-colors">{toFarsi(value)}</div>
					<div class="mt-1.5 text-xs leading-none text-foreground-secondary transition-colors">
						{label}
					</div>
				</div>
				{#if index != data.length - 1}
					<Separator size={20} />
				{/if}
			{/each}
		{:else}
			مشکلی پیش اومده!
		{/if}
	</div>
	<div class="mx-auto mt-4 max-w-68 text-center text-xs leading-normal transition-colors">
		قسمت بعد این سریال در تاریخ «{toLocaleDateString(targetDate)} - {toLocaleTimeString(
			targetDate
		)}» به وقت کرهٔ جنوبی پخش می شه!
	</div>
</div>
