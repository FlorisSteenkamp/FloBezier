import { Horner as evaluatePoly } from 'flo-poly';
import { getDxyAt0 } from "./t-to-dxy/get-dxy-at-0";
import { getDdxyAt0 } from "./t-to-ddxy/get-ddxy-at-0";
import { getDddxy } from "../to-power-basis/get-dddxy";
import { twoProduct } from "double-double";
import { expansionProduct, fastExpansionSum, eSign, eDiff, scaleExpansion } from 'big-float-ts';
import { getDxy } from "../to-power-basis/get-dxy";
import { getDdxy } from "../to-power-basis/get-ddxy";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const epr = expansionProduct;
const fes = fastExpansionSum;
const edif = eDiff;
const sign = eSign;
const sce = scaleExpansion;


/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. This function is curried.
 * 
 * * **alias**: [[curvature]]
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc mdx
 */
function curvature(ps: number[][], t: number): number;
function curvature(ps: number[][]): (t: number) => number;
function curvature(ps: number[][], t?: number) {
    const [dX,dY] = getDxy(ps);
    const [ddX,ddY] = getDdxy(ps);

	function f(t: number): number {
		let dx  = evaluatePoly(dX, t); 
		let dy  = evaluatePoly(dY, t); 
		let ddx = evaluatePoly(ddX, t); 
		let ddy = evaluatePoly(ddY, t); 
		
		let a = dx*ddy - dy*ddx;
		let b = Math.sqrt((dx*dx + dy*dy)**3);

		return a/b;
	}

	// Curry
	return t === undefined ? f : f(t);
}


/**
 * Compare the curvature, `κ`, between two curves at `t === 0`.
 * 
 * Let `psI` be the curve going 'in' and `psO` be the curve coming 'out'. Then
 * this algorithm returns a positive number if `κ` for `psI` > `κ` for `psO`, 
 * negative if `κ` for `psI < `κ` for `psO` or `0` if the curve extensions are 
 * identical (i.e. in same K-family, or in other words if the curves are algebraically
 * identical up to endpoints).
 * 
 * * **precondition:** the point `psI` evaluated at one must === the point `psO`
 * evaluated at zero.
 * 
 * **exact:** returns the exact result if the bit-aligned bithlength of all 
 * coordinates <= 47.
 * 
 * @param psI an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * representing the incoming curve
 * @param psO another bezier representing the outgoing curve
 * 
 * @internal
 */
function compareCurvaturesAtInterface(
        psI: number[][], 
        psO: number[][]): number {

    // Get x' and y' for incoming curve evaluated at 0
    let [dxI, dyI] = getDxyAt0(psI); // max bitlength increase / max shift === 3
    // Get x'' and y'' for incoming curve evaluated at 0
    let [ddxI, ddyI] = getDdxyAt0(psI); // max bitlength increase / max shift === 5

    // Get x' and y' for outgoing curve evaluated at 0
    let [dxO, dyO] = getDxyAt0(psO); // max bitlength increase / max shift === 3
    // Get x'' and y'' for outgoing curve evaluated at 0
    let [ddxO, ddyO] = getDdxyAt0(psO); // max bitlength increase / max shift === 5

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
    let a = edif(
        tp(dxI, ddyI), 
        tp(dyI, ddxI)
    );
    let c = edif(
        tp(dxO, ddyO),
        tp(dyO, ddxO)
    );

    let signA = sign(a);
    let signC = sign(c);
    if (signA !== signC) {
        //console.log('branch 3');
        return signA - signC;
    }

    let b = fes(
        tp(dxO, dxO),
        tp(dyO, dyO)
    );
    let d = fes(
        tp(dxI, dxI),
        tp(dyI, dyI)
    );

    let b2 = epr(b, b);
    let b3 = epr(b2, b);
    let d2 = epr(d, d);
    let d3 = epr(d2, d);

    if (signA !== 0 || signC !== 0) {
        //console.log('branch 4');
        let a2 = epr(a, a);
        let c2 = epr(c, c);

        // max aggregate bitlength increase (let original bitlength === p):
        // κ -> (2 x ((p+3)+(p+5) + 1)) + (3 x ((p+3) + 1)) === 7p + 30
        // e.g. for bit-aligned input bitlength p of 10 we get output bitlength 
        // of 100, or for p === 3 (the max exact bitlength allowed to have exact
        // results without resorting to infinite precision) we get 51 bits.

        
        let κI = epr(a2,b3);
        let κO = epr(c2,d3);
        let δκ = sign(edif(κI, κO));

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
    let [dddxI, dddyI] = getDddxy(psI); // max bitlength increase === max shift === 6
    let [dddxO, dddyO] = getDddxy(psO); // max bitlength increase === max shift === 6

    let e = edif(
        tp(dxI, dddyI),
        tp(dyI, dddxI)
    );

    let f = fes(
        tp(dxI, ddxI),
        tp(dyI, ddyI)
    );

    let g = edif(
        tp(dxO, dddyO),
        tp(dyO, dddxO)
    );

    let h = fes(
        tp(dxO, ddxO),
        tp(dyO, ddyO)
    );

    // (de - 3af)²b⁵ > (bg - 3ch)²d⁵
    // i²b⁵ > j²d⁵
    let i = edif(
        epr(d, e),
        sce(
            epr(a, f),
            3
        )
    );

    let j = edif(
        epr(b, g),
        sce(
            epr(c, h),
            3
        )
    );

    let signI = sign(i);
    let signJ = sign(j);
    if (signA !== signC) {
        return signI - signJ;
    }

    if (signI === 0 && signJ === 0) {
        // Both curve extensions are identical, i.e. in the same K-family
        return 0;
    }

    let i2 = epr(i,i);
    let b5 = epr(b2,b3);
    let j2 = epr(j,j);
    let d5 = epr(d2,d3);

    let dκI = epr(i2,b5);
    let dκO = epr(j2,d5);

    let sgn = sign(edif(dκI, dκO));

    return signI > 0 ? sgn : -sgn;

    // If the above returned value is still zero then the two curve extensions 
    // are identical, i.e. in the same K-family
}


/**
 * Alias for [[κ]].
 * 
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. This function is curried.
 * 
 * * **alias**: [[curvature]]
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc
 */
const κ = curvature;


export { κ, curvature, compareCurvaturesAtInterface }
