<script lang="ts">
	type Props = {
		heading: string;
		subheading: string;
	};
	const { heading, subheading }: Props = $props();
</script>

<div class="text-center">
	<div class="mb-2 text-2xl leading-none font-bold">{heading}</div>
	<div class="text-xs leading-none font-bold text-foreground-secondary">{subheading}</div>
</div>
