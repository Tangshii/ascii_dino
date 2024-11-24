function AsciiGrid(rowAmount: number, colAmount: number) {
	let asciChar = ' ';
	let string = '';

	createBlankGrid();
	createBorders();

	function createBlankGrid() {
		for (let i = 0; i <= colAmount; i++) {
			string += asciChar.repeat(rowAmount) + '\n';
		}
	}

	function createBorders() {
		// for (let i = 1; i < colAmount; i++) {
		// 	replaceCharAt2d('|', 0, i);
		// 	replaceCharAt2d('|', rowAmount - 1, i);
		// }
		// for (let i = 0; i < rowAmount; i++) {
		// 	replaceCharAt2d('-', i, 0);
		// 	replaceCharAt2d('-', i, colAmount);
		// }
		// replaceCharAt2d('+', 0, 0);
		// replaceCharAt2d('+', 0, colAmount);
		// replaceCharAt2d('+', rowAmount-1, 0);
		// replaceCharAt2d('+', rowAmount-1, colAmount);

		// for (let i = 0; i < rowAmount; i++) {
		// 	replaceCharAt2d('-', i, colAmount-1);
		// }
	}

	function replaceCharAt(char: string, index: number) {
		if (index < 0 || index > string.length) {
			return 'Index out of bounds';
		}
		let replacedChar = string.charAt(index);
		// if(replacedChar !== "\n") {
			string = string.slice(0, index) + char + string.slice(index + 1);
		// }
		return replacedChar;
	}


	function replaceCharAt2d(char: string, x: number, y: number) {
		let index = x + y * (rowAmount + 1);
		return replaceCharAt(char, index);
	}

	function replaceStringAt2d(string: string, x: number, y: number) {
		for (let i = 0; i < string.length; i++) {
			let char = string.charAt(i);
			let index = x + y * (rowAmount + 1) + i;
			replaceCharAt(char, index);
		}
	}

	function replaceStringAt2dWithLineBrake(string: string, x: number, y: number, log: boolean = false) {
		let lines = string.split("\n")
		lines.forEach((line: string, i) => {
			line.split('').forEach((char, j) => {
				let dervX = x + j
				if(dervX >= 0 && dervX < rowAmount ) {
					replaceCharAt2d(char,  dervX ,  y + i );
				}
			});
		})
	}

	function getCharAt2d(x: number, y: number) {
		let index = x + y * (rowAmount + 1);
		return string.charAt(index);
	}

	function getString() {
		return string;
	}

	return {
		replaceCharAt,
		replaceCharAt2d,
		getString,
		createBorders,
		replaceStringAt2d,
		replaceStringAt2dWithLineBrake
	};
}

export default AsciiGrid;
