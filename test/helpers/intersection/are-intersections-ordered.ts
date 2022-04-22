// ignore file coverage

import { X } from "../../../src/index.js";


function areIntersectionsOrdered(xs: X[][]): boolean {
    let current = Number.NEGATIVE_INFINITY;
    const tSs = xs.map(x => x[0].ri.tS);
    for (let t of tSs) {
        if (t < current) {
            return false;
        }
        current = t;
    }

    return true;
}


export { areIntersectionsOrdered }
