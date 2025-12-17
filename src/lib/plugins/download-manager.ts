import { registerPlugin } from '@capacitor/core';

export interface DownloadOptions {
	id?: string;
	linkId: number;
	postId: number;
	name: string;
	poster: string;
	episodeNumber: number;
	saveDir: string;
	saveFileName: string;
	downloadUrl: string;
	subtitleUrl?: string;
	saveSubName?: string;
	qualityName: string;
	qualityTag: string;
	episodePoster: string;
	duration: number;
	isTrailer: boolean;
}

export interface DownloadInfo extends DownloadOptions {
	isDone: boolean;
	isRemoved: boolean;
	progress?: number;
	downloadedBytes?: number;
	totalBytes?: number;
	speed?: number;
	status?: string;
}

export interface DownloadedFile extends DownloadInfo {
	localPath: string;
	fileSize?: number;
	localPosterPath?: string;
	localEpisodePosterPath?: string;
	localSubtitlePath?: string;
}

export interface DownloadProgressEvent {
	id: string;
	progress: number;
	downloadedBytes: number;
	totalBytes: number;
	speed: number;
	status: string;
}

export interface DownloadCompleteEvent {
	id: string;
	success: boolean;
	filePath?: string;
}

export type DownloadStatus =
	| 'waiting'
	| 'downloading'
	| 'paused'
	| 'cancelled'
	| 'failed'
	| 'removed'
	| 'completed'
	| 'pausing'
	| 'cancelling'
	| 'removing'
	| 'unknown';

export interface DownloadManagerPlugin {
	/**
	 * Start a new download
	 */
	startDownload(options: DownloadOptions): Promise<{ id: string; status: string }>;

	/**
	 * Pause a download
	 */
	pauseDownload(options: { id: string }): Promise<{ status: string }>;

	/**
	 * Resume a paused download
	 */
	resumeDownload(options: { id: string }): Promise<{ status: string }>;

	/**
	 * Cancel a download
	 */
	cancelDownload(options: { id: string }): Promise<{ status: string }>;

	/**
	 * Get the progress of a specific download
	 */
	getDownloadProgress(options: { id: string }): Promise<{
		id: string;
		progress: number;
		downloadedBytes?: number;
		totalBytes?: number;
		speed?: number;
		status: string;
	}>;

	/**
	 * Get all downloads (active and completed)
	 */
	getAllDownloads(): Promise<{ downloads: DownloadInfo[] }>;

	/**
	 * Delete a download and its associated files
	 */
	deleteDownload(options: { id: string }): Promise<{ status: string }>;

	/**
	 * Get all completed downloaded files
	 */
	getDownloadedFiles(options?: { isTrailer?: boolean }): Promise<{ files: DownloadedFile[] }>;

	/**
	 * Delete a downloaded file
	 */
	deleteFile(options: { id: string }): Promise<{ status: string }>;

	/**
	 * Get total size of all downloaded files
	 */
	getTotalDownloadedSize(): Promise<{ totalSize: number; formattedSize: string }>;

	/**
	 * Delete all downloaded files
	 */
	deleteAllFiles(): Promise<{ status: string }>;

	/**
	 * Check if a file exists locally
	 */
	checkFileExists(options: { id: string }): Promise<{ exists: boolean; localPath?: string }>;

	/**
	 * Get the local file path for a download
	 */
	getLocalFilePath(options: { id: string }): Promise<{
		videoPath: string;
		subtitlePath?: string;
		exists: boolean;
	}>;

	/**
	 * Download an image file
	 */
	downloadImage(options: {
		url: string;
		saveDir: string;
		fileName: string;
	}): Promise<{ localPath: string; status: string }>;

	/**
	 * Add a listener for download progress events
	 */
	addListener(
		eventName: 'downloadProgress',
		listenerFunc: (event: DownloadProgressEvent) => void
	): Promise<{ remove: () => void }>;

	/**
	 * Add a listener for download complete events
	 */
	addListener(
		eventName: 'downloadComplete',
		listenerFunc: (event: DownloadCompleteEvent) => void
	): Promise<{ remove: () => void }>;

	/**
	 * Remove all listeners for an event
	 */
	removeAllListeners(eventName?: string): Promise<void>;
}

class DownloadManagerWeb implements DownloadManagerPlugin {
	async startDownload(_options: DownloadOptions): Promise<{ id: string; status: string }> {
		console.log('DownloadManager web fallback - startDownload', _options);
		return { id: crypto.randomUUID(), status: 'web_not_supported' };
	}

