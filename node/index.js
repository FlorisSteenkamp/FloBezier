"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_vector2d_1 = require("flo-vector2d");
const flo_memoize_1 = require("flo-memoize");
const flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
const flo_graham_scan_1 = require("flo-graham-scan");
const DELTA = 1e-10;
const { rotatePs: rotate, translatePs: translate } = flo_vector2d_1.default;
const memoize = flo_memoize_1.default.m1;
/**
 * Returns the power basis representation of the bezier's x-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The power basis polynomial from highest power to lowest,
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 */
let getX = memoize(function (ps) {
    let [[x0,], [x1,], [x2,], [x3,]] = ps;
    return [
        x3 - 3 * x2 + 3 * x1 - x0,
        3 * x2 - 6 * x1 + 3 * x0,
        3 * x1 - 3 * x0,
        x0,
    ];
});
/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
let getY = memoize(function (ps) {
    let [[, y0], [, y1], [, y2], [, y3]] = ps;
    return [
        y3 - 3 * y2 + 3 * y1 - y0,
        3 * y2 - 6 * y1 + 3 * y0,
        3 * y1 - 3 * y0,
        y0,
    ];
});
/**
 * Returns the derivative of the power basis representation of the bezier's
 * x-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
let getDx = memoize((ps) => flo_poly_1.default.differentiate(getX(ps)));
/**
 * Returns the derivative of the power basis representation of the bezier's
 * y-coordinates. This function is memoized on its points parameter by object
 * reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getDy = memoize((ps) => flo_poly_1.default.differentiate(getY(ps)));
/**
 * Returns the second derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
let getDdx = memoize((ps) => flo_poly_1.default.differentiate(getDx(ps)));
/**
 * Returns the second derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
let getDdy = memoize((ps) => flo_poly_1.default.differentiate(getDy(ps)));
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
let getDddx = memoize((ps) => flo_poly_1.default.differentiate(getDdx(ps)));
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
let getDddy = memoize((ps) => flo_poly_1.default.differentiate(getDdy(ps)));
/**
 * Returns the convex hull of a bezier's control points. This hull bounds the
 * bezier curve. This function is memoized.
 *
 * The tolerance at which the cross product of two nearly collinear lines of the
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
let getBoundingHull = memoize(flo_graham_scan_1.default);
/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param l - a 2d line represented by two points
 * @returns Control points of the cubic bezier.
 */
function fromLine(l) {
    let [[x0, y0], [x1, y1]] = l;
    let xInterval = (x1 - x0) / 3;
    let yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval, y0 + yInterval],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
function evaluate(ps, t) {
    const [[x0, y0], , , [x3, y3]] = ps;
    const evX = evaluateX(ps);
    const evY = evaluateY(ps);
    function f(t) {
        if (t === 0) {
            return [x0, y0];
        }
        else if (t === 1) {
            return [x3, y3];
        }
        return [evX(t), evY(t)];
    }
    return t === undefined ? f : f(t);
}
/**
 * Returns the given bezier's inflection points.
 **/
function findBezierInflectionPoints(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
    let ax = x1 - x0;
    let ay = y1 - y0;
    let bx = x2 - x1 - ax;
    let by = y2 - y1 - ay;
    let cx = x3 - x2 - ax - (2 * bx);
    let cy = y3 - y2 - ay - (2 * by);
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
    //   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
    // We find the roots of the quadratic - a,b,c are the quadratic coefficients
    let a = bx * cy - by * cx;
    let b = ax * cy - ay * cx;
    let c = ax * by - ay * bx;
    let inflectionTimes = flo_poly_1.default.allRoots([a, b, c], 0, 1);
    const evPs = evaluate(ps);
    return inflectionTimes.map(evPs);
}
function κ(ps, t) {
    const evDx = evaluateDx(ps);
    const evDy = evaluateDy(ps);
    const evDdx = evaluateDdx(ps);
    const evDdy = evaluateDdy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let ddx = evDdx(t);
        let ddy = evDdy(t);
        let a = dx * ddy - dy * ddx;
        let b = Math.sqrt(Math.pow((dx * dx + dy * dy), 3));
        return a / b;
    }
    // Curry
    return t === undefined ? f : f(t);
}
/**
 * Alias of κ.
 */
