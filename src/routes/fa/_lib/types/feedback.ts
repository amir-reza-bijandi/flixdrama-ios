import type { WatchingStatus } from './media';
import type { RatingsValue } from './ratings';
import type { Subscription } from './user';

export type User = {
	userName: string;
	displayName: string;
	avatar: string;
	subscription: Subscription;
};
export type Recipient = {
	feedbackId: number;
	displayName: string;
};
type Comment = {
	id: number;
	isLiked: boolean;
	likeCount: number;
	user: User;
	body: string;
	isSpoiler: boolean;
	replies: Comment[];
	date: Date;
	recipient: Recipient | null;
};
export type { Comment as CommentData };

export type ReviewData = Omit<Comment, 'recipient'> & {
	heading: string;
	watchingStatus: WatchingStatus;
	ratings: RatingsValue;
};
