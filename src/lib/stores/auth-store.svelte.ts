import { Preferences } from '@capacitor/preferences';

const AUTH_TOKEN_KEY = 'ios_auth_key';

class AuthStore {
	public token = $state<string | null>(null);
	public isInitialized = $state(false);
	private initialized = false;

	/**
	 * Initialize the auth store by loading the token from preferences
	 */
	async init() {
		if (this.initialized) return;
		this.initialized = true;

		try {
			const result = await Preferences.get({ key: AUTH_TOKEN_KEY });
			this.token = result.value;
			this.isInitialized = true;
			console.log('Auth store initialized, token exists:', !!this.token);
		} catch (error) {
			console.error('Failed to initialize auth store:', error);
			this.isInitialized = true;
		}
	}

	/**
	 * Save a new auth token to preferences
	 * @param token - The auth token to save
	 */
	async setToken(token: string) {
		try {
			await Preferences.set({
				key: AUTH_TOKEN_KEY,
				value: token
			});
			this.token = token;
			console.log('Auth token saved successfully');
		} catch (error) {
			console.error('Failed to save auth token:', error);
		}
	}

	/**
	 * Clear the stored auth token
	 */
	async clearToken() {
		try {
			await Preferences.remove({ key: AUTH_TOKEN_KEY });
			this.token = null;
			console.log('Auth token cleared');
		} catch (error) {
			console.error('Failed to clear auth token:', error);
		}
	}

	/**
	 * Get the current token value
	 * If not initialized, tries to load it first
	 */
	async getToken(): Promise<string | null> {
		if (!this.initialized) {
			await this.init();
		}
		return this.token;
	}

	/**
	 * Check if a token exists
	 */
	get hasToken(): boolean {
		return !!this.token;
	}
}

export const authStore = new AuthStore();
