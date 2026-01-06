import type { RATING_OPTIONS } from '../constants/feedback';
import type { WatchingStatus } from './media';
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
export type RatingOption = (typeof RATING_OPTIONS)[number];
export type Ratings = Record<RatingOption, number>;

export type ReviewData = Omit<Comment, 'recipient'> & {
	heading: string;
	watchingStatus: WatchingStatus;
	ratings: Ratings;
};
