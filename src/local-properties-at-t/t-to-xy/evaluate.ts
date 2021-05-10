import { getXY } from "../../to-power-basis/get-xy";
import { Horner as evaluatePoly } from 'flo-poly';


/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using power bases conversion and subsequently [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method) 
 * to evaluate the polynomial in double precision floating point arithmetic.
 * 
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are 
 * double precision floating point numbers.
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 * 
 * @doc mdx
 */
function evaluate(
        ps: number[][], 
        t: number): number[] {

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
