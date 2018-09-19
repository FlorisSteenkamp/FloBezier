
import Poly from 'flo-poly';

import { getY } from './get-y';


/**
 * Returns the bezier t values of the intersection between the given cubic 
 * bezier and the given horizontal line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtY(ps: number[][], y: number): number[] {
	// Translate ps so that y = 0.
	ps = ps.map(p => [p[0],p[1]-y]);

	// Find the intersection t values
	return Poly.allRoots(getY(ps),0,1);
}


export { tsAtY }
