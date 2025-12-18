// Store to hold current media page state for header like button
type MediaState = {
	isActive: boolean;
	mediaId: number | null;
	isLiked: boolean;
	isLoading: boolean;
};

function createMediaStore() {
	const state = $state<MediaState>({
		isActive: false,
		mediaId: null,
		isLiked: false,
		isLoading: false
	});

	return {
		get isActive() {
			return state.isActive;
		},
		get mediaId() {
			return state.mediaId;
		},
		get isLiked() {
			return state.isLiked;
		},
		get isLoading() {
			return state.isLoading;
		},
		setMedia(mediaId: number, isLiked: boolean) {
			state.isActive = true;
			state.mediaId = mediaId;
			state.isLiked = isLiked;
			state.isLoading = false;
		},
		setLiked(isLiked: boolean) {
			state.isLiked = isLiked;
		},
		setLoading(isLoading: boolean) {
			state.isLoading = isLoading;
		},
		clear() {
			state.isActive = false;
			state.mediaId = null;
			state.isLiked = false;
			state.isLoading = false;
		}
	};
}

export const mediaStore = createMediaStore();
