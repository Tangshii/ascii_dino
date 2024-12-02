<script lang="ts">
	import AsciiGame from './AsciiGame';
	import { onMount } from 'svelte';

	const minFontPx = 2
	const maxFontPx = 20

	let gameStarted = false;

	let string = ""
	// $: string = asciiGame.getString();

	onMount(() => {

		function updateCallback() {
			string = asciiGame.getString();
		}

		// let screenWidth = window.screen.width;
		// if(window.screen.height > screenWidth ) {
		// 	screenWidth = window.screen.height
		// }

		let screenWidth = window.screen.height;

		console.log("screenWidth: " + screenWidth);

		document.body.style.fontSize = "8px"
		let currentFontSize = document.body.style.fontSize ;
		const num = parseInt(currentFontSize); // num = 123
		console.log("currentFontSize: " + num);

		let newFontSize = Math.floor(screenWidth / 100) + "px"
		document.body.style.fontSize = newFontSize
		console.log("NEW currentFontSize: " + newFontSize);

		let rowCharCount = Math.floor(getCharsPerLine()*.96);
		console.log("rowCharCount before: " + rowCharCount);
		if(rowCharCount % 2 != 0) {
			rowCharCount--
		}
		console.log("rowCharCount: " + rowCharCount);
		
		let asciiGame = AsciiGame(rowCharCount, 16, updateCallback);

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

	function getCharsPerLine() {
		const testElement = document.createElement('pre');
		testElement.style.position = 'absolute';
		testElement.style.visibility = 'hidden';
		testElement.style.whiteSpace = 'nowrap';
		testElement.innerText = 'MMMM';
		document.body.appendChild(testElement);
		const charWidth = testElement.offsetWidth;
		const screenWidth = window.innerWidth;
		document.body.removeChild(testElement);
		return Math.floor(screenWidth / charWidth)*4;
	}
	
</script>

<main>
	<pre class="unselectable">{string}</pre>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		font-size: 8px;
		padding: 0px;
		margin: 0px;
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
		line-height: 1.2em;
		padding: 0px;
		margin: 1em;
		font-family: "Cousine";

	}
	
	@font-face {
		font-family: 'Cousine';
		font-style: normal;
		font-display: swap;
		font-weight: 400;
		src: url($lib/fonts/Cousine-Regular.ttf);
		unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;

	}
</style>
