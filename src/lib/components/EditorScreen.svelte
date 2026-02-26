<script lang="ts">
	import { FlipHorizontal, FlipVertical } from 'lucide-svelte';

	let {
		imgPath,
		scale,
		flipX,
		flipY,
		setScale,
		setFlipX,
		setFlipY,
		handleImageDefaultSize,
		setScreen
	} = $props();

	let inputScale = $state(1);

	$effect(() => {
		inputScale = scale;
	});

	$effect(() => {
		setScale(inputScale);
	});
</script>

<div class="editor-root">
	<div class="toolbar">
		<button onclick={setScreen}>←</button>

		<label for="scale-input">Scale</label>
		<input
			id="scale-input"
			type="number"
			step="0.1"
			min="0.1"
			bind:value={inputScale}
		/>

		<button class:active={flipX} onclick={() => setFlipX(!flipX)}>
			<FlipHorizontal size={18} />
		</button>

		<button class:active={flipY} onclick={() => setFlipY(!flipY)}>
			<FlipVertical size={18} />
		</button>
	</div>

	<div class="canvas">
		{#if imgPath}
			<div
				class="image-wrapper"
				style="
					transform:
						scale({flipX ? -scale : scale}, {flipY ? -scale : scale});
				"
			>
				<img
					src={imgPath}
					alt="Selected sprite asset"
					onload={handleImageDefaultSize}
					draggable="false"
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.editor-root {
		display: grid;
		grid-template-columns: 80px 1fr;
		height: 100vh;
		background: #0f172a;
		color: white;
		overflow: hidden;
	}

	.toolbar {
		background: #111827;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0.5rem;
		gap: 0.75rem;
		border-right: 1px solid #1f2937;
		box-sizing: border-box;
	}

	.toolbar input {
		width: 60px;
		max-width: 100%;
		box-sizing: border-box;
		text-align: center;
	}

	.toolbar button {
		background: #1f2937;
		border: none;
		color: white;
		border-radius: 10px;
		width: 40px;
		height: 40px;
		cursor: pointer;
	}

	.toolbar button.active {
		background: linear-gradient(135deg, #305e49, #4b8fa2);
	}

	.canvas {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: auto;
		position: relative;
	}

	.image-wrapper {
		transform-origin: center center;
		display: inline-block;
	}

	img {
		display: block;
		image-rendering: pixelated;
		user-select: none;
		pointer-events: none;
	}
</style>