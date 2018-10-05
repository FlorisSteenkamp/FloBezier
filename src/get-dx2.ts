
import Poly from 'flo-poly';
import Memoize from 'flo-memoize';

import { getX2 } from './get-x2';

const memoize = Memoize.m1;


/**
 * Returns the derivative of the power basis representation of the bezier's 
 * x-coordinates. This function is memoized on its points parameter by object 
 * reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 */
let getDx2 = memoize((ps: number[][]) => Poly.differentiate(getX2(ps)));


export { getDx2 }
