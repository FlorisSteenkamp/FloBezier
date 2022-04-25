import { eCompress } from "big-float-ts";
const maxSafe = BigInt(2 ** 53);
/**
 * Returns the [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansion of the given bigint.
 *
 * * it is assumed that the given bigint doesn't cause floating point overflow
 *
 * @internal
 */
function bigintToExpansion(b) {
    if (b === 0n) {
        return [0];
    }
    const e = [];
    let i = 0;
    let q = b;
    while (q !== 0n) {
        q = b / maxSafe;
        const r = b % maxSafe;
        e.push(Number(r) * 2 ** (i * 53));
        b = q;
        i++;
    }
    return eCompress(e);
}
export { bigintToExpansion };
//# sourceMappingURL=bigint-to-expansion.js.map