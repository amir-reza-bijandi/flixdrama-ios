import Body from './body.svelte';
import Container from './container.svelte';
import Expandable from './expandable.svelte';
import Footer from './footer.svelte';
import Group from './group.svelte';
import Heading from './heading.svelte';
import InfoHeader from './info-header.svelte';
import Like from './like.svelte';
import Recipient from './recipient.svelte';
import Root from './root.svelte';
import UserHeader from './user-header.svelte';

export const Feedback = {
	Root,
	Container,
	UserHeader,
	InfoHeader,
	Heading,
	Body,
	Footer,
	Group,
	Expandable,
	Recipient,
	Like
};
export type { LikeToggleEventHandler as FeedbackLikeToggleEventHandler } from './like.svelte';
export type { RecipientData as FeedbackRecipientData } from './recipient.svelte';
