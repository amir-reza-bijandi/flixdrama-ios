import type { QUALITY, WATCHING_STATUS } from '../constants/media';

export type WatchingStatus = (typeof WATCHING_STATUS)[number];
export type Quality = (typeof QUALITY)[number];
