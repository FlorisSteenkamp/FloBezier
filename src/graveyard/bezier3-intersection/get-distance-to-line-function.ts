
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


/**
 * Get the implicit line equation from two 2d points in the form f(x,y) := ax + by + c = 0
 * returned as the array [a,b,c].
 * @param l A line given by two points, e.g. [[2,0],[3,3]]
 */
function getLineEquation(l: number[][]): number[] {
	let [[x1,y1],[x2,y2]] = l;
	
	let a = y1-y2;
	let b = x2-x1;
	let c = x1*y2 - x2*y1;

	let d = Math.sqrt(a**2 + b**2);

	return [a/d, b/d, c/d];
}


export { getDistanceToLineFunction }
