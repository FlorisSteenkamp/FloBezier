
import { fastExpansionSum, calculateSum, twoProduct, twoDiff } from "flo-numerical";


/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates. 
 * 
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics - 5,5,3)
 * * max bitlength increase === max shift === 3 (for quadratics - 3,2)
 * * max bitlength increase === max shift === 1 (for lines - 1)
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDx(ps: number[][]): number[] {
	if (ps.length === 4) {
		let [[x0,], [x1,], [x2,], [x3,]] = ps;
		return [
			3*(x3 + 3*(x1 - x2) - x0), // t^2 - max bitlength increase 5
			6*(x2 - 2*x1 + x0),        // t^1 - max bitlength increase 5
			3*(x1 - x0)                // t^0 - max bitlength increase 3
		];
		// if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
		// max(dx)(t) <= 6*X for all t.
		// A tight bound occurs when -x0,x1,-x2,x3 === X and t === 1.
		// e.g. for X === 1,    max(dx)(t) === 6
		//      for x === 1024, max(dx)(t) === 6*1024 === 6144
	} 
	
	if (ps.length === 3) {
		let [[x0,], [x1,], [x2,]] = ps;
		return [
			2*(x2 - 2*x1 + x0), // t^1 - max bitlength increase 3
			2*(x1 - x0),        // t^0 - max bitlength increase 2
		];
		// if x0,x1,x2 <= X (for some X) and t is an element of [0,1], then
		// max(dx)(t) <= 4*X for all t.
	} 
	
	if (ps.length === 2) {
		let [[x0,], [x1,]] = ps;
		return [
			x1 - x0,  // t^0 - max bitlength increase 1
		];
		// if x0,x1 <= X (for some X) and t is an element of [0,1], then
		// max(dx)(t) <= 2*X for all t.
	}

	throw new Error('The bezier curve must be of order 1, 2 or 3.');
}


/**
 * Returns the exact derivative of the power basis representation of a line, 
 * quadratic or cubic bezier's x-coordinates. 
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
function getDxExact(ps: number[][]): number[][] {
	if (ps.length === 4) {
		let [[x0,], [x1,], [x2,], [x3,]] = ps;
		return [
			//3*x3 - 9*x2 + 9*x1 - 3*x0,
			calculateSum([
				twoProduct(3,x3), 
				twoProduct(-9,x2), 
				twoProduct(9,x1), 
				twoProduct(-3,x0)
			]),
			//6*x2 - 12*x1 + 6*x0,
			calculateSum([
				twoProduct(6,x2), 
				twoProduct(-12,x1), 
				twoProduct(6,x0)
			]),
			//3*x1 - 3*x0
			calculateSum([
				twoProduct(3,x1), 
				twoProduct(-3,x0)
			])
		];
	} 
	
	if (ps.length === 3) {
		let [[x0,], [x1,], [x2,]] = ps;
		return [
			//2*x2 - 4*x1 + 2*x0,
			calculateSum([
				[2*x2], [-4,x1], [2*x0]
			]),
			//2*x1 - 2*x0,
			fastExpansionSum([2*x1], [-2,x0])
		];
	} 
	
	if (ps.length === 2) {
		let [[x0,], [x1,]] = ps;
		return [
			//x1 - x0,
			twoDiff(x1, x0)
		];
	}

	throw new Error('The bezier curve must be of order 1, 2 or 3.');
}


export { getDx, getDxExact }
