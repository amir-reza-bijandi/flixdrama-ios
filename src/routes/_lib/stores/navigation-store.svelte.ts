import { toRem } from '$lib/utilities/general';

const MARGIN = 20;

class NavigationStore {
	height = $state(0);
	readonly bottomSpacing = $derived(toRem(this.height + MARGIN * 2));
}

export const navigationStore = new NavigationStore();
