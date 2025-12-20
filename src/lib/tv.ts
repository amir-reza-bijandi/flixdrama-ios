import { createTV } from 'tailwind-variants';

export const tv = createTV({
	twMerge: true,
	twMergeConfig: {
		classGroups: {
			'bg-gradient-structure': ['bg-gradient'],
			'bg-gradient-color': [
				{
					'bg-gradient': [
						(value: string) =>
							['primary', 'secondary', 'tertiary', 'danger'].some((color) =>
								value.startsWith(color)
							)
					]
				}
			]
		}
	}
});
