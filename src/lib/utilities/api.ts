import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { HomeResponse, MediaResponse, ArchiveResponse } from '$lib/types/api';
import { authStore } from '$lib/stores/auth-store.svelte';

// API Configuration
const API_BASE_URL = PUBLIC_API_BASE_URL;

// Default headers for API requests
const DEFAULT_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
	Accept: 'application/json'
};

/**
 * Ensure auth store is initialized and get auth headers if token is available
 */
async function getAuthHeaders(): Promise<HeadersInit> {
	// Ensure auth store is initialized before checking token
	if (!authStore.isInitialized) {
		await authStore.init();
	}

	if (authStore.token) {
		return {
			Authorization: `Bearer ${authStore.token}`
		};
	}
	return {};
}

// Request options type
type RequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	headers?: HeadersInit;
	body?: unknown;
	timeout?: number;
};

// API error class for better error handling
export class ApiRequestError extends Error {
	status?: number;
	constructor(message: string, status?: number) {
		super(message);
		this.name = 'ApiRequestError';
		this.status = status;
	}
}

/**
 * Global API request function
 * @param endpoint - API endpoint (relative to base URL)
 * @param options - Request options
 * @returns Promise with the response data
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
	const { method = 'GET', headers = {}, body, timeout = 30000 } = options;

	// Build the full URL
	const url = `${API_BASE_URL}${endpoint}`;

	// Create abort controller for timeout
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		// Get auth headers (this ensures auth store is initialized)
		const authHeaders = await getAuthHeaders();

		const response = await fetch(url, {
			method,
			headers: {
				...DEFAULT_HEADERS,
				...authHeaders,
				...headers
			},
			body: body ? JSON.stringify(body) : undefined,
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		// Check if response is ok (status 200-299)
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new ApiRequestError(
				errorData?.message || `HTTP error! status: ${response.status}`,
				response.status
			);
		}

		// Parse JSON response
		const data = await response.json();
		return data as T;
	} catch (error) {
		clearTimeout(timeoutId);

		// Handle abort error (timeout)
		if (error instanceof Error && error.name === 'AbortError') {
			throw new ApiRequestError('Request timeout', 408);
		}

		// Handle network errors
		if (error instanceof TypeError && error.message === 'Failed to fetch') {
			throw new ApiRequestError('Network error - please check your connection');
		}

		// Re-throw ApiRequestError
		if (error instanceof ApiRequestError) {
			throw error;
		}

		// Handle other errors
		throw new ApiRequestError(error instanceof Error ? error.message : 'An unknown error occurred');
	}
}

/**
 * Helper function for GET requests
 */
export async function get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
	return apiRequest<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * Helper function for POST requests
 */
export async function post<T>(
	endpoint: string,
	body?: unknown,
	options?: Omit<RequestOptions, 'method' | 'body'>
) {
	return apiRequest<T>(endpoint, { ...options, method: 'POST', body });
}

/**
 * Helper function for PUT requests
 */
export async function put<T>(
	endpoint: string,
	body?: unknown,
	options?: Omit<RequestOptions, 'method' | 'body'>
) {
	return apiRequest<T>(endpoint, { ...options, method: 'PUT', body });
}

/**
 * Helper function for DELETE requests
 */
export async function del<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
	return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
}

// ============================================
// API Endpoints
// ============================================

/**
 * Home API - Fetches home page data
 */
export const homeApi = {
	/**
	 * Get EU home page data
	 */
	getHome: () => get<HomeResponse>('eu/home')
};

/**
 * Media API - Fetches media details and related content
 */
export const mediaApi = {
	/**
	 * Get media details by ID
	 * @param id - Media ID
	 */
	getMedia: (id: number) => get<MediaResponse>(`eu/post/${id}`)
};

/**
 * Archive API - Fetches paginated archive data
 */
export const archiveApi = {
	/**
	 * Get archive data with pagination
	 * @param page - Page number
	 * @param mediaType - Media type (tv or movie)
	 * @param itemsPerPage - Number of items per page
	 * @param typeId - Type ID for filtering
	 */
	getArchive: (page: number, mediaType: string, itemsPerPage: number, typeId: number) =>
		get<ArchiveResponse>(
			`eu/archive?page=${page}&media_type=${mediaType}&items_per_page=${itemsPerPage}&type_id=${typeId}`
		)
};

/**
 * Feedback API - Sends user feedback
 */
export const feedbackApi = {
	/**
	 * Send feedback to the server
	 * @param text - Feedback text
	 */
	sendFeedback: (text: string) => post<{ success: boolean }>('eu/send_feedback', { text })
};

// Export all API modules
export const api = {
	home: homeApi,
	media: mediaApi,
	archive: archiveApi,
	feedback: feedbackApi
};
