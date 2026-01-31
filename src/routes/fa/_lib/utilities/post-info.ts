import { COUNTRY_LABEL_MAP_FA, TYPE_ICON_MAP, TYPE_LABEL_MAP_FA } from '$lib/constants/data';
import type { Country, Type } from '$lib/types/data';
import { toLocaleDateString } from '$lib/utilities/date';
import {
	CakeIcon,
	CalendarIcon,
	FilmIcon,
	GlobeIcon,
	HeartIcon,
	MessageCircleIcon,
	PencilIcon
} from '@lucide/svelte';
import type { PostInfoData } from '../components/post';
import { toFarsi } from './to-farsi';

export function generateMediaPostInfo(type: Type, country: Country, year: number): PostInfoData {
	return [
		{
			icon: TYPE_ICON_MAP[type],
			label: TYPE_LABEL_MAP_FA[type]
		},
		{
			icon: GlobeIcon,
			label: COUNTRY_LABEL_MAP_FA[country]
		},
		{
			icon: CalendarIcon,
			label: toFarsi(year, {
				useGrouping: false
			})
		}
	];
}

export function generateNewsPostInfo(
	author: string,
	date: Date,
	commentCount: number
): PostInfoData {
	return [
		{
			label: author,
			icon: PencilIcon
		},
		{
			label: toLocaleDateString(date),
			icon: CalendarIcon
		},
		{
			label: `${toFarsi(commentCount)} دیدگاه`,
			icon: MessageCircleIcon
		}
	];
}

export function generatePreviewPostInfo(
	date: Date,
	likeCount: number,
	commentCount: number
): PostInfoData {
	return [
		{
			label: toLocaleDateString(date),
			icon: CalendarIcon
		},
		{
			label: `${toFarsi(likeCount)} لایک`,
			icon: HeartIcon
		},
		{
			label: `${toFarsi(commentCount)} دیدگاه`,
			icon: MessageCircleIcon
		}
	];
}

export function generatePersonnelPostInfo(
	date: Date,
	age: number,
	roleCount: number
): PostInfoData {
	return [
		{
			label: toLocaleDateString(date),
			icon: CakeIcon
		},
		{
			label: `${toFarsi(age)} ساله`,
			icon: CalendarIcon
		},
		{
			label: `${toFarsi(roleCount)} فیلم و سریال`,
			icon: FilmIcon
		}
	];
}
