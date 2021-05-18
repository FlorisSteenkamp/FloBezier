
/**
 * @private
 * @param l 
 */
function getDistanceToLineFunction(
		p1: number[],
		p2: number[]): (p: number[]) => number {

	//let [a,b,c] = getLineEquation(l);
	//let [[x1,y1],[x2,y2]] = l;
	//const le = getLineEquation(l);
	//const a = le[0];
	//const b = le[1];
	//const c = le[2];	

	//unrolled
	const x1 = p1[0];
	const y1 = p1[1];
	const x2 = p2[0];
	const y2 = p2[1];
	let s = y1-y2;
	let t = x2-x1;
	let u = x1*y2 - x2*y1;

	let d = Math.sqrt(s**2 + t**2);

	const ss = s/d;
	const tt = t/d;
	const uu = u/d;

	return function(p: number[]) {
		return ss*p[0] + tt*p[1] + uu;
	}

	//return [s/d, t/d, u/d];
}


/**
 * Get the implicit line equation from two 2d points in the form f(x,y) := ax + by + c = 0
 * returned as the array [a,b,c].
 * @param l A line given by two points, e.g. [[2,0],[3,3]]
 */
function getLineEquation(l: number[][]): number[] {
	let [[x1,y1],[x2,y2]] = l;
	
	let s = y1-y2;
	let t = x2-x1;
	let u = x1*y2 - x2*y1;

	let d = Math.sqrt(s**2 + t**2);

	return [s/d, t/d, u/d];
}


export { getDistanceToLineFunction }
