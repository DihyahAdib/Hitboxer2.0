<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import '../app.css';

	let { children } = $props();
	let showAnimation = $state(true);
	let boxes: HTMLDivElement[] = [];

	if (typeof window !== 'undefined') {
		(window as any).setBackgroundAnimation = (show: boolean) => {
			showAnimation = show;
		};
	}

	onMount(() => {
		boxes.forEach((box, i) => {
			gsap.set(box, {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				width: 50 + Math.random() * 200,
				height: 50 + Math.random() * 200,
				rotation: Math.random() * 360,
				opacity: 0.2 + Math.random() * 0.3
			});

			gsap.to(box, {
				x: `+=${Math.random() * 400 - 200}`,
				y: `+=${Math.random() * 400 - 200}`,
				width: `+=${Math.random() * 100 - 50}`,
				height: `+=${Math.random() * 100 - 50}`,
				rotation: `+=${Math.random() * 180 - 90}`,
				duration: 3 + Math.random() * 4,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: i * 0.2
			});
		});
	});
</script>

{#if showAnimation}
	<div class="background-animation">
		{#each Array(12) as _, i}
			<div class="animated-box" bind:this={boxes[i]}></div>
		{/each}
	</div>
{/if}

<div class="app-content" class:with-animation={showAnimation}>
	{@render children()}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.background-animation {
		position: fixed;
		inset: 0;
		background: linear-gradient(135deg, #305e49 0%, #4b8fa2 100%);
		z-index: 0;
		pointer-events: none;
	}

	.animated-box {
		position: absolute;
		border-radius: 12px;
		backdrop-filter: blur(2px);
		will-change: transform, width, height;
	}

	.animated-box:nth-child(1) {
		background: rgba(255, 255, 255, 0.15);
	}
	.animated-box:nth-child(2) {
		background: rgba(255, 107, 107, 0.15);
	}
	.animated-box:nth-child(3) {
		background: rgba(78, 205, 196, 0.15);
	}
	.animated-box:nth-child(4) {
		background: rgba(255, 195, 113, 0.15);
	}
	.animated-box:nth-child(5) {
		background: rgba(199, 121, 208, 0.15);
	}
	.animated-box:nth-child(6) {
		background: rgba(130, 204, 221, 0.15);
	}
	.animated-box:nth-child(7) {
		background: rgba(255, 159, 243, 0.15);
	}
	.animated-box:nth-child(8) {
		background: rgba(162, 155, 254, 0.15);
	}
	.animated-box:nth-child(9) {
		background: rgba(255, 218, 121, 0.15);
	}
	.animated-box:nth-child(10) {
		background: rgba(118, 255, 163, 0.15);
	}
	.animated-box:nth-child(11) {
		background: rgba(255, 138, 101, 0.15);
	}
	.animated-box:nth-child(12) {
		background: rgba(154, 236, 219, 0.15);
	}

	.app-content {
		position: relative;
		z-index: 1;
		width: 100vw;
		height: 100vh;
	}

	.app-content.with-animation {
		/* Content is on launch screen - no background needed */
	}

	.app-content:not(.with-animation) {
		/* Content is on editor - add white background */
		background: #111;
	}
</style>
