import type { HASH } from '../constants/hash';

export type Hash = (typeof HASH)[keyof typeof HASH];
