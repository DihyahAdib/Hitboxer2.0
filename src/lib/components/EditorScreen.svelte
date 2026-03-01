<script lang="ts">
	import {
		FlipHorizontal,
		FlipVertical,
		Undo2,
		CopyPlus,
		MoveLeft,
		SquarePlus,
		SquareMinus,
		SquareDashed,
		Settings,
		X,
		Ruler,
		PanelLeftDashed,
		PanelTopDashed,
		Grid3x3
	} from 'lucide-svelte';

	let {
		imgPath,
		filePath,
		scale,
		flipX,
		flipY,
		setScale,
		setFlipX,
		setFlipY,
		handleImageDefaultSize,
		setScreen
	} = $props();

	type Offset = { x: number; y: number };
	type DragTarget = 'modal' | 'hitbox';

	type HitboxProps = {
		id: number;
		origin_x: number;
		origin_y: number;
		width: number;
		height: number;
	};

	const hitboxAttributes = {
		id: 1,
		x: 200,
		y: 200,
		width: 150,
		height: 150
	};

	const rulerSettingAttributes = {
		width: 80,
		height: 80
	};

	const ANIMATION_DURATION = 300;
	const DRAG_THRESHOLD = 5;

	let inputScale = $state(1);
	let tooltipMessage = $state<string | null>(null);
	let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

	let settingsOpen = $state(false);
	let gridSize = $state(10);
	let gridOn = $state(false);
	let outlineOn = $state(false);
	let editorRulerOn = $state(false);
	let crosshairRulerTopOn = $state(false);
	let crosshairRulerLeftOn = $state(false);

	let rulerHWidth = $state(rulerSettingAttributes.width);
	let rulerVHeight = $state(rulerSettingAttributes.height);
	let cursorX = $state(0);
	let cursorY = $state(0);

	let modifiedValue = $state(2);

	let hitboxes = $state<HitboxProps[]>([]);
	let hitboxX = $state<number>(hitboxAttributes.x);
	let hitboxY = $state<number>(hitboxAttributes.y);
	let hitboxWidth = $state<number>(hitboxAttributes.width);
	let hitboxHeight = $state<number>(hitboxAttributes.height);
	let exitingHitboxIds = $state<number[]>([]);
	let enteringHitboxIds = $state<number[]>([]);

	let isDragging = $state<'modal' | 'hitbox' | null>(null);
	let draggingHitboxId = $state<number | null>(null);

	let modalOffset = $state<Offset>({ x: 0, y: 0 });
	let modalPosX = $state<number>(400);
	let modalPosY = $state<number>(200);

	let hitboxOffset = $state<Offset>({ x: 0, y: 0 });
	let currentHitboxModal = $state<number | null>(null);

	let isDragAction = $state(false);
	let dragStartRef: { x: number; y: number } | null = null;

	function handleHitboxMouseDown(e: MouseEvent, id: number) {
		dragStartRef = { x: e.clientX, y: e.clientY };
		isDragAction = false;
		draggingHitboxId = id;
		startDrag(e, 'hitbox');
	}

	function handleHitboxMouseMove(e: MouseEvent) {
		if (!dragStartRef) return;
		const dx = e.clientX - dragStartRef.x;
		const dy = e.clientY - dragStartRef.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		if (dist > DRAG_THRESHOLD && !isDragAction) {
			isDragAction = true;
		}
	}

	function handleHitboxMouseUp(id: number) {
		stopDrag();
		dragStartRef = null;
		if (!isDragAction) {
			currentHitboxModal = id;
		}
	}

	function startDrag(e: MouseEvent, target: DragTarget) {
		e.preventDefault();
		e.stopPropagation();

		isDragging = target;

		if (target === 'modal') {
			const draggableElement = (e.currentTarget as HTMLElement).parentElement;
			if (!draggableElement) return;
			const rect = draggableElement.getBoundingClientRect();
			modalOffset = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			};
			return;
		}

		if (target === 'hitbox') {
			const editorContainer = document.querySelector('.canvas');
			if (!editorContainer) return;
			const editorRect = editorContainer.getBoundingClientRect();

			const mouseXRelativeToEditor = e.clientX - editorRect.left;
			const mouseYRelativeToEditor = e.clientY - editorRect.top;

			const hitboxId = (e.currentTarget as HTMLElement).dataset.id
				? Number((e.currentTarget as HTMLElement).dataset.id)
				: draggingHitboxId;

			if (hitboxId == null) return;

			const currentHitbox = hitboxes.find((h) => h.id === hitboxId);
			if (!currentHitbox) return;

			hitboxOffset = {
				x: mouseXRelativeToEditor - currentHitbox.origin_x,
				y: mouseYRelativeToEditor - currentHitbox.origin_y
			};
			draggingHitboxId = hitboxId;
		}
	}

	function stopDrag() {
		isDragging = null;
		draggingHitboxId = null;
	}

	function removeOneHitbox(id: number) {
		exitingHitboxIds = [...exitingHitboxIds, id];
		setTimeout(() => {
			hitboxes = hitboxes.filter((w) => w.id !== id);
			exitingHitboxIds = exitingHitboxIds.filter((exitingId) => exitingId !== id);
		}, ANIMATION_DURATION);
	}

	function resetAttributes() {
		hitboxX = hitboxAttributes.x;
		hitboxY = hitboxAttributes.y;
		hitboxWidth = hitboxAttributes.width;
		hitboxHeight = hitboxAttributes.height;
	}

	function removeAllHitboxes() {
		hitboxes = [];
		resetAttributes();
	}

	function addOneHitbox() {
		const usedIds = hitboxes.map((h) => h.id).sort((a, b) => a - b);
		let newId = 1;
		for (let i = 0; i < usedIds.length; i++) {
			if (usedIds[i] !== i + 1) {
				newId = i + 1;
				break;
			}
			newId = usedIds.length + 1;
		}

		const newHitbox: HitboxProps = {
			id: newId,
			origin_x: hitboxX,
			origin_y: hitboxY,
			width: hitboxWidth,
			height: hitboxHeight
		};

		enteringHitboxIds = [...enteringHitboxIds, newId];
		setTimeout(() => {
			enteringHitboxIds = enteringHitboxIds.filter((enteringId) => enteringId !== newId);
		}, ANIMATION_DURATION);

		hitboxes = [...hitboxes, newHitbox];
		hitboxX += 90;
		hitboxY += 90;
	}

	function handleCanvasMouseMovement(e: MouseEvent) {
		const canvas = e.currentTarget as HTMLElement;
		const rect = canvas.getBoundingClientRect();
		cursorX = e.clientX - rect.left;
		cursorY = e.clientY - rect.top;
	}

	function showTooltip(msg: string) {
		tooltipMessage = msg;
		if (tooltipTimeout) clearTimeout(tooltipTimeout);
		tooltipTimeout = setTimeout(() => {
			tooltipMessage = null;
		}, 2500);
	}

	function incrementScale(modifiedValue: number) {
		if (inputScale >= 50) {
			showTooltip('Scale cannot go higher than a value of 50');
			return;
		}
		inputScale += modifiedValue;
	}

	function decrementScale(modifiedValue: number) {
		if (inputScale <= 1) {
			showTooltip('Scale cannot go lower than a value of 1');
			return;
		}
		inputScale -= modifiedValue;
	}

	function incrementGridScale() {
		gridSize++;
	}

	function decrementGridSize() {
		if (gridSize <= 1) {
			showTooltip('Grid size cannot go lower than 1');
			return;
		}
		gridSize--;
	}

	function snapToGrid(value: number): number {
		return Math.round(value / gridSize) * gridSize;
	}

	$effect(() => {
		if (isDragging !== 'modal') return;

		const move = (e: MouseEvent) => {
			const modal = document.querySelector('.hitbox-modal') as HTMLElement;
			if (!modal) return;
			const X = e.clientX - modalOffset.x;
			const Y = e.clientY - modalOffset.y;
			modalPosX = X;
			modalPosY = Y;
			modal.style.left = X + 'px';
			modal.style.top = Y + 'px';
		};

		const up = () => stopDrag();

		document.addEventListener('mousemove', move, { capture: true });
		document.addEventListener('mouseup', up, { capture: true });

		return () => {
			document.removeEventListener('mousemove', move, { capture: true });
			document.removeEventListener('mouseup', up, { capture: true });
		};
	});

	$effect(() => {
		if (isDragging !== 'hitbox' || draggingHitboxId === null) return;

		const editorContainer = document.querySelector('.canvas');
		if (!editorContainer) return;
		const editorRect = editorContainer.getBoundingClientRect();

		const move = (e: MouseEvent) => {
			handleHitboxMouseMove(e);
			const mouseXRelativeToEditor = e.clientX - editorRect.left;
			const mouseYRelativeToEditor = e.clientY - editorRect.top;

			const rawX = mouseXRelativeToEditor - hitboxOffset.x;
			const rawY = mouseYRelativeToEditor - hitboxOffset.y;

			const X = gridOn ? snapToGrid(rawX) : rawX;
			const Y = gridOn ? snapToGrid(rawY) : rawY;

			hitboxes = hitboxes.map((h) =>
				h.id === draggingHitboxId ? { ...h, origin_x: X, origin_y: Y } : h
			);
		};

		const up = () => stopDrag();

		document.addEventListener('mousemove', move, { capture: true });
		document.addEventListener('mouseup', up, { capture: true });

		return () => {
			document.removeEventListener('mousemove', move, { capture: true });
			document.removeEventListener('mouseup', up, { capture: true });
		};
	});

	$effect(() => {
		inputScale = scale;
	});

	$effect(() => {
		setScale(inputScale);
	});
