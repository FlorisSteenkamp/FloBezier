const sqrt = Math.sqrt;


/**
 * Returns the signed curvature `k` of the given cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc mdx
 */
function kAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	const xa = x1 - x0; 
	const ya = y1 - y0;
	const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;
	
	const a = 18*(xa*(yb + y2) - ya*(xb + x2));
	const bb = 729*(xa*xa + ya*ya)**3;

	return a/Math.sqrt(bb);
}


export { kAt0 }
