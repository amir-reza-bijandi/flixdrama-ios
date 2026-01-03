import { asset } from '$app/paths';

export const AVATAR_COUNT = 10;
export const AVATARS: string[] = Array.from({ length: AVATAR_COUNT }).map((_, index) =>
	asset(`/image/avatar/${index + 1}.png`)
);
