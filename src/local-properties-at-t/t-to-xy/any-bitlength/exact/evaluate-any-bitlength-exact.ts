import { getXYExact } from "../../../../to-power-basis/any-bitlength/exact/get-xy-any-bitlength-exact";
import { eHorner } from 'flo-poly';


/**
 * 
 * @param ps 
 * @param t 
 * 
 * @doc
 */
function evaluate_anyBitlength_exact(
        ps: number[][], t: number): number[][] {

	const len = ps.length;
	
    if (t === 0) { return [[ps[0][0]], [ps[0][1]]]; }
    if (t === 1) { return [[ps[len-1][0]], [ps[len-1][1]]]; }


    const [X,Y] = getXYExact(ps);
    
    return [
        eHorner(X,t),
        eHorner(Y,t)
    ];
}


export { evaluate_anyBitlength_exact }
