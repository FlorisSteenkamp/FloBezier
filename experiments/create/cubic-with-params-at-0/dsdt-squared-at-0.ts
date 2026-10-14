/**
 * Returns the square of the derivative (w.r.t `t`) of the arc length of the 
 * given bezier curve at `t === 0`.
 * 
 * @param ps a bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @internal
 */
function dsdtSquaredAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1]] = ps;

	const xa = x1 - x0; 
	const ya = y1 - y0;

    return 9*(xa*xa + ya*ya);
}


export { dsdtSquaredAt0 }


