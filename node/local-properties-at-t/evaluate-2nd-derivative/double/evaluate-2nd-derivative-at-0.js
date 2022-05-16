/**
 * Returns the result, `[x,y]`, of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`.
 *
 * * uses double precision calculations internally
 *
 * @param ps An order 0,1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function evaluate2ndDerivativeAt0(ps) {
    // Bitlength: If the coordinates of the control points are bit-aligned then the
    // * max bitlength (incl bit shift) increase === 5 (for cubics)
    // * max bitlength (incl bit shift) increase === 3 (for quadratics)
    // * max bitlength (incl bit shift) increase === 0 (for lines)
    if (ps.length === 4) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [
            6 * ((x2 + x0) - 2 * x1),
            6 * ((y2 + y0) - 2 * y1)
        ]; // max bitlength increase 5
    }
    if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return [
            2 * ((x2 + x0) - 2 * x1),
            2 * ((y2 + y0) - 2 * y1)
        ]; // max bitlength increase 3
    }
    if (ps.length <= 2) {
        return [0, 0];
    }
    throw new Error('The given bezier curve must be of order <= 3');
}
export { evaluate2ndDerivativeAt0 };
//# sourceMappingURL=evaluate-2nd-derivative-at-0.js.map