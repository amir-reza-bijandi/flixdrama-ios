import { toFarsi } from '../../routes/fa/_lib/utilities/to-farsi';

export function formatDuration(totalSeconds: number, targetLocale: 'fa' | 'en' = 'en'): string {
	const sec = Math.max(0, Math.floor(totalSeconds));

	const totalMinutes = Math.floor(sec / 60);
	const seconds = sec % 60;

	const pad = (num: number) =>
		String(targetLocale === 'en' ? num : toFarsi(num)).padStart(
			2,
			targetLocale === 'en' ? '0' : '۰'
		);

	return `${pad(totalMinutes)}:${pad(seconds)}`;
}
