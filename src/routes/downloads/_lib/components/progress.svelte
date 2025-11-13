<script module>
	type Status = 'downloading' | 'paused';
	export type { Status as ProgressStatus };
</script>

<script lang="ts">
	type Props = {
		value: number;
		status: Status;
	};
	const { value, status }: Props = $props();
</script>

<div class="h-1.5 w-full rounded-full bg-background-secondary backdrop-blur-lg">
	<div
		style:--width={`${value}%`}
		class={[
			'h-full w-(--width) rounded-full',
			status === 'downloading' ? 'bg-accent-primary' : 'bg-accent-secondary'
		]}
	></div>
</div>
