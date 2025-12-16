export function toFarsi(number: number, useGrouping = false) {
	return number.toLocaleString('fa-IR', {
		useGrouping
	});
}
