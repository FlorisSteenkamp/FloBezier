import { getXYExact } from "../../../to-power-basis/get-xy/exact/get-xy-exact";
import { eHorner } from 'flo-poly';


/**
 * Returns the result of evaluating the given bezier curve at the parameter `t` 
 * exactly (up to underflow / overflow).
 * 
 * * **precondition:** TODO underflow/overflow
 * * the result is returned as `[x,y]`, where `x` and `y` are Shewchuk floating
 * point expansions
 * 
 * @param ps 
 * @param t 
 * 
 * @doc
 */
function evaluateExact(
        ps: number[][], t: number): number[][] {

	const len = ps.length;
	
    if (t === 0) { return [[ps[0][0]], [ps[0][1]]]; }
    if (t === 1) { return [[ps[len-1][0]], [ps[len-1][1]]]; }


    const [X,Y] = getXYExact(ps) as number[][][];

    // wrap the last number as a Shewchuck expansion of length 1

    // @ts-ignore
    X[len-1] = [X[len-1]];
    // @ts-ignore
    Y[len-1] = [Y[len-1]];
    
    return [
        eHorner(X,t),
        eHorner(Y,t)
    ];
}


export { evaluateExact }
