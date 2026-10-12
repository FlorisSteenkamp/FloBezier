import { eDiff, eMult, eNegativeOf, eSign } from 'big-float-ts';
import { ensureRange } from "./ensure-range.js";
import { erEstimate } from "./er-estimate.js";
/**
 * Returns the sign of `N/D - 1` (exactly) for the given expansion
 * rational `N/D`.
 *
 * @internal
 */
function sgnMin1([N, D]) {
    return eSign(eDiff(N, D)) * eSign(D);
}
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
function getEndpointTs(dA_B0, dA_B1) {
    const [N0, D0] = dA_B0;
    const [N1, D1] = dA_B1;
    // `tA_B1 - tA_B0 = (N1*D0 - N0*D1)/(D0*D1)`, i.e. `c` (non-zero since `B`
    // is not a point); below we use `den = N1*D0 - N0*D1`
    const N0D1 = eMult(N0, D1);
    const den = eDiff(eMult(N1, D0), N0D1);
    // tB_A0 = -tA_B0/c = (-N0*D1)/den
    const dB_A0 = [eNegativeOf(N0D1), den];
    // tB_A1 = (1 - tA_B0)/c = ((D0 - N0)*D1)/den
    const dB_A1 = [eMult(eDiff(D0, N0), D1), den];
    return [dA_B0, dA_B1, dB_A0, dB_A1].map(d => ensureRange(erEstimate(d), sgnMin1(d)));
}
export { getEndpointTs };
//# sourceMappingURL=get-endpoint-ts.js.map