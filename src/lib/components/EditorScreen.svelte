<script lang="ts">
	let { filePath, setScreen }: { filePath: string | null; setScreen: () => void } = $props();
</script>

<div class="editor-screen">
	<button aria-label="button" onclick={setScreen}></button>

	{#if filePath}
		<p>File: {filePath}</p>
	{/if}
</div>

<style>
	.editor-screen {
		margin-top: 2rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
