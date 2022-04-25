import { toPowerBasis_1stDerivative } from "../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { Horner } from 'flo-poly';


/**
 * Returns `ds` (the length differential) for a linear, quadratic or cubic 
 * bezier curve.
 * 
 * * this function is curried
 * 
 * @param ps an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value
 * 
 * @internal
 */
function ds(ps: number[][]) {
	const [dX,dY] = toPowerBasis_1stDerivative(ps);

	return function(t: number): number {
		const dx = Horner(dX, t);
		const dy = Horner(dY, t);
		
		return Math.sqrt(dx*dx + dy*dy);	
	}
}


export { ds }
