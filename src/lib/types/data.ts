export type Type = 'tv' | 'movie';
export type Country = 'korea' | 'china' | 'japan' | 'thai';
export type Role = 'main' | 'supporting' | 'writer' | 'director';

type MediaBase = {
	id: number;
	poster: string;
	backdrop: string;
	type: Type;
	year: number;
	genres: string[];
	score: number;
	country: Country;
	synopsis: string;
};
export type MediaEn = MediaBase & {
	title: string;
};
export type MediaFa = MediaBase & {
	titleFa: string;
	titleEn: string;
	personnel: Staff[];
	releaseDate: Date;
	nextEpisodeDate: Date | null;
	network: string | null;
	episodeCount?: number;
	rating: number;
};
export type Staff = {
	id: number;
	name: string;
	image: string;
	role: Role[];
};
