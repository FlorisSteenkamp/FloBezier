"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_dx_1 = require("./t-to-dxy/evaluate-dx");
const evaluate_dy_1 = require("./t-to-dxy/evaluate-dy");
const evaluate_ddx_1 = require("./t-to-ddxy/evaluate-ddx");
const evaluate_ddy_1 = require("./t-to-ddxy/evaluate-ddy");
const flo_numerical_1 = require("flo-numerical");
const get_dxy_at_0_1 = require("./t-to-dxy/get-dxy-at-0");
const get_ddxy_at_0_1 = require("./t-to-ddxy/get-ddxy-at-0");
const get_dddxy_1 = require("../to-power-basis/get-dddxy");
function κ(ps, t) {
    let evDx = evaluate_dx_1.evaluateDx(ps);
    let evDy = evaluate_dy_1.evaluateDy(ps);
    let evDdx = evaluate_ddx_1.evaluateDdx(ps);
    let evDdy = evaluate_ddy_1.evaluateDdy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let ddx = evDdx(t);
        let ddy = evDdy(t);
        let a = dx * ddy - dy * ddx;
        let b = Math.sqrt(Math.pow((dx * dx + dy * dy), 3));
        return a / b;
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.κ = κ;
/**
 * Compare the curvature, κ, between two curves at t === 0.
 *
 * Returns a positive number if κ for psI > κ for psO, negative if κ for psI < κ
 * for psO or zero if the curve extensions are identical (i.e. in same K-family).
 *
 * Precondition: The point psI evaluated at zero must === the point psO
 * evaluated at zero.
 *
 * Exact: Returns the exact result if the bithlength of all
 * coordinates <= 53 - 5 === 48 and are bit-aligned.
 *
 * @param psI An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * representing the incoming curve
 * @param psO Another bezier representing the outgoing curve
 */
function compareCurvaturesAtInterface(psI, psO) {
    // Get x' and y' for incoming curve evaluated at 0
    let [dxI, dyI] = get_dxy_at_0_1.getDxyAt0(psI); // max bitlength increase / max shift === 3
    // Get x'' and y'' for incoming curve evaluated at 0
    let [ddxI, ddyI] = get_ddxy_at_0_1.getDdxyAt0(psI); // max bitlength increase / max shift === 5
    // Get x' and y' for outgoing curve evaluated at 0
    let [dxO, dyO] = get_dxy_at_0_1.getDxyAt0(psO); // max bitlength increase / max shift === 3
    // Get x'' and y'' for outgoing curve evaluated at 0
    let [ddxO, ddyO] = get_ddxy_at_0_1.getDdxyAt0(psO); // max bitlength increase / max shift === 5
    //console.log('κI: ', κ(psI, 0));
    //console.log('κO: ', κ(psO, 0));
    // Remember the formula for the signed curvature of a parametric curve:
    // κ = x′y′′ - y′x′′ / sqrt(x′² + y′²)³
    // κ² = (x′y′′ - y′x′′)² / (x′² + y′²)³
    // This allows us to do an exact comparison of curvatures
    // Simplifying the above gives (denoting the incoming curve with a subscript
    // of 1 and the outgoing with a 2):
    //      κIncoming > κOutgoing
    // <=>  (x₁′y₁′′ - y₁′x₁′′)²(x₂′² + y₂′²)³ > (x₂′y₂′′ - y₂′x₂′′)²(x₁′² + y₁′²)³
    // <=>  a²b³ > c²d³
    // Note b³ > 0 and d³ > 0
    // max aggregate bitlength increase (let original bitlength === p):
    // a -> 2 x ((p+3)+(p+5) + 1) === 4p + 18 -> max p in double precision === 8 -> too low
    //let a = (dxI*ddyI - dyI*ddxI)**2;
    // b -> 3 x ((p+3) + 1) === 3p + 12
    //let b = (dxO*dxO  + dyO*dyO )**3;
    // c -> 2 x ((p+3)+(p+5) + 1) === 4p + 18
    //let c = (dxO*ddyO - dyO*ddxO)**2;
    // d -> 3 x ((p+3) + 1) === 3p + 12
    //let d = (dxI*dxI  + dyI*dyI )**3;
    // We need to resort to exact floating point arithmetic at this point
    let a = flo_numerical_1.expansionDiff(flo_numerical_1.twoProduct(dxI, ddyI), flo_numerical_1.twoProduct(dyI, ddxI));
    let c = flo_numerical_1.expansionDiff(flo_numerical_1.twoProduct(dxO, ddyO), flo_numerical_1.twoProduct(dyO, ddxO));
    let signA = flo_numerical_1.sign(a);
    let signC = flo_numerical_1.sign(c);
    if (signA !== signC) {
        //console.log('branch 3');
        return signA - signC;
    }
    let b = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(dxO, dxO), flo_numerical_1.twoProduct(dyO, dyO));
    let d = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(dxI, dxI), flo_numerical_1.twoProduct(dyI, dyI));
    let b2 = flo_numerical_1.expansionProduct(b, b);
    let b3 = flo_numerical_1.expansionProduct(b2, b);
    let d2 = flo_numerical_1.expansionProduct(d, d);
    let d3 = flo_numerical_1.expansionProduct(d2, d);
    if (signA !== 0 || signC !== 0) {
        //console.log('branch 4');
        let a2 = flo_numerical_1.expansionProduct(a, a);
        let c2 = flo_numerical_1.expansionProduct(c, c);
        // max aggregate bitlength increase (let original bitlength === p):
        // κ -> (2 x ((p+3)+(p+5) + 1)) + (3 x ((p+3) + 1)) === 7p + 30
        // e.g. for bit-aligned input bitlength p of 10 we get output bitlength 
        // of 100, or for p === 3 (the max exact bitlength allowed to have exact
        // results without resorting to infinite precision) we get 51 bits.
        let κI = flo_numerical_1.expansionProduct(a2, b3);
        let κO = flo_numerical_1.expansionProduct(c2, d3);
        let δκ = flo_numerical_1.sign(flo_numerical_1.expansionDiff(κI, κO));
        if (δκ !== 0) {
            //console.log('branch 5');
            // At this point signA === signC, both +tive or -tive
            return signA > 0 ? δκ : -δκ;
        }
    }
    // At this point signA === signC, both +tive or -tive or 0
    // Now we have to look at the change of curvature w.r.t. the parameter t,
    // i.e. 
    // κ′ = [(x′²+y′²)(x′y′′′-y′x′′′) - 3(x′y′′-y′x′′)(x′x′′+y′y′′)] / (x′²+y′²)^(5/2)
    // Therefore: (denoting the incoming curve with a subscript of 1 and the outgoing with a 2)
    // κ′Incoming > κ′Outgoing
    // <=> [(x₁′²+y₁′²)(x₁′y₁′′′-y₁′x₁′′′) - 3(x₁′y₁′′-y₁′x₁′′)(x₁′x₁′′+y₁′y₁′′)]²(x₂′²+y₂′²)⁵ >
    //     [(x₂′²+y₂′²)(x₂′y₂′′′-y₂′x₂′′′) - 3(x₂′y₂′′-y₂′x₂′′)(x₂′x₂′′+y₂′y₂′′)]²(x₁′²+y₁′²)⁵
    // <=> (de - 3af)²b⁵ > (bg - 3ch)²d⁵
    // <=> i²b⁵ > j²d⁵
    // Get x′′′ and y′′′ for incoming curve evaluated at 1
    let [dddxI, dddyI] = get_dddxy_1.getDddxy(psI); // max bitlength increase === max shift === 6
    let [dddxO, dddyO] = get_dddxy_1.getDddxy(psO); // max bitlength increase === max shift === 6
    let e = flo_numerical_1.expansionDiff(flo_numerical_1.twoProduct(dxI, dddyI), flo_numerical_1.twoProduct(dyI, dddxI));
    let f = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(dxI, ddxI), flo_numerical_1.twoProduct(dyI, ddyI));
    let g = flo_numerical_1.expansionDiff(flo_numerical_1.twoProduct(dxO, dddyO), flo_numerical_1.twoProduct(dyO, dddxO));
    let h = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(dxO, ddxO), flo_numerical_1.twoProduct(dyO, ddyO));
    // (de - 3af)²b⁵ > (bg - 3ch)²d⁵
    // i²b⁵ > j²d⁵
    let i = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(d, e), flo_numerical_1.scaleExpansion(flo_numerical_1.expansionProduct(a, f), 3));
    let j = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(b, g), flo_numerical_1.scaleExpansion(flo_numerical_1.expansionProduct(c, h), 3));
    let signI = flo_numerical_1.sign(i);
    let signJ = flo_numerical_1.sign(j);
    if (signA !== signC) {
        return signI - signJ;
    }
    if (signI === 0 && signJ === 0) {
        // Both curve extensions are identical, i.e. in the same K-family
        return 0;
    }
    let i2 = flo_numerical_1.expansionProduct(i, i);
    let b5 = flo_numerical_1.expansionProduct(b2, b3);
    let j2 = flo_numerical_1.expansionProduct(j, j);
    let d5 = flo_numerical_1.expansionProduct(d2, d3);
    let dκI = flo_numerical_1.expansionProduct(i2, b5);
    let dκO = flo_numerical_1.expansionProduct(j2, d5);
    let sgn = flo_numerical_1.sign(flo_numerical_1.expansionDiff(dκI, dκO));
    return signI > 0 ? sgn : -sgn;
    // If the above returned value is still zero then the two curve extensions 
    // are identical, i.e. in the same K-family
}
exports.compareCurvaturesAtInterface = compareCurvaturesAtInterface;
//# sourceMappingURL=curvature.js.map