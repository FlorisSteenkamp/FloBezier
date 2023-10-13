import { allRoots, differentiate, Horner } from "flo-poly";
import { getAbsCurvatureExtremaPolys } from "./get-abs-curvature-extrema-polys.js";
import { isCollinear } from "../global-properties/classification/is-collinear.js";
import { isCubicReallyQuad } from "../global-properties/classification/is-cubic-really-quad.js";
import { cubicToQuadratic } from "../transformation/degree-or-type/cubic-to-quadratic.js";
import { getCurvatureExtremaQuadraticPoly } from './get-curvature-extrema-quadratic-poly.js';


/** 
 * Curve extrema
 * 
 * @doc
 */
interface Extrema {
    /** list of paramter t values where minima occur */
    minima: number[],
    /** list of paramter t values where maxima occur */
    maxima: number[],
    /** list of paramter t values where inflection points occur */
    inflections: number[]
}


/**
 * Returns the parameter `t` values (in `[0,1]`) of local minimum / maximum 
 * absolute curvature for the given bezier curve.
 * 
 * If there are an infinite number of such `t` values (such as is the case for a 
 * line), an empty array is returned.
 * 
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent 
 * answer on math.stackexchange
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function getCurvatureExtrema(ps: number[][]): Extrema {
    if (isCollinear(ps)) {
		return { minima: [], maxima: [], inflections: [] };
	}

	if (ps.length === 4 && isCubicReallyQuad(ps)) {
        ps = cubicToQuadratic(ps)!;
	}

	if (ps.length === 3) {
        const poly = getCurvatureExtremaQuadraticPoly(ps);
        const maxima = allRoots(poly, 0, 1);
        return {
            minima: [], 
            maxima, 
            inflections: []
        };
    }


    const polys = getAbsCurvatureExtremaPolys(ps);
    const p1 = polys.inflectionPoly;
    const p2 = polys.otherExtremaPoly;

    const ts = allRoots(p2, 0, 1);

    // get second derivative (using product rule) to see if it is a local 
    // minimum or maximum, i.e. diff(p1*p2) = p1'*p2 + p1*p2' = dp1*p2 + p1*dp2
    // = p1*dp2 (since dp1*p2 === 0)
    const dp2 = differentiate(p2);

    const minima: number[] = [];
    const maxima: number[] = [];

    for (let i=0; i<ts.length; i++) {
        const t = ts[i];
        
        const dp2_ = Horner(dp2, t);
        const p1_ = Horner(p1, t);
        
        const secondDerivative = p1_*dp2_;

        if (secondDerivative >= 0) {
            minima.push(t);
        } else {
            maxima.push(t);
        }
    }

    const inflections = allRoots(p1, 0, 1);

    return { minima, maxima, inflections };
}


export { getCurvatureExtrema, Extrema }
