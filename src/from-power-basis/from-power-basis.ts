/**
 * Returns the Bernstein basis representation (i.e. control points) of a line, 
 * quadratic or cubic bezier given its power bases. 
 * * **non-exact** - due to floating-point round-off (see implementation to 
 * understand under what conditions the result would be exact)
 * 
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the 
 * x-coordinate coefficients given first (as an array representing the 
 * polynomial from highest to lowest power coefficient), e.g. `[[1,2,3,4], 
 * [5,6,7,8]]` represents a cubic parametric curve given by 
 * `x(t) = t^3 + 2t^2 + 3t^3 + 4t^4, y(t) = 5t^3 + 6t^2 + 7t + 8`.
 * 
 * @doc
 */
function fromPowerBasis(cs: number[][]): number[][] {
	const len = cs[0].length;

	if (len === 4) {
        const [[a3, a2, a1, a0], [b3, b2, b1, b0]] = cs;
		return [
			[a0,
			 b0],
			[a0 + a1/3,
			 b0 + b1/3],			 
			[a0 + 2*a1/3 + a2/3,
			 b0 + 2*b1/3 + b2/3],			 
			[a0 + a1 + a2 + a3, 
			 b0 + b1 + b2 + b3]
		];
	} 
	
	if (len === 3) {
		const [[a2, a1, a0], [b2, b1, b0]] = cs;
		return [
			[a0,
			 b0],
			[a0 + a1/2,
			 b0 + b1/2],
			[a0 + a1 + a2,
			 b0 + b1 + b2]
		];
	} 
	
	if (len === 2) {
		const [[a1, a0], [b1, b0]] = cs;
		return [
			[a0,
			 b0],
			[a0 + a1,
			 b0 + b1]
		];
	}

	if (len === 1) {
		const [[a0], [b0]] = cs;
		return [
			[a0,
			 b0]
		];
	}

	throw new Error('The given bezier curve is invalid.');
}


export { fromPowerBasis }
