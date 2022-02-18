import { squares } from "squares-rng";
import { toGrid } from "./to-grid.js";

const { ceil, log2 } = Math;


/**
 * Returns a random number from `-max` to `+max` using `squares` ~with a 
 * bitlength limited to 31 bits~. (Note: division by `2**32 - 1` instead of
 * `2**32` was used in the implementation of this function and so the 
 * bitlength could be anything)
 * 
 * @param max 
 * @param n
 */
function randomCenteredAt0(max: number, n: number) { 
    return 2*max * ((squares(n) / 0xffff_ffff) - 0.5);
    // return 2*max * ((squares(n) / 2**32) - 0.5);
}


/**
 * Returns a random number from `-max` to `+max` using `squares` internally
 * and with the full bitlength of double floats of 52 bits even when the 
 * random number is close to zero.
 * 
 * @param max the max absolute value possible; prefer a power of 2
 * @param n
 */
function randomCenteredAt0v2(max: number, n: number) { 
    // get a random sign
    const sgn = 2*(squares(5*n + 0)%2) - 1;

    // get a natural scale
    const randomInt64 = squares(5*n + 1)*2**32 + squares(5*n + 2);
    const randomIn01 = randomInt64 * 2**-64;
    const s1 = ceil(log2(randomIn01));

    // get a random significand
    const randomInt64_2 = squares(5*n + 3)*2**32 + squares(5*n + 4);
    const s2 = ceil(log2(randomInt64_2));
    const res = randomInt64_2 * 2**(-s2 + s1);

    return sgn * max * res;
}


function randomOnGrid(max: number, significantBits: number) {
    return (n: number) => { 
        const expMax = ceil(log2(max));
        return toGrid(randomCenteredAt0v2(max, n), expMax, significantBits);
    }
}


export { randomOnGrid, randomCenteredAt0v2 }
