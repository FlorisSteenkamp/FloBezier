// A slow but very accurate (roughly 1e-28 relative error) reference
// implementation of the bezier curve length function calculated entirely in
// double-double precision using adaptive Gauss-Legendre quadrature (after
// splitting the interval at the (double-double refined) speed stationary
// points so that cusps lie at sub-interval endpoints).
//
// This file is deliberately self-contained (it imports from packages only) so
// that it can be used both from the jest tests and from plain node (e.g. the
// length benchmark in `performance/length`).

import {
    ddAddDd, ddDiffDd, ddMultDd, ddMultDouble2, ddDivDd, ddDivDouble, ddSqrt,
    ddCompare, ddAbs
} from 'double-double';
import { allRoots } from 'flo-poly';


/** A double-double is represented as `[low, high]` */
type DD = number[];

const dd = (x: number): DD => [0, x];
const ddToNumber = (x: DD): number => x[1] + x[0];
const { cos, PI: π } = Math;


//------------------------------------------------------------------------------
// Gauss-Legendre nodes and weights in double-double precision
//------------------------------------------------------------------------------

const glOrder = 20;

/**
 * Returns `[P_n(x), P_n'(x)]` (the Legendre polynomial and its derivative) in
 * double-double precision.
 */
function legendreDd(n: number, x: DD): [DD, DD] {
    let p0: DD = dd(1);
    let p1: DD = x;
    for (let k=1; k<n; k++) {
        // (k+1)*P_{k+1} = (2k+1)*x*P_k - k*P_{k-1}
        const p2 = ddDivDouble(
            ddDiffDd(ddMultDouble2(2*k + 1, ddMultDd(x, p1)), ddMultDouble2(k, p0)),
            k + 1
        );
        p0 = p1;
        p1 = p2;
    }
    // P_n' = n*(x*P_n - P_{n-1})/(x² - 1)
    const dp = ddDivDd(
        ddMultDouble2(n, ddDiffDd(ddMultDd(x, p1), p0)),
        ddDiffDd(ddMultDd(x, x), dd(1))
    );

    return [p1, dp];
}

/** Returns `[P_n(x), P_n'(x)]` in double precision (for the initial guess). */
function legendre(n: number, x: number): [number, number] {
    let p0 = 1;
    let p1 = x;
    for (let k=1; k<n; k++) {
        const p2 = ((2*k + 1)*x*p1 - k*p0)/(k + 1);
        p0 = p1;
        p1 = p2;
    }
    return [p1, n*(x*p1 - p0)/(x*x - 1)];
}

/** Gauss-Legendre nodes and weights (order `glOrder`) in double-double. */
const [glNodes, glWeights] = (() => {
    const n = glOrder;
    const nodes: DD[] = [];
    const weights: DD[] = [];
    for (let i=1; i<=n; i++) {
        // initial guess followed by Newton iterations in double ...
        let x = cos(π*(i - 0.25)/(n + 0.5));
        for (let j=0; j<10; j++) {
            const [p, dp] = legendre(n, x);
            x -= p/dp;
        }
        // ... and then in double-double
        let xdd = dd(x);
        let dp: DD = dd(1);
        for (let j=0; j<4; j++) {
            const [p, dp_] = legendreDd(n, xdd);
            dp = dp_;
            xdd = ddDiffDd(xdd, ddDivDd(p, dp));
        }
        [, dp] = legendreDd(n, xdd);
        // w = 2/((1 - x²)*P_n'(x)²)
        const w = ddDivDd(
            dd(2),
            ddMultDd(ddDiffDd(dd(1), ddMultDd(xdd, xdd)), ddMultDd(dp, dp))
        );
        nodes.push(xdd);
        weights.push(w);
    }
    return [nodes, weights];
})();


/** Gauss-Legendre quadrature of `f` over `[a,b]` in double-double. */
function gaussLegendreDd(f: (t: DD) => DD, a: DD, b: DD): DD {
    const c = ddDivDouble(ddAddDd(a, b), 2);
    const h = ddDivDouble(ddDiffDd(b, a), 2);
    let sum: DD = dd(0);
    for (let i=0; i<glOrder; i++) {
        const t = ddAddDd(c, ddMultDd(h, glNodes[i]));
        sum = ddAddDd(sum, ddMultDd(glWeights[i], f(t)));
    }
    return ddMultDd(sum, h);
}


