<script lang="ts">
	import AsciiGame from './AsciiGame';
	import { onMount } from 'svelte';

	export let rowAmount;
	export let colAmount;

	let gameStarted = false;
	let asciiGame = AsciiGame(rowAmount, colAmount, updateCallback);

	function updateCallback() {
		string = asciiGame.getString();
	}

	let string = ""
	// $: string = asciiGame.getString();

	onMount(() => {
		let frameCount = 0;
		function loop() {
			frameCount++;
			asciiGame.onTick(frameCount);
			string = asciiGame.getString();
			if(frameCount >= Number.MAX_VALUE) { // reset just in case
				frameCount = 0;
			}
			window.requestAnimationFrame(loop);
		}

		document.addEventListener('keydown', (event) => {
			callJump()
		});

		document.addEventListener('touchstart', (event) => {
			callJump()
		});

		document.addEventListener('click', (event) => {
			callJump()
		});

		function callJump() {
			if(!gameStarted) {
				window.requestAnimationFrame(loop);
				gameStarted = true;
			}
			asciiGame.jump();
		}

		asciiGame.paintInitialDino()
		string = asciiGame.getString()
	});
	
</script>

<main>
	<pre class="unselectable">{string}</pre>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		/* font-size: 8pt; */
		font-size: 8pt;

	}
	:global(html),
	:global(body) {
		touch-action: none;
	}
	.unselectable {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	pre {
		display: flex;
		justify-content: center;
		font-family: 'Roboto Mono';
		line-height: 1.2em;
	}
</style>
