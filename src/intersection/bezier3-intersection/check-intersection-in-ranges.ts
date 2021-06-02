import { Iteration } from './iteration';
import { center as _center } from "./center";
import { getDistanceToLineFunction as _getDistanceToLineFunction, getDistanceToLineFunctionDd } from "./get-distance-to-line-function";
import { geoClip as _geoClip } from './clip/geo-clip';
import { fromTo as _fromToVect, toLength, toUnitVector } from 'flo-vector2d';
import { len as _len } from 'flo-vector2d';
import { translate as _translate } from 'flo-vector2d';
import { splitCubicAt2 as _splitCubicAt2, fromTo2 as _fromTo2 } from './split-at-test';
import { __debug__ } from './debug';


const center = _center;
const getDistanceToLineFunction = _getDistanceToLineFunction;
const geoClip = _geoClip;
const splitCubicAt2 = _splitCubicAt2;
const fromTo2 = _fromTo2;
const fromToVect = _fromToVect;
const len = _len;
const translate = _translate;


/** our guarantee in accuracy */
//const δ = 2**(-33);  // drop ~ 20 of the 53 floating point bits; ~ 33 left
//const δ = 2**(-20);


let qq = 0;

/**
 * Helper function
 * @param F the bezier curve that should be fat line bounded
 * @param G the bezier curve that should be geometric interval bounded
 */
