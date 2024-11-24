function AsciiCatus(x: number, y: number) {

    const cactusString = 
`  |‾|/)
(\\| |/
 \\| |
--| |--`;
      const cactusEmptyString = 
`              
       
       
      `;

       	const string =
`---^^^---"""---'''---'‾'---._.--`

const cactusEmptyNoLine = 
`              
       
       
       `;

	return {
		x,
        y,
        cactusString: cactusString,
        cactusEmptyString: cactusEmptyString
	};
}

export default AsciiCatus;
