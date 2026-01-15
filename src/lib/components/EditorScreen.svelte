<script lang="ts">
	let {
		imgPath,
		filePath,
		setScreen
	}: { imgPath: string | null; filePath: string | null; setScreen: () => void } = $props();
</script>

<div class="editor-screen">
	<div class="top-panel">
		{#if filePath}
			<p>File: {filePath}</p>
		{/if}
	</div>

	<div class="main-editor">
		<div class="button-panel">
			<button></button>
			<button></button>
		</div>

		{#if imgPath}
			<div class="image-viewer">
				<img src={imgPath} alt="Loaded" />
			</div>
		{/if}
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

	.main-editor {
		height: 100%;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-columns: 8% auto;
	}

	.image-viewer {
		margin-top: 2rem;
		text-align: center;
	}

	img {
		border-radius: 12px;
		margin-bottom: 1rem;
		image-rendering: pixelated;
	}

	.button-panel {
		display: flex;
		flex-direction: column;
	}
</style>