function checkIntersectionInRanges(
        //iter: Iteration): { newIterations: Iteration[], t1: number } {
        iter: Iteration): Iteration[] {

    qq++; // TODO - remove

    //let { F, G, fRange, gRange } = iter;
    const F = iter.F;
    const G = iter.G;
    const fRange = iter.fRange;
    const gRange = iter.gRange;

    const ftMin = fRange[0];
    const ftMax = fRange[1];
    const gtMin = gRange[0];
    const gtMax = gRange[1];

    // TODO - inefficient - initial 2 ranges will always be [0,1]
    const F_ = fromTo2(F, ftMin, ftMax); 
    const G_ = fromTo2(G, gtMin, gtMax); 

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        __debug__.currentIter.F_ = F_;
        __debug__.currentIter.G_ = G_;
    }

    //----------------------------------------------------------------
    // TODO - remove later below (unless it might be used for some reason)
    // Move intersection toward the origin to reduce floating point round-off.
    //const c = center(P_, Q_);
    //P_ = c[0];
    //Q_ = c[1];
    //----------------------------------------------------------------

    // Q will be fat line bounded. Get start and endpoint of curve
    // TODO - consider, implement and test the case where `FS` and `QE` are the same point
    let FS = F_[0];
    let FE = F_[F_.length-1];

    // Get the implict line equation for the line defined by the first and 
    // last control point of Q. This equation gives the distance between any 
    // point and the line.
    //let dF = getDistanceToLineFunction(FS, FE);
    let dF = getDistanceToLineFunctionDd(FS, FE);

    // Signed distances to cubic mid control points
    let dF1 = dF(F_[1]);
    let dF2 = dF(F_[2]);

    // Calculate the fat line of F.
    // Calculate the distance from the control points of F to the line.
    let C = (dF1*dF2 > 0) ? 3/4 : 4/9;
    //let C = 1;
    const dMin = C * Math.min(0, dF1, dF2);
    const dMax = C * Math.max(0, dF1, dF2);

    // Add fatline debug info
    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        __debug__.currentIter.fatline = getFatlineDebugInfo(F_, FS, FE, dMin, dMax);
    }

    let {tMin, tMax} = geoClip(G_, dF, dMin, dMax);

    // TODO - investigate why this is here
    if (tMin === Number.POSITIVE_INFINITY) {
        // No intersection
        return [];
    }

    // TODO - investigate doing this maybe only in first 1 or few iterations
    if (tMax - tMin > 0.7) {
    //if (false) {
        // First try a fatline perpendicular to the prior one
        let vQ = fromToVect(FS, FE);  // Move [FS, Q3] to the origin
        let vQr = [-vQ[1], vQ[0]];  // Rotate vector by -90 degrees
        let vQrm3 = translate(vQr, FS);

        let dQ_ = getDistanceToLineFunction(FS, vQrm3);
        
        // Signed distances to other 3 cubic control points
        let dF1_ = dQ_(F_[1]);
        let dF2_ = dQ_(F_[2]);
        let dF3_ = dQ_(F_[3]);

        // TODO - investigate the zeros
        //const dMin_ = Math.min(dF1_, dF2_, dF3_);
        //const dMax_ = Math.max(dF1_, dF2_, dF3_);
        const dMin_ = Math.min(0, dF1_, dF2_, dF3_);
        const dMax_ = Math.max(0, dF1_, dF2_, dF3_);
    
        // Add fatline debug info
        if (typeof __debug__ !== 'undefined' && !__debug__.already) {
            __debug__.currentIter.fatlinePerp = getFatlineDebugInfo(F_, FS, vQrm3, dMin_, dMax_);
        }

        let {tMin: tMin_, tMax: tMax_} = geoClip(G_, dQ_, dMin_, dMax_);

        if (tMin === Number.POSITIVE_INFINITY) {
            // No intersection
            return [];
        }

        tMax = Math.min(tMax, tMax_);
        tMin = Math.max(tMin, tMin_);
    }


    // The paper calls for a heuristic that if less than 30% will be
    // clipped, rather split the longest curve and find intersections in the
    // two halfs seperately.
    if (tMax - tMin > 0.7) {
        // Some length measure
        let gSpan = gtMax - gtMin;
        let fSpan = ftMax - ftMin;

        // Split the curve in half
        if (gSpan >= fSpan) {
            const iter1 = {
                F, G, fRange, 
                gRange: [gtMin, gtMin + gSpan/2],
            };
            const iter2 = { 
                F, G, fRange, 
                gRange: [gtMin + gSpan/2, gtMax],
            };

            if (typeof __debug__ !== 'undefined' && !__debug__.already) {
                __debug__.iters.push(iter1);
                __debug__.iters.push(iter2);
                __debug__.currentIter.children = [iter1, iter2];
            }

            return [iter1, iter2];
        }

        const iter1 = {
            F,
            G, 
            fRange: [ftMin, ftMin + fSpan/2], 
            gRange,
        };
        const iter2 = { 
            F,
            G, 
            fRange: [ftMin + fSpan/2, ftMax], 
            gRange,
        };

        if (typeof __debug__ !== 'undefined' && !__debug__.already) {
            __debug__.iters.push(iter1);
            __debug__.iters.push(iter2);
            __debug__.currentIter.children = [iter1, iter2];
        }
        return [iter1, iter2];
    }


    // Update t range.
    //let span = gRange[1] - gRange[0];

    //if (Math.abs((tMax - tMin) * span) < δ) {
    //    // Accurate enough solution found
    //    let t1 = (((tMax + tMin) * span) / 2) + gtMin;
    //    return { newIterations: [], t1 };
    //}
    //console.log(tMax - tMin)

    let gtSpan = gtMax - gtMin;

    const tMin_ = tMin*gtSpan + gtMin;
    const tMax_ = tMax*gtSpan + gtMin;

    // Swap Q and P and iterate.
    const newIter = { 
        F: G,
        G: F, 
        fRange: [tMin_, tMax_],
        gRange: fRange, 
    }

    //if (Math.abs(tMax_ - tMin_) < δ) {
    //    // Accurate enough solution found
    //    //let t1 = (tMax_ + tMin_) / 2;
    //    return [newIter];
    //}


    // Clip
    //P_ = fromTo2(P_,tMin, tMax);

    //let tMin_ = (gtMin + tMin*span);
    //let tMax_ = (gtMin + tMax*span);

    // Swap Q and P and iterate.

    //const newIter = { 
    //    F: G,
    //    G: F, 
    //    fRange: [tMin_, tMax_],
    //    gRange: fRange, 
    //}

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        __debug__.iters.push(newIter);
        __debug__.currentIter.children = [newIter];
    }

    return [newIter];
}


function getFatlineDebugInfo(
        F: number[][],
        FS: number[], 
        FE: number[],
        dMin: number,
        dMax: number) {

    let vF = fromToVect(FS, FE); // Move [FS, FE] to the origin
    let vFr = [-vF[1], vF[0]]; // Rotate vector by -90 degrees
    let offsetMin = toLength(vFr, dMin);
    let offsetMax = toLength(vFr, dMax);

    //if (qq >= 8) {
    //    console.log(F);
    //    console.log(dMin, dMax)
    //}

    let psMin = [translate(FS,offsetMin), translate(FE,offsetMin)];
    let psMax = [translate(FS,offsetMax), translate(FE,offsetMax)];
    return {
        psBase: [FS, FE],
        psMin, psMax
    };
}



export { checkIntersectionInRanges }
