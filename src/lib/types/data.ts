export type Type = 'tv' | 'movie';
export type Country = 'korea' | 'china' | 'japan' | 'thai';

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
};
