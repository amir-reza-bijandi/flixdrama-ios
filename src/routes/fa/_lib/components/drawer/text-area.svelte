<script lang="ts">
	type Props = {
		value: string;
		placeholder: string;
	};
	let { value = $bindable(), placeholder }: Props = $props();
</script>

<textarea
	class="h-48 w-full resize-none rounded-t-3xl p-4 transition-colors outline-none placeholder:text-foreground-primary/50 focus-visible:bg-background-tertiary"
	{placeholder}
	bind:value
></textarea>
