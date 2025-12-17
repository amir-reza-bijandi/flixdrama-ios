<script lang="ts">
	import { networkStore } from '$lib/stores/network-store.svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const isOffline = $derived(!networkStore.isOnline);
</script>

{#if isOffline}
	<div
		class="offline-banner"
		in:fly={{ y: -100, duration: 400, easing: cubicOut }}
		out:fade={{ duration: 200 }}
	>
		<div class="offline-content">
			<div class="pulse-ring"></div>
			<div class="icon-container">
				<svg
					class="offline-icon"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1L23 23"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						d="M16.72 11.06C18.24 11.18 19.67 11.65 20.92 12.4M5 12.55C6.88 11.19 9.35 10.5 12 10.5C12.34 10.5 12.68 10.52 13.02 10.54"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.53 16.11C9.56 15.4 10.74 15 12 15C13.26 15 14.44 15.4 15.47 16.11"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 20H12.01"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
					/>
					<path
						d="M2.34 6.61C4.68 4.95 8.09 4 12 4C15.91 4 19.32 4.95 21.66 6.61"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="text-container">
				<span class="offline-title">You're Offline</span>
				<span class="offline-subtitle">Check your internet connection</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.offline-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 0.75rem;
		padding-top: calc(env(safe-area-inset-top) + 0.75rem);
	}

	.offline-content {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 1rem 1.25rem;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);
		border-radius: 1rem;
		box-shadow:
			0 10px 40px -10px rgba(239, 68, 68, 0.5),
			0 4px 20px -5px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(12px);
		overflow: hidden;
	}

	.offline-content::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.pulse-ring {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 1rem;
		animation: pulse 2s ease-out infinite;
		box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
		}
	}

	.icon-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		flex-shrink: 0;
	}

	.offline-icon {
		width: 1.5rem;
		height: 1.5rem;
		color: white;
		animation: wiggle 0.5s ease-in-out;
	}

	@keyframes wiggle {
		0%,
		100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-10deg);
		}
		75% {
			transform: rotate(10deg);
		}
	}

	.text-container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.offline-title {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		letter-spacing: -0.01em;
		line-height: 1.2;
	}

	.offline-subtitle {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 500;
		line-height: 1.2;
	}
</style>