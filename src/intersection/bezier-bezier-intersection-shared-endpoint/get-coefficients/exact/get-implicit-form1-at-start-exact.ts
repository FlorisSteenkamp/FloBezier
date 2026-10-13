import { eNegativeOf } from "big-float-ts";
import { toPowerBasis1Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";


/**
 * Returns the *exact* implicit form of the given line *relative to its start
 * point* (see [[getImplicitForm1AtStartDd]] for details).
 *
 * @param ps a line, e.g. `[[1,2],[3,4]]`
 *
 * @internal
 */
function getImplicitForm1AtStartExact(ps: number[][]): {
            vₓ: number[]; vᵧ: number[];
        } {

    const [[a1], [b1]] = toPowerBasis1Exact(ps);

    return { vₓ: b1, vᵧ: eNegativeOf(a1) };
}


export { getImplicitForm1AtStartExact }
