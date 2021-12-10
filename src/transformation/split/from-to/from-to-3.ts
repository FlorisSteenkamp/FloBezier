const abs = Math.abs;

/** error free error bounds */ 
const psErrorFree = [[0,0],[0,0],[0,0],[0,0]];


/**
 * Returns a bezier curve that starts and ends at the given t parameters 
 * including an error bound (that needs to be multiplied by `8u`, where 
 * `u === Number.EPSILON/2`).
 * 
 * @param ps a cubic bezier curve
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
 function fromTo3(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    if (tS === 0) { 
        if (tE === 1) {
            return { ps, _ps: psErrorFree }; 
        }
        return splitLeft3(ps, tE);
    }
    
    if (tE === 1) { return splitRight3(ps, tS); }

    return splitAtBoth3(ps, tS, tE);
}


/**
 * Returns a bezier curve that starts at the given t parameter and ends 
 * at `t === 1` including an error bound (that needs to be multiplied 
 * by `8u`, where `u === Number.EPSILON/2`).
 * 
 * @param ps a cubic bezier curve
 * @param t the `t` parameter where the resultant bezier should start
 * 
 * @internal
 */
function splitRight3(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ttt = t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)

    const xA = x0 - x1;  // <1>xA
    const xB = x2 - x1;  // <1>xB
    const xC = x3 - x2;  // <1>xC

    const yA = y0 - y1;
    const yB = y2 - y1;
    const yC = y3 - y2;

    const psR = [
        [ttt*((x3 - x0) - 3*xB) + (3*t*(t*(xA + xB) - xA) + x0),   // xx0 - split point x
         ttt*((y3 - y0) - 3*yB) + (3*t*(t*(yA + yB) - yA) + y0)],  // yy0 - split point y
        [tt*(xC - xB) + (2*t*xB + x1),   // xx1
         tt*(yC - yB) + (2*t*yB + y1)],  // yy1
        [t*xC + x2,   // xx2
         t*yC + y2],  // yy2
        [x3,  // xx3
         y3]  // yy3
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _ttt = abs(ttt);
    
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _x3 = abs(x3);
    const _xA = _x0 + _x1;
    const _xB = _x2 + _x1;
    const _xC = _x3 + _x2;

    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _y3 = abs(y3);
    const _yA = _y0 + _y1;
    const _yB = _y2 + _y1;
    const _yC = _y3 + _y2;


    // <8>xx0 <= <8>(<6>(<2>ttt*<3>((x3 - x0) - 3*xB)) + <7>(<6>(<1>(3*t)*(<4>(<3>(t*<2>(xA + xB)) - <1>xA))) + x0));
    const _xx0 = _ttt*((_x3 + _x0) + 3*_xB) + (3*_t*(_t*(_xA + _xB) + _xA) + _x0);
    // <5>xx1 <= <5>(<4>(<1>tt*<2>(<1>xC - <1>xB)) + <3>(<2>(2*t*<1>xB) + x1))
    const _xx1 = tt*(_xC + _xB) + (2*_t*_xB + _x1);
    // <3>xx2 <= <3>(<2>(t*<1>xC) + x2);
    const _xx2 = _t*_xC + _x2;

    const _yy0 = _ttt*((_y3 + _y0) + 3*_yB) + (3*_t*(_t*(_yA + _yB) + _yA) + _y0);
    const _yy1 = tt*(_yC + _yB) + (2*_t*_yB + _y1);
    const _yy2 = _t*_yC + _y2;

    /** the coordinate-wise error bound */ 
    //const psR_ = [
    //    [8*u*_xx0, 8*u*_yy0],
    //    [5*u*_xx1, 5*u*_yy1],
    //    [3*u*_xx2, 3*u*_yy2],
    //    [0, 0]
    //];

    const psR_ = [
        [_xx0, _yy0],
        [_xx1, _yy1],
        [_xx2, _yy2],
        [0, 0]
    ];

    return { 
        ps: psR, 
        _ps: psR_ 
    };
}


/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given t 
 * parameter including an error bound (that needs to be multiplied by `8u`, where 
 * `u === Number.EPSILON/2`).
 * 
 * @param ps a cubic bezier curve
 * @param t the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