/** Adaptive (bisection) Gauss-Legendre quadrature in double-double. */
function integrateDd(
        f: (t: DD) => DD,
        a: DD,
        b: DD,
        Iab: DD,
        tolAbs: DD,
        depth: number): DD {

    const m = ddDivDouble(ddAddDd(a, b), 2);
    const Iam = gaussLegendreDd(f, a, m);
    const Imb = gaussLegendreDd(f, m, b);
    const I2 = ddAddDd(Iam, Imb);

    const err = ddAbs(ddDiffDd(Iab, I2));
    if (ddCompare(err, tolAbs) <= 0 || depth >= 60) {
        return I2;
    }

    const tol2 = ddDivDouble(tolAbs, 2);

    return ddAddDd(
        integrateDd(f, a, m, Iam, tol2, depth + 1),
        integrateDd(f, m, b, Imb, tol2, depth + 1)
    );
}


//------------------------------------------------------------------------------
// The bezier curve speed in double-double precision
//------------------------------------------------------------------------------

/**
 * Returns the power basis coefficients (highest power first, in double-double)
 * of the derivative of the given bezier curve, i.e. `[dX, dY]`.
 */
function derivativePowerBasisDd(ps: number[][]): [DD[], DD[]] {
    const coeffs = (c: number[]): DD[] => {
        if (c.length === 4) {
            const [x0,x1,x2,x3] = c;
            return [
                // 3*(x3 - 3*x2 + 3*x1 - x0)
                ddMultDouble2(3, ddAddDd(
                    ddDiffDd(dd(x3), ddMultDouble2(3, dd(x2))),
                    ddDiffDd(ddMultDouble2(3, dd(x1)), dd(x0))
                )),
                // 6*(x2 - 2*x1 + x0)
                ddMultDouble2(6, ddAddDd(ddDiffDd(dd(x2), ddMultDouble2(2, dd(x1))), dd(x0))),
                // 3*(x1 - x0)
                ddMultDouble2(3, ddDiffDd(dd(x1), dd(x0)))
            ];
        }
        if (c.length === 3) {
            const [x0,x1,x2] = c;
            return [
                // 2*(x2 - 2*x1 + x0)
                ddMultDouble2(2, ddAddDd(ddDiffDd(dd(x2), ddMultDouble2(2, dd(x1))), dd(x0))),
                // 2*(x1 - x0)
                ddMultDouble2(2, ddDiffDd(dd(x1), dd(x0)))
            ];
        }
        const [x0,x1] = c;
        return [ddDiffDd(dd(x1), dd(x0))];
    }

    return [coeffs(ps.map(p => p[0])), coeffs(ps.map(p => p[1]))];
}


/** Horner evaluation in double-double. */
function hornerDd(p: DD[], t: DD): DD {
    let r: DD = dd(0);
    for (let i=0; i<p.length; i++) {
        r = ddAddDd(ddMultDd(r, t), p[i]);
    }
    return r;
}


/** Polynomial differentiation in double-double. */
function differentiateDd(p: DD[]): DD[] {
    const n = p.length - 1;
    const r: DD[] = [];
    for (let i=0; i<n; i++) {
        r.push(ddMultDouble2(n - i, p[i]));
    }
    return r;
}


/**
 * Returns the parameter values (strictly inside `(tS,tE)`, ascending) where
 * the speed of the given curve is stationary, refined to double-double
 * precision via Newton iteration.
 */
