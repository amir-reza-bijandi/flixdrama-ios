<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { Pressable } from '$lib/components/pressable';
	import type { Range } from '$lib/types/general';
	import {
		CalendarIcon,
		CircleQuestionMarkIcon,
		DramaIcon,
		FunnelPlusIcon,
		FunnelXIcon,
		LayoutGridIcon,
		StarIcon
	} from '@lucide/svelte';
	import { Drawer } from '../../../_lib/components/drawer';
	import NumberInput, {
		type NumberInputChangeEventHandler
	} from '../../../_lib/components/number-input.svelte';
	import RangeSlider from '../../../_lib/components/range-slider.svelte';
	import { HASH } from '../../../_lib/constants/hash';
	import { GENRES } from '../constant/genres';

	const DEFAULT_YEAR: Range<number> = {
		min: 1970,
		max: new Date().getFullYear()
	};
	const DEFAULT_SCORE: Range<number> = {
		min: 1,
		max: 10
	};

	type Option = {
		label: string;
		value: string;
	};
	const CATEGORIES = [
		{
			label: 'فرقی نمی‌کنه',
			value: ''
		},
		{
			label: 'فیلم',
			value: 'movie'
		},
		{
			label: 'سریال',
			value: 'tv'
		}
	] as const satisfies Option[];
	const STATUS = [
		{
			label: 'فرقی نمی‌کنه',
			value: ''
		},
		{
			label: 'در حال پخش',
			value: 'airing'
		},
		{
			label: 'تمام شده',
			value: 'finished'
		}
	] as const satisfies Option[];

	let category = $state<(typeof CATEGORIES)[number]['value']>('');
	let status = $state<(typeof STATUS)[number]['value']>('');
	let genres = $state<number[]>([]);
	let year = $state<Range<number>>(DEFAULT_YEAR);
	let score = $state<Range<number>>(DEFAULT_SCORE);

	const handleYearMinChange: NumberInputChangeEventHandler = ({ value, isValid }) =>
		isValid && (year.min = value);
	const handleYearMaxChange: NumberInputChangeEventHandler = ({ value, isValid }) =>
		isValid && (year.max = value);
	const handleScoreMinChange: NumberInputChangeEventHandler = ({ value, isValid }) =>
		isValid && (score.min = value);
	const handleScoreMaxChange: NumberInputChangeEventHandler = ({ value, isValid }) =>
		isValid && (score.max = value);

	const handleApplyFilters = () => window.history.back();
	const handleClearFilters = () => {
		category = '';
		genres = [];
		status = '';
		year = DEFAULT_YEAR;
		score = DEFAULT_SCORE;
	};
</script>

<Drawer.Root hash={HASH.FILTER}>
	<Drawer.Group>
		<Drawer.Accordion showCheckBadge={Boolean(category)} label="دسته‌بندی" icon={LayoutGridIcon}>
			<div class="grid grid-cols-3 gap-1.5 p-4">
				{#each CATEGORIES as { label, value }}
					{@render option(label, category === value, () => (category = value))}
				{/each}
			</div>
		</Drawer.Accordion>
		<Drawer.Accordion showCheckBadge={Boolean(genres.length)} label="ژانرها" icon={DramaIcon}>
			<Drawer.Scroll height={256} threshold={16}>
				<div class="grid grid-cols-3 gap-1.5 p-4">
					{#each GENRES as { id, nameFa }}
						{@const isSelected = genres.includes(id)}
						{@render option(nameFa, isSelected, () =>
							isSelected
								? (genres = genres.filter((currentId) => currentId !== id))
								: genres.push(id)
						)}
					{/each}
				</div>
			</Drawer.Scroll>
		</Drawer.Accordion>
		<Drawer.Accordion
			showCheckBadge={Boolean(status)}
			label="وضعیت پخش"
			icon={CircleQuestionMarkIcon}
		>
			<div class="grid grid-cols-3 gap-1.5 p-4">
				{#each STATUS as { label, value }}
					{@render option(label, status === value, () => (status = value))}
				{/each}
			</div>
		</Drawer.Accordion>
		<Drawer.Accordion
			showCheckBadge={year.min !== DEFAULT_YEAR.min || year.max !== DEFAULT_YEAR.max}
			label="سال انتشار"
			icon={CalendarIcon}
		>
			<div class="flex items-center gap-1.5 p-4">
				<NumberInput
					class="h-8 w-13 rounded-full text-center text-xs"
					value={year.min}
					min={DEFAULT_YEAR.min}
					max={DEFAULT_YEAR.max}
					onChange={handleYearMinChange}
				/>
				<RangeSlider bind:value={year} min={DEFAULT_YEAR.min} max={DEFAULT_YEAR.max} />
				<NumberInput
					class="h-8 w-13 rounded-full text-center text-xs"
					value={year.max}
					min={DEFAULT_YEAR.min}
					max={DEFAULT_YEAR.max}
					onChange={handleYearMaxChange}
				/>
			</div>
		</Drawer.Accordion>
		<Drawer.Accordion
			showCheckBadge={score.min !== DEFAULT_SCORE.min || score.max !== DEFAULT_SCORE.max}
			label="امتیاز"
			icon={StarIcon}
		>
			<div class="flex items-center gap-1.5 p-4">
				<NumberInput
					class="h-8 w-13 rounded-full text-center text-xs"
					value={score.min}
					min={DEFAULT_SCORE.min}
					max={DEFAULT_SCORE.max}
					onChange={handleScoreMinChange}
				/>
				<RangeSlider bind:value={score} min={DEFAULT_SCORE.min} max={DEFAULT_SCORE.max} />
				<NumberInput
					class="h-8 w-13 rounded-full text-center text-xs"
					value={score.max}
					min={DEFAULT_SCORE.min}
					max={DEFAULT_SCORE.max}
					onChange={handleScoreMaxChange}
				/>
			</div>
		</Drawer.Accordion>
	</Drawer.Group>
	<Drawer.Footer>
		<Button icon={FunnelPlusIcon} variant="tertiary" onClick={handleApplyFilters}
			>اعمال فیلترها</Button
		>
		<Button icon={FunnelXIcon} variant="danger" onClick={handleClearFilters}>پاک کردن همه</Button>
	</Drawer.Footer>
</Drawer.Root>

{#snippet option(label: string, isActive: boolean, onClick: () => void)}
	<Pressable.Root {onClick}>
		<Pressable.Content>
			<div
				class={[
					'relative grid h-10 place-items-center overflow-hidden rounded-full bg-background-tertiary outline -outline-offset-1 transition-colors before:absolute before:inset-0 before:-z-10 before:bg-gradient before:bg-gradient-primary before:transition-opacity',
					isActive ? 'outline-stroke-tertiary' : 'outline-stroke-primary before:opacity-0'
				]}
			>
				{label}
			</div>
		</Pressable.Content>
	</Pressable.Root>
{/snippet}
