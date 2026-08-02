
/**
 * Returns a tight axis-aligned bounding box of the given bezier curve's control
 * points. 
 * 
 * * the box is not a tight bound of the bezier curve itself
 * * the result is returned as `[[minX, minY], [maxX, maxY]]`
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function getControlPointBox(ps: number[][]): number[][] {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const p of ps) {
        const x = p[0];
        const y = p[1];

        if (x < minX) { minX = x; }
        if (x > maxX) { maxX = x; }
        if (y < minY) { minY = y; }
        if (y > maxY) { maxY = y; }
    }
    
    return [[minX, minY], [maxX, maxY]];
}



export { getControlPointBox }
