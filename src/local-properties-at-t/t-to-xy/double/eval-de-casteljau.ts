/** 
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic.
 * 
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are 
 * double precision floating point numbers.
 * 
 * * max bit-aligned bitlength increase: ??? bits TODO
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 * 
 * @doc mdx
 **/
function evalDeCasteljau(
		ps: number[][], 
		t: number): number[] {

	if (t === 0) {
		return ps[0];
	} else if (t === 1) {
		return ps[ps.length-1];
	}

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;	

		const a01 = x0 + (x1 - x0)*t;
		const a11 = x1 + (x2 - x1)*t;
		const a21 = x2 + (x3 - x2)*t;
		const a02 = a01 + (a11 - a01)*t;
		const a12 = a11 + (a21 - a11)*t;
		const x = a02 + (a12 - a02)*t;

		const b01 = y0 + (y1 - y0)*t;
		const b11 = y1 + (y2 - y1)*t;
		const b21 = y2 + (y3 - y2)*t;
		const b02 = b01 + (b11 - b01)*t;
		const b12 = b11 + (b21 - b11)*t;
		const y = b02 + (b12 - b02)*t;

		return [x,y];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;	

		const a01 = x0 + (x1 - x0)*t;
		const a11 = x1 + (x2 - x1)*t;
		const x = a01 + (a11 - a01)*t;

		const b01 = y0 + (y1 - y0)*t;
		const b11 = y1 + (y2 - y1)*t;
		const y = b01 + (b11 - b01)*t;

		return [x,y];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;	

		const x = x0 + (x1 - x0)*t;
		const y = y0 + (y1 - y0)*t;

		return [x,y];
	}

	if (ps.length === 1) {
		return ps[0];	
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { evalDeCasteljau }
