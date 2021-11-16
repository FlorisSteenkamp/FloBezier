"use strict";
exports.__esModule = true;
exports.bezier3Intersection = void 0;
var check_intersection_in_ranges_js_1 = require("./check-intersection-in-ranges.js");
var bezier_bezier_intersection_js_1 = require("../bezier-bezier-intersection/bezier-bezier-intersection.js");
var __debug__ = (typeof globalThis !== 'undefined' && globalThis.__debug__)
    ? globalThis.__debug__
    : undefined;
var checkIntersectionInRanges = check_intersection_in_ranges_js_1.checkIntersectionInRanges;
var bezierBezierIntersection = bezier_bezier_intersection_js_1.bezierBezierIntersection;
var min = Math.min;
var max = Math.max;
var abs = Math.abs;
/**
 * The guarantee in accuracy of the `t` parameter value chosen to be reasonable
 * for this type of intersection algorithm.
 */
var δ = Math.pow(2, (-33)); // 2**(-33) === 1.1641532182693481e-10
/** a heuristic value for the minimum t-span of the final iteration */
var Δ = Math.pow(2, (-43)); // 2**(-43) === 1.1368683772161603e-13
/**
 * Accurate, fast (*eventually* cubically convergent) algorithm that returns
 * the intersections between two bezier curves.
 *
 * * returns an array that contains the `t` paramater pairs at intersection
 * of the first and second bezier curves respectively.
 * * returns `undefined` if there are an infinite number of intersections (i.e
 * when the curves overlap *exactly*)
 *
 * * the algorithm is based on a paper at http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster than the standard fat-line intersection algorithm (that
 * is *eventually* quadratically convergent)
 * * *eventually* cubically convergent (usually converging in about 4 to 8
 * iterations for typical intersections) but for hard intersections can become
 * extremely slow due to sub-linear convergence (and similarly for all fatline
 * algorithms) in those cases; luckily this algorithm detects those cases and
 * reverts to implicitization with strict error bounds to guarantee accuracy
 * and efficiency (implicitization is roughly 5x slower but is rare)
 *
 * @param ps1 a bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 another bezier curve
 */
