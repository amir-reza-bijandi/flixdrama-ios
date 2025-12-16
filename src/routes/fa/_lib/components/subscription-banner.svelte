<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<a
	class="relative isolate m-app-padding block overflow-hidden rounded-2xl p-5 outline -outline-offset-1 outline-stroke-primary backdrop-blur-xl"
	href={resolve('/fa')}
>
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 opacity-25 blur-2xl transition-[filter] dark:brightness-75">
			<div
				class="absolute top-0 left-0 aspect-video w-full rounded-full bg-[#99F6E4] opacity-50"
			></div>
			<div class="absolute -top-9 -left-4.5 size-45 rounded-full bg-[#FFC28C]"></div>
			<div class="absolute -top-13.5 -right-4.5 size-27 rounded-full bg-[#F266B3]"></div>
			<div class="absolute right-9 -bottom-18 size-27 rounded-full bg-[#7D8DFF]"></div>
		</div>
		<div class="absolute inset-0 bg-black/5"></div>
		<img
			class="absolute top-1/2 left-4 -translate-y-1/2 opacity-25 invert-100 transition-[filter] dark:invert-0"
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
