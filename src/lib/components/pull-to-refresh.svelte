<script lang="ts">
	import { Spring } from 'svelte/motion';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onRefresh: () => Promise<void>;
		threshold?: number;
		disabled?: boolean;
	};

	const { children, onRefresh, threshold = 80, disabled = false }: Props = $props();

	let containerEl = $state<HTMLElement | null>(null);
	// Use $state for raw pull distance during drag (immediate updates)
	let rawPullDistance = $state(0);
	// Use Spring for animated release
	let springDistance = new Spring(0, { stiffness: 0.1, damping: 0.8 });
	let isRefreshing = $state(false);
	let isPulling = $state(false);
	let touchStartY = 0;
	let canPull = false;

	// Use raw distance during drag, spring value otherwise
	const pullDistance = $derived(isPulling ? rawPullDistance : springDistance.current);
	const progress = $derived(Math.min(pullDistance / threshold, 1));
	const shouldTrigger = $derived(pullDistance >= threshold && !isRefreshing);

	function handleTouchStart(e: TouchEvent) {
		if (disabled || isRefreshing) return;
		
		// Only allow pull when at top of scroll
		const scrollTop = containerEl?.scrollTop ?? 0;
		if (scrollTop > 5) {
			canPull = false;
			return;
		}
		
		canPull = true;
		isPulling = true;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!canPull || disabled || isRefreshing) return;

		const touchY = e.touches[0].clientY;
		const diff = touchY - touchStartY;

		if (diff > 0) {
			// Prevent native scroll when pulling
			e.preventDefault();
			// Apply resistance to pull
			const resistance = 0.5;
			// Update raw distance for immediate feedback
			rawPullDistance = diff * resistance;
		}
	}

	async function handleTouchEnd() {
		if (!canPull || disabled) return;
		
		// Sync spring target to current raw position before releasing
		springDistance.target = rawPullDistance;
		isPulling = false;

		if (shouldTrigger && !isRefreshing) {
			isRefreshing = true;
			springDistance.target = threshold * 0.6; // Keep indicator visible during refresh
			
			try {
				await onRefresh();
			} finally {
				isRefreshing = false;
				springDistance.target = 0;
				rawPullDistance = 0;
			}
		} else {
			springDistance.target = 0;
			rawPullDistance = 0;
		}
		
		canPull = false;
	}
</script>

<div
	bind:this={containerEl}
	class="pull-to-refresh-container"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchEnd}
>
	<!-- Pull indicator -->
	<div
		class="pull-indicator"
		style:transform="translateY({pullDistance - 60}px)"
		style:opacity={progress}
	>
		<div class="indicator-content" class:refreshing={isRefreshing}>
			{#if isRefreshing}
				<div class="spinner">
					<svg viewBox="0 0 24 24" fill="none">
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-dasharray="32"
							stroke-dashoffset="32"
						/>
					</svg>
				</div>
				<span class="indicator-text">Refreshing...</span>
			{:else}
				<div
					class="arrow"
					style:transform="rotate({shouldTrigger ? 180 : 0}deg)"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
				</div>
				<span class="indicator-text">
					{shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
				</span>
			{/if}
		</div>
	</div>

	<!-- Content wrapper with transform -->
	<div
		class="content-wrapper"
		style:transform="translateY({pullDistance}px)"
	>
		{@render children()}
	</div>
</div>

<style>
	.pull-to-refresh-container {
		position: relative;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}

	.pull-indicator {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 10;
		pointer-events: none;
	}

	.indicator-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(109, 40, 217, 0.95) 100%);
		border-radius: 9999px;
		box-shadow:
			0 4px 16px -4px rgba(139, 92, 246, 0.5),
			0 2px 8px rgba(0, 0, 0, 0.2);
		color: white;
	}

	.indicator-content.refreshing {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%);
		box-shadow: 0 4px 16px -4px rgba(34, 197, 94, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.arrow {
		width: 1.25rem;
		height: 1.25rem;
		transition: transform 0.2s ease;
	}

	.arrow svg {
		width: 100%;
		height: 100%;
	}

	.spinner {
		width: 1.25rem;
		height: 1.25rem;
		animation: spin 1s linear infinite;
	}

	.spinner svg {
		width: 100%;
		height: 100%;
	}

	.spinner circle {
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dashoffset: 32;
		}
		50% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: -32;
		}
	}

	.indicator-text {
		font-size: 0.8125rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.content-wrapper {
		will-change: transform;
		transition: transform 0.1s ease-out;
	}
</style>