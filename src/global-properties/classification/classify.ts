import { operators as bigFloatOperators } from "big-float-ts";
import { twoDiff, twoSum } from 'double-double';
import { expansionProduct, eDiff, scaleExpansion2, fastExpansionSum, growExpansion } from 'big-float-ts';
import { γ } from "../../error-analysis/error-analysis.js";
import { isReallyPoint } from "./is-really-point.js";
import { isQuadReallyLine } from "./is-quad-really-line.js";
import { isCubicReallyQuad } from "./is-cubic-really-quad.js";
import { isCubicReallyLine } from './is-cubic-really-line.js';
import { isCollinear } from "./is-collinear.js";
import { getCoeffsBez3WithRunningError } from '../../intersection//self-intersection/get-coefficients/double/get-coeffs-bez3-with-running-error.js';
import { getCoeffsBez3Exact } from "../../intersection/self-intersection/get-coefficients/exact/get-coeffs-bez3-exact.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const { eSign, eCompare } = bigFloatOperators;


const edif = eDiff;
const epr = expansionProduct;
const sce = scaleExpansion2;
const td = twoDiff;
const ts = twoSum;
const fes = fastExpansionSum;
const ge = growExpansion;

const abs = Math.abs;
const γ1 = γ(1);


/** 
 * Cubic node type
 * 
 * These are the four types from the paper [Shape Analysis of Cubic Bézier Curves – Correspondence to Four Primitive Cubics](https://www.cad-journal.net/files/vol_11/CAD_11(5)_2014_568-578.pdf)
 */
type NodeType = 'crunode' | 'acnode' | 'cusp' | 'explicit';


interface ClassificationType {
    /** the order based on the number of control points */
    order: 0|1|2|3;
    /** the real order when considering degenerate cases */
    realOrder: 0|1|2|3;
    /** `true` if *all* points are collinear, false otherwise */ 
    collinear: boolean;
    nodeType: NodeType | 'n/a';
}



// The classifications form an equivalence class, in other words *all* 
// possible planar polynomial bezier curves (of order <= 3) are represented and 
// all options are mutually exclusive.
const point                = { order: 0, realOrder: 0, collinear: true,  nodeType: 'n/a' } as const;
const lineGeneral          = { order: 1, realOrder: 1, collinear: true,  nodeType: 'n/a' } as const;
const lineDegenPoint       = { order: 1, realOrder: 0, collinear: true,  nodeType: 'n/a' } as const;
const quadGeneral          = { order: 2, realOrder: 2, collinear: false, nodeType: 'n/a' } as const;
/** The curve is collinear but not a line (i.e. evaluating at `t` values won't correspond to same points) */
const quadDegenCollinear   = { order: 2, realOrder: 2, collinear: true,  nodeType: 'n/a' } as const;
const quadDegenLine        = { order: 2, realOrder: 1, collinear: true,  nodeType: 'n/a' } as const;
const quadDegenPoint       = { order: 2, realOrder: 0, collinear: true,  nodeType: 'n/a' } as const;
const cubicGeneralCrunode  = { order: 3, realOrder: 3, collinear: false, nodeType: 'crunode'  } as const;
const cubicGeneralAcnode   = { order: 3, realOrder: 3, collinear: false, nodeType: 'acnode'   } as const;
const cubicGeneralCusp     = { order: 3, realOrder: 3, collinear: false, nodeType: 'cusp'     } as const;
const cubicGeneralExplicit = { order: 3, realOrder: 3, collinear: false, nodeType: 'explicit' } as const;
const cubicDegenCollinearCubic = { order: 3, realOrder: 3, collinear: true,  nodeType: 'n/a' } as const;
const cubicDegenQuad           = { order: 3, realOrder: 2, collinear: false, nodeType: 'n/a' } as const;
const cubicDegenCollinearQuad  = { order: 3, realOrder: 2, collinear: true,  nodeType: 'n/a' } as const;
const cubicDegenLine     = { order: 3, realOrder: 1, collinear: true, nodeType: 'n/a' } as const;
const cubicDegenPoint    = { order: 3, realOrder: 0, collinear: true, nodeType: 'n/a' } as const;


