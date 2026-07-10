import { ddTangentAt1 } from '../../tangent/double-double/dd-tangent-at-1.js';


/**
 * Returns the normal vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at `t === 1`, i.e.
 * Returns the result, `[x,y]`, of evaluating the derivative of a linear, 
 * quadratic or cubic bezier curve's power basis at `t === 1`. 
 * 
 * * *exact* result for order <= 2 bezier curves
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function ddNormalAt1(
        ps: number[][]): number[][] {

    const [X,Y] = ddTangentAt1(ps);
   
    return [
        [-Y[0],-Y[1]],
        X
    ];
}


export { ddNormalAt1 }
