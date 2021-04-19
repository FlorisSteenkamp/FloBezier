
import { getXY } from "../../to-power-basis/get-xy";
import { Horner as evaluatePoly } from 'flo-poly';


/**
 * 
 * @param ps 
 * @param t 
 * 
 * @doc
 */
function evaluate(
        ps: number[][], t: number): number[] {

	const len = ps.length;
	
    if (t === 0) { return ps[0]; }
    if (t === 1) { return ps[len-1]; }

    const [X,Y] = getXY(ps);
    
    return [
        evaluatePoly(X, t),
        evaluatePoly(Y, t)
    ];
}


export { evaluate }
