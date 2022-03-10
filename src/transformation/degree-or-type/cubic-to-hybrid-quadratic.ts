/**
 * Returns the hybrid quadratic version of the given cubic bezier. For a 
 * definition of hybrid quadratic bezier curves please see this paper:
 * http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd
 * 
 * * returns an array of three quadratic bezier points where the 
 * middle point is a 'hybrid' point represented as a line (itself represented
 * by two points (a linear bezier curve)) that can be evaluated at a different 
 * `t` value (call it `th`). If evaluated at the same t value the result is the 
 * same as evaluating the original cubic bezier at `t`. 
 * 
 * * the length of the linear bezier curve mentioned above is a measure of how 
 * closely the cubic can be represented as a quadratic bezier curve.
 * 
 * @param ps a cubic bezier curve.
 * 
 * @doc mdx
 */
function cubicToHybridQuadratic(ps: number[][]): [
        [number, number], 
        [
            [number, number], 
            [number, number]
        ], 
        [number,number]] {

    if (ps.length === 4) {
        const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
        return [
            [x0,y0],
            [
                [(3*x1 - x0)/2, (3*y1 - y0)/2],
                [(3*x2 - x3)/2, (3*y2 - y3)/2]
            ],  
            [x3,y3]
        ];
    }

    throw new Error('The given bezier curve must be a cubic')
}


export { cubicToHybridQuadratic }
