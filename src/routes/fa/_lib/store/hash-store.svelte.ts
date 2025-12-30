import { page } from '$app/state';

class HashStore {
	readonly current = $derived(page.url.hash);
}
export const hashStore = new HashStore();
