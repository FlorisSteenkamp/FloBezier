import { twoProduct } from "double-double";
import { ddAddDd as ddAddDd_ } from "double-double";
import { ddDiffDd as ddDiffDd_ } from "double-double";

const tp = twoProduct;
const ddAddDd = ddAddDd_;
const ddDiffDd = ddDiffDd_;

const { atan2 } = Math;


/**
 * Returns the rotation angle (-𝜋 <= θ <= 𝜋 *guaranteed*) from some vector to 
 * another vector considering them to both start at the same point.
 * 
 * If one of the vectors is the zero vector then `0` is returned.
 * 
 * It can also be imagined that the 2nd vector starts where the 1st one ends.
 * 
 * Intermediate calculations are done in double precision in a numerically 
 * stable manner.
 * 
 * @param a the first 2d vector given as `[x,y]` where `x` and `y` are the 
 * coordinates, e.g. `[2,3]`
 * @param b the second 2d vector
 */
 function getInterfaceRotation(
		a: number[],
		b: number[]): number {

	const v1 = a[0];
	const v2 = a[1];
	const w1 = b[0];
	const w2 = b[1];

	// w2*v1 - w1*v2;
	const A = ddDiffDd(tp(w2,v1), tp(w1,v2))[1];
	// w1*v1 + w2*v2;
	const B = ddAddDd(tp(w1,v1), tp(w2,v2))[1];

	return atan2(A,B);
}


export { getInterfaceRotation }
