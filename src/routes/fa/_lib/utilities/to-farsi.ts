export function toFarsi(number: number, options?: Intl.NumberFormatOptions) {
	return number.toLocaleString('fa-IR', options);
}
