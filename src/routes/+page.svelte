<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LaunchScreen from '$lib/components/LaunchScreen.svelte';
	import EditorScreen from '$lib/components/EditorScreen.svelte';

	type state = 'hitboxEditorScreen' | 'launchScreen' | 'formatJsonScreen';

	let loadLaunchScreen = $state<state>('launchScreen');
	let imgPath = $state<string | null>(null);
	let filePath = $state<string | null>(null);

	async function handleOpen() {
		const newFilePath = await window.electronAPI.openImageDialog();
		if (!newFilePath) return;

		filePath = newFilePath;
		imgPath = window.electronAPI.loadImage(newFilePath);
	}

	function handleClose() {
		imgPath = null;
		filePath = null;
	}

	function setScreen() {
		loadLaunchScreen === 'hitboxEditorScreen'
			? (loadLaunchScreen = 'launchScreen')
			: (loadLaunchScreen = 'hitboxEditorScreen');
	}

	function goHome() {
		loadLaunchScreen = 'launchScreen';
	}

	function goHitboxEditor() {
		loadLaunchScreen = 'hitboxEditorScreen';
	}

	$effect(() => {
		const isLaunchScreen = loadLaunchScreen === 'launchScreen';
		(window as any).setBackgroundAnimation?.(isLaunchScreen);
		window.electronAPI.setMenuVisible(!isLaunchScreen);
	});

	onMount(() => {
		window.electronAPI.onAddImage(handleOpen);
		window.electronAPI.onRemoveImage(handleClose);
		window.electronAPI.onGoHome(goHome);
		window.electronAPI.onGoHitboxEditor(goHitboxEditor);

		window.electronAPI.setMenuVisible(false);
	});

	onDestroy(() => {
		window.electronAPI.offAddImage(handleOpen);
		window.electronAPI.offRemoveImage(handleClose);
		window.electronAPI.offGoHome(goHome);
		window.electronAPI.offGoHitboxEditor(goHitboxEditor);
	});
</script>

<svelte:head>
	<title>Hitboxer</title>
</svelte:head>

{#if loadLaunchScreen == 'launchScreen'}
	<LaunchScreen {imgPath} {filePath} {handleOpen} {handleClose} {setScreen} />
{:else if loadLaunchScreen == 'hitboxEditorScreen'}
	<EditorScreen {imgPath} {filePath} {setScreen} />
{:else if loadLaunchScreen == 'formatJsonScreen'}
	<!-- Format JSON Screen Component Here -->
{/if}
