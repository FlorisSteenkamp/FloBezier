import { cross, dot, toUnitVector } from "flo-vector2d";


const 𝜋 = Math.PI;
const asin = Math.asin;
const acos = Math.acos;


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
 * @param a the first 2d vector
 * @param b the second 2d vector
 */
function getInterfaceRotation(
        a: number[],
        b: number[]): number {

	if ((a[0] === 0 && a[1]) === 0 || (b[0] === 0 && b[1])) {
		return 0;  // zero vector
	}

	const au = toUnitVector(a);
	const bu = toUnitVector(b);
	let cross_ = cross(au, bu);
	let dot_ = dot(au, bu);

	// clip `dot_` and `cross_` to ensure `acos` and `asin` exists. (The -1 and
	// +1 might be overstepped due to inexact calculations during the calls to
	// `toUnitVector` and is not avoidable in double precision)
	if (cross_ < -1) { cross_ = -1; }
	if (cross_ > +1) { cross_ = +1; }
	if (dot_ < -1) { dot_ = -1; }
	if (dot_ > +1) { dot_ = +1; }

	// if `sgn >= 0` then the dot product is numerically more stable, else
	// the cross product is more stable.
	const sgn = au[0]*au[1]*bu[0]*bu[1];
	let θ: number;
	return dot_ >= 0
		? cross_ >= 0
			? θ = sgn >= 0 ? +acos(dot_) : asin(cross_)   // 1st quadrant
			: θ = sgn >= 0 ? -acos(dot_) : asin(cross_)  // 4th quadrant
		: cross_ >= 0 
			? θ = sgn >= 0 ? +acos(dot_) : +𝜋 - asin(cross_)   // 2nd quadrant
			: θ = sgn >= 0 ? -acos(dot_) : -𝜋 - asin(cross_) // 3rd quadrant
}


export { getInterfaceRotation }
