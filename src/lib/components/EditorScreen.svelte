<script lang="ts">
	type ImgDim = {
		width: number;
		height: number;
	};

	let {
		imgPath,
		filePath,
		imgSize,
		scale,
		flipX,
		flipY,
		setScale,
		setFlipX,
		setFlipY,
		setImageDIM,
		handleImageDefaultSize,
		setScreen
	}: {
		imgPath: string | null;
		filePath: string | null;
		imgSize: ImgDim;
		scale: number;
		flipX: boolean;
		flipY: boolean;
		setScale: (val: number) => void;
		setFlipX: (val: boolean) => void;
		setFlipY: (val: boolean) => void;
		setImageDIM: (dim: ImgDim) => void;
		handleImageDefaultSize: (e: Event) => void;
		setScreen: () => void;
	} = $props();

	let inputScale = $state(scale);

	// keep local input in sync when external scale changes
	$effect(() => {
		if (scale !== inputScale) inputScale = scale;
	});

	function applyScale() {
		setScale(inputScale);
	}

	function toggleFlipX() {
		setFlipX(!flipX);
	}

	function toggleFlipY() {
		setFlipY(!flipY);
	}
</script>

<div class="editor-screen">
	<div class="top-panel">
		{#if filePath}
			<p class="file-path">File: {filePath}</p>
		{/if}
	</div>

	<div class="main-editor">
		<div class="button-panel">
			<label for="scale">Scale</label>
			<input
				id="scale"
				type="number"
				min="0.1"
				step="0.1"
				bind:value={inputScale}
				onchange={applyScale}
			/>
			<button onclick={applyScale}>Apply</button>
			<hr />
			<button onclick={toggleFlipX} class:active={flipX}>Flip H</button>
			<button onclick={toggleFlipY} class:active={flipY}>Flip V</button>
		</div>

		<div class="image-viewer">
			{#if imgPath}
				<img
					src={imgPath}
					class="image"
					onload={handleImageDefaultSize}
					draggable="false"
					alt="Loaded"
					style="transform: scale({flipX ? -scale : scale}, {flipY ? -scale : scale});"
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.editor-screen {
		height: 100%;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-rows: 8% auto;
	}

	.top-panel {
		text-align: center;
	}

	.file-path {
		color: rgb(246, 228, 206);
	}

	.main-editor {
		height: 100%;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-columns: 10% auto;
	}

	.image-viewer {
		position: relative;
		width: auto;
		flex: none;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 0;
		overflow: auto;
		margin: 0.5rem;
		text-align: center;
		border: thick solid #305e49;
		border-radius: 12px;
	}

	img {
		border-radius: 12px;
		margin-bottom: 1rem;
		image-rendering: pixelated;
		transform-origin: center center;
	}

	.button-panel {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5rem;
	}

	.button-panel input[type="number"] {
		width: 60px;
		text-align: center;
	}

	.button-panel hr {
		width: 80%;
		border: none;
		border-top: 1px solid #ccc;
		margin: 0.5rem 0;
	}

	.button-panel button.active {
		background-color: #4b8fa2;
		color: white;
	}

	button {
		width: 50%;
		height: 5%;
		margin: 6px 10px;
		padding: 8px;
		cursor: pointer;
		border: none;
		border-radius: 14px;
		background-color: rgb(111, 181, 158);
	}
</style>
