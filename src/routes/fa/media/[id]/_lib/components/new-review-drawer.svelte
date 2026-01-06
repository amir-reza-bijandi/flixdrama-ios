<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { Drawer } from '../../../../_lib/components/drawer';
	import Ratings from '../../../../_lib/components/ratings.svelte';
	import { HASH } from '../../../../_lib/constants/hash';
	import type { RatingsValue } from '../../../../_lib/types/ratings';

	let heading = $state('');
	let body = $state('');
	let isSpoiler = $state(false);
	let ratings = $state<RatingsValue>({
		acting: 0,
		rewatchability: 0,
		soundtracks: 0,
		storyline: 0
	});

	const handleToggleSpoiler = () => (isSpoiler = !isSpoiler);
	const handleSubmit = () => window.history.back();
</script>

<Drawer.Root hash={HASH.NEW_REVIEW}>
	<Drawer.Text bind:value={heading} placeholder="عنوان نقد رو اینجا وارد کن..." />
	<Drawer.Group>
		<Drawer.TextArea bind:value={body} placeholder="متن نقد رو اینجا بنویس..." />
		<Drawer.Switch value="" isActive={isSpoiler} onSelect={handleToggleSpoiler}>
			متن نقد داستان رو لو می‌ده؟
		</Drawer.Switch>
	</Drawer.Group>
	<Ratings bind:value={ratings} layout="loose" isInteractable />
	<Drawer.Footer>
		<Button onClick={handleSubmit}>ثبت</Button>
	</Drawer.Footer>
</Drawer.Root>
