import { geoClip as _geoClip } from './clip/geo-clip.js';
import { fromTo as _fromToVect } from 'flo-vector2d';
import { toLength as _toLength } from 'flo-vector2d';
import { translate as _translate } from 'flo-vector2d';
import { getDistanceToLineFunction as _getDistanceToLineFunction } from "./get-distance-to-line-function.js";
import { fromTo as _fromTo } from '../../transformation/split/from-to.js';
const getDistanceToLineFunction = _getDistanceToLineFunction;
const geoClip = _geoClip;
const fromTo = _fromTo;
const fromToVect = _fromToVect;
const translate = _translate;
const toLength = _toLength;
const noIntersection = undefined;
/**
 * the heuristic value indicating the maximum `t` parameter span allowed after
 * clipping before perpendicular fatline clipping or curve splitting is
 * employed.
 */
const maxClipTSpan = 0.7;
/**
 * Returns 0, 1 or 2 new narrowed ranges of possible intersections based on the
 * given current iteration's ranges.
 *
 * * helper function to the geometric interval bezier-bezier intersection
 * algorithm
 *
 * @param F the bezier curve that should be fat line bounded
 * @param G the bezier curve that should be geometric interval bounded
 *
 * @internal
 */
function checkIntersectionInRanges(iter) {
    //--------------------------------------
    // let { F, G, fRange, gRange } = iter;
    const F = iter.F;
    const G = iter.G;
    const fRange = iter.fRange;
    const gRange = iter.gRange;
    //--------------------------------------
    //-----------------------------------------------------------------------
    // an invariant at this stage is that `eps | ftMin, ftMax, gtMin, gtMax`
    //-----------------------------------------------------------------------
    /**
     * the minimum `t` value bound for the bezier that will be fatline bounded;
     * it will not change during normal geo clipping
     */
    const ftMin = fRange[0];
    /**
     * the maximum `t` value bound for the bezier that will be fatline bounded;
     * it will not change during normal geo clipping
     */
    const ftMax = fRange[1];
    /**
     * the minimum `t` value bound for the bezier that will be geo bounded;
     * it will be geo clipped for the next iteration
     */
    const gtMin = gRange[0];
    /**
     * the maximum `t` value bound for the bezier that will be geo bounded;
     * it will be geo clipped for the next iteration
     */
    const gtMax = gRange[1];
    // Get the bezier curves (and an error bound) within the narrowed ranges
    // Note: the error bound need be multiplied by `8u`, where 
    // `u === Number.EPSILON/2` (see `fromTo3` for details).
    const F_ = fromTo(F, ftMin, ftMax);
    const G_ = fromTo(G, gtMin, gtMax);
    const Fps = F_.ps;
    const F_ps = F_._ps;
    if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
        globalThis.__debug__.currentIter.F_ = F_;
        globalThis.__debug__.currentIter.G_ = G_;
    }
    const lenF = Fps.length;
    // Q will be fat line bounded. Get start and endpoint of curve
    let FS = Fps[0];
    let FE = Fps[lenF - 1];
    // Note: The case where `FS` and `FE` are the same point will result in
    // `geoClip` not clipping and returning 'no intersection' so we don't
    // explicitly test for it here.
    // Get the implict line equation for the line defined by the first and 
    // last control point of Q. This equation gives the distance between any 
    // point and the line (but scaled for efficiency *and* robustness).
    let dF = getDistanceToLineFunction(FS, FE);
    // Signed distances to cubic mid control points *plus* the first and last
    // control points since there is an error bound involved that need to
    // be included to ensure robustness
    let dF0 = dF(Fps[0], F_ps[0]);
    let dF1 = dF(Fps[1], F_ps[1]);
    let dF2 = dF(Fps[2], F_ps[2]);
    let dF3 = lenF === 4 ? dF(Fps[3], F_ps[3]) : { dMin: 0, dMax: 0 };
    // Calculate the fat line of F.
    // Calculate the distance from the control points of F to the line.
    //let C = len === 4 ? (dF1*dF2 > 0) ? 3/4 : 4/9 : 1/2;
    // The above calculation of C has been replaced by the one below so we can
    // ensure robustness (`dF1` and `dF2` are not simply numbers but also have
    // an error bound associated with them)
    let C = lenF === 4 ? 3 / 4 : 1 / 2;
    const dMin = C * Math.min(0, dF0.dMin, dF1.dMin, dF2.dMin, dF3.dMin);
    const dMax = C * Math.max(0, dF0.dMax, dF1.dMax, dF2.dMax, dF3.dMax);
    // Add fatline debug info
    if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
        globalThis.__debug__.currentIter.fatline = getFatlineDebugInfo(FS, FE, dMin, dMax);
    }
    const tRange = geoClip(G_, dF, dMin, dMax);
    const last = iter.last;
    if (tRange === noIntersection) {
        return [];
    }
    let tMin = tRange[0];
    let tMax = tRange[1];
    if (!last && tMax - tMin > maxClipTSpan) {
        // This optimization is for cases where the bezier curves meet nearly 
        // collinearly at interface points.
        if (!clipPerp()) {
            return [];
        }
        ;
    }
    if (!last && tMax - tMin > maxClipTSpan) {
        return split();
    }
    const gtSpan = gtMax - gtMin;
    // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
    const tMin_ = gtMin + tMin * gtSpan + 1 - 1;
    // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMax_`
    const tMax_ = gtMin + tMax * gtSpan + 1 - 1;
    // Swap Q and P and iterate.
    const newIter = {
        F: G, G: F,
        fRange: [tMin_, tMax_],
        gRange: fRange,
        last
    };
    if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
        newIter.parent = globalThis.__debug__.currentIter;
        globalThis.__debug__.currentIter.children = [newIter];
    }
    return [newIter];
    function clipPerp() {
        // First try a fatline perpendicular to the prior one. This is 
        // important for efficiency especially in cases where the bezier
        // curves meet (or almost meet) with nearly the same tangent and
        // curvature.
        const FSx = FS[0];
        const FSy = FS[1];
        const FEx = FE[0];
        const FEy = FE[1];
        // rotate [FS,FE] 90 degrees about FS
        const V = [FSx + FSy - FEy, FSy + FEx - FSx];
        let dQ_ = getDistanceToLineFunction(FS, V);
        // Signed distances to other 3 control points *plus* the first
        // control point since there is an error bound involved that need to
        // be included to ensure robustness
        let dF0_ = dQ_(Fps[0], F_ps[0]);
        let dF1_ = dQ_(Fps[1], F_ps[1]);
        let dF2_ = dQ_(Fps[2], F_ps[2]);
        let dF3_ = lenF === 4 ? dQ_(Fps[3], F_ps[3]) : { dMin: 0, dMax: 0 };
        const dMin_ = Math.min(0, dF0_.dMin, dF1_.dMin, dF2_.dMin, dF3_.dMin);
        const dMax_ = Math.max(0, dF0_.dMax, dF1_.dMax, dF2_.dMax, dF3_.dMax);
        // Add fatline debug info
        if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
            globalThis.__debug__.currentIter.fatlinePerp = getFatlineDebugInfo(FS, V, dMin_, dMax_);
        }
        const tRange = geoClip(G_, dQ_, dMin_, dMax_);
        if (tRange === noIntersection) {
            return false;
        }
        const tMin_ = tRange[0];
        const tMax_ = tRange[1];
        tMin = Math.max(tMin, tMin_);
        tMax = Math.min(tMax, tMax_);
        return true;
    }
    /**
     * Split the bezier curve.
     */
    function split() {
        // The paper calls for a heuristic that if less than 30% will be
        // clipped, rather split the longest curve and find intersections in the
        // two halfs seperately.
        const gtSpan = gtMax - gtMin;
        const ftSpan = ftMax - ftMin;
        // Split the curve in half
        if (gtSpan >= ftSpan) {
            // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
            const tMid = gtMin + gtSpan / 2 + 1 - 1;
            const iter1 = { F, G, fRange, gRange: [gtMin, tMid], last };
            const iter2 = { F, G, fRange, gRange: [tMid, gtMax], last };
            if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
                iter1.parent = globalThis.__debug__.currentIter;
                iter2.parent = globalThis.__debug__.currentIter;
                globalThis.__debug__.currentIter.children = [iter2, iter1];
            }
            return [iter2, iter1];
        }
        // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
        const tMid = ftMin + ftSpan / 2 + 1 - 1;
        const iter1 = { F, G, fRange: [ftMin, tMid], gRange, last };
        const iter2 = { F, G, fRange: [tMid, ftMax], gRange, last };
        if (globalThis.__debug__ !== undefined && !globalThis.__debug__.already) {
            iter1.parent = globalThis.__debug__.currentIter;
            iter2.parent = globalThis.__debug__.currentIter;
            globalThis.__debug__.currentIter.children = [iter2, iter1];
        }
        return [iter2, iter1];
    }
}
function getFatlineDebugInfo(FS, FE, dMin, dMax) {
    let vF = fromToVect(FS, FE); // Move [FS, FE] to the origin
    let vFr = [-vF[1], vF[0]]; // Rotate vector by -90 degrees
    // get scale factor `d` to scale back to actual distances 
    // (not perfectly accurate due to rounding)
    const xS = FS[0];
    const yS = FS[1];
    const xE = FE[0];
    const yE = FE[1];
    let s = yS - yE;
    let t = xE - xS;
    let u = xS * yE - xE * yS;
    let d = Math.sqrt(s ** 2 + t ** 2);
    let offsetMin = toLength(vFr, dMin / d);
    let offsetMax = toLength(vFr, dMax / d);
    let psMin = [translate(FS, offsetMin), translate(FE, offsetMin)];
    let psMax = [translate(FS, offsetMax), translate(FE, offsetMax)];
    return {
        psBase: [FS, FE],
        psMin, psMax
    };
}
export { checkIntersectionInRanges };
//# sourceMappingURL=check-intersection-in-ranges.js.map