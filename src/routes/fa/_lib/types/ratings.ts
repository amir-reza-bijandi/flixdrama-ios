import type { RATING_OPTIONS } from '../constants/feedback';

export type RatingOption = (typeof RATING_OPTIONS)[number];
export type RatingsValue = Record<RatingOption, number>;
