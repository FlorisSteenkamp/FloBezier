import { eSign } from "big-float-ts";


/**
 * Returns the sign of the given expansion rational.
 * 
 * @param a 
 * 
 * @internal
 */
function erSign(a: number[][]) {
    return eSign(a[0]) * eSign(a[1]);
}


export { erSign }
