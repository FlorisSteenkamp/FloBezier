/**
 * Returns the second derivative (w.r.t `s`, the arc length) of 
 * the given bezier curve's parameter, `t`, at `t === 0`.
 * 
 * @param ps a bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function ddtdssAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2]] = ps;

    const xa = x1 - x0; 
    const ya = y1 - y0;

    const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;

    return -(2/9)*(xa*(xb + x2) + ya*(yb + y2)) * 
                  (xa*xa + ya*ya)**(-2.0);
}


export { ddtdssAt0 }


