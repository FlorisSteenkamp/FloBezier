import { bGcdInt, scaleFloatssToBigintss } from "flo-poly";
import { bigintToExpansion } from './bigint-to-expansion.js';
import { bCbrt } from './b-cbrt.js';
import { sumBigints } from './sum-bigints.js';
/**
 * * **precondition**: the given value must be a perfect cube
 *
 * @param a the rational value for which the square root is sought given as
 * `[N,D]` to represent the value `N/D` where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions
 *
 * @internal
 */
function calcExactCubeRoot(a) {
    const [NN, DD] = scaleFloatssToBigintss(a).map(sumBigints);
    const gcd = bGcdInt(NN, DD);
    // the *exact* positive root `c` is given as the rational number `N/D` 
    // where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
    let N = bigintToExpansion(bCbrt(NN / gcd));
    let D = bigintToExpansion(bCbrt(DD / gcd));
    return [N, D];
}
export { calcExactCubeRoot };
//# sourceMappingURL=calc-exact-cube-root.js.map