const sqrt = Math.sqrt;


/**
 * Returns the second derivative (w.r.t `t`) of the arc length of the given 
 * bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function ddsdttAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2]] = ps;

	const xa = x1 - x0; 
	const ya = y1 - y0;
	const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;

	return 6*(xa*(xb + x2) + ya*(yb + y2)) / sqrt(xa**2 + ya**2);
}


export { ddsdttAt0 }
