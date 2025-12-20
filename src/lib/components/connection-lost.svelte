<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowPath, ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Props {
		onRetry?: () => void;
		showDownloadsButton?: boolean;
	}

	let { onRetry, showDownloadsButton = true }: Props = $props();
</script>

<div class="connection-lost-page">
	<!-- Stars animation background -->
	<div class="stars-container">
		{#each Array(12) as _, i}
			<div class="star" style:--delay="{i * 0.3}s" style:--x="{Math.random() * 100}%" style:--y="{Math.random() * 100}%"></div>
		{/each}
	</div>
	
	<!-- Moon illustration -->
	<div class="moon-container">
		<div class="moon">
			<div class="moon-crater moon-crater-1"></div>
			<div class="moon-crater moon-crater-2"></div>
			<div class="moon-crater moon-crater-3"></div>
		</div>
		<div class="moon-glow"></div>
		<!-- Clouds passing by -->
		<div class="cloud cloud-1">
			<svg viewBox="0 0 64 32" fill="currentColor">
				<ellipse cx="20" cy="20" rx="16" ry="10" />
				<ellipse cx="36" cy="18" rx="12" ry="8" />
				<ellipse cx="48" cy="22" rx="10" ry="7" />
				<ellipse cx="28" cy="24" rx="14" ry="8" />
			</svg>
		</div>
		<div class="cloud cloud-2">
			<svg viewBox="0 0 64 32" fill="currentColor">
				<ellipse cx="20" cy="20" rx="14" ry="9" />
				<ellipse cx="32" cy="18" rx="10" ry="7" />
				<ellipse cx="42" cy="21" rx="8" ry="6" />
			</svg>
		</div>
	</div>
	
	<h2 class="connection-lost-title">
		<span class="korean-text">잠시만요</span>
		<span class="english-text">Connection Lost</span>
	</h2>
	
	<p class="connection-lost-subtitle">
		
		<span class="subtitle-highlight">the connection will return soon</span>
	</p>
	
	<div class="connection-lost-quote">
		<span class="quote-mark">"</span>
		<span class="quote-text">Even the longest night will end</span>
		<span class="quote-mark">"</span>
	</div>
	
	<div class="action-buttons">
		{#if onRetry}
			<button
				class="retry-button-kdrama"
				onclick={onRetry}
			>
				<Icon src={ArrowPath} class="size-5" />
				<span>Try Again</span>
			</button>
		{/if}
		
		{#if showDownloadsButton}
			<a
				href={resolve('/downloads')}
				class="downloads-button"
			>
				<Icon src={ArrowDownTray} class="size-5" />
				<span>Check Library</span>
			</a>
		{/if}
	</div>
	

</div>

<style>
	/* K-drama themed connection lost page */
	.connection-lost-page {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem 0;
		overflow: hidden;
	}

	/* Stars animation */
	.stars-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.star {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--color-accent-primary);
		border-radius: 50%;
		left: var(--x);
		top: var(--y);
		animation: twinkle 2s ease-in-out infinite;
		animation-delay: var(--delay);
		opacity: 0.6;
	}

	@keyframes twinkle {
		0%, 100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	/* Moon */
	.moon-container {
		position: relative;
		width: 120px;
		height: 120px;
		margin-bottom: 1.5rem;
	}

	.moon {
		position: absolute;
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow:
			0 0 40px rgba(253, 230, 138, 0.6),
			0 0 80px rgba(253, 230, 138, 0.3),
			inset -8px -8px 20px rgba(0, 0, 0, 0.1);
		animation: moon-float 4s ease-in-out infinite;
	}

	@keyframes moon-float {
		0%, 100% {
			transform: translate(-50%, -50%);
		}
		50% {
			transform: translate(-50%, calc(-50% - 5px));
		}
	}

	.moon-crater {
		position: absolute;
		background: rgba(0, 0, 0, 0.08);
		border-radius: 50%;
	}

	.moon-crater-1 {
		width: 12px;
		height: 12px;
		top: 20%;
		left: 25%;
	}

	.moon-crater-2 {
		width: 8px;
		height: 8px;
		top: 50%;
		right: 20%;
	}

	.moon-crater-3 {
		width: 6px;
		height: 6px;
		bottom: 25%;
		left: 40%;
	}

	.moon-glow {
		position: absolute;
		width: 120px;
		height: 120px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: radial-gradient(circle, rgba(253, 230, 138, 0.3) 0%, transparent 70%);
		animation: glow-pulse 3s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%, 100% {
			opacity: 0.5;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.1);
		}
	}

	/* Clouds */
	.cloud {
		position: absolute;
		color: rgba(255, 255, 255, 0.15);
		animation: cloud-drift linear infinite;
	}

	.cloud-1 {
		width: 50px;
		top: 20%;
		left: -50px;
		animation-duration: 15s;
	}

	.cloud-2 {
		width: 40px;
		bottom: 30%;
		left: -40px;
		animation-duration: 20s;
		animation-delay: 5s;
	}

	@keyframes cloud-drift {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(220px);
		}
	}

	.connection-lost-title {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.75rem;
	}

	.korean-text {
		font-size: 1.75rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-accent-primary) 0%, #a78bfa 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		letter-spacing: 0.05em;
	}

	.english-text {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-foreground-secondary);
	}

	.connection-lost-subtitle {
		font-size: 0.9375rem;
		color: var(--color-foreground-secondary);
		line-height: 1.6;
		max-width: 280px;
		margin-bottom: 1rem;
	}

	.subtitle-highlight {
		color: var(--color-accent-primary);
		font-weight: 600;
	}

	.connection-lost-quote {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 1.25rem;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%);
		border-radius: 9999px;
		margin-bottom: 2rem;
		border: 1px solid rgba(139, 92, 246, 0.2);
	}

	.quote-mark {
		font-size: 1.25rem;
		color: var(--color-accent-primary);
		font-weight: 700;
		opacity: 0.6;
	}

	.quote-text {
		font-size: 0.8125rem;
		color: var(--color-foreground-primary);
		font-style: italic;
		font-weight: 500;
	}

	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 280px;
	}

	.retry-button-kdrama {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, var(--color-accent-primary) 0%, #7c3aed 100%);
		color: white;
		border: none;
		border-radius: 0.875rem;
		font-weight: 600;
		font-size: 0.9375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow:
			0 4px 16px -4px rgba(139, 92, 246, 0.5),
			0 2px 8px -2px rgba(0, 0, 0, 0.2);
	}

	.retry-button-kdrama:hover {
		transform: translateY(-1px);
		box-shadow:
			0 6px 20px -4px rgba(139, 92, 246, 0.6),
			0 4px 12px -2px rgba(0, 0, 0, 0.25);
	}

	.retry-button-kdrama:active {
		transform: translateY(0);
	}

	.downloads-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%);
		color: white;
		border: none;
		border-radius: 0.875rem;
		font-weight: 600;
		font-size: 0.9375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		box-shadow:
			0 4px 16px -4px rgba(245, 158, 11, 0.5),
			0 2px 8px -2px rgba(0, 0, 0, 0.2);
	}

	.downloads-button:hover {
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.95) 0%, rgba(245, 158, 11, 0.95) 100%);
		transform: translateY(-1px);
		box-shadow:
			0 6px 20px -4px rgba(245, 158, 11, 0.6),
			0 4px 12px -2px rgba(0, 0, 0, 0.25);
	}

	.downloads-button:active {
		transform: translateY(0);
	}

	.connection-lost-hint {
		margin-top: 1.5rem;
		font-size: 0.8125rem;
		color: var(--color-foreground-tertiary);
		animation: hint-fade 2s ease-in-out infinite;
	}

	@keyframes hint-fade {
		0%, 100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}
</style>
