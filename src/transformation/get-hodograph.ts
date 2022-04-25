/**
 * Returns the hodograph of the given bezier curve.
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc
 */
function getHodograph(ps: number[][]): number[][] {
    // * **bitlength**: If the coordinates of the control points are bit-aligned then
    // * max bitlength increase === 3, max shift === 3 (for cubics)
    // * max bitlength increase === 1, max shift === 2 (for quadratics)
    // * max bitlength increase === 1, max shift === 1 (for lines)

    if (ps.length === 4) {
        // cubic
        const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
        return [
            [3*(x1 - x0), 3*(y1 - y0)],
            [3*(x2 - x1), 3*(y2 - y1)],
            [3*(x3 - x2), 3*(y3 - y2)]
        ];
    }

    if (ps.length === 3) {
        // quadratic
        const [[x0,y0],[x1,y1],[x2,y2]] = ps;
        return [
            [2*(x1 - x0), 2*(y1 - y0)],
            [2*(x2 - x1), 2*(y2 - y1)]
        ];
    }

    if (ps.length === 2) {
        // a line
        const [[x0,y0],[x1,y1]] = ps;
        return [
            [x1 - x0, y1 - y0]
        ];
    }

    throw new Error('The given bezier curve must be of order 1, 2 or 3.');
}


export { getHodograph }
