import { Network, type ConnectionStatus } from '@capacitor/network';

class NetworkStore {
	public isOnline = $state(true);
	public connectionType = $state<string>('unknown');
	private initialized = false;

	async init() {
		if (this.initialized) return;
		this.initialized = true;

		try {
			// Get initial status
			const status = await Network.getStatus();
			this.updateStatus(status);

			// Listen for changes
			Network.addListener('networkStatusChange', (status) => {
				this.updateStatus(status);
			});
		} catch {
			// If Capacitor is not available (browser), assume online
			console.log('Network plugin not available, assuming online');
			this.isOnline = true;
			this.connectionType = 'unknown';
		}
	}

	private updateStatus(status: ConnectionStatus) {
		this.isOnline = status.connected;
		this.connectionType = status.connectionType;
	}
}

export const networkStore = new NetworkStore();
