<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { Drawer, type DrawerSwitchSelectEventHandler } from '../../../../_lib/components/drawer';
	import { HASH } from '../../../../_lib/constants/hash';

	let text = $state('');
	let isSpoiler = $state(false);

	const handleClick = () => window.history.back();
	const handleSelect: DrawerSwitchSelectEventHandler = (_, isActive) => (isSpoiler = isActive);
</script>

<Drawer.Root hash={HASH.NEW_COMMENT}>
	<Drawer.Group>
		<Drawer.TextArea bind:value={text} placeholder="دیدگاه‌ت رو وارد کن..." />
		<Drawer.Switch value="" isActive={isSpoiler} onSelect={handleSelect}>
			متن دیدگاه داستان رو لو می‌ده؟
		</Drawer.Switch>
	</Drawer.Group>
	<Drawer.Footer>
		<Button onClick={handleClick}>ثبت</Button>
	</Drawer.Footer>
</Drawer.Root>
