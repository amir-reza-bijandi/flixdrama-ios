import type { Quality } from '../types/media';

export const WATCHING_STATUS = [
	'unwatched',
	'watching',
	'plan-to-watch',
	'dropped',
	'finished'
] as const;

export const QUALITY = [
	'360p',
	'480p',
	'540p',
	'720p',
	'1080p',
	'720p x265 10bit',
	'1080p x265 10bit'
] as const;
export const QUALITY_LABEL_MAP: Record<Quality, string> = {
	'360p': 'qSD',
	'480p': 'SD',
	'540p': 'qHD',
	'720p': 'HD',
	'1080p': 'FHD',
	'720p x265 10bit': 'HD+',
	'1080p x265 10bit': 'FHD+'
};
