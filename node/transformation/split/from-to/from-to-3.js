/**
 * Returns a bezier curve that starts and ends at the given t parameters.
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
function fromTo3(ps, tS, tE) {
    if (tS === 0) {
        if (tE === 1) {
            return ps;
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
 * at `t === 1`.
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
    return [[x03, y03], [x12, y12], [x21, y21], [x30, y30]];
}
/**
 * Returns a bezier curve that starts at `t === 0` and ends at the given t
 * parameter.
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
    return [[x00, y00], [x01, y01], [x02, y02], [x03, y03]];
}
/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
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
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];
    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];
    const x3 = p3[0];
    const y3 = p3[1];
    // --------------------------------------------------------
    const ttS = tS * tS;
    const tttS = tS * ttS;
    const ttE = tE * tE;
    const tttE = tE * ttE;
    const tStE = tS * tE;
    const xA = x0 - x1;
    const xB = x2 - x1;
    const xC = x3 - x0;
    const xD = xA + xB;
    const tSxA = tS * xA;
    const tExA = tE * xA;
    const xC3xB = xC - 3 * xB;
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
    return [[xx0, yy0], [xx1, yy1], [xx2, yy2], [xx3, yy3]];
}
export { fromTo3 };
//# sourceMappingURL=from-to-3.js.map