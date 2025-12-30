<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Pressable } from '$lib/components/pressable';
	import Avatar from './avatar.svelte';
</script>

<Pressable.Root as="a" href={resolve('/fa')}>
	<Pressable.Content class="flex items-center gap-1.5">
		<Avatar image={asset('/image/avatar/8.png')} />
		<div class="flex flex-col items-start gap-1.5">
			<div class="text-2xs text-foreground-secondary">خوش اومدی</div>
			<div>سارا بزرگمهر</div>
		</div>
	</Pressable.Content>
</Pressable.Root>
