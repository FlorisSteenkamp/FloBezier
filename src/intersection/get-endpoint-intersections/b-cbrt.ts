import { bAbs } from './b-abs.js';
import { bSign } from './b-sign.js';

const { round, cbrt } = Math;


/**
 * Returns the cube root of a bigint.
 *
 * * see https://stackoverflow.com/a/53684036/2010061
 * 
 * * **precondition**: the given bigint must be a perfect cube
 *
 * @internal
 */
 function bCbrt(n: bigint): bigint {
    const sgn = bSign(n);
    n = bAbs(n);

    if (n <= 1n) {
        return sgn*n;
    }

    let x0 = BigInt(round(cbrt(Number(n))));

    while (true) {
        const x1 = (2n*x0 + n/(x0*x0))/3n;
        if (x1 === x0) {
            return sgn*x0;
        }
        x0 = x1;
    }
}


export { bCbrt }
