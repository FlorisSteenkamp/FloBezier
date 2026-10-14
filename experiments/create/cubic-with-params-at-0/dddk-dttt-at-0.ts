const sqrt = Math.sqrt;


/**
 * Returns the 3rd derivative (w.r.t `t`) of the signed curvature `k` of the 
 * given cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function dddkdtttAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	const xa = x1 - x0; 
	const ya = y1 - y0;
	const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;
    const xc = x0 - 3*x1;
    const yc = y0 - 3*y1;

	return 12*(
        -(140/3)*(xa*(xb + x2) + ya*(yb + y2))**3 *
                 (xa*(yb + y2) - ya*(xb + x2)) * 
                 (xa*xa + ya*ya)**(-4.5) 
        
        + 
        
        10*(xa*(xb + x2) + ya*(yb + y2))**2 *
           (xa*xa + ya*ya)**(-3.5) * 
           (ya*(xc + 3*x2 - x3) - 
            xa*(yc + 3*y2 - y3)) 
        
        + 
        
        -10*(xa*(xb + x2) + ya*(yb + y2)) *
            (xa*(yb + y2) - ya*(xb + x2)) * 
            (xa*xa + ya*ya)**(-3.5) * 
            (xa*(xc + 3*x2 - x3) + 
             ya*(yc + 3*y2 - y3) - 
             2*(xb + x2)*(xb + x2) - 
             2*(yb + y2)*(yb + y2))
        
        + 
        
        -2*(xa*(xb + x2) + ya*(yb + y2)) * 
           (xa*xa + ya*ya)**(-2.5) * 
           ((yb + y2)*(xc + 3*x2 - x3) -
            (xb + x2)*(yc + 3*y2 - y3))
        
        + 
        
        2*(xa*(yb + y2) - ya*(xb + x2)) * 
          (xa*xa + ya*ya)**(-2.5) * 
          ((xb + x2)*(xc + 3*x2 - x3) + 
           (yb + y2)*(yc + 3*y2 - y3))
        
        + 
        
        (xa*xa + ya*ya)**(-2.5) * 
        ( xa*(xc + 3*x2 - x3) + ya*(yc + 3*y2 - y3) - 2*(xb + x2)*(xb + x2) - 2*(yb + y2)*(yb + y2)) * 
        (-xa*(yc + 3*y2 - y3) + ya*(xc + 3*x2 - x3)) 
    );
}


export { dddkdtttAt0 }
