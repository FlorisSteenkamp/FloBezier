import { eSign } from 'big-float-ts';
import { getTransform2 } from "./get-transform-2.js";
import { toPowerBasisExact } from "../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getAB1 } from "./get-ab1.js";
import { getAB } from "./get-ab.js";


/** @internal */
function getAB2(
        psA: number[][],
        psB: number[][]): number[] {

    const _xyA = toPowerBasisExact(psA);

    // If the `t²` coefficient of one coordinate of `psA` is zero then that
    // coordinate is linear in `t` (and, since both curves are the same
    // algebraic curve, the same then holds for `psB`), so the (simpler) linear
    // transform can be found from that coordinate alone using `getAB1` (which
    // also avoids taking the square root of zero in `getTransform2`).
    // Note: the `t²` coefficients of both coordinates can't be zero else we
    // would have had a lower order bezier curve.
    const coord = eSign(_xyA[0][0]) === 0 ? 0 : eSign(_xyA[1][0]) === 0 ? 1 : -1;
    if (coord !== -1) {
        const psA0c = psA[0][coord]; const psA2c = psA[2][coord]; 
        const psB0c = psB[0][coord]; const psB2c = psB[2][coord];

        return getAB1(
            [[psA0c,psA0c], [psA2c,psA2c]],
            [[psB0c,psB0c], [psB2c,psB2c]]
        );
    }

    return getAB(getTransform2)(psA,psB);
}


export { getAB2 }
