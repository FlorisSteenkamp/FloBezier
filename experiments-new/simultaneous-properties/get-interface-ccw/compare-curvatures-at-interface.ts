import { getDxyAt0Exact } from "../../../src/local-properties-at-t/t-to-dxy/exact/get-dxy-at-0-exact";
import { getDdxyAt0Exact } from "../../../src/local-properties-at-t/t-to-ddxy/exact/get-ddxy-at-0-exact";
import { getDddxyExact } from "../../../src/to-power-basis/get-dddxy/exact/get-dddxy-exact";
import { twoProduct, expansionProduct, fastExpansionSum, eSign, eDiff, scaleExpansion2 } from 'big-float-ts';
import { eMult } from 'big-float-ts';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const epr = expansionProduct;
const fes = fastExpansionSum;
const edif = eDiff;
const esign = eSign;
const sce = scaleExpansion2;
const emult = eMult;

const sign = Math.sign;


/**
 * Compare the signed curvature, `κ`, between two curves at `t === 0`.
 * 
 * Let `ps1` and `ps2` be the first and second curves respectively and `k1`
 * and `k2` their signed curvatures at `t === 0`. 
 * 
 * This algorithm returns a positive number if `k1` > `k2`, and a negative 
 * number if `k1` < `k2`.
 * 
 * If `k1 === k2` then the first derivatives of `k` w.r.t. arc length `s` 
 * (`dk/ds` at `t === 0`) are compared. (note: `ds/dt === √(x′² + y′²)`) 
 * The function then returns a positive number if `dk1/ds > dk2/ds`, and 
 * a negative number if `dk1/ds` < `dk2/ds`.
 * 
 * If `dk1/ds === dk2/ds` then the 2nd derivatives of `k` 
 * (`d²κ/ds²` at `t === 0`) are compared and then finally the 3rd derivative.
 * If the 3rd derivatives are also identical then the two curves are 
 * algebraically identical (due to each having 6 degrees of freedom).
 * 
 * * **precondition:** the first control points of the curves must be 
 * coincident, i.e `ps1[0] === ps2[0]`
 * * **precondition:** the first and second control point of the first bezier
 * must *not* be coincident - same with the second bezier curve
 * 
 * **exact:** TODO underflow/overflow
 * 
 * @param ps1 an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * representing the incoming curve
 * @param ps2 another bezier representing the outgoing curve
 * 
 * @internal
 */
 function compareCurvaturesAtInterface(
        ps1: number[][], 
        ps2: number[][]): number {

    // Do an exact comparison of curvatures:

    // Recall the formula for the signed curvature of a parametric curve:
    // κ = (x′y′′ - y′x′′) / √(x′² + y′²)³
    // κ² = (x′y′′ - y′x′′)² / (x′² + y′²)³

    // Let a = x′y′′ - y′x′′
    // Let b = x′² + y′² ≡ (ds/dt)²

    const [dx1, dy1] = getDxyAt0Exact(ps1);  // Get x′ and y′ for curve 1 at 0
    const [dx2, dy2] = getDxyAt0Exact(ps2);  // Get x′ and y′ for curve 2 at 0

    const [ddx1, ddy1] = getDdxyAt0Exact(ps1);  // Get x′′ and y′′ for curve 1 at 0
    const [ddx2, ddy2] = getDdxyAt0Exact(ps2);  // Get x′′ and y′′ for curve 2 at 0

    // Let a₁ = x₁′y₁′′ - y₁′x₁′′
    // Let b₁ = x₁′² + y₁′²
    // Let a₂ = x₂′y₂′′ - y₂′x₂′′
    // Let b₂ = x₂′² + y₂′²

    // Simplifying the above gives:
    // Note: b₁ > 0 and b₂ > 0
    //
    //      κ1 > κ2
    // <=>  (x₁′y₁′′ - y₁′x₁′′)/√(x₁′² + y₁′²)³ > (x₂′y₂′′ - y₂′x₂′′)/√(x₂′² + y₂′²)³
    // <=>  a₁/√b₁³ > a₂/√b₂³
    // <=>  a₁√b₂³ > a₂√b₁³
    //
    // Now, if:
    //  (1) a₁*a₂ === 0  =>  (just compare a₁,a₂), i.e.  κ1 > κ2  <=>  a₁ > 0  ||  a₂ < 0
    //  (2) a₁*a₂ < 0    =>  κ1 > κ2  <=>  sign(a₁) > 0
    //  (3) a₁*a₂ > 0    =>  (i)  (a₁ < 0) <=>  κ1 > κ2  <=>  c₁ ≡ a₁²b₂³ < a₂²b₁³
    //                       (ii) (a₁ > 0) <=>  κ1 > κ2  <=>  c₂ ≡ a₁²b₂³ > a₂²b₁³

    const a1 = edif(emult(dx1, ddy1), emult(dy1, ddx1));  // x₁′y₁′′ - y₁′x₁′′
    const a2 = edif(emult(dx2, ddy2), emult(dy2, ddx2));  // x₂′y₂′′ - y₂′x₂′′

    const signA1 = esign(a1);
    const signA2 = esign(a2);

    const a1a2 = signA1 * signA2;

    // At this point signA1 signA2: | 0+ | 0- | -0 | +0 | 00 | ++ | -- | -+ | +- |

    if (a1a2 === 0 && (signA1 !== 0 || signA2 !== 0)) {
        // At this point signA1 signA2: | 0+ | 0- | -0 | +0 |
        return signA1 - signA2;
    }

    // At this point signA1 signA2: | 00 | ++ | -- | -+ | +- |
    if (a1a2 < 0) {
        // At this point signA1 signA2: | -+ | +- |
        return signA1;
    }
    
    // At this point signA1 signA2: | 00 | ++ | -- |

    const b1 = fes(emult(dx1, dx1), emult(dy1, dy1));  // x₁′² + y₁′²
    const b2 = fes(emult(dx2, dx2), emult(dy2, dy2));  // x₂′² + y₂′²

    const bb1 = epr(b1, b1);
    const bbb1 = epr(bb1, b1);
    const bb2 = epr(b2, b2);
    const bbb2 = epr(bb2, b2);
    
    // At this point signA1 signA2: | 00 | ++ | -- |
    if (signA1 !== 0) {
        // At this point signA1 signA2: | ++ | -- |
        const aa1 = epr(a1, a1);
        const aa2 = epr(a2, a2);

        const c1 = epr(aa1,bbb2);  // c₁ ≡ a₁²b₂³ 
        const c2 = epr(aa2,bbb1);  // c₂ ≡ a₂²b₁³
        const δc = esign(edif(c1, c2));

        if (δc !== 0) {
            return signA1 > 0 ? δc : -δc;
        }
    }

    // At this point signA1 signA2: | 00 | ++ | -- | but `δc === 0` or, in
    // other words at this point we know both curvatures are identical.

    // Now we have to look at the change of curvature w.r.t. the parameter `s`.
    // If we differentiate w.r.t `t` we get:
    //
    // κ′ = [b(x′y′′′ - y′x′′′) - 3a(x′x′′ + y′y′′)] / √b⁵
    //
    // But we need to differentiate w.r.t. `s`. Using the chain rule and the
    // fact that `x′² + y′² ≡ b ≡ (ds/dt)²` we get for `dκ/ds`:
    // `dκ/ds = (dk/dt) / (ds/dt) = (dk/dt) / √b`, i.e. 
    // `dκ/ds = [b(x′y′′′ - y′x′′′) - 3a(x′x′′ + y′y′′)] / (√b*√b⁵)`, i.e.
    // `dκ/ds = [b(x′y′′′ - y′x′′′) - 3a(x′x′′ + y′y′′)] / b³`

    // Let c = x′y′′′ - y′x′′′
    // Let d = x′x′′ + y′y′′

    // Then:
    // dκ/ds = (bc - 3ad) / b³

    // Let c₁ = x₁′y₁′′′ - y₁′x₁′′′
    // Let d₁ = x₁′x₁′′ + y₁′y₁′′
    // Let c₂ = x₂′y₂′′′ - y₂′x₂′′′
    // Let d₂ = x₂′x₂′′ + y₂′y₂′′

    // Therefore:
    // dκ₁/ds > dκ₂/ds
    // <=> (b₁c₁ - 3a₁d₁)b₂³ >
    //     (b₂c₂ - 3a₂d₂)b₁³

    // Let e₁ = b₁c₁ - 3a₁d₁
    // Let e₂ = b₂c₂ - 3a₂d₂

    // dκ₁/ds > dκ₂/ds
    // <=> e₁b₂³ > e₂b₁³

    // Get x′′′ and y′′′ (for a cubic they are a constant vector and for linear 
    // and quadratic curves they are the zero vector)
    const [dddx1, dddy1] = getDddxyExact(ps1);
    const [dddx2, dddy2] = getDddxyExact(ps2);

    const c1 = edif(epr(dx1, dddy1), epr(dy1, dddx1));  // c₁ = x₁′y₁′′′ - y₁′x₁′′′
    const d1 = fes (epr(dx1, ddx1 ), epr(dy1, ddy1 ));  // d₁ = x₁′x₁′′ + y₁′y₁′′

    const c2 = edif(epr(dx2, dddy2), epr(dy2, dddx2));  // c₂ = x₂′y₂′′′ - y₂′x₂′′′
    const d2 = fes (epr(dx2, ddx2 ), epr(dy2, ddy2 ));  // d₂ = x₂′x₂′′ + y₂′y₂′′

    // (b₁c₁ - 3a₁d₁)b₂³ > (b₂c₂ - 3a₂d₂)b₁³
    // e₁b₂³ > e₂b₁³
    const e1 = edif(epr(b1,c1), sce(3,epr(a1,d1)));
    const e2 = edif(epr(b2,c2), sce(3,epr(a2,d2)));

    const signE1 = esign(e1);
    const signE2 = esign(e2);

    // At this point signE1 signE2: | 0+ | 0- | -0 | +0 | 00 | ++ | -- | -+ | +- |
    const e1e2 = signE1 * signE2;

    if (e1e2 === 0 && (signE1 !== 0 || signE2 !== 0)) {
        // At this point signE1 signE2: | 0+ | 0- | -0 | +0 |
        return signE1 - signE2;
    }

    // At this point signE1 signE2: | 00 | ++ | -- | -+ | +- |
    if (e1e2 < 0) {
        // At this point signE1 signE2: | -+ | +- |
        return signE1;
    }
    
    // At this point signE1 signE2: | 00 | ++ | -- |

    if (signE1 === 0) {
        // At this point signE1 signE2: | 00 |
        // There are still 2 (of 6) degrees of freedom left for cubics but
        // we're done for quadratics!
        // TODO
        return 0;
    }

    // At this point signE1 signE2: | ++ | -- |

    // Recall:
    // dκ₁/ds > dκ₂/ds
    // <=> e₁b₂³ > e₂b₁³
    const dκ1 = epr(e1,bbb2);
    const dκ2 = epr(e2,bbb1);

    const sign = esign(edif(dκ1, dκ2));

    if (sign === 0) {
        // There are still 2 (of 6) degrees of freedom left for cubics but
        // we're done for quadratics!
        // TODO
        return 0;
    }

    return sign;
}


export { compareCurvaturesAtInterface }