function bezier3Intersection(ps1, ps2) {
    if (ps1.length <= 2 || ps2.length <= 2) {
        // revert to implicit form when it's going to be fast anyway
        return implicit(ps1, ps2);
    }
    /** Intersection `t` values for both beziers */
    var xs = [];
    /** an iteration still left to check for intersections */
    var iteration = {
        F: ps1,
        G: ps2,
        fRange: [0, 1],
        gRange: [0, 1],
        last: undefined
    };
    var stack = [iteration];
    if (__debug__ !== undefined && !__debug__.already) {
        __debug__.tree = iteration;
    }
    var iters = 0;
    // A slight improvement to the algorithm may be possible by doing a 
    // breath-first (rather than depth-first) traversal and reverting to 
    // implicitization once the tree reaches a certain width
    /** max iteration heuristic before reverting to implicitization */
    var maxIters = 60;
    while (stack.length !== 0 && iters < maxIters) {
        iters++;
        // keep TypeScript happy; `stack` cannot be empty here
        var iter = stack.pop();
        if (__debug__ !== undefined && !__debug__.already) {
            __debug__.currentIter = iter;
            iter.uid = __debug__.uid++;
        }
        var newIterations = checkIntersectionInRanges(iter);
        if (newIterations.length === 1) {
            var newIter = newIterations[0];
            var fRange = newIter.fRange;
            var δδ = abs(fRange[1] - fRange[0]);
            // if the previous iteration was precise enough
            if (newIter.last) {
                var lfRange = newIter.last.fRange;
                if (δδ > δ) {
                    // This case can occur when the geometric interval clips a
                    // piece of the other bezier very far away but is by 
                    // coincidence of length < δ.
                    // It can also occur in some other edge cases such as 
                    // self-overlapping cubic curves, etc.
                    // revert to implicitization
                    return implicit(ps1, ps2);
                }
                xs.push(iter.F === ps2
                    ? [fRange, lfRange]
                    : [lfRange, fRange]);
                // else if this iteration is precise enough
            }
            else {
                if (δδ < δ) {
                    if (__debug__ !== undefined && !__debug__.already) {
                        newIter.foundX = true;
                    }
                    if (δδ < Δ) {
                        // destructively change the `fRange` as a heuristic so its not
                        // too narrow for the final clip; this might only be a 
                        // problem if `fRange === 0` 
                        fRange[0] = max(0, fRange[0] - Δ);
                        fRange[1] = min(1, fRange[1] + Δ);
                    }
                    newIter.last = newIter;
                }
                stack.push(newIter); // push the (possibly) final iteration
            }
        }
        else if (newIterations.length === 2) {
            //stack.push(...newIterations);
            stack.push(newIterations[0], newIterations[1]);
        }
    }
    if (iters === maxIters) {
        if (__debug__ !== undefined /* && !__debug__.already*/) {
            __debug__.maxItersCount++;
        }
        return implicit(ps1, ps2);
    }
    if (__debug__ !== undefined) {
        // prevent further debugging
        __debug__.already = true;
    }
    //---------------------------------------------------------------
    // check for possible duplicate intersections at split points
    //---------------------------------------------------------------
    xs.sort(function (x1, x2) { return x1[0][0] - x2[0][0]; });
    combineXs(xs);
    return xs;
}
exports.bezier3Intersection = bezier3Intersection;
function combineXs(xs) {
    var testAgain = true;
    while (testAgain) {
        testAgain = false;
        for (var i = 1; i < xs.length; i++) {
            var x1bez1 = xs[i - 1][0];
            var x2bez1 = xs[i][0];
            // if the prior tmax value is higher than the next t value's tmin
            // then they overlap
            if (x1bez1[1] >= x2bez1[0]) { // if overlap found
                // Check if the second bezier's `t` values also overlap, else we
                // have a loop getting intersected at its self-intersection point.
                var x1bez2 = xs[i - 1][1];
                var x2bez2 = xs[i][1];
                var x1min = x1bez2[0];
                var x1max = x1bez2[1];
                var x2min = x2bez2[0];
                var x2max = x2bez2[1];
                var overlap = (x1min <= x2max && x1max >= x2min) ||
                    (x2min <= x1max && x2max >= x1min);
                if (overlap) {
                    // combine ranges and test agin
                    testAgain = true;
                    var tMinBez2 = min(x1min, x1max, x2min, x2max);
                    var tMaxBez2 = max(x1min, x1max, x2min, x2max);
                    var x1min1 = x1bez1[0];
                    var x1max1 = x1bez1[1];
                    var x2min1 = x2bez1[0];
                    var x2max1 = x2bez1[1];
                    var tMinBez1 = min(x1min1, x1max1, x2min1, x2max1);
                    var tMaxBez1 = max(x1min1, x1max1, x2min1, x2max1);
                    var x = [
                        [tMinBez1, tMaxBez1],
                        [tMinBez2, tMaxBez2]
                    ];
                    // insert new combined intersection
                    xs.splice(i - 1, 2, x);
                    break; // break out of inner loop
                }
            }
        }
    }
}
function implicit(ps1, ps2) {
    var xPairs = bezierBezierIntersection(ps1, ps2);
    // TODO
    if (xPairs === undefined) {
        // infinite intersections
        return undefined;
        // TODO - bang above
        //return undefined;
    }
    return xPairs.map(function (xPair) {
        var xPair0ri = xPair[0].ri;
        var xPair1ri = xPair[1].ri;
        return [
            [xPair0ri.tS, xPair0ri.tE],
            [xPair1ri.tS, xPair1ri.tE]
        ];
    });
}
