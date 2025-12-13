<script lang="ts">
	import { asset } from '$app/paths';
</script>

<div class="relative">
	<img src={asset('/image/brand-name.svg')} alt="" width="106" height="18" fetchpriority="high" />
	<img
		style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
		class="absolute -top-5 -left-3.25 -z-10 w-32 opacity-10"
		src={asset('/image/logo.svg')}
		alt=""
		width="106"
		height="110"
		fetchpriority="high"
	/>
</div>
