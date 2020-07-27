
import { getXYExact } from "../../../../to-power-basis/any-bitlength/exact/get-xy-any-bitlength-exact";
import { HornerExact } from 'flo-poly';


/**
 * 
 * @param ps 
 * @param t 
 */
function evaluate_anyBitlength_exact(
        ps: number[][], t: number): number[][] {

	const len = ps.length;
	
    if (t === 0) { return [[ps[0][0]], [ps[0][1]]]; }
    if (t === 1) { return [[ps[len-1][0]], [ps[len-1][1]]]; }


    const [X,Y] = getXYExact(ps);
    
    return [
        HornerExact(X,t),
        HornerExact(Y,t)
    ];
}


export { evaluate_anyBitlength_exact }