let curvature = κ;
function κds(ps, t) {
    const evDx = evaluateDx(ps);
    const evDy = evaluateDy(ps);
    const evDdx = evaluateDdx(ps);
    const evDdy = evaluateDdy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let ddx = evDdx(t);
        let ddy = evDdy(t);
        let a = dx * ddy - dy * ddx;
        let b = dx * dx + dy * dy;
        return a / b;
    }
    // Curry
    return t === undefined ? f : f(t);
}
function dκMod(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    function f(t) {
        let ts = t * t;
        let omt = 1 - t;
        let a = ts * x3;
        let b = ts * y3;
        let c = 2 * t - 3 * ts;
        let d = (3 * t - 1) * omt;
        let e = omt * omt;
        let f = 3 * (a + c * x2 - d * x1 - e * x0);
        let g = 3 * (b + c * y2 - d * y1 - e * y0);
        let h = 6 * (t * y3 - (3 * t - 1) * y2 + (3 * t - 2) * y1 + omt * y0);
        let i = 6 * (t * x3 - (3 * t - 1) * x2 + (3 * t - 2) * x1 + omt * x0);
        let j = Math.sqrt(f * f + g * g);
        return 4 * (f * (y3 - 3 * y2 + 3 * y1 - y0) -
            g * (x3 - 3 * x2 + 3 * x1 - x0)) * Math.pow(j, 3) -
            (f * h - b * g) * (2 * h * g + 2 * b * f) * j;
    }
    return t === undefined ? f : f(t);
}
function tangent(ps, t) {
    const evDx = evaluateDx(ps);
    const evDy = evaluateDy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let d = Math.sqrt(dx * dx + dy * dy);
        return [dx / d, dy / d];
    }
    // Curry
    return t === undefined ? f : f(t);
}
function normal(ps, t) {
    const tanPs = tangent(ps);
    function f(t) {
        let v = tanPs(t);
        return [v[1], -v[0]];
    }
    // Curry
    return t === undefined ? f : f(t);
}
/**
 * <p>
 * Categorizes the given cubic bezier curve according to whether it has a loop,
 * a cusp, or zero, one or two inflection points all of which are mutually
 * exclusive.
 * </p>
 * <p>
 * See <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">
 * this</a> paper.
 * </p>
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {string} A value of 'L', 'C', '0', '1', or '2' depending on whether
 * the curve has a loop, a cusp, or zero, one or two inflection points.
 */
