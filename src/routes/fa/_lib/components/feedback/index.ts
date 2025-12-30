import Body from './body.svelte';
import Container from './container.svelte';
import Expandable from './expandable.svelte';
import Footer from './footer.svelte';
import Group from './group.svelte';
import Recipient from './recipient.svelte';
import Root from './root.svelte';
import UserHeader from './user-header.svelte';

export const Feedback = {
	Root,
	Container,
	UserHeader,
	Body,
	Footer,
	Group,
	Expandable,
	Recipient
};
export type { RecipientData as FeedbackRecipientData } from './recipient.svelte';
