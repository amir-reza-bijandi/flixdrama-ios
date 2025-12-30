import { page } from '$app/state';

class HistoryStore {
	public current = $state<string[]>([]);
	constructor() {
		$effect.root(() => {
			$effect(() => {
				if (!page.url.hash) {
					const lastEntry = this.current.at(-1);
					const href = page.url.toString();
					if (lastEntry !== href && !href.includes('example')) this.current.push(href);
				}
			});
		});
	}
}
export const historyStore = new HistoryStore();
