import AsciiDino from './AsciiDino';
import AsciiGrid from './AsciiGrid';
import AsciiCactus from "./AsciiCactus";
import AsciiCloud from './AsciiCloud';
import AsciiSun from './AsciiSun';
import AsciiGround from './AsciiGround';

function AsciiGame(rowAmount: number, colAmount: number, updateCallback: Function) {
	let asciiGrid = AsciiGrid(rowAmount, colAmount);
	let dino = AsciiDino(3, colAmount-6);

	let cactus1 = AsciiCactus(rowAmount, colAmount-4)
	let cactus2 = AsciiCactus(rowAmount* 1.5, colAmount-4)
	let cactusList = [cactus1]

	let cloudList = [
		AsciiCloud(rowAmount), 
	]

	let sun = AsciiSun(rowAmount, 0)

	const JUMP_MAX = 10;
	let jumpCount = 0;
	let isCollision = false;
	let ground: string[] = []
	let groundLine: string[] = []

	let score = 0;

	let gameOverString =
`G A M E  O V E R
     ┌─> ─┐
     │    │
     └────┘`
	 let gameOverEmptyString =
`                
           
           
           `
	
	function getString() {
		return asciiGrid.getString();
	}

	let frameCount = 0;
	function onTick(frameCountParam: number) {
		frameCount = frameCountParam;
		if(isCollision) {
			return
		}

		paintGroundLine()
		// paintGround()
		
		// if(frameCount % 16 == 0) {
		// 	paintSun()
		// }

		// if(frameCount % 4 == 0) {
		// 	paintClouds()
		// }
		
		paintCatusList()
 
		paintDino()

		checkCollisions()

		// updateCallback()
	}
	
	function paintSun() {
		paintWithLineBreak(sun.emptyString, sun.x, sun.y)
		if(sun.x > -11) { // 11 to clear frame
			sun.x--
		} else {
			sun.x = rowAmount
			score++
			paintScore()
		}
		paintWithLineBreak(sun.string, sun.x, sun.y,)
	}

	function paintCatusList() {
		for(let cactus of cactusList) {
			paintWithLineBreak(cactus.cactusEmptyString, cactus.x, cactus.y)
			if(cactus.x > - 6) { // 6 to clear frame
				cactus.x--
			} else {
				cactus.x = rowAmount
				score++
				paintScore()
			}
			paintWithLineBreak(cactus.cactusString, cactus.x, cactus.y,)
		};
	}

	function paintScore() {
		let scoreString = score+""
		asciiGrid.replaceStringAt2d(scoreString, rowAmount-scoreString.length-1, 0)
	}

	function paintInitialDino() {
		paintWithLineBreak(dino.dinoString, dino.x, dino.y)
	}

	function paintDino() {
		let isJumping = dino.y + 5 < colAmount;
		if(frameCount % 3 == 0 && isJumping) { // is jumping
			paintWithLineBreak(dino.dinoEmptyString, dino.x, dino.y)
			if(jumpCount > 0 && jumpCount < JUMP_MAX) {
				// going up
				jumpCount++
				dino.y--
			} else {
				// going down
				jumpCount = 0
				dino.y++
			}	
			paintWithLineBreak(dino.dinoString, dino.x, dino.y)
		} else {
			if(dino.leftLegBent) {
				paintWithLineBreak(dino.dinoStringLeft, dino.x, dino.y)
			} else {
				paintWithLineBreak(dino.dinoStringRight, dino.x, dino.y)
			}
			if(frameCount % 12 == 0) {
				dino.leftLegBent = !dino.leftLegBent
			}
		}
		paintLinesUnderDino(isJumping )
	}

	function paintLinesUnderDino(isJumping: boolean) {
		// if(isJumping) {
			// asciiGrid.replaceStringAt2d("-----", 3, colAmount-1)
		// } else {
			paintWithLineBreak("--", 3, colAmount-1 )
		// }
	}

	function dinoJump() {
		if(isCollision) {
			restartGame()
		}
		paintWithLineBreak(dino.dinoEmptyString, dino.x, dino.y)
		dino.y -= 1;
		jumpCount++;
		paintWithLineBreak(dino.dinoString, dino.x, dino.y)
	}

	function restartGame() {
		for(let cactus of cactusList) {
			paintWithLineBreak(cactus.cactusEmptyString, cactus.x, cactus.y)
		}
		cactus1.x = rowAmount
		cactus2.x = rowAmount * 1.5
		isCollision = false
		score = 0
		for (let i = 0; i < rowAmount; i++) {
			asciiGrid.replaceCharAt2d(' ', i, 0);
		}
		paintScore()
		asciiGrid.replaceStringAt2dWithLineBrake(gameOverEmptyString, rowAmount/2-1-8, colAmount/2-1)
		return
	}

	function checkCollisions() {
		let dinoCoords = getCoordsList(dino.dinoString, dino.x, dino.y)
		cactusList.forEach((cactus) => {
			let cactusCoords = getCoordsList(cactus.cactusString, cactus.x, cactus.y)
			if(containsAny(cactusCoords, dinoCoords)) {
				isCollision = true;
				paintWithLineBreak(dino.dinoString, dino.x, dino.y) // paint dino so he's on top of cactus
				asciiGrid.replaceCharAt2d("⚬", dino.x + 4, dino.y + 1 ) // paint dead eyeball
				asciiGrid.replaceStringAt2dWithLineBrake(gameOverString, rowAmount/2-1-8, colAmount/2-1)
			}
		})
		// cloudList.forEach((cloud) => {
		// 	if(cloud.isVisible) {
		// 		let cloudCoords = getCoordsList(cloud.string, cloud.x, cloud.y)
		// 		if(containsAny(cloudCoords, dinoCoords)) {
		// 			cloud.isVisible = false
		// 			score++
		// 			paintScore()
		// 		}
		// 	}
		// })
	}

	function paintGround() {
		ground.push(generateRandomGroundChar())
		if(ground.length > rowAmount) {
			ground.shift()
		}
		paintWithLineBreak(ground.join(""), 0, colAmount)
	}

	function paintGroundLine() {
		if(frameCount % 3 == 0) {
			groundLine = groundLine.concat(AsciiGround().string)
		}
		if(groundLine.length > rowAmount) {
			groundLine.shift()
		}
		paintWithLineBreak(groundLine.join(""), 0, colAmount-1) //8 is at dino's feet
	}
	
	let cloudNextInteval = generateVariance(rowAmount/2, -rowAmount/3, 0)

	function paintClouds() {
		cloudList.forEach((cloud, index) => {
			paintWithLineBreak(cloud.emptyString , cloud.x, cloud.y)
			if(cloud.x > -11) { // 6 to clear frame
				cloud.x--
			} else { 
				cloudList.splice(index,1) // remove
			}
			if(cloud.isVisible) {
				paintWithLineBreak(cloud.string, cloud.x, cloud.y,)
			}
		});

		if(cloudNextInteval <= 0) {
			cloudNextInteval = generateVariance(rowAmount/2, -rowAmount/3, 0)
			cloudList.push(AsciiCloud(rowAmount)) 
		} else {
			cloudNextInteval--
		}

	}

	function generateVariance(center: number, lower: number = 0, upper: number = 0) {
		return center + randomNum(lower, upper)
	}

	function generateRandomGroundChar() {
		const chars = "  .  _  -  '  ";
		return chars.charAt(Math.floor(Math.random() * chars.length));
	  }

	function containsAny(arr1: string[], arr2: string[]) {
		return arr1.some(item => arr2.includes(item));
	}

	function randomNum(min: number, max: number) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function paintWithLineBreak(string:string, x:number, y:number) {
		asciiGrid.replaceStringAt2dWithLineBrake(string, x, y)
	}

	function getCoordsList(string: string, x: number, y: number) {
		let coords: string[] = []
		let dervY = y;
		let dervX = x;
		for (let i = 0; i < string.length; i++) {
			dervX++;
			let char = string.charAt(i);
			if(char === "\n") {
				dervY++;
				dervX = x;
			}else if(char === " ") {
				
			} else {
				coords.push( dervX + "-" + dervY)
			}
		}
		return coords;
	} 

	return {
		onTick,
		getString,
		jump: dinoJump,
		paintInitialDino
	};
}

export default AsciiGame;
