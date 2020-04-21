
import { linearToCubic } from "./linear-to-cubic";
import { quadraticToCubic } from "./quadratic-to-cubic";


/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 * @param ps An order 1, 2 or 3 bezier curve
 */
function toCubic(ps: number[][]) {
	if (ps.length === 2) { // Linear
		return linearToCubic(ps); 
	} else if (ps.length === 3) { // Quadratic
		return quadraticToCubic(ps); 
	} else if (ps.length === 4) { // Cubic
		return ps;
	}
}


export { toCubic }
