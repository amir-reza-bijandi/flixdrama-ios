<script lang="ts">
	import { ASSETS } from '$lib/assets';
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	<img class="h-full w-full scale-125 object-cover" src="/image/poster.webp" alt="" />
	<div class="absolute inset-0 backdrop-blur-[128px]"></div>
	<img class="absolute top-3 left-3 w-32" src={ASSETS.LOGO} alt="" />
	<div class="absolute inset-0 bg-background-primary/70 bg-[url(/image/noise.png)]"></div>
</div>