/** 
 * *All* possible planar polynomial bezier curves (of order <= 3) are 
 * represented and all options are mutually exclusive.
 */
type Classification = 
    | typeof point 
    | typeof lineGeneral
    | typeof lineDegenPoint
    | typeof quadGeneral
    | typeof quadDegenCollinear
    | typeof quadDegenLine
    | typeof quadDegenPoint
    | typeof cubicGeneralCrunode
    | typeof cubicGeneralAcnode
    | typeof cubicGeneralCusp
    | typeof cubicGeneralExplicit
    | typeof cubicDegenCollinearCubic
    | typeof cubicDegenQuad
    | typeof cubicDegenCollinearQuad
    | typeof cubicDegenLine
    | typeof cubicDegenPoint;


/**
 * The classifications form an equivalence class, in other words *all* 
 * possible planar polynomial bezier curves (of order <= 3) are represented and 
 * all options are mutually exclusive.
 */
const classifications = {
    point,
    lineGeneral,
    lineDegenPoint,
    quadGeneral,
    quadDegenCollinear,
    quadDegenLine,
    quadDegenPoint,
    cubicGeneralCrunode,
    cubicGeneralAcnode,
    cubicGeneralCusp,
    cubicGeneralExplicit,
    cubicDegenCollinearCubic,
    cubicDegenQuad,
    cubicDegenCollinearQuad,
    cubicDegenLine,
    cubicDegenPoint
}


function isPoint(ps: number[][]): boolean {
    return classify(ps) === point;
}
function isLineGeneral(ps: number[][]): boolean {
    return classify(ps) === lineGeneral;
}
function isLineDegenPoint(ps: number[][]): boolean {
    return classify(ps) === lineDegenPoint;
}
function isQuadGeneral(ps: number[][]): boolean {
    return classify(ps) === quadGeneral;
}
function isQuadDegenCollinear(ps: number[][]): boolean {
    return classify(ps) === quadDegenCollinear;
}
function isQuadDegenLine(ps: number[][]): boolean {
    return classify(ps) === quadDegenLine;
}
function isQuadDegenPoint(ps: number[][]): boolean {
    return classify(ps) === quadDegenPoint;
}
function isCubicGeneralCrunode(ps: number[][]): boolean {
    return classify(ps) === cubicGeneralCrunode;
}
function isCubicGeneralAcnode(ps: number[][]): boolean {
    return classify(ps) === cubicGeneralAcnode;
}
function isCubicGeneralCusp(ps: number[][]): boolean {
    return classify(ps) === cubicGeneralCusp;
}
function isCubicGeneralExplicit(ps: number[][]): boolean {
    return classify(ps) === cubicGeneralExplicit;
}
function isCubicDegenCollinearCubic(ps: number[][]): boolean {
    return classify(ps) === cubicDegenCollinearCubic;
}
function isCubicDegenQuad(ps: number[][]): boolean {
    return classify(ps) === cubicDegenQuad;
}
function isCubicDegenCollinearQuad(ps: number[][]): boolean {
    return classify(ps) === cubicDegenCollinearQuad;
}
function isCubicDegenLine(ps: number[][]): boolean {
    return classify(ps) === cubicDegenLine;
}
function isCubicDegenPoint(ps: number[][]): boolean {
    return classify(ps) === cubicDegenPoint;
}


const classification = {
    isPoint,
    isLineGeneral,
    isLineDegenPoint,
    isQuadGeneral,
    isQuadDegenCollinear,
    isQuadDegenLine,
    isQuadDegenPoint,
    isCubicGeneralCrunode,
    isCubicGeneralAcnode,
    isCubicGeneralCusp,
    isCubicGeneralExplicit,
    isCubicDegenCollinearCubic,
    isCubicDegenQuad,
    isCubicDegenCollinearQuad,
    isCubicDegenLine,
    isCubicDegenPoint,
}


/**
 * Returns a classification of the given bezier curve.
 *
 * * **exact**: not susceptible to floating point round-off
 * 
 * @param ps a bezier curve of order 0,1,2 or 3 given as an array of its 
 * control points.
 * 
 * @doc mdx
 */
