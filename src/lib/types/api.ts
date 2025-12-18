// API Response Types

// Slider item in the home page carousel
export type SliderItem = {
	id: number;
	name: string;
	vote: number;
	poster: string;
};

// Post item within a country section
export type PostItem = {
	id: number;
	name: string;
	poster: string;
	vote: number;
	last_episode?: number;
};

// Country section containing posts
export type CountrySection = {
	id: number;
	type_id: number;
	have_more: boolean;
	name: string;
	posts: PostItem[];
};

// Series section (TV Releases, Movie Releases)
export type SeriesSection = {
	title: string;
	countries: CountrySection[];
};

// Movie item (structure similar to slider for now)
export type MovieItem = {
	id: number;
	name: string;
	vote: number;
	poster: string;
};

// Auth info from home API
export type AuthInfo = {
	token: string;
	need_refresh: boolean;
};

// Home page API response
export type HomeResponse = {
	slider: SliderItem[];
	series: SeriesSection[];
	movies: MovieItem[];
	auth?: AuthInfo;
};

// Generic API response wrapper for error handling
export type ApiResponse<T> = {
	data: T | null;
	error: string | null;
	loading: boolean;
};

// API error type
export type ApiError = {
	message: string;
	status?: number;
};

// Trailer info
export type TrailerInfo = {
	link: string;
	subtitle: string;
};

// Media details response
export type MediaDetails = {
	id: number;
	banner: string;
	name: string;
	type: string;
	overview_en: string;
	year: number;
	vote_mdl: number;
	genres: string[];
	country_name: string;
	is_liked?: boolean;
};

// Similar media item
export type SimilarMedia = {
	id: number;
	name: string;
	poster: string;
	vote: number;
	last_episode: number;
};

// Media page API response
export type MediaResponse = {
	details: MediaDetails;
	similars: SimilarMedia[];
	trailer?: TrailerInfo;
};

// Archive API response
export type ArchiveResponse = {
	posts: PostItem[];
	total_posts: number;
};

// Liked post item
export type LikedPostItem = {
	id: number;
	name: string;
	poster: string;
	vote: number;
	last_episode?: number;
};

// Liked posts API response
export type LikedPostsResponse = {
	posts: LikedPostItem[];
	total_posts: number;
};

// Like action response
export type LikeActionResponse = {
	message: string;
};
