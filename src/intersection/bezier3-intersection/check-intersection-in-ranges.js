"use strict";
exports.__esModule = true;
exports.checkIntersectionInRanges = void 0;
var geo_clip_js_1 = require("./clip/geo-clip.js");
var flo_vector2d_1 = require("flo-vector2d");
var flo_vector2d_2 = require("flo-vector2d");
var flo_vector2d_3 = require("flo-vector2d");
var get_distance_to_line_function_js_1 = require("./get-distance-to-line-function.js");
var from_to_js_1 = require("./from-to/from-to.js");
var __debug__ = (typeof globalThis !== 'undefined' && globalThis.__debug__)
    ? globalThis.__debug__
    : undefined;
var getDistanceToLineFunction = get_distance_to_line_function_js_1.getDistanceToLineFunction;
var geoClip = geo_clip_js_1.geoClip;
var fromTo = from_to_js_1.fromTo;
var fromToVect = flo_vector2d_1.fromTo;
var translate = flo_vector2d_3.translate;
var toLength = flo_vector2d_2.toLength;
var noIntersection = undefined;
var noClip = [0, 1];
/**
 * the heuristic value indicating the maximum `t` parameter span allowed after
 * clipping before perpendicular fatline clipping or curve splitting is
 * employed.
 */
var maxClipTSpan = 0.7;
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
    var F = iter.F;
    var G = iter.G;
    var fRange = iter.fRange;
    var gRange = iter.gRange;
    //--------------------------------------
    //-----------------------------------------------------------------------
    // an invariant at this stage is that `eps | ftMin, ftMax, gtMin, gtMax`
    //-----------------------------------------------------------------------
    /**
     * the minimum `t` value bound for the bezier that will be fatline bounded;
     * it will not change during normal geo clipping
     */
    var ftMin = fRange[0];
    /**
     * the maximum `t` value bound for the bezier that will be fatline bounded;
     * it will not change during normal geo clipping
     */
    var ftMax = fRange[1];
    /**
     * the minimum `t` value bound for the bezier that will be geo bounded;
     * it will be geo clipped for the next iteration
     */
    var gtMin = gRange[0];
    /**
     * the maximum `t` value bound for the bezier that will be geo bounded;
     * it will be geo clipped for the next iteration
     */
    var gtMax = gRange[1];
    // Get the bezier curves (and an error bound) within the narrowed ranges
    // Note: the error bound need be multiplied by `11u`, where 
    // `u === Number.EPSILON/2` (see `fromTo3` for details).
    var F_ = fromTo(F, ftMin, ftMax);
    var G_ = fromTo(G, gtMin, gtMax);
    var Fps = F_.ps;
    var F_ps = F_._ps;
    if (__debug__ !== undefined && !__debug__.already) {
        __debug__.currentIter.F_ = F_;
        __debug__.currentIter.G_ = G_;
    }
    var lenF = Fps.length;
    // Q will be fat line bounded. Get start and endpoint of curve
    var FS = Fps[0];
    var FE = Fps[lenF - 1];
    // Note: The case where `FS` and `FE` are the same point will result in
    // `geoClip` not clipping and returning 'no intersection' so we don't
    // explicitly test for it here.
    // Get the implict line equation for the line defined by the first and 
    // last control point of Q. This equation gives the distance between any 
    // point and the line (but scaled for efficiency *and* robustness).
    var dF = getDistanceToLineFunction(FS, FE);
    // Signed distances to cubic mid control points *plus* the first and last
    // control points since there is an error bound involved that need to
    // be included to ensure robustness
    var dF0 = dF(Fps[0], F_ps[0]);
    var dF1 = dF(Fps[1], F_ps[1]);
    var dF2 = dF(Fps[2], F_ps[2]);
    var dF3 = lenF === 4 ? dF(Fps[3], F_ps[3]) : { dMin: 0, dMax: 0 };
    // Calculate the fat line of F.
    // Calculate the distance from the control points of F to the line.
    //let C = len === 4 ? (dF1*dF2 > 0) ? 3/4 : 4/9 : 1/2;
    // The above calculation of C has been replaced by the one below so we can
    // ensure robustness (`dF1` and `dF2` are not simply numbers but also have
    // an error bound associated with them)
    var C = lenF === 4 ? 3 / 4 : 1 / 2;
    var dMin = C * Math.min(0, dF0.dMin, dF1.dMin, dF2.dMin, dF3.dMin);
    var dMax = C * Math.max(0, dF0.dMax, dF1.dMax, dF2.dMax, dF3.dMax);
    // Add fatline debug info
    if (__debug__ !== undefined && !__debug__.already) {
        __debug__.currentIter.fatline = getFatlineDebugInfo(FS, FE, dMin, dMax);
    }
    var tRange = geoClip(G_, dF, dMin, dMax);
    var last = iter.last;
    if (tRange === noIntersection) {
        return [];
    }
    var tMin = tRange[0];
    var tMax = tRange[1];
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
    var gtSpan = gtMax - gtMin;
    // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
    var tMin_ = gtMin + tMin * gtSpan + 1 - 1;
    // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMax_`
    var tMax_ = gtMin + tMax * gtSpan + 1 - 1;
    // Swap Q and P and iterate.
    var newIter = {
        F: G, G: F,
        fRange: [tMin_, tMax_],
        gRange: fRange,
        last: last
    };
    if (__debug__ !== undefined && !__debug__.already) {
        newIter.parent = __debug__.currentIter;
        __debug__.currentIter.children = [newIter];
    }
    return [newIter];
    function clipPerp() {
        // First try a fatline perpendicular to the prior one. This is 
        // important for efficiency especially in cases where the bezier
        // curves meet (or almost meet) with nearly the same tangent and
        // curvature.
        var FSx = FS[0];
        var FSy = FS[1];
        var FEx = FE[0];
        var FEy = FE[1];
        // rotate [FS,FE] 90 degrees about FS
        var V = [FSx + FSy - FEy, FSy + FEx - FSx];
        var dQ_ = getDistanceToLineFunction(FS, V);
        // Signed distances to other 3 control points *plus* the first
        // control point since there is an error bound involved that need to
        // be included to ensure robustness
        var dF0_ = dQ_(Fps[0], F_ps[0]);
        var dF1_ = dQ_(Fps[1], F_ps[1]);
        var dF2_ = dQ_(Fps[2], F_ps[2]);
        var dF3_ = lenF === 4 ? dQ_(Fps[3], F_ps[3]) : { dMin: 0, dMax: 0 };
        var dMin_ = Math.min(0, dF0_.dMin, dF1_.dMin, dF2_.dMin, dF3_.dMin);
        var dMax_ = Math.max(0, dF0_.dMax, dF1_.dMax, dF2_.dMax, dF3_.dMax);
        // Add fatline debug info
        if (__debug__ !== undefined && !__debug__.already) {
            __debug__.currentIter.fatlinePerp = getFatlineDebugInfo(FS, V, dMin_, dMax_);
        }
        var tRange = geoClip(G_, dQ_, dMin_, dMax_);
        if (tRange === noIntersection) {
            return false;
        }
        var tMin_ = tRange[0];
        var tMax_ = tRange[1];
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
        var gtSpan = gtMax - gtMin;
        var ftSpan = ftMax - ftMin;
        // Split the curve in half
        if (gtSpan >= ftSpan) {
            // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
            var tMid_1 = gtMin + gtSpan / 2 + 1 - 1;
            var iter1_1 = { F: F, G: G, fRange: fRange, gRange: [gtMin, tMid_1], last: last };
            var iter2_1 = { F: F, G: G, fRange: fRange, gRange: [tMid_1, gtMax], last: last };
            if (__debug__ !== undefined && !__debug__.already) {
                iter1_1.parent = __debug__.currentIter;
                iter2_1.parent = __debug__.currentIter;
                __debug__.currentIter.children = [iter2_1, iter1_1];
            }
            return [iter2_1, iter1_1];
        }
        // The `+ 1 - 1` at the end is critical in ensuring that `Number.EPSILON | tMin_`
        var tMid = ftMin + ftSpan / 2 + 1 - 1;
        var iter1 = { F: F, G: G, fRange: [ftMin, tMid], gRange: gRange, last: last };
        var iter2 = { F: F, G: G, fRange: [tMid, ftMax], gRange: gRange, last: last };
        if (__debug__ !== undefined && !__debug__.already) {
            iter1.parent = __debug__.currentIter;
            iter2.parent = __debug__.currentIter;
            __debug__.currentIter.children = [iter2, iter1];
        }
        return [iter2, iter1];
    }
}
exports.checkIntersectionInRanges = checkIntersectionInRanges;
function getFatlineDebugInfo(FS, FE, dMin, dMax) {
    var vF = fromToVect(FS, FE); // Move [FS, FE] to the origin
    var vFr = [-vF[1], vF[0]]; // Rotate vector by -90 degrees
    // get scale factor `d` to scale back to actual distances 
    // (not perfectly accurate due to rounding)
    var xS = FS[0];
    var yS = FS[1];
    var xE = FE[0];
    var yE = FE[1];
    var s = yS - yE;
    var t = xE - xS;
    var u = xS * yE - xE * yS;
    var d = Math.sqrt(Math.pow(s, 2) + Math.pow(t, 2));
    var offsetMin = toLength(vFr, dMin / d);
    var offsetMax = toLength(vFr, dMax / d);
    var psMin = [translate(FS, offsetMin), translate(FE, offsetMin)];
    var psMax = [translate(FS, offsetMax), translate(FE, offsetMax)];
    return {
        psBase: [FS, FE],
        psMin: psMin,
        psMax: psMax
    };
}
