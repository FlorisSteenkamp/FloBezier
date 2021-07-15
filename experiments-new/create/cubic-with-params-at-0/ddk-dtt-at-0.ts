const sqrt = Math.sqrt;


/**
 * Returns the 2nd derivative (w.r.t `t`) of the signed curvature `k` of the 
 * given cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function ddkdttAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	const xa = x1 - x0; 
	const ya = y1 - y0;
	const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;

    const q1 = x0 - 3*x1 + 3*x2 - x3;
    const q2 = y0 - 3*y1 + 3*y2 - y3;
    const xy = xa*xa + ya*ya;
    const sxy = sqrt(xy);
	
	return sxy/xy**2 * (
        40*(xa*(xb + x2) + ya*(yb + y2))**2 * 
           (xa*(yb + y2) - ya*(xb + x2)) /
            xy**2  // ?*x2
        - 
        8*(xa*(xb + x2) + ya*(yb + y2)) *
           (ya*q1 - xa*q2) /
            xy
        + 
        4*(xa*(yb + y2) - ya*(xb + x2)) * 
          (xa*q1 + ya*q2 - 2*(xb + x2)**2 - 2*(yb + y2)**2) /
           xy
        + 
        (4/3) *
        ((yb + y2)*q1 - (xb + x2)*q2)
    );
}


export { ddkdttAt0 }
