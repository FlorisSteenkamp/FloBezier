/** `2 * 2^-53` -> 2x the standard round-of unit `=== Number.EPSILON` */
const eps = Number.EPSILON;
/** `2^-53` -> the standard round-of unit `=== eps/2` */
const u = Number.EPSILON / 2;
/** `2^-106` -> the standard round-of unit for double-double precision `=== (eps/2)**2` */
const uu = u * u;
/**
 * the standard floating point error function evaluated at `1`
 *
 * * `=== 1.1102230246251568e-16`
 * * very close to being `=== Number.EPSILON / 2`
 */
const γ1 = γ(1);
/**
 * the standard double-double floating point error function evaluated at `3`;
 * the `3` factor is due to double-double arithmetic accuracy constraints
 *
 * * `=== 3.697785493223493e-32`
 * * very close to being `=== 3*(Number.EPSILON / 2)**2`
 */
const γγ3 = γγ(3);
/**
 * The canonical floating point error function, γ.
 *
 * * very close to being `=== n * (Number.EPSILON / 2)`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this `=== 2*d + 1`, where `d` is the degree of the
 * polynomial
 *
 * @doc
 */
function γ(n) {
    const nu = n * u;
    return nu / (1 - nu);
}
/**
 * The canonical, once compensated (implying double-double precision),
 * floating point error function.
 *
 * * very close to being `=== n * (Number.EPSILON / 2)**2`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this === 2*d + 1, where d is the degree of the
 * polynomial
 *
 * @doc
 */
function γγ(n) {
    const nuu = n * uu;
    return nuu / (1 - nuu);
}
export { γ, γγ, eps, u, uu, γ1, γγ3 };
//# sourceMappingURL=error-analysis.js.map