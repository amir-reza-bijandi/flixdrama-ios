<script lang="ts">
	import SectionHeading from '$lib/components/section-heading.svelte';
	import SectionSelect, { type Option } from '$lib/components/section-select.svelte';
	import Section from '$lib/components/section.svelte';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';
	import type { Country } from './_lib/types/data';

	const OPTION_LIST = [
		{
			name: 'South Korea',
			value: 'korea'
		},
		{
			name: 'China',
			value: 'china'
		},
		{
			name: 'Japan',
			value: 'japan'
		},
		{
			name: 'Thai',
			value: 'thai'
		}
	] as const satisfies Option<Country>[];
</script>

<RecommendationsCarousel />
<Section>
	<SectionHeading>TV Releases</SectionHeading>
	<SectionSelect optionList={OPTION_LIST} />
</Section>
