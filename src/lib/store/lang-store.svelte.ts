import { resolve } from '$app/paths';
import { page } from '$app/state';
import { Lang } from '$lib/types/general';

class LangStore {
	readonly current = $derived<Lang>(
		page.url.pathname.startsWith(resolve('/en')) ? Lang.En : Lang.Fa
	);
}
export const langStore = new LangStore();
