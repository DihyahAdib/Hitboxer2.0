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
		Grid3x3,
		Link2Off,
		Link2,
		Info,
		Frame
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	let {
		imgPath,
		imgSize,
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
		img_x: number;
		img_y: number;
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

	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let isSaving = $state(false);
	let saveIndicatorTimeout: ReturnType<typeof setTimeout> | null = null;

	let row = $state(1);
	let col = $state(1);
	let gridX = $state(10);
	let gridY = $state(10);
	let gridSize = $state(10);
	let inputScale = $state(1);
	let modifiedValue = $state(1);
	let modifiedGridValue = $state(1);
	let modifiedRulerValue = $state(1);

	let spaceFromImg = $state(40);

	let cursorX = $state(0);
	let cursorY = $state(0);

	let gridOn = $state(false);
	let outlineOn = $state(false);
	let isDragAction = $state(false);
	let settingsOpen = $state(false);
	let editorRulerOn = $state(false);
	let cellOutlineWidthOn = $state(false);
	let cellOutlineHeightOn = $state(false);
	let isGridValuesClamped = $state(false);
	let crosshairRulerTopOn = $state(false);
	let crosshairRulerLeftOn = $state(false);

	let rulerWidth = $state(rulerSettingAttributes.width);
	let rulerHeight = $state(rulerSettingAttributes.height);

	let tooltipMessage = $state<string | null>(null);
	let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

	let hitboxes = $state<HitboxProps[]>([]);
	let hitboxX = $state<number>(hitboxAttributes.x);
	let hitboxY = $state<number>(hitboxAttributes.y);
	let hitboxWidth = $state<number>(hitboxAttributes.width);
	let hitboxHeight = $state<number>(hitboxAttributes.height);
	let hitboxOffset = $state<Offset>({ x: 0, y: 0 });
	let exitingHitboxIds = $state<number[]>([]);
	let enteringHitboxIds = $state<number[]>([]);
	let isDragging = $state<'modal' | 'hitbox' | null>(null);
	let draggingHitboxId = $state<number | null>(null);
	let currentHitboxModal = $state<number | null>(null);
	let dragStartRef: { x: number; y: number } | null = null;

	let modalOffset = $state<Offset>({ x: 0, y: 0 });
	let modalPosX = $state<number>(400);
	let modalPosY = $state<number>(200);
	let modalInputX = $state(0);
	let modalInputY = $state(0);

	$effect(() => {
		const settings = {
			row,
			col,
			gridX,
			gridY,
			gridSize,
			inputScale,
			modifiedValue,
			modifiedGridValue,
			modifiedRulerValue,
			gridOn,
			outlineOn,
			editorRulerOn,
			isGridValuesClamped,
			crosshairRulerTopOn,
			crosshairRulerLeftOn,
			rulerWidth,
			rulerHeight,
			hitboxX,
			hitboxY,
			isDragAction,
			settingsOpen
		};

		if (saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			window.electronAPI.storeSet('editorSettings', settings);

			isSaving = true;

			if (saveIndicatorTimeout) clearTimeout(saveIndicatorTimeout);
			saveIndicatorTimeout = setTimeout(() => {
				isSaving = false;
			}, 1500);
		}, 300);
	});

	onMount(async () => {
		const saved = await window.electronAPI.storeGet('editorSettings');
		if (!saved) return;
		row = saved.row ?? 1;
		col = saved.col ?? 1;
		gridX = saved.gridX ?? 10;
		gridY = saved.gridY ?? 10;
		gridSize = saved.gridSize ?? 10;
		inputScale = saved.inputScale ?? 1;
		modifiedValue = saved.modifiedValue ?? 1;
		modifiedGridValue = saved.modifiedGridValue ?? 1;
		modifiedRulerValue = saved.modifiedRulerValue ?? 1;
		gridOn = saved.gridOn ?? false;
		outlineOn = saved.outlineOn ?? false;
		editorRulerOn = saved.editorRulerOn ?? false;
		isGridValuesClamped = saved.isGridValuesClamped ?? false;
		crosshairRulerTopOn = saved.crosshairRulerTopOn ?? false;
		crosshairRulerLeftOn = saved.crosshairRulerLeftOn ?? false;
		rulerWidth = saved.rulerWidth ?? rulerSettingAttributes.width;
		rulerHeight = saved.rulerHeight ?? rulerSettingAttributes.height;
		hitboxX = saved.hitboxX ?? hitboxAttributes.x;
		hitboxY = saved.hitboxY ?? hitboxAttributes.y;
		isDragAction = saved.isDragAction ?? false;
		settingsOpen = saved.settingsOpen ?? false;
	});

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
			height: hitboxHeight,
			img_x: 0,
			img_y: 0
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

	function incrementRowCount() {
		if (row >= 100) {
			showTooltip('Please change max defaults in settings to allow for more spritesheet rows.');
			return;
		}
		row++;
	}

	function decrementRowCount() {
		if (row <= 1) {
			showTooltip('A spritesheet cannot contain less than 1 row(s).');
			return;
		}
		row--;
	}

	function incrementColCount() {
		if (col >= 100) {
			showTooltip('Please change max defaults in settings to allow for more spritesheet cols.');
			return;
		}
		col++;
	}

	function decrementColCount() {
		if (col <= 1) {
			showTooltip('A spritesheet cannot contain less than 1 col(s).');
			return;
		}
		col--;
	}

	function incrementScale(modifiedValue: number) {
		if (inputScale >= 50) {
			showTooltip('Scale cannot go higher than a value of 50.');
			return;
		}
		inputScale += modifiedValue;
	}

	function decrementScale(modifiedValue: number) {
		if (inputScale <= 1) {
			showTooltip('Scale cannot go lower than a value of 1.');
			return;
		}
		inputScale -= modifiedValue;
	}

	function incrementRulerWidth(modifiedRulerValue: number) {
		if (rulerWidth >= 164) {
			showTooltip('Ruler Width cannot go larger than 120 ticks.');
			return;
		}
		rulerWidth += modifiedRulerValue;
	}

	function decrementRulerWidth(modifiedRulerValue: number) {
		if (rulerWidth <= 60) {
			showTooltip('Ruler Width cannot go lower than 60 ticks.');
			return;
		}
		rulerWidth -= modifiedRulerValue;
	}

	function incrementRulerHeight(modifiedRulerValue: number) {
		if (rulerHeight >= 94) {
			showTooltip('Ruler Height cannot go larger than 120 ticks.');
			return;
		}
		rulerHeight += modifiedRulerValue;
	}

	function decrementRulerHeight(modifiedRulerValue: number) {
		if (rulerHeight <= 60) {
			showTooltip('Ruler Height cannot go lower than 60 ticks.');
			return;
		}
		rulerHeight -= modifiedRulerValue;
	}

	function incrementGridScale(modifiedGridValue: number, isGridValuesClamped: boolean) {
		if (isGridValuesClamped) {
			gridSize = Math.round((gridSize + modifiedGridValue) * 1000) / 1000;
		} else {
			gridX = Math.round((gridX + modifiedGridValue) * 1000) / 1000;
			gridY = Math.round((gridY + modifiedGridValue) * 1000) / 1000;
		}
	}

	function decrementGridSize(modifiedGridValue: number, isGridValuesClamped: boolean) {
		if (isGridValuesClamped) {
			if (gridSize <= 0.1) {
				showTooltip('Grid size cannot go lower than 0.1');
				return;
			}
			gridSize = Math.round((gridSize - modifiedGridValue) * 1000) / 1000;
		} else {
			if (gridX <= 0.1) {
				showTooltip('Grid size cannot go lower than 0.1');
				return;
			}
			gridX = Math.round((gridX - modifiedGridValue) * 1000) / 1000;
			gridY = Math.round((gridY - modifiedGridValue) * 1000) / 1000;
		}
	}

	function incrementGridX(modifiedGridValue: number) {
		gridX = Math.round((gridX + modifiedGridValue) * 1000) / 1000;
	}

	function decrementGridX(modifiedGridValue: number) {
		if (gridX <= 0.1) {
			showTooltip('Grid width cannot go lower than 0.1');
			return;
		}
		gridX = Math.round((gridX - modifiedGridValue) * 1000) / 1000;
	}

	function incrementGridY(modifiedGridValue: number) {
		gridY = Math.round((gridY + modifiedGridValue) * 1000) / 1000;
	}

	function decrementGridY(modifiedGridValue: number) {
		if (gridY <= 0.1) {
			showTooltip('Grid height cannot go lower than 0.1');
			return;
		}
		gridY = Math.round((gridY - modifiedGridValue) * 1000) / 1000;
	}

	function snapToGrid(value: number, axis: 'x' | 'y'): number {
		const size = isGridValuesClamped ? gridSize : axis === 'x' ? gridX : gridY;
		if (size <= 0) return value;

		const editorEl = document.querySelector('.canvas');
		if (!editorEl) return value;
		const r = editorEl.getBoundingClientRect();

		const origin =
			axis === 'x'
				? r.width / 2 - (imgSize.width * scale) / 2
				: r.height / 2 - (imgSize.height * scale) / 2;

		return Math.round((value - origin) / size) * size + origin;
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

			const X = gridOn ? snapToGrid(rawX, 'x') : rawX;
			const Y = gridOn ? snapToGrid(rawY, 'y') : rawY;

			const imgLeft = editorRect.width / 2 - (imgSize.width * scale) / 2;
			const imgTop = editorRect.height / 2 - (imgSize.height * scale) / 2;

			hitboxes = hitboxes.map((h) =>
				h.id === draggingHitboxId
					? {
							...h,
							origin_x: X,
							origin_y: Y,
							img_x: Math.round(X - imgLeft),
							img_y: Math.round(Y - imgTop)
						}
					: h
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
		const h = hitboxes.find((h) => h.id === currentHitboxModal);
		if (h) {
			modalInputX = h.img_x;
			modalInputY = h.img_y;
		}
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
			<div class="settings-section">
				<div class="settings-section-header">
					<span class="settings-section-title">Ruler Defaults</span>
					<span class="settings-section-desc">
						Change ruler, helper line, and outline defaults
					</span>
				</div>

				<div class="settings-row">
					<span class="settings-label">
						{rulerSettingAttributes.width === 80 ? 'Default Width' : 'Width'}
					</span>

					<input type="number" class="settings-input" bind:value={rulerSettingAttributes.width} />
				</div>

				<div class="settings-row">
					<span class="settings-label">
						{rulerSettingAttributes.height === 80 ? 'Default Height' : 'Height'}
					</span>

					<input type="number" class="settings-input" bind:value={rulerSettingAttributes.height} />
				</div>
			</div>

			<div class="settings-section">
				<div class="settings-section-header">
					<span class="settings-section-title">Image Scale</span>
					<span class="settings-section-desc"> Controls default image scale increments </span>
				</div>

				<div class="settings-row">
					<span class="settings-label">Increment Value</span>

					<input type="number" class="settings-input" step="0.1" bind:value={modifiedValue} />
				</div>
			</div>

			<div class="settings-section">
				<div class="settings-section-header">
					<span class="settings-section-title">Spritesheet</span>
					<span class="settings-section-desc">Information on spritesheet attributes</span>
					<span class="settings-label"></span>
				</div>
			</div>

			<div class="settings-section">
				<div class="settings-section-header">
					<span class="settings-section-title">Cells</span>
					<span class="settings-section-desc">Information on Hitbox attributes</span>
					<span class="settings-label"></span>
				</div>
			</div>

			<div class="settings-section">
				<div class="settings-section-header">
					<span class="settings-section-title">Hitboxs</span>
					<span class="settings-section-desc">Information on Hitbox attributes</span>
					<span class="settings-label"></span>
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
			<div class="sub-group">
				<div class="sub-group-line"></div>
				<div class="sub-group-buttons">
					<button
						class="sub-btn"
						class:active={crosshairRulerTopOn}
						onclick={() => (crosshairRulerTopOn = !crosshairRulerTopOn)}
					>
						<PanelTopDashed size={14} />
					</button>
					<button
						class="sub-btn"
						class:active={crosshairRulerLeftOn}
						onclick={() => (crosshairRulerLeftOn = !crosshairRulerLeftOn)}
					>
						<PanelLeftDashed size={14} />
					</button>
				</div>
			</div>
		{/if}

		<button class:active={gridOn} onclick={() => (gridOn = !gridOn)}>
			<Grid3x3 size={18} />
		</button>

		<button class:active={outlineOn} onclick={() => (outlineOn = !outlineOn)}>
			<SquareDashed size={18} />
		</button>

		<button
			class:active={cellOutlineWidthOn}
			onclick={() => (cellOutlineWidthOn = !cellOutlineWidthOn)}
		>
			<Frame size={18} />
		</button>

		<button
			class:active={cellOutlineHeightOn}
			onclick={() => (cellOutlineHeightOn = !cellOutlineHeightOn)}
		>
			<Frame size={18} />
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
			{#if isSaving}
				<span class="tooltip-saving">● Saving...</span>
			{/if}
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
					{#each Array.from({ length: rulerWidth }) as _, i (i)}
						<div class="ruler-tick" style="left: {i * 10}px;">
							{#if i % 5 === 0}
								<span class="ruler-label">{i * 1}</span>
							{/if}
						</div>
					{/each}
				</div>

				<div class="ruler ruler-left">
					{#each Array.from({ length: rulerHeight }) as _, i (i)}
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

			{#if gridOn && imgPath}
				<div
					class="image-grid"
					style="
            width: {imgSize.width * scale}px;
            height: {imgSize.height * scale}px;
        "
				>
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="grid-pattern"
								width={isGridValuesClamped ? gridSize : gridX}
								height={isGridValuesClamped ? gridSize : gridY}
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M {isGridValuesClamped ? gridSize : gridX} 0 L 0 0 0 {isGridValuesClamped
										? gridSize
										: gridY}"
									fill="none"
									stroke="#565e69"
									stroke-width="0.5"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-pattern)" />
					</svg>
				</div>
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
								step={1}
								bind:value={modalInputX}
								onchange={() => {
									const editorEl = document.querySelector('.canvas');
									if (!editorEl) return;
									const r = editorEl.getBoundingClientRect();
									const imgLeft = r.width / 2 - (imgSize.width * scale) / 2;
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal
											? { ...h, img_x: modalInputX, origin_x: modalInputX + imgLeft }
											: h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									const editorEl = document.querySelector('.canvas');
									if (!editorEl) return;
									const r = editorEl.getBoundingClientRect();
									const imgLeft = r.width / 2 - (imgSize.width * scale) / 2;
									modalInputX = 0;
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, img_x: 0, origin_x: imgLeft } : h
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
								step={1}
								bind:value={modalInputY}
								onchange={() => {
									const editorEl = document.querySelector('.canvas');
									if (!editorEl) return;
									const r = editorEl.getBoundingClientRect();
									const imgTop = r.height / 2 - (imgSize.height * scale) / 2;
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal
											? { ...h, img_y: modalInputY, origin_y: modalInputY + imgTop }
											: h
									);
								}}
							/>
							<Undo2
								size={20}
								color="#fff"
								class="refresh"
								onclick={() => {
									const editorEl = document.querySelector('.canvas');
									if (!editorEl) return;
									const r = editorEl.getBoundingClientRect();
									const imgTop = r.height / 2 - (imgSize.height * scale) / 2;
									modalInputY = 0;
									hitboxes = hitboxes.map((h) =>
										h.id === currentHitboxModal ? { ...h, img_y: 0, origin_y: imgTop } : h
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
								step={1}
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
								step={1}
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
				{#if outlineOn}
					<div
						class="image-outline"
						style="
						width: {imgSize.width * scale}px; 
						height: {imgSize.height * scale}px;
						"
					></div>
				{/if}
				<div
					class="image-wrapper"
					style="transform: scale({flipX ? -scale : scale}, {flipY ? -scale : scale});"
				>
					<img
						src={imgPath}
						alt="Selected sprite asset"
						onload={handleImageDefaultSize}
						draggable="false"
					/>
				</div>
			{/if}

			{#if cellOutlineWidthOn}
				<div
					class="cell-dimensions-width"
					style="
				width: {(imgSize?.width / row) * scale}px;
				height: 2px; top: 0px; left: 0px;
				"
				>
					Source W:{imgSize?.width / row}
				</div>
			{/if}

			{#if cellOutlineHeightOn}
				<div
					class="cell-dimensions-height"
					style="
					width: 1px; 
					height: {(imgSize?.height / col) * scale}px; 
					top: calc(50% - {(imgSize.height * scale) / 2}px);
					left: calc(50% - {(imgSize.width * scale + spaceFromImg) / 2}px);
					"
				>
					Source H:{imgSize?.height / col}
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
		<hr class="rt-divider" />
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

		<div class="rt-img-info">
			<span class="rt-info-label">Source</span>
			<div class="rt-info-row">
				<span class="rt-info-key">W</span>
				<span class="rt-info-val">{imgSize?.width ?? 0}px</span>
				<span class="rt-info-key">H</span>
				<span class="rt-info-val">{imgSize?.height ?? 0}px</span>
			</div>
			<span class="rt-info-label">Scaled</span>
			<div class="rt-info-row">
				<span class="rt-info-key">W</span>
				<span class="rt-info-val">{imgSize ? imgSize.width * inputScale : 0}px</span>
				<span class="rt-info-key">H</span>
				<span class="rt-info-val">{imgSize ? imgSize.height * inputScale : 0}px</span>
			</div>
		</div>

		<hr class="rt-divider" />

		<span class="right-toolbar-title">Ruler</span>

		<hr class="rt-divider" />

		<div class="rt-row">
			<span class="rt-label">Width: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0
						? incrementRulerWidth(modifiedRulerValue)
						: decrementRulerWidth(modifiedRulerValue);
				}}
			>
				<SquareMinus
					size={16}
					class="rt-step-icon"
					onclick={() => decrementRulerWidth(modifiedRulerValue)}
				/>
				<input class="rt-value-input" type="text" bind:value={rulerWidth} />
				<SquarePlus
					size={16}
					class="rt-step-icon"
					onclick={() => incrementRulerWidth(modifiedRulerValue)}
				/>
			</div>
		</div>

		<div class="rt-row">
			<span class="rt-label">Height: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0
						? incrementRulerHeight(modifiedRulerValue)
						: decrementRulerHeight(modifiedRulerValue);
				}}
			>
				<SquareMinus
					size={16}
					class="rt-step-icon"
					onclick={() => decrementRulerHeight(modifiedRulerValue)}
				/>
				<input class="rt-value-input" type="text" bind:value={rulerHeight} />
				<SquarePlus
					size={16}
					class="rt-step-icon"
					onclick={() => incrementRulerHeight(modifiedRulerValue)}
				/>
			</div>
		</div>

		<hr class="rt-divider" />

		<span class="right-toolbar-title">Grid</span>

		<hr class="rt-divider" />

		<div class="rt-row">
			<span class="rt-label">Scale: </span>
			<div
				class="rt-stepper"
				class:rt-stepper-disabled={!isGridValuesClamped}
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0
						? incrementGridScale(modifiedGridValue, isGridValuesClamped)
						: decrementGridSize(modifiedGridValue, isGridValuesClamped);
				}}
			>
				<SquareMinus
					size={16}
					class="rt-step-icon"
					onclick={() => decrementGridSize(modifiedGridValue, isGridValuesClamped)}
				/>
				<input class="rt-value-input" type="text" bind:value={gridSize} />
				<SquarePlus
					size={16}
					class="rt-step-icon"
					onclick={() => incrementGridScale(modifiedGridValue, isGridValuesClamped)}
				/>
			</div>
		</div>

		<div class="rt-clamp-container">
			<div class="rt-row">
				<span class="rt-label">X: </span>
				<div
					class="rt-stepper"
					class:rt-stepper-disabled={isGridValuesClamped}
					onwheel={(e) => {
						e.preventDefault();
						e.deltaY < 0 ? incrementGridX(modifiedGridValue) : decrementGridX(modifiedGridValue);
					}}
				>
					<SquareMinus
						size={16}
						class="rt-step-icon"
						onclick={!isGridValuesClamped ? () => decrementGridX(modifiedGridValue) : undefined}
					/>
					<input
						class="rt-value-input"
						type="text"
						bind:value={gridX}
						disabled={isGridValuesClamped}
					/>
					<SquarePlus
						size={16}
						class="rt-step-icon"
						onclick={!isGridValuesClamped ? () => incrementGridX(modifiedGridValue) : undefined}
					/>
				</div>
			</div>

			<button
				class="rt-clamp"
				class:active={isGridValuesClamped}
				onclick={() => (isGridValuesClamped = !isGridValuesClamped)}
			>
				{#if isGridValuesClamped}
					<Link2 size={18} />
				{:else}
					<Link2Off size={18} />
				{/if}
			</button>

			<div class="rt-row">
				<span class="rt-label">Y: </span>
				<div
					class="rt-stepper"
					class:rt-stepper-disabled={isGridValuesClamped}
					onwheel={(e) => {
						e.preventDefault();
						e.deltaY < 0 ? incrementGridY(modifiedGridValue) : decrementGridY(modifiedGridValue);
					}}
				>
					<SquareMinus
						size={16}
						class="rt-step-icon"
						onclick={!isGridValuesClamped ? () => decrementGridY(modifiedGridValue) : undefined}
					/>
					<input
						class="rt-value-input"
						type="text"
						bind:value={gridY}
						disabled={isGridValuesClamped}
					/>
					<SquarePlus
						size={16}
						class="rt-step-icon"
						onclick={!isGridValuesClamped ? () => incrementGridY(modifiedGridValue) : undefined}
					/>
				</div>
			</div>
		</div>

		<div class="rt-row rows">
			<span class="rt-label">Incremental Value: </span>
			<div>
				<input
					type="range"
					class="rt-slider"
					min="0.1"
					max="10"
					step="0.1"
					bind:value={modifiedGridValue}
				/>
				<span class="rt-value">{modifiedGridValue}</span>
			</div>
		</div>

		<div class="rt-row">
			<span class="rt-label rt-label-sm">Clamp: </span>
			<span class="rt-snap-indicator" class:rt-snap-active={isGridValuesClamped}
				>{isGridValuesClamped ? 'on' : 'off'}</span
			>
		</div>

		<div class="rt-row">
			<span class="rt-label rt-label-sm">Snap: </span>
			<span class="rt-snap-indicator" class:rt-snap-active={gridOn}>{gridOn ? 'on' : 'off'}</span>
		</div>

		<hr class="rt-divider" />

		<span class="right-toolbar-title">Spritesheet</span>

		<hr class="rt-divider" />

		<div class="rt-row">
			<span class="rt-label">Rows: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0 ? incrementRowCount() : decrementRowCount();
				}}
			>
				<SquareMinus size={16} class="rt-step-icon" onclick={() => decrementRowCount()} />
				<input class="rt-value-input" type="text" bind:value={row} />
				<SquarePlus size={16} class="rt-step-icon" onclick={() => incrementRowCount()} />
			</div>
		</div>
		<div class="rt-row">
			<span class="rt-label">Cols: </span>
			<div
				class="rt-stepper"
				onwheel={(e) => {
					e.preventDefault();
					e.deltaY < 0 ? incrementColCount() : decrementColCount();
				}}
			>
				<SquareMinus size={16} class="rt-step-icon" onclick={() => decrementColCount()} />
				<input class="rt-value-input" type="text" bind:value={col} />
				<SquarePlus size={16} class="rt-step-icon" onclick={() => incrementColCount()} />
			</div>
		</div>

		<hr class="rt-divider" />

		<span class="right-toolbar-title">Hitbox</span>

		<hr class="rt-divider" />

		<div class="rt-row">
			<span class="rt-label">Count: </span>
			<span class="rt-value">{hitboxes.length}</span>
		</div>

		<div class="rt-row">
			<span class="rt-label">Cell Width: </span>
			<span class="rt-value">{(imgSize?.width / row).toFixed(2)}px</span>
		</div>
		<div class="rt-row">
			<span class="rt-label">Cell Height: </span>
			<span class="rt-value">{(imgSize?.height / col).toFixed(2)}px</span>
		</div>
	</div>
</div>

<style>
	.editor-root {
		display: grid;
		grid-template-columns: 80px 1fr 195px;
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

	.sub-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding-left: 6px;
		box-sizing: border-box;
		gap: 4px;
	}

	.sub-group-line {
		width: 2px;
		align-self: stretch;
		background: #305e49;
		border-radius: 2px;
		flex-shrink: 0;
		min-height: 10px;
	}

	.sub-group-buttons {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		align-items: center;
	}

	.sub-btn {
		background: #161e2b !important;
		border: 1px solid #2a3a4a !important;
		border-radius: 7px !important;
		width: 32px !important;
		height: 32px !important;
		color: #6b7280 !important;
	}

	.sub-btn.active {
		background: #305e49 !important;
		color: white !important;
		border-color: #305e49 !important;
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

	.rt-clamp {
		background: transparent;
		border: none;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rt-clamp-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		width: 100%;
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
		font-size: 12px;
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

	.rt-stepper-disabled {
		opacity: 0.45;
		pointer-events: none;
		background: #111827;
		border-color: #2a2f3a;
	}

	.rt-stepper-disabled input {
		cursor: not-allowed;
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
	/* Right toolbar img info */
	.rt-img-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 90%;
	}

	.rt-info-label {
		font-size: 10px;
		font-weight: 600;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.rt-info-row {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #1f2937;
		border: 1px solid #374151;
		border-radius: 6px;
		padding: 3px 8px;
	}

	.rt-info-key {
		font-size: 10px;
		color: #6b7280;
		font-weight: 600;
	}

	.rt-info-val {
		font-size: 11px;
		color: #e5e7eb;
		font-weight: 500;
		flex: 1;
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

	.tooltip-saving {
		margin-left: auto;
		font-size: 11px;
		color: #4ade80;
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
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.settings-section:not(:last-child) {
		padding-bottom: 18px;
		border-bottom: 1px solid #1f2937;
	}

	.settings-section-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.settings-section-title {
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #e5e7eb;
	}

	.settings-section-desc {
		font-size: 12px;
		color: #6b7280;
	}

	/* row */

	.settings-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;

		background: #1f2937;
		border: 1px solid #374151;
		border-radius: 8px;

		padding: 8px 12px;
	}

	.settings-label {
		font-size: 13px;
		color: #9ca3af;
		font-weight: 500;
	}

	.settings-input {
		width: 70px;
		background: #374151;
		border: 1px solid #4b5563;
		color: white;
		border-radius: 4px;
		padding: 2px 4px;
	}

	.settings-input:focus {
		outline: none;
		border-color: #48305e;
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

	/* Grid styles */
	.image-grid {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 2;
	}

	.image-outline {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		outline: 1px solid rgb(179, 179, 179);
		pointer-events: none;
		z-index: 10;
	}

	.cell-dimensions-width {
		position: absolute;
		outline: 1px solid rgb(194, 115, 115);
		pointer-events: none;
		z-index: 11;
	}

	.cell-dimensions-height {
		position: absolute;
		outline: 1px solid rgb(194, 115, 115);
		pointer-events: none;
		z-index: 11;
	}
</style>
