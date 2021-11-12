import { Horner } from 'flo-poly';
import { getDxy } from "../to-power-basis/get-dxy/double/get-dxy.js";
import { getDdxy } from "../to-power-basis/get-ddxy/double/get-ddxy.js";



/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. This function is curried.
 * 
 * * **alias**: [[curvature]]
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc mdx
 */
function curvature(ps: number[][], t: number): number;
function curvature(ps: number[][]): (t: number) => number;
function curvature(ps: number[][], t?: number) {
    const [dX,dY] = getDxy(ps);
    const [ddX,ddY] = getDdxy(ps);

	function f(t: number): number {
		const dx  = Horner(dX, t); 
		const dy  = Horner(dY, t); 
		const ddx = Horner(ddX, t); 
		const ddy = Horner(ddY, t); 
		
		const a = dx*ddy - dy*ddx;
		const b = Math.sqrt((dx*dx + dy*dy)**3);

		return a/b;
	}

	// Curry
	return t === undefined ? f : f(t);
}


/**
 * Alias for [[κ]].
 * 
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. This function is curried.
 * 
 * * **alias**: [[curvature]]
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc
 */
const κ = curvature;


export { κ, curvature }