function speedStationaryPointsDd(
        dX: DD[],
        dY: DD[],
        tS: number,
        tE: number): DD[] {

    if (dX.length < 2) { return []; }  // constant speed

    // q(t) = dx² + dy²; q' = 2*(dx*dx' + dy*dy'); q'' = 2*(dx'² + dx*dx'' + dy'² + dy*dy'')
    const dXd = differentiateDd(dX);
    const dYd = differentiateDd(dY);
    const dXdd = differentiateDd(dXd);
    const dYdd = differentiateDd(dYd);

    const qd = (t: DD) => ddAddDd(
        ddMultDd(hornerDd(dX, t), hornerDd(dXd, t)),
        ddMultDd(hornerDd(dY, t), hornerDd(dYd, t))
    );
    const qdd = (t: DD) => {
        const dx = hornerDd(dX, t), dxd = hornerDd(dXd, t);
        const dy = hornerDd(dY, t), dyd = hornerDd(dYd, t);
        const dxdd = dXdd.length ? hornerDd(dXdd, t) : dd(0);
        const dydd = dYdd.length ? hornerDd(dYdd, t) : dd(0);
        return ddAddDd(
            ddAddDd(ddMultDd(dxd, dxd), ddMultDd(dx, dxdd)),
            ddAddDd(ddMultDd(dyd, dyd), ddMultDd(dy, dydd))
        );
    }

    // Initial (double precision) roots of q' (a cubic for cubic curves)
    const toDouble = (p: DD[]) => p.map(ddToNumber);
    const [a2,a1,a0] = [0,0,0,...toDouble(dX)].slice(-3);
    const [b2,b1,b0] = [0,0,0,...toDouble(dY)].slice(-3);
    const qdPoly = [
        2*(a2*a2 + b2*b2),
        3*(a2*a1 + b2*b1),
        a1*a1 + b1*b1 + 2*(a2*a0 + b2*b0),
        a1*a0 + b1*b0
    ];
    while (qdPoly.length > 0 && qdPoly[0] === 0) { qdPoly.shift(); }
    if (qdPoly.length <= 1) { return []; }
    const roots = allRoots(qdPoly, tS, tE).filter(t => t > tS && t < tE);

    const refined: DD[] = [];
    for (const r of roots) {
        let t = dd(r);
        for (let i=0; i<6; i++) {
            const q2 = qdd(t);
            if (ddToNumber(q2) === 0) { break; }
            t = ddDiffDd(t, ddDivDd(qd(t), q2));
        }
        const t_ = ddToNumber(t);
        if (t_ > tS && t_ < tE) { refined.push(t); }
    }

    return refined.sort((a, b) => ddCompare(a, b));
}


//------------------------------------------------------------------------------
// The reference length function
//------------------------------------------------------------------------------

/**
 * Returns the length of the given bezier curve (order 0, 1, 2 or 3) over the
 * given parameter interval calculated to (roughly) 1e-28 relative accuracy
 * entirely in double-double precision (returned as a double-double, i.e.
 * `[low, high]`).
 *
 * * slow (typically a few milliseconds per call) - intended as a reference
 * for testing and benchmarking only
 *
 * @param interval the parameter interval, e.g. `[0,1]`
 * @param ps the bezier curve's control points
 */
function referenceLength(
        interval: number[],
        ps: number[][]): DD {

    let [tS, tE] = interval;
    if (tS === tE || ps.length === 1) { return dd(0); }
    if (tS > tE) { [tS, tE] = [tE, tS]; }

    const [dX, dY] = derivativePowerBasisDd(ps);

    if (ps.length === 2) {
        // constant speed - exact
        const speed = ddSqrt(ddAddDd(ddMultDd(dX[0], dX[0]), ddMultDd(dY[0], dY[0])));
        return ddMultDd(speed, ddDiffDd(dd(tE), dd(tS)));
    }

    const speed = (t: DD) => {
        const dx = hornerDd(dX, t);
        const dy = hornerDd(dY, t);
        return ddSqrt(ddAddDd(ddMultDd(dx, dx), ddMultDd(dy, dy)));
    }

    const ts: DD[] = [dd(tS), ...speedStationaryPointsDd(dX, dY, tS, tE), dd(tE)];

    // An upper bound on the length (the control polygon length) to scale the
    // absolute tolerance
    let polyLen = 0;
    for (let i=0; i<ps.length-1; i++) {
        polyLen += Math.hypot(ps[i+1][0] - ps[i][0], ps[i+1][1] - ps[i][1]);
    }
    const tolAbs = dd(polyLen*(tE - tS)*1e-30);

    let total: DD = dd(0);
    for (let i=0; i<ts.length-1; i++) {
        const a = ts[i];
        const b = ts[i+1];
        const Iab = gaussLegendreDd(speed, a, b);
        total = ddAddDd(total, integrateDd(speed, a, b, Iab, tolAbs, 0));
    }

    return total;
}


/**
 * Returns the relative error of the given double precision value with respect
 * to the given double-double reference value (or the absolute error if the
 * reference is zero).
 */
function relativeError(value: number, reference: DD): number {
    const ref = ddToNumber(reference);
    const err = Math.abs(ddToNumber(ddDiffDd(dd(value), reference)));
    return ref === 0 ? err : err/Math.abs(ref);
}


export { referenceLength, relativeError, ddToNumber }
