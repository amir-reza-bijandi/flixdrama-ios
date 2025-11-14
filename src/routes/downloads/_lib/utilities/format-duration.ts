export function formatDuration(totalSeconds: number): string {
	const sec = Math.max(0, Math.floor(totalSeconds));

	const totalMinutes = Math.floor(sec / 60);
	const seconds = sec % 60;

	const pad = (num: number) => String(num).padStart(2, '0');

	return `${pad(totalMinutes)}:${pad(seconds)}`;
}
