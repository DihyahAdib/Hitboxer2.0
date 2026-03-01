<!-- src/lib/components/LaunchScreen.svelte -->
<script lang="ts">
	import { Upload, Trash2, Image, Github, Linkedin, Youtube } from 'lucide-svelte';

	let {
		imgPath,
		filePath,
		handleOpen,
		handleClose,
		setScreen
	}: {
		imgPath: string | null;
		filePath: string | null;
		handleOpen: () => void;
		handleClose: () => void;
		setScreen: () => void;
	} = $props();
</script>

<div class="launch-screen">
	<div class="content">
		<h1 class="title">Hitboxer 2.0</h1>

		<div class="button-group">
			<button class="primary-btn" onclick={handleOpen}>
				<Upload size={20} />
				Open Image
			</button>

			<button class="secondary-btn" onclick={handleClose}>
				<Trash2 size={20} />
				Remove Image
			</button>
		</div>

		{#if imgPath}
			<div class="image-viewer">
				<img src={imgPath} alt="Loaded" />
				<button class="editor-btn" onclick={setScreen}> Go to Editor → </button>
			</div>
		{:else}
			<div class="empty-state">
				<Image size={64} strokeWidth={1.5} />
				<p>No image loaded</p>
				<p class="hint">Open an image to get started</p>
			</div>
		{/if}
	</div>

	<div class="content-bar">
		<div class="socials">
			<a
				href="https://github.com/DihyahAdib/Hitboxer2.0"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link"
				title="GitHub"
			>
				<Github size={20} />
			</a>
			<a
				href="https://www.linkedin.com/in/dihyah-adib-29b767281/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link"
				title="LinkedIn"
			>
				<Linkedin size={20} />
			</a>
			<a
				href="https://www.youtube.com/@SeamlessError"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link"
				title="YouTube"
			>
				<Youtube size={20} />
			</a>
		</div>
		{#if filePath}
			<div class="filepath-wrap">
				<p class="filepath">File: {filePath}</p>
			</div>
		{:else}
			<div class="filepath-wrap">
				<p class="filepath muted">No Image Selected...</p>
			</div>
		{/if}
		<span class="version">Version: 2.5.1x (Pre-Alpha)</span>
	</div>
</div>

<style>
	.launch-screen {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		position: relative;
	}

	.content {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		padding: 3rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		min-width: 500px;
		max-width: 700px;
	}

	.title {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 2rem 0;
		background: linear-gradient(135deg, #305e49 0%, #4b8fa2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-align: center;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		padding: 14px 24px;
		border: none;
		border-radius: 12px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		flex: 1;
	}

	.primary-btn {
		background: linear-gradient(135deg, #305e49 0%, #4b8fa2 100%);
		color: white;
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(48, 94, 73, 0.4);
	}

	.secondary-btn {
		background: #f1f5f9;
		color: #334155;
	}

	.secondary-btn:hover {
		background: #e2e8f0;
		transform: translateY(-2px);
	}

	.image-viewer {
		margin-top: 2rem;
		text-align: center;
	}

	img {
		width: 90%;
		border-radius: 12px;
		box-shadow: 1px 1px 10px 10px #3341555c;
		margin-bottom: 1rem;
		image-rendering: pixelated;
	}

	.editor-btn {
		background: linear-gradient(135deg, #305e49 0%, #4b8fa2 100%);
		color: white;
		width: 100%;
	}

	.editor-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(48, 94, 73, 0.4);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		color: #64748b;
	}

	.empty-state :global(svg) {
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0.5rem 0;
		font-size: 1.1rem;
	}

	.hint {
		font-size: 0.9rem !important;
		opacity: 0.7;
	}

	.content-bar {
		position: absolute;
		bottom: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 95%;
		max-width: 900px;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	.socials {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: #f1f5f9;
		color: #334155;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		text-decoration: none;
	}

	.social-link:hover {
		background: linear-gradient(135deg, #305e49 0%, #4b8fa2 100%);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(48, 94, 73, 0.3);
	}

	.version {
		font-size: 0.875rem;
		color: #64748b;
		font-weight: 500;
	}

	.filepath {
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;

		/* bilateral fade */
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 12%,
			black 88%,
			transparent 100%
		);
		mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);

		font-size: 0.875rem;
		color: #64748b;
		font-weight: 500;
	}

	.filepath.muted {
		opacity: 0.7;
	}
</style>
