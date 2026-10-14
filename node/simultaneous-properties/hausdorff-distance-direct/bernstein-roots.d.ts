/**
 * Real roots in `[0,1]` of a univariate polynomial (power basis, coefficients
 * in *descending* order, as `flo-poly`'s `roots`) by Bernstein subdivision
 * with Descartes' rule of signs: the number of sign changes of the Bernstein
 * coefficients on an interval bounds the number of roots there (with the
 * same parity); `0` - no root, `1` - exactly one root (refined by bisection on
 * the power form), else the interval is halved (de Casteljau).
 *
 * * intervals narrower than `tol` with more than one sign change (clusters or
 * multiple roots) report their midpoint
 * * plain double precision; no error bounds
 */
declare function bernsteinRoots01(p: number[], tol?: number): number[];
export { bernsteinRoots01 };
