<script lang="ts">
	import type { Option, SelectEventHandler } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { toRem } from '$lib/utilities/general';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { scale, fly } from 'svelte/transition';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import { downloadStore } from '$lib/stores/download-store.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { Trash, InformationCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import FileListItemNew from './_lib/components/file-list-item-new.svelte';
	import QueueListItemNew from './_lib/components/queue-list-item-new.svelte';
	import VideoPlayer from '$lib/plugins/video-player';

	type Tab = 'queue' | 'files';
	const TABS = [
		{
			name: 'Queue',
			value: 'queue'
		},
		{
			name: 'Files',
			value: 'files'
		}
	] as const satisfies Option<Tab>[];

	const TAB_MESSAGE_MAP: Record<Tab, string> = {
		queue: 'Your queue is currently empty.',
		files: 'No files have been downloaded.'
	};

	let currentTab = $state<Tab>('files');
	let directionFactor = $state<1 | -1>(1);
	let listContentHeight = $state(0);
	let listContainerHeight = $state(0);
	
	// Alert/Modal state
	let showDeleteConfirm = $state(false);
	let deleteItemId = $state<string | null>(null);
	let showDeleteAllConfirm = $state(false);
	let showSwipeHint = $state(true);
	
	// Derived state from store
	const queueItems = $derived(downloadStore.activeDownloads);
	const fileItems = $derived(downloadStore.downloadedFiles);
	const totalSize = $derived(downloadStore.totalDownloadedSize);
	
	const listHeight = $derived(
		listContentHeight + navigationStore.requiredSpace > listContainerHeight
			? listContentHeight
			: listContainerHeight - navigationStore.requiredSpace
	);
	const isListEmpty = $derived(currentTab === 'queue' ? !queueItems.length : !fileItems.length);

	// Initialize store on mount
	onMount(async () => {
		await downloadStore.initialize();
		// Check if user has seen the swipe hint before
		const hintSeen = localStorage.getItem('swipeHintSeen');
		if (hintSeen) {
			showSwipeHint = false;
		}
	});

	onDestroy(() => {
		downloadStore.cleanup();
	});

	// Handlers
	const handleSelect: SelectEventHandler<typeof TABS> = (tab, index) => {
		currentTab = tab;
		directionFactor = index === 1 ? 1 : -1;
	};

	function handleQueueItemDelete(id: string) {
		deleteItemId = id;
		showDeleteConfirm = true;
	}

	function handleFileItemDelete(id: string) {
		deleteItemId = id;
		showDeleteConfirm = true;
	}

	async function confirmDelete() {
		if (deleteItemId) {
			if (currentTab === 'queue') {
				await downloadStore.cancelDownload(deleteItemId);
			} else {
				await downloadStore.deleteFile(deleteItemId);
			}
		}
		closeDeleteConfirm();
	}

	function closeDeleteConfirm() {
		showDeleteConfirm = false;
		deleteItemId = null;
	}

	function handleDeleteAll() {
		showDeleteAllConfirm = true;
	}

	async function confirmDeleteAll() {
		await downloadStore.deleteAllFiles();
		closeDeleteAllConfirm();
	}

	function closeDeleteAllConfirm() {
		showDeleteAllConfirm = false;
	}

	function dismissSwipeHint() {
		showSwipeHint = false;
		localStorage.setItem('swipeHintSeen', 'true');
	}

	async function handlePlayFile(id: string) {
		try {
			const fileInfo = await downloadStore.getLocalFilePath(id);
			if (fileInfo.exists) {
				// Convert local file path to file:// URL
				const fileUrl = `file://${fileInfo.videoPath}`;
				const subtitleUrl = fileInfo.subtitlePath ? `file://${fileInfo.subtitlePath}` : undefined;
				
				await VideoPlayer.playVideo({
					url: fileUrl,
					subtitleUrl: subtitleUrl,
					title: 'Downloaded Video'
				});
			} else {
				// File was deleted manually, refresh the list
				await downloadStore.refreshDownloadedFiles();
			}
		} catch (error) {
			console.error('Failed to play file:', error);
		}
	}

	async function handlePauseDownload(id: string) {
		await downloadStore.pauseDownload(id);
	}

	async function handleResumeDownload(id: string) {
		await downloadStore.resumeDownload(id);
	}
</script>

