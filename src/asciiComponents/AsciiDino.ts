function AsciiDino(x: number, y: number) {

  const OVER_SCORE = '\u203E'

  const dinoString = 
`   ,───,
.  |• _|
|\\_/ /
 \\  /\`
  |‾|`;

  const dinoStringLeft = 
`   ,───,
.  |• _|
|\\_/ /
 \\  /\`
  \\‾|`;
    const dinoStringRight = 
`   ,───,
.  |• _|
|\\_/ /
 \\  /\`
  |‾\\`;
    const dinoEmptyString = 
`        
        
        
      
     `;
     
    let width = 8;
    let height = 5;
    let leftLegBent = false

	return {
		x,
        y,
        dinoString,
        dinoEmptyString,
        width,
        height,
        leftLegBent,
        dinoStringLeft,
        dinoStringRight
	};
}

export default AsciiDino;
