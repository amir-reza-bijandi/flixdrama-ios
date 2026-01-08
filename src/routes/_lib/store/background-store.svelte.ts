import { MEDIA_FA } from '$lib/constants/data';

class BackgroundStore {
	current = $state<string>(MEDIA_FA[0].poster ?? '');
}
export const backgroundStore = new BackgroundStore();
