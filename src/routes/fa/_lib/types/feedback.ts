export type Subscription = 'panda' | 'sakura' | 'fox' | 'dragon';
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
