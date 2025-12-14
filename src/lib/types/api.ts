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

// Home page API response
export type HomeResponse = {
	slider: SliderItem[];
	series: SeriesSection[];
	movies: MovieItem[];
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
};

// Archive API response
export type ArchiveResponse = {
	posts: PostItem[];
	total_posts: number;
};
