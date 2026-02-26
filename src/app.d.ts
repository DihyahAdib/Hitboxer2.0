// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	interface Window {
		electronAPI: {
			openImageDialog: () => Promise<string | null>;

			loadImage: (filePath: string) => string;

			onAddImage: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			offAddImage: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			onRemoveImage: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			offRemoveImage: (callback: (event: unknown, ...args: unknown[]) => void) => void;

			onGoHome: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			offGoHome: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			onGoHitboxEditor: (callback: (event: unknown, ...args: unknown[]) => void) => void;
			offGoHitboxEditor: (callback: (event: unknown, ...args: unknown[]) => void) => void;

			toggleFullscreen: () => void;
			onFullscreenChanged: (callback: (event: unknown, isFullscreen: boolean) => void) => void;
			offFullscreenChanged: (callback: (event: unknown, isFullscreen: boolean) => void) => void;

			setMenuVisible: (visible: boolean) => void;
		};
	}
}

export { };
