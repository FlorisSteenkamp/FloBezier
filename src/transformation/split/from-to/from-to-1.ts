/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
 * 
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
 function fromTo1(
        ps: number[][], 
        tS: number, 
        tE: number): number[][] {

    if (tS === 0) { 
        if (tE === 1) {
            return ps; 
        }
        return splitLeft1(ps, tE);
    }
    
    if (tE === 1) { return splitRight1(ps, tS); }

    return splitAtBoth1(ps, tS, tE);
}


/**
 * Returns a bezier curve that starts at the given `t` parameter and ends 
 * at `t === 1`.
 *
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param t the `t` parameter where the resultant bezier should start
 * 
 * @internal
 */
function splitRight1(
        ps: number[][], 
        t: number): number[][] {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1];
    const x0 = p0[0]; const y0 = p0[1];
    const x1 = p1[0]; const y1 = p1[1];
    // --------------------------------------------------------

    return [
        [t*(x1 - x0) + x0,   // xx0
         t*(y1 - y0) + y0],  // yy0
        p1
    ];
}


/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given `t` 
 * parameter.
 * 
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param t the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
function splitLeft1(
        ps: number[][], 
        t: number): number[][] {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1];
    const x0 = p0[0]; const y0 = p0[1];
    const x1 = p1[0]; const y1 = p1[1];
    // --------------------------------------------------------

    return [
        p0,
        [t*(x1 - x0) + x0,   // xx1
         t*(y1 - y0) + y0]   // yy1
    ];
}


/**
 * Returns a bezier curve that starts and ends at the given `t` parameters. 
 * 
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @internal
 */
 function splitAtBoth1(
        ps: number[][], 
        tS: number, 
        tE: number): number[][] {

    // --------------------------------------------------------
    // const [[x0, y0], [x1, y1]] = ps; 
    const p0 = ps[0];
    const p1 = ps[1];
    const x0 = p0[0]; const y0 = p0[1];
    const x1 = p1[0]; const y1 = p1[1];
    // --------------------------------------------------------

    return [
        [tS*(x1 - x0) + x0,   // xx0
         tS*(y1 - y0) + y0],  // yy0
        [tE*(x1 - x0) + x0,   // xx1
         tE*(y1 - y0) + y0]   // yy1
    ];
}


export { fromTo1 }
