
import Poly from 'flo-poly';

import { getX } from './get-x';


/**
 * Returns the bezier t values of the intersection between the given cubic 
 * bezier and the given vertical line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtX(ps: number[][], x: number): number[] {
	// Translate ps so that x = 0.
	ps = ps.map(p => [p[0]-x,p[1]]);

	// Find the intersection t values
	return Poly.allRoots(getX(ps),0,1);
}


export { tsAtX }
