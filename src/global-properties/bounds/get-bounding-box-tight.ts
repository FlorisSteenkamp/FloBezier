
import { memoize } from "flo-memoize";
import { translateThenRotatePs, rotateThenTranslatePs, squaredDistanceBetween } from "flo-vector2d";
import { getBoundingBox } from "./get-bounding-box";
import { lengthSquaredUpperBound } from "../length/length-squared-upper-bound";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";


/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given 
 * order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.
 */
let getBoundingBoxTight = memoize(function(ps: number[][]) {
    let [xS, yS] = ps[0];
	let [xE, yE] = ps[ps.length-1];
	
	let sinθ: number;
	let cosθ: number;

	// take care of the case the endpoints are close together
	let len = lengthSquaredUpperBound(ps);
	if (squaredDistanceBetween(ps[0], ps[ps.length-1]) * 2**8 < len) {
		let [xE_, yE_] = evalDeCasteljau(ps, 0.5);
		let hypotenuse = Math.sqrt((xE_-xS)*(xE_-xS) + (yE_-yS)*(yE_-yS));
		sinθ = (yE_ - yS) / hypotenuse;
		cosθ = (xE_ - xS) / hypotenuse;
	} else {
		let hypotenuse = Math.sqrt((xE-xS)*(xE-xS) + (yE-yS)*(yE-yS));
		sinθ = (yE - yS) / hypotenuse;
		cosθ = (xE - xS) / hypotenuse;
	}
	
	let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
	
	let [[p0x,p0y],[p1x,p1y]] = box;

	let axisAlignedBox = [ 
		box[0], [p1x, p0y],
		box[1], [p0x, p1y]
	];

	let bb = rotateThenTranslatePs(
		sinθ, 
		cosθ,
		ps[0],
		axisAlignedBox
	);

	return bb;
});


/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point 
 * moved to origin and rotated so that last point lies on x-axis) given cubic 
 * bezier.
 * @ignore
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param sinθ - Sine of angle made by line from first bezier point to 
 * last with x-axis.
 * @param cosθ - Cosine of angle made by line from first bezier point 
 * to last with x-axis.
 * @returns Bounding box in the form [[minX, minY], [maxX,maxY]
 */
function getNormalizedBoundingBox(ps: number[][], sinθ: number, cosθ: number) {
	let vectorToOrigin = ps[0].map(x => -x);
	
	let boundingPs = translateThenRotatePs(
			vectorToOrigin, 
			-sinθ, 
			cosθ,
			ps 
	);
	
	return getBoundingBox(boundingPs);
}


export { getBoundingBoxTight }
