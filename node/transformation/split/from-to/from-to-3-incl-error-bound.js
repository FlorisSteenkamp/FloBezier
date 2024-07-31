const abs = Math.abs;
/** error free error bounds */
const psErrorFree = [[0, 0], [0, 0], [0, 0], [0, 0]];
/**
 * Returns a bezier curve that starts and ends at the given t parameters
 * including an error bound (that needs to be multiplied by `9u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function fromTo3InclErrorBound(ps, tS, tE) {
    if (tS === 0) {
        if (tE === 1) {
            return { ps, _ps: psErrorFree };
        }
        return splitLeft3(ps, tE);
    }
    if (tE === 1) {
        return splitRight3(ps, tS);
    }
    return splitAtBoth3(ps, tS, tE);
}
/**
 * Returns a bezier curve that starts at the given t parameter and ends
 * at `t === 1` including an error bound (that needs to be multiplied
 * by `9u`, where `u === Number.EPSILON/2`).
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param t the `t` parameter where the resultant bezier should start
 *
 * @internal
 */
function splitRight3(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];
    const x00 = p0[0];
    const y00 = p0[1];
    const x10 = p1[0];
    const y10 = p1[1];
    const x20 = p2[0];
    const y20 = p2[1];
    const x30 = p3[0];
    const y30 = p3[1];
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const x01 = x00 - t * (x00 - x10);
    const x11 = x10 - t * (x10 - x20);
    const x21 = x20 - t * (x20 - x30);
    const x02 = x01 - t * (x01 - x11);
    const x12 = x11 - t * (x11 - x21);
    const x03 = x02 - t * (x02 - x12);
    const y01 = y00 - t * (y00 - y10);
    const y11 = y10 - t * (y10 - y20);
    const y21 = y20 - t * (y20 - y30);
    const y02 = y01 - t * (y01 - y11);
    const y12 = y11 - t * (y11 - y21);
    const y03 = y02 - t * (y02 - y12);
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x00 = abs(x00);
    const _x10 = abs(x10);
    const _x20 = abs(x20);
    const _x30 = abs(x30);
    const _y00 = abs(y00);
    const _y10 = abs(y10);
    const _y20 = abs(y20);
    const _y30 = abs(y30);
    const _x01 = _x00 + _t * (_x00 + _x10); // <3>x01 = <3>(x00 - <2>(t*<1>(x00 - x10)))
    const _x11 = _x10 + _t * (_x10 + _x20); // <3>x11
    const _x21 = _x20 + _t * (_x20 + _x30); // <3>x21
    const _x02 = _x01 + _t * (_x01 + _x11); // <6>x02 = <6>(x01 - <5>(t*<4>(<3>x01 - <3>x11)))
    const _x12 = _x11 + _t * (_x11 + _x21); // <6>x12
    const _x03 = _x02 + _t * (_x02 + _x12); // <9>x03 = <9>(x02 - <8>(t*<7>(<6>x02 - <6>x12)))
    const _y01 = _y00 + _t * (_y00 + _y10);
    const _y11 = _y10 + _t * (_y10 + _y20);
    const _y21 = _y20 + _t * (_y20 + _y30);
    const _y02 = _y01 + _t * (_y01 + _y11);
    const _y12 = _y11 + _t * (_y11 + _y21);
    const _y03 = _y02 + _t * (_y02 + _y12);
    return {
        ps: [[x03, y03], [x12, y12], [x21, y21], [x30, y30]],
        _ps: [
            // the coordinate-wise error bounds
            [_x03, _y03], // [9*u*_x03, 9*u*_y03]      
            [_x12, _y12], // [6*u*_x02, 6*u*_y02]
            [_x21, _y21], // [3*u*_x01, 3*u*_y01]
            [0, 0] // [0, 0],
        ]
    };
}
/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given t
 * parameter including an error bound (that needs to be multiplied by `9u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param t the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitLeft3(ps, t) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];
    const x00 = p0[0];
    const y00 = p0[1];
    const x10 = p1[0];
    const y10 = p1[1];
    const x20 = p2[0];
    const y20 = p2[1];
    const x30 = p3[0];
    const y30 = p3[1];
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const x01 = x00 - t * (x00 - x10);
    const x11 = x10 - t * (x10 - x20);
    const x21 = x20 - t * (x20 - x30);
    const x02 = x01 - t * (x01 - x11);
    const x12 = x11 - t * (x11 - x21);
    const x03 = x02 - t * (x02 - x12);
    const y01 = y00 - t * (y00 - y10);
    const y11 = y10 - t * (y10 - y20);
    const y21 = y20 - t * (y20 - y30);
    const y02 = y01 - t * (y01 - y11);
    const y12 = y11 - t * (y11 - y21);
    const y03 = y02 - t * (y02 - y12);
    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _x00 = abs(x00);
    const _x10 = abs(x10);
    const _x20 = abs(x20);
    const _x30 = abs(x30);
    const _y00 = abs(y00);
    const _y10 = abs(y10);
    const _y20 = abs(y20);
    const _y30 = abs(y30);
    const _x01 = _x00 + _t * (_x00 + _x10); // <3>x01 = <3>(x00 - <2>(t*<1>(x00 - x10)))
    const _x11 = _x10 + _t * (_x10 + _x20); // <3>x11
    const _x21 = _x20 + _t * (_x20 + _x30); // <3>x21
    const _x02 = _x01 + _t * (_x01 + _x11); // <6>x02 = <6>(x01 - <5>(t*<4>(<3>x01 - <3>x11)))
    const _x12 = _x11 + _t * (_x11 + _x21); // <6>x12
    const _x03 = _x02 + _t * (_x02 + _x12); // <9>x03 = <9>(x02 - <8>(t*<7>(<6>x02 - <6>x12)))
    const _y01 = _y00 + _t * (_y00 + _y10);
    const _y11 = _y10 + _t * (_y10 + _y20);
    const _y21 = _y20 + _t * (_y20 + _y30);
    const _y02 = _y01 + _t * (_y01 + _y11);
    const _y12 = _y11 + _t * (_y11 + _y21);
    const _y03 = _y02 + _t * (_y02 + _y12);
    return {
        ps: [[x00, y00], [x01, y01], [x02, y02], [x03, y03]],
        _ps: [
            // the coordinate-wise error bounds
            [0, 0], // [0, 0],
            [_x01, _y01], // [3*u*_x01, 3*u*_y01],
            [_x02, _y02], // [6*u*_x02, 6*u*_y02],
            [_x03, _y03] // [9*u*_x03, 9*u*_y03]
        ]
    };
}
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `8u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function splitAtBoth3(ps, tS, tE) {
    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1]; // exact
    const p2 = ps[2];
    const p3 = ps[3]; // exact
    const x0 = p0[0];
    const y0 = p0[1]; // exact
    const x1 = p1[0];
    const y1 = p1[1]; // exact
    const x2 = p2[0];
    const y2 = p2[1]; // exact
    const x3 = p3[0];
    const y3 = p3[1]; // exact
    // --------------------------------------------------------
    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a
    const ttS = tS * tS; // <1>ttS  <= <0>tS<0>tS   (by counter rule 2)
    const tttS = tS * ttS; // <2>tttS <= <0>tS<1>ttS  (again by counter rule 2)
    const ttE = tE * tE; // ...
    const tttE = tE * ttE; // ...
    const tStE = tS * tE; // <1>tStE
    const xA = x0 - x1; // <1>xA
    const xB = x2 - x1; // <1>xB
    const xC = x3 - x0; // <1>xC
    const xD = xA + xB; // <2>xD
    const tSxA = tS * xA; // <2>tSxA
    const tExA = tE * xA; // <2>tExA
    const xC3xB = xC - 3 * xB; // <3>xC3xB = <3>(<1>xC - <2>(3*<1>xB))
    const yA = y0 - y1;
    const yB = y2 - y1;
    const yC = y3 - y0;
    const yD = yA + yB;
    const tSyA = tS * yA;
    const tEyA = tE * yA;
    const yC3yB = yC - 3 * yB;
    const xx0 = tttS * xC3xB + (3 * tS * (tS * xD - xA) + x0);
    const xx1 = tStE * (tS * xC3xB + 2 * xD) + ((ttS * xD + x0) - (tExA + 2 * tSxA));
    const xx2 = tStE * (tE * xC3xB + 2 * xD) + ((ttE * xD + x0) - (2 * tExA + tSxA));
    const xx3 = tttE * xC3xB + (3 * tE * (tE * xD - xA) + x0);
    const yy0 = tttS * yC3yB + (3 * tS * (tS * yD - yA) + y0);
    const yy1 = tStE * (tS * yC3yB + 2 * yD) + ((ttS * yD + y0) - (tEyA + 2 * tSyA));
    const yy2 = tStE * (tE * yC3yB + 2 * yD) + ((ttE * yD + y0) - (2 * tEyA + tSyA));
    const yy3 = tttE * yC3yB + (3 * tE * (tE * yD - yA) + y0);
    // ----------------------------------------------
    // Calculate error bounds
    // ----------------------------------------------
    const _tS = abs(tS);
    const _tE = abs(tE);
    const _tStE = abs(tStE);
    const _tttS = abs(tttS);
    const _tttE = abs(tttE);
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _xA = _x0 + _x1;
    const _xB = _x2 + _x1;
    const _xD = _xA + _xB;
    const _tSxA = _tS * _xA;
    const _tExA = _tE * _xA;
    const _xC3xB = abs(xC) + 3 * _xB;
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _yA = _y0 + _y1;
    const _yB = _y2 + _y1;
    const _yD = _yA + _yB;
    const _tSyA = _tS * _yA;
    const _tEyA = _tE * _yA;
    const _yC3yB = abs(yC) + 3 * _yB;
    // <8>xx0 = <8>(<6>(<2>tttS*<3>xC3xB) + <7>(<6>(<1>(3*tS)*(<4>(<3>(tS*<2>xD) - <1>xA))) + x0));
    const _xx0 = _tttS * _xC3xB + (3 * _tS * (_tS * _xD + _xA) + _x0);
    // <7>xx1 = <7>(<6>(<1>tStE*<5>(<4>(tS*<3>xC3xB) + <2>(2*xD))) + <6>(<5>(<4>(<1>ttS*<2>xD) + x0) - <3>(<2>tExA + <2>(2*tSxA))));
    const _xx1 = _tStE * (_tS * _xC3xB + 2 * _xD) + ((ttS * _xD + _x0) + (_tExA + 2 * _tSxA));
    // <7>xx2 = <7>(<6>(<1>tStE*<5>(<4>(tE*<3>xC3xB) + <2>(2*xD))) + <6>(<5>(<4>(<1>ttE*<2>xD) + x0) - <3>(<2>(2*tExA) + <2>tSxA)));
    const _xx2 = _tStE * (_tE * _xC3xB + 2 * _xD) + ((ttE * _xD + _x0) + (2 * _tExA + _tSxA));
    // <8>xx3 = <8>(<6>(<2>tttE*<3>xC3xB) + <7>(<6>(<1>(3*tE)*(<4>(<3>(tE*<2>xD) - <1>xA))) + x0));
    const _xx3 = _tttE * _xC3xB + (3 * _tE * (_tE * _xD + _xA) + _x0);
    const _yy0 = _tttS * _yC3yB + (3 * _tS * (_tS * _yD + _yA) + _y0);
    const _yy1 = _tStE * (_tS * _yC3yB + 2 * _yD) + ((ttS * _yD + _y0) + (_tEyA + 2 * _tSyA));
    const _yy2 = _tStE * (_tE * _yC3yB + 2 * _yD) + ((ttE * _yD + _y0) + (2 * _tEyA + _tSyA));
    const _yy3 = _tttE * _yC3yB + (3 * _tE * (_tE * _yD + _yA) + _y0);
    return {
        ps: [[xx0, yy0], [xx1, yy1], [xx2, yy2], [xx3, yy3]],
        _ps: [
            [_xx0, _yy0], // [8*u*_xx0, 8*u*_yy0]
            [_xx1, _yy1], // [7*u*_xx1, 7*u*_yy1]
            [_xx2, _yy2], // [7*u*_xx2, 7*u*_yy2]
            [_xx3, _yy3] // [8*u*_xx3, 8*u*_yy3]
        ]
    };
}
export { fromTo3InclErrorBound };
//# sourceMappingURL=from-to-3-incl-error-bound.js.map