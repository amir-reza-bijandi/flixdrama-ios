class RecommendationsCarouselStore {
	public currentIndex = $state(0);
	public currentBackdrop = $state<string>('');
}
export const recommendationsCarouselStore = new RecommendationsCarouselStore();
