export type Type = 'tv' | 'movie';
export type Country = 'korea' | 'china' | 'japan' | 'thai';

export type Media = {
	id: number;
	poster: string;
	backdrop: string;
	type: Type;
	title: string;
	year: number;
	genres: string[];
	score: string;
	country: Country;
	synopsis: string;
};