<div class="relative z-10 flex flex-1 flex-col px-5 pt-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div class="text-2xl leading-none font-bold">Downloads</div>
		{#if currentTab === 'files' && fileItems.length > 0}
			<button 
				onclick={handleDeleteAll}
				class="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30"
			>
				<Icon class="size-3.5" src={Trash} theme="micro" />
				Delete All
			</button>
		{/if}
	</div>
	
	<!-- Total Size Badge -->
	{#if currentTab === 'files' && totalSize.totalSize > 0}
		<div class="mt-3 flex items-center gap-2">
			<div class="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-medium text-accent-primary">
				Total: {totalSize.formattedSize}
			</div>
		</div>
	{/if}
	
	<Select options={TABS} maxOptionWidth={57} onSelect={handleSelect} />
	
	<!-- Swipe Hint Alert -->
	{#if showSwipeHint && currentTab === 'files' && fileItems.length > 0}
		<div 
			class="mb-3 flex items-center gap-3 rounded-xl bg-blue-500/10 p-3 text-sm"
			in:fly={{ y: -10, duration: 200 }}
			out:fly={{ y: -10, duration: 150 }}
		>
			<Icon class="size-5 shrink-0 text-blue-400" src={InformationCircle} theme="solid" />
			<span class="flex-1 text-blue-300">Swipe right on any item to delete it</span>
			<button 
				onclick={dismissSwipeHint}
				class="shrink-0 rounded-full p-1 hover:bg-white/10"
			>
				<Icon class="size-4 text-blue-400" src={XMark} theme="micro" />
			</button>
		</div>
	{/if}
	
	<div class="relative flex-1" bind:clientHeight={listContainerHeight}>
		<div
			style:--height={toRem(
				listContentHeight + navigationStore.requiredSpace > listContainerHeight
					? listContentHeight + navigationStore.requiredSpace
					: listContainerHeight
			)}
			class="transition-height absolute h-(--height) w-full duration-150"
		>
			{#if currentTab === 'queue'}
				<div class="flex flex-col gap-2 pb-4" bind:clientHeight={listContentHeight}>
					{#if queueItems.length === 0}
						{@render message()}
					{:else}
						{#each queueItems as data (data.id)}
							<div
								animate:flip={{
									duration: 150,
									easing: cubicOut
								}}
							>
								<QueueListItemNew 
									{data} 
									onDelete={handleQueueItemDelete}
									onPause={handlePauseDownload}
									onResume={handleResumeDownload}
								/>
							</div>
						{/each}
					{/if}
				</div>
			{:else}
				<div class="flex flex-col gap-2 pb-4" bind:clientHeight={listContentHeight}>
					{#if fileItems.length === 0}
						{@render message()}
					{:else}
						{#each fileItems as data (data.id)}
							<div
								animate:flip={{
									duration: 150,
									easing: cubicOut
								}}
							>
								<FileListItemNew 
									{data} 
									onDelete={handleFileItemDelete}
									onPlay={handlePlayFile}
								/>
							</div>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
		onclick={closeDeleteConfirm}
		role="dialog"
		aria-modal="true"
		transition:scale={{ duration: 150, start: 0.95 }}
	>
		<div 
			class="mx-6 w-full max-w-sm rounded-2xl bg-background-secondary p-6 shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mb-2 text-lg font-bold">Delete {currentTab === 'queue' ? 'Download' : 'File'}?</div>
			<p class="mb-6 text-sm text-foreground-secondary">
				{currentTab === 'queue' 
					? 'This will cancel the download and remove it from the queue.'
					: 'This will permanently delete the downloaded file from your device.'}
			</p>
			<div class="flex gap-3">
				<button 
					onclick={closeDeleteConfirm}
					class="flex-1 rounded-xl bg-background-tertiary py-3 font-medium transition-colors hover:bg-background-primary"
				>
					Cancel
				</button>
				<button 
					onclick={confirmDelete}
					class="flex-1 rounded-xl bg-red-500 py-3 font-medium text-white transition-colors hover:bg-red-600"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Delete All Confirmation Modal -->
{#if showDeleteAllConfirm}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
		onclick={closeDeleteAllConfirm}
		role="dialog"
		aria-modal="true"
		transition:scale={{ duration: 150, start: 0.95 }}
	>
		<div 
			class="mx-6 w-full max-w-sm rounded-2xl bg-background-secondary p-6 shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mb-2 text-lg font-bold text-red-400">Delete All Files?</div>
			<p class="mb-2 text-sm text-foreground-secondary">
				This will permanently delete all downloaded files ({totalSize.formattedSize}) from your device.
			</p>
			<p class="mb-6 text-sm font-medium text-red-400">
				This action cannot be undone.
			</p>
			<div class="flex gap-3">
				<button 
					onclick={closeDeleteAllConfirm}
					class="flex-1 rounded-xl bg-background-tertiary py-3 font-medium transition-colors hover:bg-background-primary"
				>
					Cancel
				</button>
				<button 
					onclick={confirmDeleteAll}
					class="flex-1 rounded-xl bg-red-500 py-3 font-medium text-white transition-colors hover:bg-red-600"
				>
					Delete All
				</button>
			</div>
		</div>
	</div>
{/if}

{#snippet message()}
	{#if isListEmpty}
		<div
			class="absolute top-1/2 left-1/2 -translate-1/2 text-center text-xl leading-tight font-bold"
			in:scale|global={{
				delay: 300,
				duration: 300,
				start: 0.75
			}}
		>
			{TAB_MESSAGE_MAP[currentTab]}
		</div>
	{/if}
{/snippet}
