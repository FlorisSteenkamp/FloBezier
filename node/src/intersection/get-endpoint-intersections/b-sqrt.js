const { round, sqrt } = Math;
/**
 * Returns the square root of a bigint.
 *
 * * see https://stackoverflow.com/a/53684036/2010061
 *
 * * **precondition**: the given bigint must be a perfect square
 *
 * @internal
 */
function bSqrt(v) {
    if (v <= 1n) {
        if (v < 0n) {
            throw new Error('square root of negative numbers are not allowed');
        }
        return v;
    }
    let x0 = BigInt(round(sqrt(Number(v))));
    while (true) {
        const x1 = (x0 + v / x0) >> 1n;
        if (x1 === x0) {
            return x0;
        }
        x0 = x1;
    }
}
export { bSqrt };
//# sourceMappingURL=b-sqrt.js.map