function categorize(ps) {
    // TODO - finish
}
function totalCurvature(ps, interval) {
    const tanPs = tangent(ps);
    function f(interval) {
        return flo_gauss_quadrature_1.default(κds(ps), interval);
        // TODO
        /*
        let [a,b] = interval;
        let tangentA = tanPs(a);
        let tangentB = tanPs(b);
        let sinθ = Vector.cross(tanA, tanB)
        */
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
function totalAbsoluteCurvature(ps, interval) {
    function f(interval = [0, 1]) {
        // Numerically integrate the absolute curvature
        let result = flo_gauss_quadrature_1.default(t => Math.abs(κds(ps)(t)), interval);
        return result;
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
function len(interval, ps) {
    function f(ps) {
        if (interval[0] === interval[1]) {
            return 0;
        }
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        // Keep line below to ensure zero length curve returns zero!
        if (x0 === x1 && x1 === x2 && x2 === x3 &&
            y0 === y1 && y1 === y2 && y2 === y3) {
            return 0;
        }
        const evDs = ds(ps);
        return flo_gauss_quadrature_1.default(evDs, interval);
    }
    // Curry
    return ps === undefined ? f : f(ps);
}
function getTAtLength(ps, s) {
    const lenAtT = (t) => len([0, t], ps);
    function f(s) {
        return flo_poly_1.default.brent(t => (lenAtT(t) - s), 0, 1);
    }
    // Curry
    return s === undefined ? f : f(s);
}
function ds(ps, t) {
    const evDx = evaluateDx(ps);
    const evDy = evaluateDy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Curry
    return t === undefined ? f : f(t);
}
function evaluateX(ps, t) {
    const xPs = getX(ps); // Speed optimizing cache
    const evPs = flo_poly_1.default.evaluate(xPs);
    function f(t) {
        if (t === 0) {
            return ps[0][0];
        }
        if (t === 1) {
            return ps[3][0];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
function evaluateY(ps, t) {
    const yPs = getY(ps); // Speed optimizing cache
    const evPs = flo_poly_1.default.evaluate(yPs);
    function f(t) {
        if (t === 0) {
            return ps[0][1];
        }
        if (t === 1) {
            return ps[3][1];
        }
        return evPs(t);
    }
    return t === undefined ? f : f(t); // Curry
}
function evaluateDx(ps, t) {
    const dPs = getDx(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dPs);
    return t === undefined ? f : f(t); // Curry
}
function evaluateDy(ps, t) {
    const dPs = getDy(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dPs);
    return t === undefined ? f : f(t); // Curry
}
function evaluateDdx(ps, t) {
    const ddPs = getDdx(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(ddPs);
    return t === undefined ? f : f(t); // Curry
}
function evaluateDdy(ps, t) {
    const ddPs = getDdy(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(ddPs);
    return t === undefined ? f : f(t); // Curry
}
function evaluateDddx(ps, t) {
    const dddPs = getDddx(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dddPs);
    return t === undefined ? f : f(t); // Curry
}
function evaluateDddy(ps, t) {
    const dddPs = getDddy(ps); // Speed optimizing cache
    const f = flo_poly_1.default.evaluate(dddPs);
    return t === undefined ? f : f(t); // Curry
}
// TODO - refactor getBounds, getBoundingBox, etc.
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
function getNormalizedBoundingBox(ps, sinθ, cosθ) {
    let vectorToOrigin = flo_vector2d_1.default.transform(ps[0], x => -x);
    let boundingPs = flo_vector2d_1.default.translateThenRotatePs(vectorToOrigin, -sinθ, cosθ, ps);
    return getBoundingBox(boundingPs);
}
/**
 * Returns the tight bounding box of the given cubic bezier.
 * @returns The tight bounding box of the bezier as four ordered
 * points of a rotated rectangle.
 * TODO - test case of baseLength === 0
 */
let getBoundingBoxTight = memoize(function (ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let baseLength = Math.sqrt((x3 - x0) * (x3 - x0) + (y3 - y0) * (y3 - y0));
    let sinθ = (y3 - y0) / baseLength;
    let cosθ = (x3 - x0) / baseLength;
    let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
    let [[p0x, p0y], [p1x, p1y]] = box;
    let axisAlignedBox = [
        box[0], [p1x, p0y],
        box[1], [p0x, p1y]
    ];
    return flo_vector2d_1.default.rotateThenTranslatePs(sinθ, cosθ, ps[0], axisAlignedBox);
});
/**
 * Returns the axis-aligned bounding box of a given bezier.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
let getBoundingBox = memoize(function (ps) {
    return getBounds(ps).box;
});
/**
 * Calculates and returns general bezier bounds.
 * @returns {object} The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
let getBounds = memoize(function (ps) {
    // Roots of derivative
    let roots = [getDx(ps), getDy(ps)]
        .map(poly => flo_poly_1.default.allRoots(poly, 0, 1));
    // Endpoints
    roots[0].push(0, 1);
    roots[1].push(0, 1);
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let tMinX = undefined;
    let tMinY = undefined;
    let tMaxX = undefined;
    let tMaxY = undefined;
    // Test points
    for (let i = 0; i < roots[0].length; i++) {
        let t = roots[0][i];
        let x = evaluateX(ps, t);
        if (x < minX) {
            minX = x;
            tMinX = t;
        }
        if (x > maxX) {
            maxX = x;
            tMaxX = t;
        }
    }
    for (let i = 0; i < roots[1].length; i++) {
        let t = roots[1][i];
        let y = evaluateY(ps, t);
        if (y < minY) {
            minY = y;
            tMinY = t;
        }
        if (y > maxY) {
            maxY = y;
            tMaxY = t;
        }
    }
    let ts = [[tMinX, tMinY], [tMaxX, tMaxY]];
    let box = [[minX, minY], [maxX, maxY]];
    return { ts, box };
});
/**
 * <p>
 * Returns a cubic bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm.
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 * @returns {number[][]}
 */
function fromTo(ps) {
    return function (t1, t2) {
        if (t1 === t2) {
            // Degenerate case
            let p = evaluate(ps, t1);
            return [p, p, p, p];
        }
        let t = fromTTo1(ps, t1);
        return from0ToT(t, (t2 - t1) / (1 - t1));
    };
}
;
/**
 * <p>
 * Returns a cubic bezier curve that starts at the given curve's t=0 and ends
 * at the given t parameter. Uses de Casteljau's algorithm.
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the resultant bezier should end
 */
function from0ToT(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    let t2 = t * t;
    let t3 = t2 * t;
    let s2 = s * s;
    let s3 = s2 * s;
    return [
        [x0, y0],
        [t * x1 + s * x0, t * y1 + s * y0],
        [t2 * x2 + 2 * s * t * x1 + s2 * x0, t2 * y2 + 2 * s * t * y1 + s2 * y0],
        [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0,
            t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0]
    ];
}
/**
 * <p>
 * Returns a cubic bezier curve that starts at the given t parameter and
 * ends at t=1. Uses de Casteljau's algorithm.
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the resultant bezier should start
 */
function fromTTo1(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    let t2 = t * t;
    let t3 = t2 * t;
    let s2 = s * s;
    let s3 = s2 * s;
    return [
        [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0,
            t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0],
        [t2 * x3 + 2 * t * s * x2 + s2 * x1, t2 * y3 + 2 * t * s * y2 + s2 * y1],
        [t * x3 + s * x2, t * y3 + s * y2],
        [x3, y3]
    ];
}
/**
 * <p>
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1]. Uses de Casteljau's algorithm.
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the curve should be split
 * @returns {number[][]}
 */
function splitAt(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    let t2 = t * t;
    let t3 = t2 * t;
    let s2 = s * s;
    let s3 = s2 * s;
    let ps1 = [
        [x0, y0],
        [t * x1 + s * x0, t * y1 + s * y0],
        [t2 * x2 + 2 * s * t * x1 + s2 * x0, t2 * y2 + 2 * s * t * y1 + s2 * y0],
        [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0,
            t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0]
    ];
    let ps2 = [
        ps1[3],
        [t2 * x3 + 2 * t * s * x2 + s2 * x1, t2 * y3 + 2 * t * s * y2 + s2 * y1],
        [t * x3 + s * x2, t * y3 + s * y2],
        [x3, y3]
    ];
    return [ps1, ps2];
}
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 * @returns {string}
 */
function toString(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
}
/**
 * Scales all control points of the given bezier by the given factor.
 * @param ps - A bezier curve
 * @param factor - The scale factor
 * @returns {number[][]}
 */
function scale(ps, factor) {
    return ps.map(x => [x[0] * factor, x[1] * factor]);
}
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given line.
 * @param ps - The bezier curve
 * @param l - The line given as a start and end point
 * @returns {number[]}
 */
function lineIntersection(ps, l) {
    let [[x0, y0], [x1, y1]] = l;
    let [x, y] = [x1 - x0, y1 - y0];
    if (x === 0 && y === 0) {
        return [];
    }
    // Move the line and the bezier together so the line's first point is on the
    // origin.
    ps = translate([-x0, -y0], ps);
    // Rotate the bezier and line together so the line is y=0.
    let len = Math.sqrt(x * x + y * y);
    let sinθ = y / len;
    let cosθ = x / len;
    ps = rotate(-sinθ, cosθ, ps);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(getY(ps), 0, 1);
}
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given horizontal line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtY(ps, y) {
    // Translate ps so that y = 0.
    ps = ps.map(p => [p[0], p[1] - y]);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(getY(ps), 0, 1);
}
/**
 * Returns the bezier t values of the intersection between the given cubic
 * bezier and the given vertical line.
 * @param ps - The bezier curve
 * @param y - The y value of the horizontal line
 */
function tsAtX(ps, x) {
    // Translate ps so that x = 0.
    ps = ps.map(p => [p[0] - x, p[1]]);
    // Find the intersection t values
    return flo_poly_1.default.allRoots(getX(ps), 0, 1);
}
/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier. Note that the two bezier endpoints differ in general.
 * @param ps - A cubic bezier curve.
 * @returns {number[][]}
 */
function toQuadratic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [
        [(19 / 20) * x0 + (3 / 20) * x1 + (-3 / 20) * x2 + (1 / 20) * x3,
            (19 / 20) * y0 + (3 / 20) * y1 + (-3 / 20) * y2 + (1 / 20) * y3],
        [(-1 / 4) * x0 + (3 / 4) * x1 + (3 / 4) * x2 + (-1 / 4) * x3,
            (-1 / 4) * y0 + (3 / 4) * y1 + (3 / 4) * y2 + (-1 / 4) * y3],
        [(1 / 20) * x0 + (-3 / 20) * x1 + (3 / 20) * x2 + (19 / 20) * x3,
            (1 / 20) * y0 + (-3 / 20) * y1 + (3 / 20) * y2 + (19 / 20) * y3]
    ];
}
/**
 * Returns the hybrid quadratic version of the given cubic bezier. For a
 * definition of hybrid quadratic bezier curves see <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">
 * this paper</a>.
 * @param ps - A cubic bezier curve.
 * @returns {object[]} An array of three quadratic bezier points where the
 * middle point is a 'hybrid' point represented as a line (itself represented
 * by two points (a linear bezier curve)) which can be evaluated at a different
 * t value (call it th). If evaluated at the same t value the result is the same
 * as evaluating the original cubic bezier at t. The set generated by evaluating
 * the hybrid quadratic curve for all (t,th) value pairs forms a geometric area
 * bound around the orginal cubic bezier curve. The length of the linear bezier
 * curve mentioned above is a measure of how closely the cubic can be
 * represented as a quadratic bezier curve.
 */
function toHybridQuadratic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [
        [x0, y0],
        [[(3 * x1 - x0) / 2, (3 * y1 - y0) / 2],
            [(3 * x2 - x3) / 2, (3 * y2 - y3) / 2]],
        [x3, y3] // evaluated at t
    ];
}
/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see
 * toHybridQuadratic for details).
 * @param hq - A hybrid quadratic
 * @param t - The bezier parameter value
 * @param th - The parameter value for the hybrid quadratic point.
 */
function evaluateHybridQuadratic(hq, t, th) {
    let P0 = hq[0];
    let P1_ = hq[1];
    let P2 = hq[2];
    let P1 = evaluateLinear(hq[1], th);
    return evaluateQuadratic([P0, P1, P2], t);
}
/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param ps - A linear bezier curve.
 * @param t - The value where the bezier should be evaluated
 */
function evaluateLinear(ps, t) {
    let [[x0, y0], [x1, y1]] = ps;
    let x = x0 * (1 - t) + x1 * t;
    let y = y0 * (1 - t) + y1 * t;
    return [x, y];
}
/**
 * Returns a clone of the given cubic bezier. Use sparingly; this is not in the
 * spirit of functional programming.
 * @param ps - A cubic bezier given by its array of control points
 */
function clone(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}
/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param ps - A quadratic bezier curve.
 * @param t - The value where the bezier should be evaluated
 * @returns {number[]}
 */
function evaluateQuadratic(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    let x = x0 * Math.pow((1 - t), 2) + x1 * 2 * (1 - t) * t + x2 * Math.pow(t, 2);
    let y = y0 * Math.pow((1 - t), 2) + y1 * 2 * (1 - t) * t + y2 * Math.pow(t, 2);
    return [x, y];
}
/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic
 * bezier curves can always be represented by cubics - the converse is false.
 * @param ps - A quadratic bezier curve.
 * @returns {number[][]}
 */
function toCubic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [
        [x0, y0],
        [(1 / 3) * x0 + (2 / 3) * x1, (1 / 3) * y0 + (2 / 3) * y1],
        [(2 / 3) * x1 + (1 / 3) * x2, (2 / 3) * y1 + (1 / 3) * y2],
        [x2, y2]
    ];
}
/**
 * Check if the two given cubic beziers are nearly coincident everywhere and
 * returns the coincident stretch (if any), otherwise returns undefined.
 * @param P - A cubic bezier curve.
 * @param Q - Another cubic bezier curve.
 * @param δ - An indication of how closely the curves should stay to
 * each other before considered coincident.
 * @returns
 */
function coincident(P, Q, δ = 1e-6) {
    let [P0, P1, P2, P3] = P;
    let [Q0, Q1, Q2, Q3] = Q;
    let { pp: pP0, t: tPQ0, p: pPQ0, d: dPQ0 } = calcPointAndNeighbor(P, Q, 0);
    let { pp: pP1, t: tPQ1, p: pPQ1, d: dPQ1 } = calcPointAndNeighbor(P, Q, 1);
    let { pp: pQ0, t: tQP0, p: pQP0, d: dQP0 } = calcPointAndNeighbor(Q, P, 0);
    let { pp: pQ1, t: tQP1, p: pQP1, d: dQP1 } = calcPointAndNeighbor(Q, P, 1);
    // Check for start and end points coincident.
    let tStartQ = 0;
    let tEndQ = 1;
    let tStartP = 0;
    let tEndP = 1;
    let count = 0;
    if (dPQ0 <= δ) {
        tStartQ = tPQ0;
        count++;
    }
    if (dPQ1 <= δ) {
        tEndQ = tPQ1;
        count++;
    }
    if (dQP0 <= δ) {
        tStartP = tQP0;
        count++;
    }
    if (dQP1 <= δ) {
        tEndP = tQP1;
        count++;
    }
    // At least 2 endpoints must be coincident.
    if (count < 2) {
        return undefined;
    }
    if (tStartP > tEndP) {
        [tStartP, tEndP] = [tEndP, tStartP];
    }
    if (tStartQ > tEndQ) {
        [tStartQ, tEndQ] = [tEndQ, tStartQ];
    }
    let tSpanP = tEndP - tStartP;
    let tSpanQ = tEndQ - tStartQ;
    // We must check at least 8 additional points to ensure entire curve
    // is coincident, otherwise we may simply have found intersection 
    // points.
    // TODO - Change so that we cut the curves to be about equal and check the
    // other two control points for closeness.
    let res = true;
    for (let i = 1; i < 10; i++) {
        let t = tStartP + tSpanP * (i / 10);
        let { pp, t: tt, p: pq, d } = calcPointAndNeighbor(P, Q, t);
        if (d > δ) {
            return undefined;
        }
    }
    return { p: [tStartP, tEndP], q: [tStartQ, tEndQ] };
    function calcPointAndNeighbor(P, Q, t) {
        // TODO - must also check crossing of normals - for if two curves open
        // at endpoints and stop essentially at same point.
        let pp1 = evaluate(P)(t);
        let normalVector = normal(P)(0);
        let pp2 = flo_vector2d_1.default.translate(pp1, normalVector);
        let ts = lineIntersection(Q, [pp1, pp2]);
        let bestT = undefined;
        let bestP = undefined;
        let bestD = Number.POSITIVE_INFINITY;
        for (let t of ts) {
            let p = evaluate(Q)(t);
            let d = flo_vector2d_1.default.distanceBetween(p, pp1);
            if (d < bestD) {
                bestT = t;
                bestP = p;
                bestD = d;
            }
        }
        return { pp: pp1, t: bestT, p: bestP, d: bestD };
    }
}
/**
 * Robust, extremely accurate and extremely fast (cubically convergent in
 * general with fast iteration steps) algorithm that returns the intersections
 * between two cubic beziers.
 *
 * At stretches where the two curves run extremely close to (or on top of) each
 * other and curve the same direction an interval is returned instead of a
 * point.
 *
 * The algorithm is based on a <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">paper</a>
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster and more accurate than the standard fat-line intersection
 * algorithm. The algorithm has been modified to prevent run-away recursion
 * by checking for coincident pieces at subdivision steps.
 *
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * @param [δ] - An optional tolerance to within which the t parameter
 * should be calculated - defaults to the minimum value of 24*Number.EPSILON or
 * approximately 5e-15. Note that it might not make sense to set this to as
 * large as say 1e-5 since only a single iteration later the maximum accuracy
 * will be attained and not much speed will be gained anyway. Similarly if δ is
 * set to 1e-2 only two iterations will be saved. This is due to the algorithm
 * being cubically convergent (usually converging in about 4 to 8 iterations for
 * typical intersections).
 * @param [Δ] - A tolerance that indicates how closely a stretch of the
 * beziers can run together before being considered coincident. Defaults to the
 * minimum possible value of 1e-6 if not specified.
 * @returns An array that contains the t-value pairs at intersection
 * of the first and second beziers respectively. The array can also contain t
 * range pairs for coincident pieces that can be either used or ignored
 * depending on the application, e.g. the return value might be [[0.1,0.2],
 * [0.3,0.5],[[0.4,0.5],[0.6,0.7]]] that indicates intersection points at t
 * values of t1=0.1 and t2=0.2 for the first and second bezier respectively as
 * well as at t1=0.3 and t2=0.5 and finally indicates the curves to be nearly
 * coincident from t1=0.4 to t1=0.5 for the first bezier and t2=0.6 to t=0.7 for
 * the second bezier.
 */
function bezier3Intersection(ps1, ps2, δ, Δ) {
    const dst = flo_vector2d_1.default.distanceBetween;
    const sdst = flo_vector2d_1.default.squaredDistanceBetween;
    // The minimum value Δ can be. If it is too small the algorithm may take too
    // long in cases where the two curves run extremely close to each other for
    // their entire length and curve the same direction.
    const ΔMin = 1e-6;
    // This is an estimate of the relative floating point error during clipping.
    // A bound is given by |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k
    // are the control points indexed by k=0,1,2,3 and η is machine epsilon, 
    // i.e. Number.EPSILON. We quadruple the bound to be sure.
    const δMin = 24 * Number.EPSILON;
    // Maximum error - limited to take rounding error into account.
    if (δ === undefined) {
        δ = 0;
    }
    δ = Math.max(δ, δMin);
    if (Δ === undefined) {
        Δ = ΔMin;
    }
    Δ = Math.max(Δ, ΔMin);
    // Intersection t values for both beziers
    let tss = [];
    //let iterations = 0;
    intersection(ps1, ps2, [0, 1], [0, 1], 1);
    //console.log(iterations);
    return tss;
    // Helper function
    function intersection(Q_, P_, qRange, pRange, idx) {
        //iterations++;
        let cidx = idx === 0 ? 1 : 0; // Counter flip-flop index
        // Move intersection toward the origin to prevent serious floating point 
        // issues that are introduced specifically by the getLineEquation 
        // function. This allows us to get a relative error in the final 
        // result usually in the 10 ULPS or less range.
        [P_, Q_] = center(P_, Q_);
        let [Q0, Q1, Q2, Q3] = Q_;
        let [P0, P1, P2, P3] = P_;
        // Get the implict line equation for the line from the first to the last
        // control point of Q. This equation gives the distance between any 
        // point and the line.
        let dQ = getDistanceToLineFunction([Q0, Q3]);
        // Calculate the distance from the control points of Q to the line 
        // [Q0,Q3].
        let dQi = (i) => dQ(Q_[i]);
        let dQs = [1, 2].map(dQi);
        let [dQ1, dQ2] = dQs;
        // Calculate the fat line of Q.
        let C = (dQ1 * dQ2 > 0) ? 3 / 4 : 4 / 9;
        let dMin = C * Math.min(0, dQ1, dQ2);
        let dMax = C * Math.max(0, dQ1, dQ2);
        let { tMin, tMax } = geoClip(P_, dQ, dMin, dMax);
        if (tMin === Number.POSITIVE_INFINITY) {
            return; // No intersection
        }
        // The paper calls for a heuristic that if less than 30% will be
        // clipped, rather split the longest curve and find intersections in the
        // two halfs seperately.
        if (tMax - tMin > 0.7) {
            // Some length measure
            let pSpan = pRange[1] - pRange[0];
            let qSpan = qRange[1] - qRange[0];
            if (coincident(P_, Q_) !== undefined) {
                return;
            }
            // Split the curve in half
            if (pSpan <= qSpan) {
                cidx = idx;
                [P_, Q_] = [Q_, P_];
                [pRange, qRange] = [qRange, pRange];
            }
            // Update t range.
            let span = pRange[1] - pRange[0];
            // 1st half
            let tMinA = pRange[0];
            let tMaxA = tMinA + span / 2;
            // 2nd half
            let tMinB = tMaxA;
            let tMaxB = pRange[1];
            let A = fromTo(P_)(0, 0.5);
            let B = fromTo(P_)(0.5, 1);
            intersection(A, Q_, [tMinA, tMaxA], qRange, cidx);
            intersection(B, Q_, [tMinB, tMaxB], qRange, cidx);
            return;
        }
        // Update t range.
        let span = pRange[1] - pRange[0];
        let tMin_ = (tMin * span + pRange[0]);
        let tMax_ = (tMax * span + pRange[0]);
        // Clip
        P_ = fromTo(P_)(tMin, tMax);
        if (Math.abs(tMax_ - tMin_) < δ) {
            let t1 = (tMax_ + tMin_) / 2;
            let pq = idx === 0 ? [ps1, ps2] : [ps2, ps1];
            let t2 = calcOtherT(t1, pq[0], pq[1]);
            if (t2 === undefined) {
                return undefined;
            }
            let ts = idx === 0 ? [t2, t1] : [t1, t2];
            tss.push(ts);
            return;
        }
        // Swap Q and P and iterate.
        intersection(P_, Q_, [tMin_, tMax_], qRange, cidx);
    }
    function geoClip(P, dQ, dMin, dMax) {
        let dPi = (i) => dQ(P[i]);
        let dPs = [0, 1, 2, 3].map(dPi);
        let [dP0, dP1, dP2, dP3] = dPs;
        let hq = toHybridQuadratic(P);
        let dH0 = dQ(hq[0]);
        let dH2 = dQ(hq[2]);
        let dH10 = dQ(hq[1][0]);
        let dH11 = dQ(hq[1][1]);
        let dHmin = Math.min(dH10, dH11);
        let dHmax = Math.max(dH10, dH11);
        let DyMin = [
            dH0 - 2 * dHmin + dH2,
            -2 * dH0 + 2 * dHmin,
            dH0
        ];
        let DyMax = [
            dH0 - 2 * dHmax + dH2,
            -2 * dH0 + 2 * dHmax,
            dH0
        ];
        let errorBound = 2 * Math.max(flo_poly_1.default.hornerErrorBound(DyMin, 1), flo_poly_1.default.hornerErrorBound(DyMax, 1));
        dMin = dMin - errorBound;
        dMax = dMax + errorBound;
        let DyMinMin = DyMin.slice();
        DyMinMin[2] = DyMinMin[2] - dMin;
        let DyMinMax = DyMin.slice();
        DyMinMax[2] = DyMinMax[2] - dMax;
        let DyMaxMin = DyMax.slice();
        DyMaxMin[2] = DyMaxMin[2] - dMin;
        let DyMaxMax = DyMax.slice();
        DyMaxMax[2] = DyMaxMax[2] - dMax;
        let tMin = Number.POSITIVE_INFINITY;
        let tMax = Number.NEGATIVE_INFINITY;
        let rootsMinMin = flo_poly_1.default.allRoots(DyMinMin, 0, 1);
        let rootsMinMax = flo_poly_1.default.allRoots(DyMinMax, 0, 1);
        let rootsMaxMin = flo_poly_1.default.allRoots(DyMaxMin, 0, 1);
        let rootsMaxMax = flo_poly_1.default.allRoots(DyMaxMax, 0, 1);
        tMin = Math.min(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
        tMax = Math.max(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
        if (dH0 >= dMin && dH0 <= dMax) {
            tMin = 0;
        }
        if (dH2 >= dMin && dH2 <= dMax) {
            tMax = 1;
        }
        if (tMin < 0) {
            tMin = 0;
        }
        if (tMax > 1) {
            tMax = 1;
        }
        return { tMin, tMax };
    }
    /**
     * Return the given two beziers but translated such that the shorter (by
     * some length measure) is closer to the origin.
     * @private
     * @param P
     * @param Q
     */
    function center(P, Q) {
        let [P0, P1, P2, P3] = P;
        let [Q0, Q1, Q2, Q3] = Q;
        let lengthP = sdst(P0, P1) + sdst(P1, P2) + sdst(P2, P3);
        let lengthQ = sdst(Q0, Q1) + sdst(Q1, Q2) + sdst(Q2, Q3);
        let moveX;
        let moveY;
        if (lengthQ < lengthP) {
            moveX = (Q0[0] + Q1[0] + Q2[0] + Q3[0]) / 4;
            moveY = (Q0[1] + Q1[1] + Q2[1] + Q3[1]) / 4;
        }
        else {
            moveX = (P0[0] + P1[0] + P2[0] + P3[0]) / 4;
            moveY = (P0[1] + P1[1] + P2[1] + P3[1]) / 4;
        }
        P = P.map(x => [x[0] - moveX, x[1] - moveY]);
        Q = Q.map(x => [x[0] - moveX, x[1] - moveY]);
        return [P, Q];
    }
    /**
     * Calculates the t-value of the closest point on Q to P(t).
     * @ignore
     * @param {number}
     * @param Q
     * @param P
     */
    function calcOtherT(t, P, Q) {
        let pp = evaluate(P)(t);
        let [x, y] = pp;
        let tqsh = tsAtY(Q, y);
        let tqsv = tsAtX(Q, x);
        if (!tqsh.length && !tqsv.length) {
            return undefined;
        }
        let tqs = [...tqsh, ...tqsv];
        let bestT = undefined;
        let bestD = Number.POSITIVE_INFINITY;
        for (let tq of tqs) {
            let pq = evaluate(Q)(tq);
            let d = sdst(pp, pq);
            if (d < bestD) {
                bestD = d;
                bestT = tq;
            }
        }
        return bestT;
    }
}
/**
 * Get the implicit line equation from two 2d points in the form f(x,y) ax + by + c = 0
 * returned as the array [a,b,c].
 * @ignore
 * @param l - A line given by two points, e.g. [[2,0],[3,3]]
 * @returns {number[]}
 */
function getLineEquation(l) {
    let [[x1, y1], [x2, y2]] = l;
    let a = y1 - y2;
    let b = x2 - x1;
    let c = x1 * y2 - x2 * y1;
    return [a, b, c];
}
/**
 * @private
 * @param l
 */
function getDistanceToLineFunction(l) {
    let [a, b, c] = getLineEquation(l);
    return function (p) {
        return a * p[0] + b * p[1] + c;
    };
}
/**
 * Get the implicit line equation from two 2d points in the form f(x,y) ax + by + c = 0
 * where a^2 + b^2 = 1 returned as the array [a,b,c].
 * @param l - A line given by two points, e.g. [[2,0],[3,3]]
 * @example
 * getNormalizedLineEquation([[1,0],[5,3]]); //=> [-0.6, 0.8, 0.6]
 */
function getNormalizedLineEquation(l) {
    let [[x1, y1], [x2, y2]] = l;
    let a = y1 - y2;
    let b = x2 - x1;
    let c = x1 * y2 - x2 * y1;
    let norm = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    // Normalize it
    a = a / norm;
    b = b / norm;
    c = c / norm;
    return [a, b, c];
}
/**
 * Returns the given points (e.g. bezier) in reverse order.
 * @param ps
 * @returns {number[][]}
 */
function reverse(ps) {
    return ps.slice().reverse();
}
/**
 * <p>
 * Purely functional cubic bezier library, including robust
 * cubic-cubic bezier intersection.
 * </p>
 * <p>
 * A cubic bezier is represented as an array of points, i.e.
 * [p0, p1, p2, p3] where each point is an ordered pair, e.g.
 * [[0,0],[1,1],[2,1],[3,0]].
 * </p>
 */
const Bezier3 = {
    rotate,
    getX,
    getY,
    getDx,
    getDy,
    getDdx,
    getDdy,
    getDddx,
    getDddy,
    getBounds,
    bezier3Intersection,
    lineIntersection,
    tsAtX,
    tsAtY,
    getBoundingHull,
    fromLine,
    translate,
    evaluate,
    κ,
    dκMod,
    curvature,
    tangent,
    normal,
    totalCurvature,
    totalAbsoluteCurvature,
    len,
    getTAtLength,
    evaluateX,
    evaluateY,
    evaluateDx,
    evaluateDy,
    evaluateDdx,
    evaluateDdy,
    evaluateDddx,
    evaluateDddy,
    getBoundingBoxTight,
    getBoundingBox,
    fromTo,
    splitAt,
    scale,
    toCubic,
    toQuadratic,
    toHybridQuadratic,
    evaluateHybridQuadratic,
    evaluateQuadratic,
    evaluateLinear,
    coincident,
    from0ToT,
    fromTTo1,
    clone,
    reverse
};
exports.default = Bezier3;
