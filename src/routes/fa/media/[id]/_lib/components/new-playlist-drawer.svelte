<script lang="ts">
	import { CheckIcon, MoveRightIcon } from '@lucide/svelte';
	import Button from '../../../../../../lib/components/button.svelte';
	import { Drawer } from '../../../../_lib/components/drawer';
	import { HASH } from '../../../../_lib/constants/hash';

	const handleBack = () => window.history.back();
	let playlistName = $state('');
</script>

<Drawer.Root hash={HASH.NEW_PLAYLIST}>
	<Drawer.Text bind:value={playlistName} placeholder="اسم لیست پخش رو وارد کن..." />
	<Drawer.Footer>
		<Button as="a" href={HASH.ADD_TO_LIST} variant="tertiary" icon={MoveRightIcon} replaceState>
			بازگشت
		</Button>
		<Button icon={CheckIcon} onClick={handleBack}>تأیید</Button>
	</Drawer.Footer>
</Drawer.Root>
