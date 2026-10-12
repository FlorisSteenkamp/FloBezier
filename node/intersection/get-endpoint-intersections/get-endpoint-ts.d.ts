/**
 * Given the *exact* parameter values (as expansion rationals) of curve `A` at
 * the start and end points of the algebraically identical curve `B`, returns
 * the parameter values `[tA_B0, tA_B1, tB_A0, tB_A1]` where e.g. `tA_B0` is
 * the parameter value of `A` at the start point of `B` and `tB_A1` is the
 * parameter value of `B` at the end point of `A`.
 *
 * * the parameter values of `B` are found from those of `A` (and not
 * independently) by noting that the reparametrization is affine,
 * i.e. `tA = c*tB + d` with `d = tA_B0` and `c = tA_B1 - tA_B0` so that
 * `tB_A0 = -tA_B0/c` and `tB_A1 = (1 - tA_B0)/c` (all calculated exactly)
 * * each returned value is accurate to within 2 ulps and, in particular,
 * exactly `0` (possibly `-0`) or `1` if it is exactly `0` or `1` and on the
 * correct side of `0` and `1`
 *
 * @param dA_B0 the parameter value of `A` at the start point of `B`
 * @param dA_B1 the parameter value of `A` at the end point of `B`
 *
 * @internal
 */
declare function getEndpointTs(dA_B0: number[][], dA_B1: number[][]): number[];
export { getEndpointTs };
