
import { getLineEquation } from './get-line-equation';


/**
 * @private
 * @param l 
 */
function getDistanceToLineFunction(l: number[][]): (p: number[]) => number {
	let [a,b,c] = getLineEquation(l);

	return function(p: number[]) {
		return a*p[0] + b*p[1] + c;
	}
}


export { getDistanceToLineFunction }