function splitLeft3(
        ps: number[][], 
        t: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const tt  = t*t;   // <1>tt  <= <0>t<0>t   (by counter rule 2)
    const ttt = t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)

    const xA = x0 - x1;  // <1>xA
    const xB = x2 - x1;  // <1>xB
    const xD = xA + xB;  // <2>xD

    const yA = y0 - y1;
    const yB = y2 - y1;
    const yD = yA + yB;

    const psL = [
        [x0,   // xx0
         y0],  // yy0
        [-t*xA + x0,   // xx1
         -t*yA + y0],  // yy1
        [tt*xD - (2*t*xA - x0),   // xx2
         tt*yD - (2*t*yA - y0)],  // yy2
        [ttt*(-3*xB - (x0 - x3)) + (3*t*(t*xD - xA) + x0),  // xx3 - split point x
         ttt*(-3*yB - (y0 - y3)) + (3*t*(t*yD - yA) + y0)]  // yy3 - split point y
    ];


    // -----------------------
    // Calculate error bounds
    // -----------------------
    const _t = abs(t);
    const _ttt = _t*tt;  // <2>ttt <= <0>t<1>tt  (again by counter rule 2)

    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _x3 = abs(x3);
    const _xA = _x0 + _x1;
    const _xB = _x2 + _x1;
    const _xD = _xA + _xB;

    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _y3 = abs(y3);
    const _yA = _y0 + _y1;
    const _yB = _y2 + _y1;
    const _yD = _yA + _yB;


    // <3>xx1 <= <3>(<2>(-t*<1>xA) + x0)
    const _xx1 = _t*_xA + _x0;
    // <5>xx2 <= <5>(<4>(<1>tt*<2>xD) - <3>(<2>(2*t*xA) - x0))
    const _xx2 = tt*_xD + (2*_t*_xA + _x0);
    // <8>xx3 <= <8>(<6>(<2>ttt*<3>(<2>(-3*<1>xB) - <1>(x0 - x3))) + <7>(<6>(<1>(3*t)*<4>(<3>(t*<2>xD) - <1>xA)) + x0))
    const _xx3 = _ttt*(3*_xB + (_x0 + _x3)) + (3*_t*(_t*_xD + _xA) + _x0);

    const _yy1 = _t*_yA + _y0;
    const _yy2 = tt*_yD + (2*_t*_yA + _y0);
    const _yy3 = _ttt*(3*_yB + (_y0 + _y3)) + (3*_t*(_t*_yD + _yA) + _y0);

    /** the coordinate-wise error bound */ 
    //const psL_ = [
    //    [0, 0],
    //    [3*u*_xx1, 3*u*_yy1],
    //    [5*u*_xx2, 5*u*_yy2],
    //    [8*u*_xx3, 8*u*_yy3]
    //];

    const psL_ = [
        [0, 0],
        [_xx1, _yy1],
        [_xx2, _yy2],
        [_xx3, _yy3]
    ];

    return {
        ps: psL,
        _ps: psL_
    };
}


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `8u`, where 
 * `u === Number.EPSILON/2`). 
 * 
 * @param ps a cubic bezier curve
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
function splitAtBoth3(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
    const p0 = ps[0]; const p1 = ps[1];  // exact
    const p2 = ps[2]; const p3 = ps[3];  // exact
    const x0 = p0[0]; const y0 = p0[1];  // exact
    const x1 = p1[0]; const y1 = p1[1];  // exact
    const x2 = p2[0]; const y2 = p2[1];  // exact
    const x3 = p3[0]; const y3 = p3[1];  // exact
    // --------------------------------------------------------

    // error bound using counters <k>:
    // counter rules:
    //   1. <k>a + <l>b = <max(k,l) + 1>(a + b)
    //   2. <k>a<l>b = <k + l + 1>ab
    //   3. fl(a) === <1>a

    const ttS  = tS*tS;   // <1>ttS  <= <0>tS<0>tS   (by counter rule 2)
    const tttS = tS*ttS;  // <2>tttS <= <0>tS<1>ttS  (again by counter rule 2)
    const ttE  = tE*tE;   // ...
    const tttE = tE*ttE;  // ...
    const tStE = tS*tE;   // <1>tStE

    const xA = x0 - x1;  // <1>xA
    const xB = x2 - x1;  // <1>xB
    const xC = x3 - x0;  // <1>xC
    const xD = xA + xB;  // <2>xD
    const tSxA = tS*xA;  // <2>tSxA
    const tExA = tE*xA;  // <2>tExA
    const xC3xB = xC - 3*xB;  // <3>xC3xB = <3>(<1>xC - <2>(3*<1>xB))

    const yA = y0 - y1;
    const yB = y2 - y1;
    const yC = y3 - y0;
    const yD = yA + yB;
    const tSyA = tS*yA;
    const tEyA = tE*yA;
    const yC3yB = yC - 3*yB;

    const xx0 = tttS*xC3xB + (3*tS*(tS*xD - xA) + x0);
    const xx1 = tStE*(tS*xC3xB + 2*xD) + ((ttS*xD + x0) - (tExA + 2*tSxA));
    const xx2 = tStE*(tE*xC3xB + 2*xD) + ((ttE*xD + x0) - (2*tExA + tSxA));
    const xx3 = tttE*xC3xB + (3*tE*(tE*xD - xA) + x0);

    const yy0 = tttS*yC3yB + (3*tS*(tS*yD - yA) + y0);
    const yy1 = tStE*(tS*yC3yB + 2*yD) + ((ttS*yD + y0) - (tEyA + 2*tSyA));
    const yy2 = tStE*(tE*yC3yB + 2*yD) + ((ttE*yD + y0) - (2*tEyA + tSyA));
    const yy3 = tttE*yC3yB + (3*tE*(tE*yD - yA) + y0);

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
    const _tSxA = _tS*_xA;
    const _tExA = _tE*_xA;
    const _xC3xB = abs(xC) + 3*_xB;

    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _yA = _y0 + _y1;
    const _yB = _y2 + _y1;
    const _yD = _yA + _yB;
    const _tSyA = _tS*_yA;
    const _tEyA = _tE*_yA;
    const _yC3yB = abs(yC) + 3*_yB;

    // <8>xx0 = <8>(<6>(<2>tttS*<3>xC3xB) + <7>(<6>(<1>(3*tS)*(<4>(<3>(tS*<2>xD) - <1>xA))) + x0));
    const _xx0 = _tttS*_xC3xB + (3*_tS*(_tS*_xD + _xA) + _x0);
    // <7>xx1 = <7>(<6>(<1>tStE*<5>(<4>(tS*<3>xC3xB) + <2>(2*xD))) + <6>(<5>(<4>(<1>ttS*<2>xD) + x0) - <3>(<2>tExA + <2>(2*tSxA))));
    const _xx1 = _tStE*(_tS*_xC3xB + 2*_xD) + ((ttS*_xD + _x0) + (_tExA + 2*_tSxA));
    // <7>xx2 = <7>(<6>(<1>tStE*<5>(<4>(tE*<3>xC3xB) + <2>(2*xD))) + <6>(<5>(<4>(<1>ttE*<2>xD) + x0) - <3>(<2>(2*tExA) + <2>tSxA)));
    const _xx2 = _tStE*(_tE*_xC3xB + 2*_xD) + ((ttE*_xD + _x0) + (2*_tExA + _tSxA));
    // <8>xx3 = <8>(<6>(<2>tttE*<3>xC3xB) + <7>(<6>(<1>(3*tE)*(<4>(<3>(tE*<2>xD) - <1>xA))) + x0));
    const _xx3 = _tttE*_xC3xB + (3*_tE*(_tE*_xD + _xA) + _x0);

    const _yy0 = _tttS*_yC3yB + (3*_tS*(_tS*_yD + _yA) + _y0);
    const _yy1 = _tStE*(_tS*_yC3yB + 2*_yD) + ((ttS*_yD + _y0) + (_tEyA + 2*_tSyA));
    const _yy2 = _tStE*(_tE*_yC3yB + 2*_yD) + ((ttE*_yD + _y0) + (2*_tEyA + _tSyA));
    const _yy3 = _tttE*_yC3yB + (3*_tE*(_tE*_yD + _yA) + _y0);

    return {
        ps: [[xx0, yy0], [xx1, yy1], [xx2, yy2], [xx3, yy3]],
        //ps_: [
        //    [8*u*_xx0, 8*u*_yy0],
        //    [7*u*_xx1, 7*u*_yy1],
        //    [7*u*_xx2, 7*u*_yy2],
        //    [8*u*_xx3, 8*u*_yy3]
        //]
        _ps: [
            [_xx0, _yy0],
            [_xx1, _yy1],
            [_xx2, _yy2],
            [_xx3, _yy3]
        ]
    };
}


export { fromTo3 }
