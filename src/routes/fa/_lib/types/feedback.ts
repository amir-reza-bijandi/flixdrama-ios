import type { ResolvedPathname } from '$app/types';
import type { PostInfoData } from '../components/post';
import type { WatchingStatus } from './media';
import type { RatingsValue } from './ratings';
import type { Subscription } from './user';

export type CommentUser = {
	userName: string;
	displayName: string;
	avatar: string;
	subscription: Subscription;
};
export type CommentInfo = {
	title: string;
	subtitle: string;
	postInfo?: PostInfoData;
	score?: number;
	href: ResolvedPathname;
};
export type Recipient = {
	feedbackId: number;
	displayName: string;
};
export type CommentData<T extends CommentInfo | CommentUser> = {
	id: number;
	isLiked: boolean;
	likeCount: number;
	data: T;
	body: string;
	isSpoiler: boolean;
	replies: CommentData<CommentUser>[];
	date: Date;
	recipient: Recipient | null;
};

export type ReviewData<T extends CommentInfo | CommentUser> = Omit<CommentData<T>, 'recipient'> & {
	heading: string;
	watchingStatus: WatchingStatus;
	ratings: RatingsValue;
};
