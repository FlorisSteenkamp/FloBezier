// ignore file coverage

import type { X } from "../../../src/index.js";


function areIntersectionsOrdered(xs: X[]): boolean {
    let current = -Infinity;
    const tSs = xs.map(x => x.ri1.tS);
    for (let t of tSs) {
        if (t < current) {
            return false;
        }
        current = t;
    }

    return true;
}


export { areIntersectionsOrdered }
