import { registerPlugin } from '@capacitor/core';

export interface VideoPlayerPlugin {
	/**
	 * Play a video with optional subtitle support
	 * @param options - Video playback options
	 * @returns Promise that resolves when player is opened
	 */
	playVideo(options: PlayVideoOptions): Promise<void>;
}

export interface PlayVideoOptions {
	/**
	 * URL of the video to play
	 */
	url: string;

	/**
	 * Optional subtitle URL (supports .srt, .vtt formats)
	 */
	subtitleUrl?: string;

	/**
	 * Optional video title
	 */
	title?: string;
}

class VideoPlayerWeb implements VideoPlayerPlugin {
	async playVideo(options: PlayVideoOptions): Promise<void> {
		// Web fallback: open video in new tab
		console.log('VideoPlayer web fallback - opening video in new tab', options);
	}
}

const VideoPlayer = registerPlugin<VideoPlayerPlugin>('VideoPlayer', {
	web: () => Promise.resolve(new VideoPlayerWeb())
});

export default VideoPlayer;
