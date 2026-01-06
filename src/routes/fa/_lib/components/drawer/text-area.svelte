<script lang="ts">
	type Props = {
		value: string;
		placeholder: string;
	};
	let { value = $bindable(), placeholder }: Props = $props();
</script>

<textarea
	class="h-48 w-full resize-none p-4 text-sm leading-none outline-none placeholder:text-foreground-primary/50"
	{placeholder}
	bind:value
></textarea>
