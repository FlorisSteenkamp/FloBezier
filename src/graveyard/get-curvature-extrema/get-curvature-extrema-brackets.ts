
/** @internal */
type Brackets = { brackets: number[][], inflections: number[] };

const none: Brackets = { brackets: [], inflections: [] };


/**
 * Calculates the curvature extrema brackets of the given cubic bezier curve.
 * 
 * See [*D.J. Walton, D.S. Meek*, Curvature extrema of planar parametric polynomialcubic curves](https://www.sciencedirect.com/science/article/pii/S037704270000529X)
 * 
 * Naming conventions are roughly as in the paper above.
 * @param ps 
 * 
 * @internal
 */
function getCurvatureExtremaBrackets(ps: number[][]): Brackets {

	// From the paper:
	// ---------------
	// All curves has exactly one of 4 cases:
	//
	// 1. It has a single inflection point and exactly 2 curvature maxima 
	//    (symmetrically positioned about inflection point). This is the 
	//    case if dif === 0 in above code.
	// 2. It has a single cusp
	// 3. It has a point of self-intersection - occurs if d < 0 in paper.
	// 4. It has 2 inflection points, no cusps, no self-intersections.
	//    It can have either 3 or 5 curvature extrema
	//    a. The case of 5 curvature extrema is ignored for now - in the 
	//       paper it is mentioned to even find such a curve is difficult 
	//       and it seems such curves have very sharp curvature at one point. 
	//       But this case should later be included or we'll miss some points.
	//    b. There are 3 curvature extrema:
	//       Extrema occur in the range (-inf, -sqrt(d)), 
	//       (-sqrt(d), sqrt(d)), (sqrt(d), inf). 		

	const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
		
	// Bezier points translated to origin;
	const P1x = x1 - x0; 
	const P1y = y1 - y0;
	const P2x = x2 - x0; 
	const P2y = y2 - y0;
	const P3x = x3 - x0; 
	const P3y = y3 - y0;
	
	// Distance to consecutive points
	let W0x = P1x;
	let W1x = P2x - P1x;
	let W2x = P3x - P2x;
	let W0y = P1y;
	let W1y = P2y - P1y;
	let W2y = P3y - P2y;

	// We need not entertain the quadratic case as it *will* be taken care of
	// in `getCurvatureExtrema`
	// Check for degenerate case in which cubic curve becomes quadratic. 
	//if ((Math.abs(W_0x - 2*W_1x + W_2x) < DELTA) && 
	//	  (Math.abs(W_0y - 2*W_1y + W_2y) < DELTA)) {
	// no need to implement
	//}
	
	// Rotate curve so that W0 - 2W1 + W2 = (0, (1/3)a), a != 0
	const atan_numer = P3x - 3*P2x + 3*P1x;
	const atan_denom = P3y - 3*P2y + 3*P1y;
	const atan_numer_squared = atan_numer * atan_numer;
	const atan_denom_squared = atan_denom * atan_denom;
	const rad = Math.sqrt((atan_numer_squared / atan_denom_squared) + 1);
	const cos_theta = 1/rad;
	let sin_theta;
	if (cos_theta === 0) { // edge case
		sin_theta = 1;
	} else {
		sin_theta = atan_numer / (atan_denom * rad);	
	}
	
	
	// Here we skip expensive trig evaluations
	let R_1x = P1x*cos_theta - P1y*sin_theta;
	let R_1y = P1x*sin_theta + P1y*cos_theta; 
	let R_2x = P2x*cos_theta - P2y*sin_theta;
	let R_2y = P2x*sin_theta + P2y*cos_theta;			
	let R_3x = P3x*cos_theta - P3y*sin_theta;
	let R_3y = P3x*sin_theta + P3y*cos_theta;
	

	// Modify W_0x, etc. to be correct for new rotated curve 
	W0x = R_1x;
	W1x = R_2x - R_1x;
	W2x = R_3x - R_2x;
	W0y = R_1y;
	W1y = R_2y - R_1y;
	W2y = R_3y - R_2y;
	
	const a =  3 * (W0y - 2*W1y + W2y);
	let dif = W1x - W0x;  // === R_2x - 2*R_1x;
	if (dif === 0) {
		// Case 1 (special) - W1x - W0x === 0
		// Degenerate to a cubic function (as opposed to parametric cubic)
		
		if (W0x === 0) {
			// We have a straight line x=0!
			return none;
		}

		if (W0x < 0) {
			// Reflect curve accross y-axis to make dif > 0
			R_1x = -R_1x;
			R_2x = -R_2x;
			R_3x = -R_3x;
			
			// Modify W_0x, etc. to be correct for new reflected 
			W0x = -W0x;
			W1x = -W1x;
			W2x = -W2x;
		}

		// TODO - finish

		return none; // WRONG!
	} 

	// Case 2 (usual) - W_1x - W_0x !== 0
		
	if (dif < 0) {
		// Reflect curve accross y-axis to make dif > 0
		R_1x = -R_1x;
		R_2x = -R_2x;
		R_3x = -R_3x;
		
		// Modify W_0x, etc. to be correct for new reflected 
		W0x = -W0x;
		W1x = -W1x;
		W2x = -W2x;
		
		dif = -dif; 
	}
	
	const μ = 6*dif;
	const λ = (3*a*W0x) / (μ*μ);
	const γ1 = (3*a*W0y) / (μ*μ); 
	const γ2 = (3*(W1y - W0y)) / (μ);
	const d = λ*λ - 2*γ2*λ + γ1; 
	const b = 2*(γ2 - λ);
	
	const deParamBoundary = deParameterizeBoundary(λ, μ, a);
	const deParam = deParameterize(λ, μ, a);
	
	if (d > 0) {
		const ssigd_ = Math.sqrt(d);
		
		// de-reparametize
		// Note: the sda and sdb here are the inflection points forcase iv! 
		// there are easier ways to calculate these
		const sda = -ssigd_;
		const sdb = ssigd_;

		const brackets = 
			[
				[Number.NEGATIVE_INFINITY, sda], 
				[sda,sdb], 
				[sdb,Number.POSITIVE_INFINITY]
			]
			.map(deParamBoundary)
			.map(clipBoundary);

		const inflections = 
			[deParam(sda), deParam(sdb)].filter(v => v > 0 && v < 1);
		//console.log(inflections)

		return { brackets, inflections };
	} else if (d < 0) {
		// It is a loop 
		// Note: The loop intersection may be outside t=[0,1] but curvature 
		// maxima may still occur inside t=[0,1] of course.
		// There can be 1 or 3 maxima of curvature.
		
		const ξ1_ = 2*b*b - 8*d - 3;
		
		if (ξ1_ < 0) {
			const brackets = [ [0, Math.sqrt(-3*d)] ]
				.map(deParamBoundary)
				.map(clipBoundary);

			return { brackets, inflections: [] };
		} else {
			const ξ2_ =  Math.sqrt(5*ξ1_);
			const ξ1 = (-5*b - ξ2_) / 10; 				
			const ξ2 = (-5*b + ξ2_) / 10;
			
			const brackets = [ 
				[Number.NEGATIVE_INFINITY, ξ1], 
				[ξ1, Math.min(0, ξ2)], 
				[Math.max(0, ξ2), Math.sqrt(-3*d)]  
			]
			.map(deParamBoundary)
			.map(clipBoundary);

			return { brackets, inflections: [] };
		}
	} else if (d === 0) {
		// TODO - It is a cusp - still to implement!
		return none;
	} else {
		return none; // NaN
	}
}


/**
 * Clips to [0,1] or returns undefined if not within [0,1].
 * @param range 
 * 
 * @internal
 */
function clipBoundary(range: number[]) {
	let [a,b] = range;
	
	if ((a < 0 && b < 0) || (a > 1 && b > 1)) {
		return undefined;
	}
	
	if (a < 0) { a = 0; }	if (a > 1) { a = 1; }				
	if (b < 0) { b = 0; }	if (b > 1) { b = 1; }				
	
	return [a,b];
}


/**
 * 
 * @param λ
 * @param μ 
 * @param a 
 * 
 * @internal
 */
function deParameterize(λ: number, μ: number, a: number) {
	return (σ: number) => (σ - λ) * (μ / a);	
}


/**
 * 
 * @param λ 
 * @param μ 
 * @param a 
 */
function deParameterizeBoundary(λ: number, μ: number, a: number) {
	return (boundary: number[]) => boundary.map(deParameterize(λ, μ, a));	
}


export { getCurvatureExtremaBrackets }
