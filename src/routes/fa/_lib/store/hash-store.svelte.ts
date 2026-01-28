import { page } from '$app/state';
import type { Hash } from '../types/hash';

class HashStore {
	readonly current = $derived(page.url.hash) as Hash;
}
export const hashStore = new HashStore();
