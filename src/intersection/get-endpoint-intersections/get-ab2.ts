import { eSign } from 'big-float-ts';
import { getTransform2 } from "./get-transform-2.js";
import { toPowerBasisExact } from "../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { getAB1 } from "./get-ab1.js";
import { getAB } from "./get-ab.js";


function getAB2(
        psA: number[][],
        psB: number[][]): number[] {

    const _xyA = toPowerBasisExact(psA);

    // Both `_xyB[0][0]` and `_xyB[1][0]` can't be zero else we would have had
    // a lower order bezier curve. Also, if `_xyB[0][0]` is zero 
    // then `_xyA[0][0]` will also be zero (and same with the y coordinate)
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
