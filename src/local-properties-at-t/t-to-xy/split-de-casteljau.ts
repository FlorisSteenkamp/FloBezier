

// TODO - complete implementations of other orders, etc.

/**
 * * see [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * 
 * @internal
 */
function splitDeCasteljau3(cs: number[], t: number): number[][] {
	if (t === 0) { 
		const cs0 = cs[0];
		return [[cs0, cs0, cs0, cs0], cs]; 
	}
	if (t === 1) { 
		const cs3 = cs[3];
		return [cs, [cs3, cs3, cs3, cs3]]; 
	}

	const s = 1-t;

	// j === 0, ..., n (with n === 3 -> cubic bezier)
	const b00 = cs[0]; // i === 0 
	const b10 = cs[1]; // i === 1 
	const b20 = cs[2]; // i === 2 
	const b30 = cs[3]; // i === 3 

	// j === 1
	const b01 = (b00 * s) + (b10 * t) // i === 0
	const b11 = (b10 * s) + (b20 * t) // i === 1
	const b21 = (b20 * s) + (b30 * t) // i === 2

	// j === 2
	const b02 = (b01 * s) + (b11 * t) // i === 0
	const b12 = (b11 * s) + (b21 * t) // i === 1

	// j === 3
	const b03 = (b02 * s) + (b12 * t) // i === 0

	return [[b00, b01, b02, b03], [b03, b12, b21, b30]];
}


export { splitDeCasteljau3 }
