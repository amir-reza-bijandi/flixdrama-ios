<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import { feedbackApi } from '$lib/utilities/api';

	let feedbackText = $state('');
	let isSubmitting = $state(false);
	let showAlert = $state(false);
	let alertMessage = $state('');
	let alertType: 'success' | 'error' = $state('success');

	async function handleSubmit() {
		if (!feedbackText.trim()) {
			showAlertMessage('Please write some feedback before submitting.', 'error');
			return;
		}

		isSubmitting = true;
		try {
			await feedbackApi.sendFeedback(feedbackText);
			showAlertMessage('Thank you! Your feedback has been submitted.', 'success');
			feedbackText = '';
		} catch (error) {
			showAlertMessage('Failed to submit feedback. Please try again.', 'error');
		} finally {
			isSubmitting = false;
		}
	}

	function showAlertMessage(message: string, type: 'success' | 'error') {
		alertMessage = message;
		alertType = type;
		showAlert = true;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	}
</script>

<!-- Alert Toast -->
{#if showAlert}
	<div class="toast-container">
		<div class="toast {alertType === 'success' ? 'toast-success' : 'toast-error'}">
			{#if alertType === 'success'}
				<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			{:else}
				<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			{/if}
			<span class="text-sm font-medium">{alertMessage}</span>
		</div>
	</div>
{/if}

<div
	style:--padding-bottom={toRem(navigationStore.requiredSpace)}
	class="relative z-10 flex flex-1 flex-col px-5 pt-6 pb-(--padding-bottom)"
>
	<!-- Copyright Disclaimer -->
	<div
		class="mb-3 flex items-start gap-3 rounded-2xl bg-background-tertiary p-4 outline -outline-offset-1 outline-stroke-primary"
	>
		<svg
			class="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<p class="text-xs leading-relaxed text-foreground-secondary">
			All drama information, images, and trailers displayed in this app are sourced from publicly
			available third-party APIs and databases. We do not host, store, or stream any copyrighted
			content on our servers. If you are a rights holder and have concerns about any content, please
			reach out to us through feedback.
		</p>
	</div>

	<div class="mb-1 text-2xl leading-none font-bold">Feedback</div>

	<div class="text-sm leading-normal">
		Love it or want to change it? We want to hear from you! Share your feedback and let us know how
		we're doing.
	</div>
	<textarea
		bind:value={feedbackText}
		disabled={isSubmitting}
		class="my-3 flex-1 resize-none rounded-2xl bg-background-tertiary p-4 text-sm outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors duration-300 focus:bg-background-secondary disabled:opacity-50"
		placeholder="Write your feedback here..."
	></textarea>

	<button
		onclick={handleSubmit}
		disabled={isSubmitting}
		class="flex w-full items-center justify-center gap-2 rounded-full bg-accent-secondary p-3 text-sm outline -outline-offset-1 outline-stroke-secondary transition-colors duration-150 active:bg-accent-secondary-tint disabled:opacity-50"
	>
		{#if isSubmitting}
			<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			Submitting...
		{:else}
			Submit
		{/if}
	</button>
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		padding: 0 1.25rem;
		animation: slide-down 0.3s ease-out;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.25rem;
		border-radius: 1rem;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.2),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(12px);
		max-width: 100%;
	}

	.toast-success {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95));
		color: white;
	}

	.toast-error {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95));
		color: white;
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
