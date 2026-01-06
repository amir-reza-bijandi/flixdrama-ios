import { MEDIA_FA } from '$lib/constants/data';
import { backgroundStore } from './background-store.svelte';

class RecommendationsCarouselStore {
	public currentIndex = $state(0);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				backgroundStore.image = MEDIA_FA[recommendationsCarouselStore.currentIndex].backdrop;
			});
		});
	}
}
export const recommendationsCarouselStore = new RecommendationsCarouselStore();
