import Genres from '../../../../_lib/components/genres.svelte';
import PostExpandable from '../../../../_lib/components/post-expandable.svelte';
import PostInfo from '../../../../_lib/components/post-info.svelte';
import AdditionalInfo from './additional-info.svelte';
import Countdown from './countdown.svelte';
import Group from './group.svelte';
import Heading from './heading.svelte';
import Like from './like.svelte';
import Root from './root.svelte';
import Section from './section.svelte';
import Subheading from './subheading.svelte';

export const Post = {
	Root,
	Section,
	Heading,
	Subheading,
	Genres,
	Expandable: PostExpandable,
	Info: PostInfo,
	AdditionalInfo,
	Like,
	Countdown,
	Group
};
export type { PostInfoData } from '../../../../_lib/components/post-info.svelte';
export type { AdditionalInfoData as PostAdditionalInfoData } from './additional-info.svelte';
export type { LikeToggleEventHandler as PostLikeToggleEventHandler } from './like.svelte';