function classify(ps: number[][]): Classification {
    if (ps.length === 4) {
        if (isCubicReallyQuad(ps)) {
            return isCubicReallyLine(ps)
                ? isReallyPoint(ps) ? cubicDegenPoint : cubicDegenLine
                : isCollinear(ps) ? cubicDegenCollinearQuad : cubicDegenQuad
        }

        return isCollinear(ps)
            ? cubicDegenCollinearCubic
            : classifyGeneralCubic(ps); 
    }
    
    if (ps.length === 3) {
        return isCollinear(ps)
            ? isQuadReallyLine(ps)
                ? isReallyPoint(ps) ? quadDegenPoint : quadDegenLine
                : quadDegenCollinear
            : quadGeneral;
    }
                
    if (ps.length === 2) {
        return isReallyPoint(ps) ? lineDegenPoint : lineGeneral
    }

    if (ps.length === 1) {
        return point;
    }

    throw new Error('The given bezier curve must be of order <= 3');
}


type GeneralCubic = 
    | typeof cubicGeneralCrunode
    | typeof cubicGeneralAcnode
    | typeof cubicGeneralCusp
    | typeof cubicGeneralExplicit;


/**
 * Return a complete classification of the given *general* cubic bezier curve as 
 * either having an `acnode`, `crunode`, `cusp` or being an `explicit` curve.
 * 
 * * **precondition**: the given bezier curve is a 'general' cubic, i.e. not all
 * points collinear and not degenerate to a quadratic curve, line or point.
 * 
 * @param ps 
 */
function classifyGeneralCubic(ps: number[][]): GeneralCubic {
    // First get fast naively calculated coefficients for self-intersection
    const { coeffs: [a,b,c], errBound: [a_,b_,c_] } = 
        getCoeffsBez3WithRunningError(ps);

    // if error in `a` cannot discern it from zero
    if (abs(a) <= a_) {
        // it is rare to get here 
        // check for sure if a === 0 exactly
        const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

        //const a3 = (x3 - x0) + 3*(x1 - x2);
        //const a2 = (x2 + x0) - 2*x1;
        //const b3 = (y3 - y0) + 3*(y1 - y2);
        //const b2 = (y2 + y0) - 2*y1;
        const a3 = fes(td(x3, x0), sce(3,(td(x1, x2))));
        const a2 = ge(ts(x2, x0), -2*x1);
        const b3 = fes(td(y3, y0), sce(3,(td(y1, y2))));
        const b2 = ge(ts(y2, y0), -2*y1);

        const a2b3 = epr(a2,b3);
        const a3b2 = epr(a3,b2);

        if (eCompare(a2b3, a3b2) === 0) {
            // a === 0 => no roots possible! (also b === 0)
            return cubicGeneralExplicit;
        }
    }

    // `Discr` = discriminant = b^2 - 4ac
    // calculate `Discr` and its absolute error Discr_
    const bb = b*b;
    const bb_ = 2*b_*abs(b) + γ1*bb; // the error in b**2
    const ac4 = 4*a*c;
    const ac4_ = 4*(a_*abs(c) + abs(a)*c_) + γ1*abs(ac4)
    const Discr = bb - ac4;
    const Discr_ = bb_ + ac4_ + γ1*abs(Discr);

    // if the discriminant is smaller than negative the error bound then
    // certainly there are no roots, i.e. no cusp and no self-intersections
    if (Discr < -Discr_) {
        // discriminant is definitely negative
        return cubicGeneralAcnode;
    }


    // if the discriminant is definitely positive
    if (Discr > Discr_) {
        // calculate roots naively as a fast pre-filter
        return cubicGeneralCrunode;
    }

    // we need to check exactly - (a !== 0) at this point - tested for earlier
    const [A,B,C] = getCoeffsBez3Exact(ps);

    // exact - Discr = b^2 - 4ac
    const eDiscr = edif(epr(B,B), sce(4,epr(A,C)));
    const sgnDiscr = eSign(eDiscr);

    return sgnDiscr < 0 
        ? cubicGeneralAcnode
        : sgnDiscr > 0 
            ? cubicGeneralCrunode 
            : cubicGeneralCusp;
}


export { 
    ClassificationType,
    Classification,
    NodeType,
    classify,
    classifications,
    classification
}
