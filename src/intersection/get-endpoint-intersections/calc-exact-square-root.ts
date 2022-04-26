import { bGcdInt, scaleFloatssToBigintss } from "flo-poly";
import { bigintToExpansion } from './bigint-to-expansion.js';
import { bSqrt } from './b-sqrt.js';
import { bAbs } from './b-abs.js';
import { sumBigints } from './sum-bigints.js';


/**
 * * **precondition**: the given value must be a perfect square
 * 
 * @param a the rational value for which the square root is sought given as
 * `[N,D]` to represent the value `N/D` where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) 
 * expansions
 * 
 * @internal
 */
 function calcExactSquareRoot(a: number[][]): number[][] {
    const [NN,DD] = scaleFloatssToBigintss(a).map(sumBigints);

    const gcd = bGcdInt(NN,DD);

    // the *exact* positive root `c` is given as the rational number `N/D` 
    // where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
    let N = bigintToExpansion(bSqrt(bAbs(NN/gcd)));
    let D = bigintToExpansion(bSqrt(bAbs(DD/gcd)));   

    return [N,D];
}


export { calcExactSquareRoot }
