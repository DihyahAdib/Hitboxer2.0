<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LaunchScreen from '$lib/components/LaunchScreen.svelte';
	import EditorScreen from '$lib/components/EditorScreen.svelte';

	type state = 'hitboxEditorScreen' | 'launchScreen' | 'formatJsonScreen';

	type ImgDim = {
		width: number;
		height: number;
	};

	let loadLaunchScreen = $state<state>('launchScreen');

	let imgPath = $state<string | null>(null);
	let filePath = $state<string | null>(null);

	let imgSize = $state<ImgDim>({
		width: 0,
		height: 0
	});

	let scale = $state<number>(1);
	let flipX = $state<boolean>(false);
	let flipY = $state<boolean>(false);

	async function handleOpen() {
		const newFilePath = await window.electronAPI.openImageDialog();
		if (!newFilePath) return;

		filePath = newFilePath;
		imgPath = window.electronAPI.loadImage(newFilePath);
		// reset transformation state
		scale = 1;
		flipX = false;
		flipY = false;
	}

	function handleClose() {
		imgPath = null;
		filePath = null;

		imgSize.width = 0;
		imgSize.height = 0;

		scale = 1;
		flipX = false;
		flipY = false;
	}

	function handleImageDefaultSize(e: Event) {
		const img = e.currentTarget as HTMLImageElement;

		setImageDIM({
			width: img.naturalWidth,
			height: img.naturalHeight
		});
	}

	function setImageDIM({ width, height }: ImgDim) {
		imgSize.width = width;
		imgSize.height = height;
	}

function setScale(val: number) {
	scale = val;
}

function setFlipX(val: boolean) {
	flipX = val;
}

function setFlipY(val: boolean) {
	flipY = val;
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
	<EditorScreen
		{imgPath}
		{filePath}
		{imgSize}
		{scale}
		{flipX}
		{flipY}
		{setScreen}
		{setImageDIM}
		{handleImageDefaultSize}
		{setScale}
		{setFlipX}
		{setFlipY}
	/>
{:else if loadLaunchScreen == 'formatJsonScreen'}
	<!-- Format JSON Screen Component Here -->
{/if}
