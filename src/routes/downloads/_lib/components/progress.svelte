<script module>
	type Status = 'downloading' | 'paused' | 'queued';
	export type { Status as ProgressStatus };
</script>

<script lang="ts">
	type Props = {
		value: number;
		status: Status;
	};
	const { value, status }: Props = $props();

	const bgColor = $derived(
		status === 'downloading' ? 'bg-accent-primary' :
		status === 'queued' ? 'bg-amber-500' :
		'bg-accent-secondary'
	);
</script>

<div class="h-1.5 w-full rounded-full bg-background-secondary backdrop-blur-lg">
	<div
		style:--width={`${value}%`}
		class={['h-full w-(--width) rounded-full', bgColor]}
	></div>
</div>