</script>

{#if settingsOpen}
	<div class="settings-backdrop" role="presentation" onclick={() => (settingsOpen = false)}></div>
	<div class="settings-modal">
		<div class="settings-header">
			<span class="settings-title">Settings</span>
			<button class="settings-close" onclick={() => (settingsOpen = false)}>
				<X size={16} />
			</button>
		</div>
		<div class="settings-body">
			<div class="settings-container">
				<span class="settings-header-text">Ruler Defaults</span>
				<span class="settings-subtext">change ruler, helper lines, and outline defaults</span>

				<div>
					{#if rulerSettingAttributes.width === 80}
						<span>Default Width:</span>
					{:else}
						<span>Width:</span>
					{/if}
					<input type="number" class="settings-input" bind:value={rulerSettingAttributes.width} />
				</div>

				<div>
					{#if rulerSettingAttributes.height === 80}
						<span>Default Height:</span>
					{:else}
						<span>Height:</span>
					{/if}
					<input type="number" class="settings-input" bind:value={rulerSettingAttributes.height} />
				</div>

				<span class="settings-header-text">Image Scale Value</span>

				<div>
					<span>Increment Value:</span>
					<input type="number" class="settings-input" step={0.1} bind:value={modifiedValue} />
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="editor-root">
	<div class="toolbar">
		<button onclick={setScreen}>
			<MoveLeft size={18} />
		</button>

		<button class:active={flipX} onclick={() => setFlipX(!flipX)}>
			<FlipHorizontal size={18} />
		</button>

		<button class:active={flipY} onclick={() => setFlipY(!flipY)}>
			<FlipVertical size={18} />
		</button>

		<button onclick={addOneHitbox}>
			<CopyPlus size={18} />
		</button>

		<button class:active={editorRulerOn} onclick={() => (editorRulerOn = !editorRulerOn)}>
			<Ruler size={18} />
		</button>

		{#if editorRulerOn}
			<button
				class:active={crosshairRulerTopOn}
				onclick={() => (crosshairRulerTopOn = !crosshairRulerTopOn)}
			>
				<PanelTopDashed size={18} />
			</button>
			<button
				class:active={crosshairRulerLeftOn}
				onclick={() => (crosshairRulerLeftOn = !crosshairRulerLeftOn)}
			>
				<PanelLeftDashed size={18} />
			</button>
		{/if}

		<button class:active={gridOn} onclick={() => (gridOn = !gridOn)}>
			<Grid3x3 size={18} />
		</button>
		<button class:active={outlineOn} onclick={() => (outlineOn = !outlineOn)}>
			<SquareDashed size={18} />
		</button>

		<div class="toolbar-spacer"></div>
		<button onclick={() => (settingsOpen = true)}>
			<Settings size={18} />
		</button>
	</div>

	<div class="canvas-wrapper">
		<div class="tooltip-bar">
			<p class="header-text">
				{#if filePath}
					- Image path selected: {filePath} -
				{:else}
					- No Image Loaded -
				{/if}
			</p>
			{#if tooltipMessage}
				<span class="tooltip-warning">{tooltipMessage}</span>
			{/if}
		</div>

		<div
			class="canvas"
			role="presentation"
			onmousemove={editorRulerOn ? handleCanvasMouseMovement : undefined}
		>
			{#if editorRulerOn}
				<div class="ruler ruler-top">
					{#each Array.from({ length: 60 }) as _, i}
						<div class="ruler-tick" style="left: {i * 10}px;">
							{#if i % 5 === 0}
								<span class="ruler-label">{i * 1}</span>
							{/if}
						</div>
					{/each}
				</div>

				<div class="ruler ruler-left">
					{#each Array.from({ length: 60 }) as _, i}
						<div class="ruler-tick-v" style="top: {i * 10}px;">
							{#if i % 5 === 0}
								<span class="ruler-label-v">{i * 1}</span>
							{/if}
						</div>
					{/each}
				</div>

				{#if crosshairRulerTopOn}
					<div class="crosshair-h" style="top: {cursorY}px;"></div>
				{/if}
				{#if crosshairRulerLeftOn}
					<div class="crosshair-v" style="left: {cursorX}px;"></div>
				{/if}
			{/if}

			{#if gridOn}
				<svg class="grid" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern
							id="grid-pattern"
							width={gridSize}
							height={gridSize}
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M {gridSize} 0 L 0 0 0 {gridSize}"
								fill="none"
								stroke="#565e69"
								stroke-width="0.5"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid-pattern)" />
				</svg>
			{/if}
			{#if currentHitboxModal !== null}
				<div class="hitbox-modal" style="left: {modalPosX}px; top: {modalPosY}px;">
					<div
						class="hitbox-editor-header"
						role="presentation"
						onmousedown={(e) => startDrag(e, 'modal')}
						onmouseup={stopDrag}
						style="cursor: {isDragging ? 'grabbing' : 'grab'}"
					>
						<h2>Hitbox Editor Panel</h2>
						<div>
							<X size={28} color="#333" onclick={() => (currentHitboxModal = null)} />
						</div>
					</div>

					<button onclick={() => removeOneHitbox(currentHitboxModal!)}>
						Delete Current Hitbox: {currentHitboxModal}
					</button>

					<button onclick={() => removeAllHitboxes()}>Delete All Hitboxes</button>

					<button onclick={() => resetAttributes()}>Reset Hitbox Attributes</button>

					<div class="input-col">
						<div class="input-row">
							<label for="hitbox-x">X:</label>
							<input
								id="hitbox-x"
								type="number"
								class="input-styles-modal"
								value={hitboxes.find((h) => h.id === currentHitboxModal)?.origin_x ?? hitboxX}
								step={10}
								min={10}
								oninput={(e) => {
									const v = Number((e.target as HTMLInputElement).value);
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, origin_x: v } : h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, origin_x: hitboxAttributes.x } : h
									);
								}}
							/>
						</div>

						<div class="input-row">
							<label for="hitbox-y">Y:</label>
							<input
								id="hitbox-y"
								type="number"
								class="input-styles-modal"
								value={hitboxes.find((h) => h.id === currentHitboxModal)?.origin_y ?? hitboxY}
								step={10}
								min={10}
								oninput={(e) => {
									const v = Number((e.target as HTMLInputElement).value);
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, origin_y: v } : h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, origin_y: hitboxAttributes.y } : h
									);
								}}
							/>
						</div>
					</div>

					<div class="input-col">
						<div class="input-row">
							<label for="hitbox-width">Width:</label>
							<input
								id="hitbox-width"
								type="number"
								class="input-styles-modal"
								value={hitboxes.find((h) => h.id === currentHitboxModal)?.width ?? hitboxWidth}
								step={10}
								min={10}
								oninput={(e) => {
									const v = Number((e.target as HTMLInputElement).value);
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, width: v } : h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, width: hitboxAttributes.width } : h
									);
								}}
							/>
						</div>

						<div class="input-row">
							<label for="hitbox-height">Height:</label>
							<input
								id="hitbox-height"
								type="number"
								class="input-styles-modal"
								value={hitboxes.find((h) => h.id === currentHitboxModal)?.height ?? hitboxHeight}
								step={10}
								min={10}
								oninput={(e) => {
									const v = Number((e.target as HTMLInputElement).value);
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, height: v } : h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, height: hitboxAttributes.height } : h
									);
								}}
							/>
						</div>
					</div>
				</div>
			{/if}

			{#if imgPath}
				<div
					class="image-wrapper"
					style="transform: scale({flipX ? -scale : scale}, {flipY ? -scale : scale});"
				>
					<img
						src={imgPath}
						alt="Selected sprite asset"
						onload={handleImageDefaultSize}
						draggable="false"
						class:outlined={outlineOn}
					/>
				</div>
			{/if}

			{#each hitboxes as { id, origin_x, origin_y, width, height } (id)}
				<div
					data-id={id}
					class="box"
					class:highlighted-box={currentHitboxModal === id}
					class:exiting={exitingHitboxIds.includes(id)}
					class:entering={enteringHitboxIds.includes(id)}
					style="
						left: {origin_x}px;
						top: {origin_y}px;
						width: {width}px;
						height: {height}px;
						cursor: {isDragging === 'hitbox' && draggingHitboxId === id ? 'grabbing' : 'grab'};
					"
					role="presentation"
					onmousedown={(e) => handleHitboxMouseDown(e, id)}
					onmouseup={() => handleHitboxMouseUp(id)}
				>
					Hitbox: {id}
				</div>
			{/each}
		</div>
	</div>

	<div class="right-toolbar">
		<span class="right-toolbar-title">Properties</span>
		<hr class="rt-divider" />
		<div class="rt-row">
			<span class="rt-label">Scale: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0 ? incrementScale(modifiedValue) : decrementScale(modifiedValue);
				}}
			>
				<SquareMinus size={16} class="rt-step-icon" onclick={() => decrementScale(modifiedValue)} />
				<input class="rt-value-input" type="text" bind:value={inputScale} />
				<SquarePlus size={16} class="rt-step-icon" onclick={() => incrementScale(modifiedValue)} />
			</div>
		</div>

		<div class="rt-row rows">
			<span class="rt-label">Incremental Value: </span>
			<div>
				<input
					type="range"
					class="rt-slider"
					min="1"
					max="10"
					step="0.1"
					bind:value={modifiedValue}
				/>
				<span class="rt-value">{modifiedValue}</span>
			</div>
		</div>

		<span class="right-toolbar-title">Ruler</span>
		<hr class="rt-divider" />

		<div class="rt-row">
			<span class="rt-label">Width: </span>
			<div class="rt-stepper"></div>
		</div>
		<div class="rt-row">
			<span class="rt-label">Height: </span>
			<div class="rt-stepper"></div>
		</div>

		<span class="right-toolbar-title">Grid</span>
		<hr class="rt-divider" />
		<div class="rt-row">
			<span class="rt-label">Scale: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0 ? incrementGridScale() : decrementGridSize();
				}}
			>
				<SquareMinus size={16} class="rt-step-icon" onclick={decrementGridSize} />
				<input class="rt-value-input" type="text" bind:value={gridSize} />
				<SquarePlus size={16} class="rt-step-icon" onclick={incrementGridScale} />
			</div>
		</div>

		<div class="rt-row">
			<span class="rt-label rt-label-sm">Snap: </span>
			<span class="rt-snap-indicator" class:rt-snap-active={gridOn}>{gridOn ? 'on' : 'off'}</span>
		</div>
	</div>
