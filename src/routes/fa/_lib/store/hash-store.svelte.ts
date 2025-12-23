class HashStore {
	private _current = $state(new URL(location.href).hash);
	constructor() {
		$effect.root(() => {
			$effect(() => {
				const handleHashChange = ({ newURL }: HashChangeEvent) => {
					const url = new URL(newURL);
					this._current = url.hash;
				};
				window.addEventListener('hashchange', handleHashChange);
				return () => window.removeEventListener('hashchange', handleHashChange);
			});
		});
	}
	get current() {
		return this._current;
	}
}
export const hashStore = new HashStore();
