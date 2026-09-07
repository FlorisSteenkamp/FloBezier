/**
 * Returns the given bezier curve rotated anti-clockwise about the origin by
 * exactly -90 degrees (i.e. clockwise by 90 degrees).
 * 
 * This is an exact special case of [[rotate]] that avoids the floating point
 * error introduced by evaluating `sin`/`cos` of a rounded `Math.PI/2`. The
 * rotation reduces to `(x,y) -> (y,-x)` which is exact.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function rotateNeg90(
        ps: number[][]): number[][] {

    return ps.map(p => [p[1], -p[0]]);
}


export { rotateNeg90 }
