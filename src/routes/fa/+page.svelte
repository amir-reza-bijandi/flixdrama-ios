<script lang="ts">
	import { DATA_FA } from '$lib/constants/data';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import PageWrapper from './_lib/components/page-wrapper.svelte';
	import SubscriptionBanner from './_lib/components/subscription-banner.svelte';
</script>

<PageWrapper>
	<RecommendationsCarousel data={DATA_FA} lang="fa" />
	<SubscriptionBanner />
</PageWrapper>
