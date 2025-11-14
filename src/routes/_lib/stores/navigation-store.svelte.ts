const MARGIN = 20;

class NavigationStore {
	height = $state(0);
	readonly requiredSpace = $derived(this.height + MARGIN * 2);
}

export const navigationStore = new NavigationStore();