	async pauseDownload(options: { id: string }): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - pauseDownload', options);
		return { status: 'web_not_supported' };
	}

	async resumeDownload(options: { id: string }): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - resumeDownload', options);
		return { status: 'web_not_supported' };
	}

	async cancelDownload(options: { id: string }): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - cancelDownload', options);
		return { status: 'web_not_supported' };
	}

	async getDownloadProgress(options: { id: string }): Promise<{
		id: string;
		progress: number;
		status: string;
	}> {
		console.log('DownloadManager web fallback - getDownloadProgress', options);
		return { id: options.id, progress: 0, status: 'web_not_supported' };
	}

	async getAllDownloads(): Promise<{ downloads: DownloadInfo[] }> {
		console.log('DownloadManager web fallback - getAllDownloads');
		return { downloads: [] };
	}

	async deleteDownload(options: { id: string }): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - deleteDownload', options);
		return { status: 'web_not_supported' };
	}

	async getDownloadedFiles(options?: {
		isTrailer?: boolean;
	}): Promise<{ files: DownloadedFile[] }> {
		console.log('DownloadManager web fallback - getDownloadedFiles', options);
		return { files: [] };
	}

	async deleteFile(options: { id: string }): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - deleteFile', options);
		return { status: 'web_not_supported' };
	}

	async getTotalDownloadedSize(): Promise<{ totalSize: number; formattedSize: string }> {
		console.log('DownloadManager web fallback - getTotalDownloadedSize');
		return { totalSize: 0, formattedSize: '0 B' };
	}

	async deleteAllFiles(): Promise<{ status: string }> {
		console.log('DownloadManager web fallback - deleteAllFiles');
		return { status: 'web_not_supported' };
	}

	async checkFileExists(options: { id: string }): Promise<{ exists: boolean; localPath?: string }> {
		console.log('DownloadManager web fallback - checkFileExists', options);
		return { exists: false };
	}

	async getLocalFilePath(options: { id: string }): Promise<{
		videoPath: string;
		subtitlePath?: string;
		exists: boolean;
	}> {
		console.log('DownloadManager web fallback - getLocalFilePath', options);
		return { videoPath: '', exists: false };
	}

	async downloadImage(options: {
		url: string;
		saveDir: string;
		fileName: string;
	}): Promise<{ localPath: string; status: string }> {
		console.log('DownloadManager web fallback - downloadImage', options);
		return { localPath: '', status: 'web_not_supported' };
	}

	async addListener(
		eventName: 'downloadProgress',
		listenerFunc: (event: DownloadProgressEvent) => void
	): Promise<{ remove: () => void }>;
	async addListener(
		eventName: 'downloadComplete',
		listenerFunc: (event: DownloadCompleteEvent) => void
	): Promise<{ remove: () => void }>;
	async addListener(
		eventName: 'downloadProgress' | 'downloadComplete',
		listenerFunc:
			| ((event: DownloadProgressEvent) => void)
			| ((event: DownloadCompleteEvent) => void)
	): Promise<{ remove: () => void }> {
		console.log('DownloadManager web fallback - addListener', eventName, listenerFunc);
		return { remove: () => {} };
	}

	async removeAllListeners(eventName?: string): Promise<void> {
		console.log('DownloadManager web fallback - removeAllListeners', eventName);
	}
}

const DownloadManager = registerPlugin<DownloadManagerPlugin>('DownloadManager', {
	web: () => Promise.resolve(new DownloadManagerWeb())
});

export default DownloadManager;

// Helper functions for trailer downloads

/**
 * Sanitize a string for use as a directory name
 * Replaces spaces with dots and removes special characters
 */
export function sanitizeDirectoryName(name: string, isTrailer: boolean = false): string {
	let sanitized = name
		.replace(/\s+/g, '.') // Replace spaces with dots
		.replace(/[^a-zA-Z0-9.\-_]/g, '') // Remove special characters
		.replace(/\.+/g, '.') // Replace multiple dots with single dot
		.replace(/^\.+|\.+$/g, ''); // Remove leading/trailing dots

	if (isTrailer) {
		sanitized += '.Trailer';
	}

	return sanitized;
}

/**
 * Get the duration of a video from its URL
 * Note: This only works for some video URLs that support range requests
 */
export async function getVideoDuration(url: string): Promise<number> {
	return new Promise((resolve) => {
		const video = document.createElement('video');
		video.preload = 'metadata';

		video.onloadedmetadata = () => {
			const duration = Math.floor(video.duration);
			video.src = '';
			resolve(duration);
		};

		video.onerror = () => {
			resolve(0);
		};

		// Set a timeout in case metadata loading takes too long
		setTimeout(() => {
			if (video.duration) {
				resolve(Math.floor(video.duration));
			} else {
				resolve(0);
			}
			video.src = '';
		}, 10000);

		video.src = url;
	});
}

/**
 * Prepare download options for a trailer
 */
export interface TrailerDownloadData {
	id: number; // details.id (used as linkId and postId)
	name: string; // details.name
	banner: string; // details.banner (used as poster and episodePoster)
	trailerLink: string; // trailer.link
	trailerSubtitle?: string; // trailer.subtitle
}

export async function prepareTrailerDownload(data: TrailerDownloadData): Promise<DownloadOptions> {
	const saveDir = sanitizeDirectoryName(data.name, true);

	// Try to get the duration from the video URL
	let duration = 0;
	try {
		duration = await getVideoDuration(data.trailerLink);
	} catch (error) {
		console.warn('Could not get video duration:', error);
	}

	return {
		linkId: data.id,
		postId: data.id,
		name: data.name,
		poster: data.banner,
		episodeNumber: 1,
		saveDir: saveDir,
		saveFileName: 'trailer.mp4',
		downloadUrl: data.trailerLink,
		subtitleUrl: data.trailerSubtitle || undefined,
		saveSubName: data.trailerSubtitle ? 'trailer.sub.srt' : undefined,
		qualityName: '720p',
		qualityTag: 'HD',
		episodePoster: data.banner,
		duration: duration,
		isTrailer: true
	};
}
