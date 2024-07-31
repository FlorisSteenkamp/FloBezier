/**
 * Returns a hybrid quadratic bezier curve with error bounds (with the first
 * and last control points omitted).
 *
 * * **the returned error bounds have counters of <8> and <12> respectively for
 * the 1st and 2nd control points (i.e. for the hybrid control points)**
 * * specifically modified for use in the geometric interval bezier-bezier
 * intersection algorithm, e.g. for efficiency the first and last points are
 * not returned
 * * **precondition:** coordinate-wise error bound 'Wilson counters' on the
 * cubic bezier control points of
 * `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]` are assumed (due to other
 * parts of the algorithm)
 *
 * @param G a cubic bezier curve - coordinate error bounds are assumed to have
 * counters of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
 *
 * @internal
 */
function toHybridQuadratic(G) {
    // the below is too slow
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const Gps = G.ps; // the cubic bezier curve
    const G_ps = G._ps; // and its error bound coordinates
    const p0 = Gps[0];
    const p1 = Gps[1];
    const p2 = Gps[2];
    const p3 = Gps[3];
    const x0 = p0[0]; // <6>x0
    const y0 = p0[1]; // <6>y0
    const x1 = p1[0]; // <6>x1
    const y1 = p1[1]; // <6>y1
    const x2 = p2[0]; // <10>x2
    const y2 = p2[1]; // <10>y2
    const x3 = p3[0]; // <11>x3
    const y3 = p3[1]; // <11>y3
    const _p0 = G_ps[0];
    const _p1 = G_ps[1];
    const _p2 = G_ps[2];
    const _p3 = G_ps[3];
    const _x0 = _p0[0];
    const _y0 = _p0[1];
    const _x1 = _p1[0];
    const _y1 = _p1[1];
    const _x2 = _p2[0];
    const _y2 = _p2[1];
    const _x3 = _p3[0];
    const _y3 = _p3[1];
    // <8> <= <8>(<7>(<0>3*<6>x1) + <6>x0)
    const _hq1 = [(3 * _x1 + _x0) / 2, (3 * _y1 + _y0) / 2];
    // <12> <= <12>(<11>(<0>3*<10>x2) + <11>x3)
    const _hq2 = [(3 * _x2 + _x3) / 2, (3 * _y2 + _y3) / 2];
    return {
        hq: [[(3 * x1 - x0) / 2, (3 * y1 - y0) / 2], // evaluated at (1-t)
            [(3 * x2 - x3) / 2, (3 * y2 - y3) / 2]], // evaluated at t
        // error bounds (still need to be multiplied by 4*u and 6*u)
        _hq: [_hq1, _hq2]
    };
}
export { toHybridQuadratic };
//# sourceMappingURL=to-hybrid-quadratic.js.map