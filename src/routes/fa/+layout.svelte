<script lang="ts">
	import PageIcon from '../_lib/components/page-icon.svelte';
	import Navigation from './_lib/components/navigation.svelte';
	import NewCommentDrawer from './_lib/components/new-comment-drawer.svelte';
	import Overlay from './_lib/components/overlay.svelte';

	const { children } = $props();
</script>

<PageIcon />
<Navigation />
<Overlay />
<NewCommentDrawer />
{@render children()}
