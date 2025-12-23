<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import * as Pressable from '$lib/components/pressable';
</script>

<Pressable.Root as="a" href={resolve('/fa')}>
	<Pressable.Content class="flex items-center gap-1.5">
		<img
			class="aspect-square h-auto w-10 rounded-full outline -outline-offset-1 outline-stroke-secondary"
			src={asset('/image/avatar.png')}
			alt=""
		/>
		<div class="flex flex-col items-start gap-1.5">
			<div class="text-2xs text-foreground-secondary">خوش اومدی</div>
			<div>سارا بزرگمهر</div>
		</div>
	</Pressable.Content>
</Pressable.Root>
