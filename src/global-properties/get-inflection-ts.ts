
import { allRoots } from "flo-poly";
//import { evalDeCasteljau } from "../local-properties-at-t/t-to-xy/eval-de-casteljau";


/** 
 * Returns the given bezier's approximate inflection points. 
 **/
function getInflectionTs(ps: number[][]) {
	
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	
	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
	let ax = x1 - x0;				let ay = y1 - y0;
	let bx = x2 - x1 - ax;			let by = y2 - y1 - ay;
	let cx = x3 - x2 - ax - (2*bx);	let cy = y3 - y2 - ay - (2*by);
	
	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
	//   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
	// We find the roots of the quadratic - a,b,c are the quadratic coefficients
	let a = bx*cy - by*cx;
	let b = ax*cy - ay*cx;
	let c = ax*by - ay*bx;
	
	let inflectionTs = allRoots([a,b,c],0,1);
	
	//return inflectionTs.map(t => evalDeCasteljau(ps,t));

	return inflectionTs;
}


export { getInflectionTs }
