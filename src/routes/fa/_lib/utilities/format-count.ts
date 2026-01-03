import { toFarsi } from './to-farsi';

export function formatCount(count: number) {
	return count === 0 ? '-' : toFarsi(count);
}
