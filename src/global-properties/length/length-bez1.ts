import { distanceBetween } from "flo-vector2d";


/**
 * @param interval 
 * @param ps 
 * 
 * @internal
 */
 function lengthBez1(
	 	interval: number[], ps: number[][]): number {

	let [t1, t2] = interval;
	if (t1 === t2) { return 0; }

	let [[x0, y0], [x1, y1]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0 === x1 && y0 === y1) { return 0; } 

	let p1 = [x0 + t1*(x1 - x0), y0 + t1*(y1 - y0)];
	let p2 = [x0 + t2*(x1 - x0), y0 + t2*(y1 - y0)];

	return distanceBetween(p1,p2);
}


export { lengthBez1 }
