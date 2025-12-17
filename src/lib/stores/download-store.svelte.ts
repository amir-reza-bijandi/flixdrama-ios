import DownloadManager, {
	type DownloadInfo,
	type DownloadedFile,
	type DownloadProgressEvent,
	type DownloadCompleteEvent,
	type DownloadOptions,
	type QueueStatus
} from '$lib/plugins/download-manager';

/**
 * Download Store
 * Manages the state of active downloads and downloaded files
 */

// State
let activeDownloads = $state<DownloadInfo[]>([]);
let downloadedFiles = $state<DownloadedFile[]>([]);
let totalDownloadedSize = $state<{ totalSize: number; formattedSize: string }>({
	totalSize: 0,
	formattedSize: '0 B'
});
let isLoading = $state(false);
let error = $state<string | null>(null);
let queueStatus = $state<QueueStatus>({
	isQueuePaused: false,
	totalInQueue: 0,
	queuedCount: 0,
	downloadingCount: 0,
	pausedCount: 0
});

// Listeners
let progressListenerRemove: (() => void) | null = null;
let completeListenerRemove: (() => void) | null = null;

/**
 * Initialize the download store
 * Sets up listeners and loads current state
 */
async function initialize() {
	try {
		isLoading = true;
		error = null;

		// Set up progress listener
		const progressListener = await DownloadManager.addListener(
			'downloadProgress',
			(event: DownloadProgressEvent) => {
				updateDownloadProgress(event);
			}
		);
		progressListenerRemove = progressListener.remove;

		// Set up completion listener
		const completeListener = await DownloadManager.addListener(
			'downloadComplete',
			(event: DownloadCompleteEvent) => {
				handleDownloadComplete(event);
			}
		);
		completeListenerRemove = completeListener.remove;

		// Load current state
		await refreshDownloads();
		await refreshDownloadedFiles();
		await refreshTotalSize();
		await refreshQueueStatus();
	} catch (err) {
		error = err instanceof Error ? err.message : 'Failed to initialize download store';
		console.error('Download store initialization error:', err);
	} finally {
		isLoading = false;
	}
}

/**
 * Cleanup listeners when component unmounts
 */
function cleanup() {
	if (progressListenerRemove) {
		progressListenerRemove();
		progressListenerRemove = null;
	}
	if (completeListenerRemove) {
		completeListenerRemove();
		completeListenerRemove = null;
	}
}

/**
 * Refresh the list of active downloads
 */
async function refreshDownloads() {
	try {
		const result = await DownloadManager.getAllDownloads();
		activeDownloads = result.downloads.filter((d) => !d.isDone && !d.isRemoved);
	} catch (err) {
		console.error('Failed to refresh downloads:', err);
	}
}

/**
 * Refresh the list of downloaded files (trailers only for now)
 */
async function refreshDownloadedFiles(isTrailer: boolean = true) {
	try {
		const result = await DownloadManager.getDownloadedFiles({ isTrailer });
		downloadedFiles = result.files;
	} catch (err) {
		console.error('Failed to refresh downloaded files:', err);
	}
}

/**
 * Refresh total downloaded size
 */
async function refreshTotalSize() {
	try {
		totalDownloadedSize = await DownloadManager.getTotalDownloadedSize();
	} catch (err) {
		console.error('Failed to get total size:', err);
	}
}

/**
 * Refresh queue status
 */
async function refreshQueueStatus() {
	try {
		queueStatus = await DownloadManager.getQueueStatus();
	} catch (err) {
		console.error('Failed to get queue status:', err);
	}
}

/**
 * Update download progress from event
 */
function updateDownloadProgress(event: DownloadProgressEvent) {
	const index = activeDownloads.findIndex((d) => d.id === event.id);
	if (index >= 0) {
		activeDownloads[index] = {
			...activeDownloads[index],
			progress: event.progress,
			downloadedBytes: event.downloadedBytes,
			totalBytes: event.totalBytes,
			speed: event.speed,
			status: event.status
		};
	}
}

/**
 * Handle download completion
 */
async function handleDownloadComplete(event: DownloadCompleteEvent) {
	if (event.success) {
		// Remove from active downloads
		activeDownloads = activeDownloads.filter((d) => d.id !== event.id);

		// Refresh downloaded files and total size
		await refreshDownloadedFiles();
		await refreshTotalSize();
	}
}

/**
 * Start a new download
 */
async function startDownload(options: DownloadOptions): Promise<{ id: string; status: string }> {
	try {
		const result = await DownloadManager.startDownload(options);

		// Add to active downloads
		activeDownloads = [
			...activeDownloads,
			{
				...options,
				id: result.id,
				isDone: false,
				isRemoved: false,
				progress: 0,
				status: 'waiting'
			}
		];

		return result;
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to start download';
		error = message;
		throw new Error(message);
	}
}

/**
 * Pause a download
 */
async function pauseDownload(id: string) {
	try {
		await DownloadManager.pauseDownload({ id });
		const index = activeDownloads.findIndex((d) => d.id === id);
		if (index >= 0) {
			activeDownloads[index] = {
				...activeDownloads[index],
				status: 'paused'
			};
		}
	} catch (err) {
		console.error('Failed to pause download:', err);
	}
}

