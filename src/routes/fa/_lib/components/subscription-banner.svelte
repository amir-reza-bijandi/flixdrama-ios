<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<a
	class="relative isolate block overflow-hidden rounded-2xl p-5 outline -outline-offset-1 outline-stroke-primary"
	href={resolve('/fa')}
>
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 blur-2xl">
			<div
				class="absolute top-0 left-0 aspect-video w-full rounded-full bg-[#99F6E4] opacity-50"
			></div>
			<div class="absolute -top-9 -left-4.5 size-45 rounded-full bg-[#FFC28C]"></div>
			<div class="absolute -top-13.5 -right-4.5 size-27 rounded-full bg-[#F266B3]"></div>
			<div class="absolute right-9 -bottom-18 size-27 rounded-full bg-[#7D8DFF]"></div>
		</div>
		<div
			style="background-image: url({asset('/image/noise.png')});"
			class="absolute inset-0 bg-background-primary/75"
		></div>
		<img
			class="absolute top-1/2 left-2 -translate-y-1/2 mix-blend-overlay"
			src={asset('/image/subscription-stars.svg')}
			alt=""
		/>
	</div>
	<div class="mb-1.5 text-xl leading-none font-bold">اشتراک بگیر و حالشو ببر!</div>
	<div class="text-sm leading-normal">
		اوپاها و آیدل‌های مورد علاقه‌ت رو با خیال راحت و Full HD ببین. دیگه لازم نیست دنبال لینک
		بگردی...
	</div>
</a>
