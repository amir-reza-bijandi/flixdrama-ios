import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for Capacitor app compatibility
		// Configured as true SPA - single index.html with client-side routing
		adapter: adapter({
			// Output to 'build' directory
			pages: 'build',
			assets: 'build',
			// All routes fall back to index.html for SPA behavior
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		// Path configuration for bundle:// custom scheme
		paths: {
			base: '',
			assets: ''
		},
		// Disable prerendering - use SPA mode with client-side routing only
		// This ensures smooth page transitions within the Capacitor WebView
		prerender: {
			entries: [], // Don't prerender any pages
			handleUnseenRoutes: 'ignore' // Ignore routes marked prerenderable in page files
		}
	}
};

export default config;
