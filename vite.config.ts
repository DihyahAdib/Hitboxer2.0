import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// specify a custom port to avoid conflicts
	server: {
		port: 5174
	}
});
