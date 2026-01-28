class SizeStore {
	readonly SEARCH_INPUT_HEIGHT = 44;
	navigationHeight = $state(0);
	headerHeight = $state(0);
	searchHeight = $state(0);
	notificationsHeight = $state(0);
}
export const sizeStore = new SizeStore();
