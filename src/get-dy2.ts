
import Poly from 'flo-poly';
import Memoize from 'flo-memoize';

import { getY2 } from './get-y2';

const memoize = Memoize.m1;


/**
 * Returns the derivative of the power basis representation of the bezier's 
 * y-coordinates. This function is memoized on its points parameter by object 
 * reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @returns The differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getDy2 = memoize((ps: number[][]) => Poly.differentiate(getY2(ps)));


export { getDy2 }