/**
 * Resume a download
 */
async function resumeDownload(id: string) {
	try {
		await DownloadManager.resumeDownload({ id });
		const index = activeDownloads.findIndex((d) => d.id === id);
		if (index >= 0) {
			activeDownloads[index] = {
				...activeDownloads[index],
				status: 'downloading'
			};
		}
	} catch (err) {
		console.error('Failed to resume download:', err);
	}
}

/**
 * Cancel a download
 */
async function cancelDownload(id: string) {
	try {
		await DownloadManager.cancelDownload({ id });
		activeDownloads = activeDownloads.filter((d) => d.id !== id);
	} catch (err) {
		console.error('Failed to cancel download:', err);
	}
}

/**
 * Delete a downloaded file
 */
async function deleteFile(id: string) {
	try {
		await DownloadManager.deleteFile({ id });
		downloadedFiles = downloadedFiles.filter((f) => f.id !== id);
		await refreshTotalSize();
	} catch (err) {
		console.error('Failed to delete file:', err);
		throw err;
	}
}

/**
 * Delete all downloaded files
 */
async function deleteAllFiles() {
	try {
		await DownloadManager.deleteAllFiles();
		downloadedFiles = [];
		await refreshTotalSize();
	} catch (err) {
		console.error('Failed to delete all files:', err);
		throw err;
	}
}

/**
 * Pause all downloads in the queue
 */
async function pauseAllDownloads() {
	try {
		const result = await DownloadManager.pauseAllDownloads();
		queueStatus = { ...queueStatus, isQueuePaused: result.isQueuePaused };
		// Update all active downloads status to paused
		activeDownloads = activeDownloads.map((d) => ({
			...d,
			status: d.status === 'downloading' ? 'paused' : d.status
		}));
	} catch (err) {
		console.error('Failed to pause all downloads:', err);
	}
}

/**
 * Resume all downloads in the queue
 */
async function resumeAllDownloads() {
	try {
		const result = await DownloadManager.resumeAllDownloads();
		queueStatus = { ...queueStatus, isQueuePaused: result.isQueuePaused };
		// Refresh to get accurate status
		await refreshDownloads();
	} catch (err) {
		console.error('Failed to resume all downloads:', err);
	}
}

/**
 * Check if a download with given linkId and postId already exists
 */
function isAlreadyDownloading(linkId: number, postId: number, isTrailer: boolean): boolean {
	return activeDownloads.some(
		(d) => d.linkId === linkId && d.postId === postId && d.isTrailer === isTrailer
	);
}

/**
 * Check if a file is already downloaded
 */
function isAlreadyDownloaded(linkId: number, postId: number, isTrailer: boolean): boolean {
	return downloadedFiles.some(
		(f) => f.linkId === linkId && f.postId === postId && f.isTrailer === isTrailer && !f.isRemoved
	);
}

/**
 * Get the download status for a specific item
 */
function getDownloadStatus(
	linkId: number,
	postId: number,
	isTrailer: boolean
): 'none' | 'downloading' | 'paused' | 'completed' {
	// Check if already downloaded
	const downloaded = downloadedFiles.find(
		(f) => f.linkId === linkId && f.postId === postId && f.isTrailer === isTrailer && !f.isRemoved
	);
	if (downloaded) return 'completed';

	// Check active downloads
	const active = activeDownloads.find(
		(d) => d.linkId === linkId && d.postId === postId && d.isTrailer === isTrailer
	);
	if (active) {
		if (active.status === 'paused') return 'paused';
		return 'downloading';
	}

	return 'none';
}

/**
 * Get the local file path for playback
 */
async function getLocalFilePath(id: string) {
	return await DownloadManager.getLocalFilePath({ id });
}

/**
 * Check if file exists
 */
async function checkFileExists(id: string) {
	const result = await DownloadManager.checkFileExists({ id });
	if (!result.exists) {
		// Update local state if file was removed
		downloadedFiles = downloadedFiles.filter((f) => f.id !== id);
	}
	return result;
}

// Export the store
export const downloadStore = {
	// State (getters)
	get activeDownloads() {
		return activeDownloads;
	},
	get downloadedFiles() {
		return downloadedFiles;
	},
	get totalDownloadedSize() {
		return totalDownloadedSize;
	},
	get isLoading() {
		return isLoading;
	},
	get error() {
		return error;
	},
	get queueStatus() {
		return queueStatus;
	},
	get isQueuePaused() {
		return queueStatus.isQueuePaused;
	},

	// Actions
	initialize,
	cleanup,
	refreshDownloads,
	refreshDownloadedFiles,
	refreshTotalSize,
	refreshQueueStatus,
	startDownload,
	pauseDownload,
	resumeDownload,
	cancelDownload,
	deleteFile,
	deleteAllFiles,
	pauseAllDownloads,
	resumeAllDownloads,
	isAlreadyDownloading,
	isAlreadyDownloaded,
	getDownloadStatus,
	getLocalFilePath,
	checkFileExists
};