</div>

<style>
	.editor-root {
		display: grid;
		grid-template-columns: 80px 1fr 180px;
		height: 100vh;
		background: #10141d;
		color: white;
		overflow: hidden;
	}

	/* ── Left toolbar ── */
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

	.toolbar-spacer {
		flex: 1;
	}

	.toolbar button {
		background: #1f2937;
		border: none;
		color: white;
		border-radius: 10px;
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toolbar button.active {
		background: #305e49;
	}

	/* ── Right toolbar ── */
	.right-toolbar {
		background: #111827;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0.5rem;
		gap: 0.75rem;
		border-left: 1px solid #1f2937;
		box-sizing: border-box;
	}

	.right-toolbar-title {
		font-size: 13px;
		font-weight: 600;
		color: #e5e7eb;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.rt-divider {
		width: 100%;
		border: none;
		border-top: 1px solid #1f2937;
		margin: 0;
	}

	.rt-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
	}

	.rows {
		flex-direction: column;
	}

	.rt-slider {
		margin: 6px 0px 0px 0px;
		width: 82%;
		accent-color: #305e49;
		cursor: pointer;
		height: 6px;
	}

	.rt-label {
		font-size: 16px;
		color: #9ca3af;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.rt-label-sm {
		font-size: 16px;
	}

	.rt-snap-indicator {
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 6px;
		background: #374151;
		color: #6b7280;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		user-select: none;
	}

	.rt-snap-active {
		background: rgba(48, 94, 73, 0.4);
		color: #4ade80;
	}

	.rt-stepper {
		display: flex;
		align-items: center;
		gap: 4px;
		background: #1f2937;
		border: 1px solid #374151;
		border-radius: 8px;
		padding: 3px 6px;
	}

	.rt-value {
		font-size: 12px;
		font-weight: 700;
		color: #e5e7eb;
		text-align: center;
		user-select: none;
	}

	.rt-value-input {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		width: 28px;
		color: #e5e7eb;
		text-align: center;
		border: none;
		background: transparent;
	}

	:global(.rt-step-icon) {
		cursor: pointer;
		color: #9ca3af;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		transition: color 0.15s;
	}

	:global(.rt-step-icon:hover) {
		color: #4ade80;
	}

	/* ── Canvas wrapper ── */
	.canvas-wrapper {
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
	}

	.tooltip-bar {
		background: #111827;
		border-bottom: 1px solid #1f2937;
		padding: 0.4rem 1rem;
		display: flex;
		align-items: center;
	}

	.header-text {
		margin: 0;
		font-size: 12px;
		color: #9ca3af;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	/* ── Hitbox styles ── */
	.box,
	.highlighted-box {
		position: absolute;
		border: 2px solid rgba(255, 100, 100, 0.8);
		background: rgba(255, 100, 100, 0.15);
		color: white;
		font-size: 11px;
		padding: 2px 4px;
		box-sizing: border-box;
		user-select: none;
	}

	.highlighted-box {
		border-color: rgba(100, 220, 255, 0.9);
		background: rgba(100, 220, 255, 0.2);
	}

	.entering {
		animation: fadeIn 0.3s ease forwards;
	}

	.exiting {
		animation: fadeOut 0.3s ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	/* ── Hitbox modal styles ── */
	.hitbox-modal {
		position: fixed;
		z-index: 1000;
		background: #1f2937;
		border: 1px solid #374151;
		border-radius: 8px;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 220px;
		color: white;
	}

	.hitbox-editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hitbox-editor-header h2 {
		margin: 0;
		font-size: 14px;
	}

	.input-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.input-styles-modal {
		width: 70px;
		background: #374151;
		border: 1px solid #4b5563;
		color: white;
		border-radius: 4px;
		padding: 2px 4px;
	}

	.tooltip-warning {
		margin-left: auto;
		font-size: 11px;
		color: #f87171;
		background: rgba(248, 113, 113, 0.1);
		border: 1px solid rgba(248, 113, 113, 0.3);
		border-radius: 6px;
		padding: 2px 10px;
		white-space: nowrap;
		animation: fadeIn 0.2s ease;
	}
	/* ── Ruler styles ── */
	.ruler {
		position: absolute;
		background: rgba(12, 24, 39, 0.92);
		z-index: 100;
		pointer-events: none;
		user-select: none;
	}

	.ruler-top {
		top: 0;
		left: 20px;
		right: 0;
		height: 20px;
		border-bottom: 1px solid #374151;
	}

	.ruler-left {
		top: 20px;
		left: 0;
		bottom: 0;
		width: 20px;
		border-right: 1px solid #374151;
	}

	.ruler-tick {
		position: absolute;
		top: 0;
		width: 1px;
		height: 8px;
		background: #6b7280;
	}

	.ruler-tick-v {
		position: absolute;
		left: 0;
		width: 8px;
		height: 1px;
		background: #6b7280;
	}

	.ruler-label {
		position: absolute;
		top: 9px;
		left: -2px;
		font-size: 8px;
		color: #6b7280;
	}

	.ruler-label-v {
		position: absolute;
		left: 9px;
		top: -2px;
		font-size: 8px;
		color: #6b7280;
		white-space: nowrap;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}

	/* ── Crosshair ── */
	.crosshair-h {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(100, 220, 255, 0.35);
		pointer-events: none;
		z-index: 99;
	}

	.crosshair-v {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: rgba(100, 220, 255, 0.35);
		pointer-events: none;
		z-index: 99;
	}

	/* ── Settings modal ── */
	.settings-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(2px);
		z-index: 2000;
		animation: fadeIn 0.2s ease;
	}

	.settings-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2001;
		background: #1f2937;
		border: 1px solid #374151;
		border-radius: 12px;
		width: 480px;
		min-height: 420px;
		display: flex;
		flex-direction: column;
		color: white;
		animation: modalIn 0.2s ease;
	}

	.settings-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid #374151;
	}

	.settings-title {
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #e5e7eb;
	}

	.settings-header-text {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #a7abb3;
	}

	.settings-subtext {
		font-size: 12px;
		font-weight: 500;
		color: #838892;
	}

	.settings-close {
		background: #374151;
		border: none;
		color: #9ca3af;
		border-radius: 6px;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.settings-close:hover {
		background: #4b5563;
		color: #e5e7eb;
	}

	.settings-body {
		flex: 1;
		padding: 1.25rem;
	}

	.settings-container {
		display: flex;
		flex-direction: column;
	}

	.settings-input {
		width: 70px;
		background: #374151;
		border: 1px solid #4b5563;
		color: white;
		border-radius: 4px;
		padding: 2px 4px;
	}

	@keyframes modalIn {
		from {
			opacity: 0;
			transform: translate(-50%, -48%) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	img.outlined {
		outline: 1px solid rgb(179, 179, 179);
	}

	/* Grid styles */
	.grid {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}
</style>
