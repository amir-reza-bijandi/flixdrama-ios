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
			<div class="icon-container">
				<!-- Cloud with moon icon - K-drama night sky theme -->
				<svg
					class="offline-icon"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<!-- Moon -->
					<path
						d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
						fill="currentColor"
						opacity="0.3"
					/>
					<!-- Cloud outline -->
					<path
						d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="none"
					/>
					<!-- Zzz (sleeping/waiting) -->
					<path
						d="M14 6l2-2h-2l2-2"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="text-container">
				<span class="offline-title">No Internet so Taking a Break...</span>
				<span class="offline-subtitle">Why don't you look around your library 🌙</span>
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
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(109, 40, 217, 0.95) 100%);
		border-radius: 1rem;
		box-shadow:
			0 10px 40px -10px rgba(139, 92, 246, 0.5),
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
			rgba(255, 255, 255, 0.08) 50%,
			transparent 100%
		);
		animation: shimmer 4s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
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
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2px);
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