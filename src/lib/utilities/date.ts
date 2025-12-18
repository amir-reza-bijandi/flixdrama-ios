const LOCALE = 'fa-IR';

export function toLocaleDateString(date: Date) {
	return date.toLocaleDateString(LOCALE, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function toLocaleTimeString(date: Date) {
	return date.toLocaleTimeString(LOCALE, {
		minute: '2-digit',
		hour: '2-digit'
	});
}
