import { X } from "../../../src/index.js";


function areIntersectionsOrdered(xs: X[][]): boolean {
    let current = Number.NEGATIVE_INFINITY;
    for (let i=0; i<xs.length; i++) {
        const ri1 = xs[i][0].ri;
        const tS = ri1.tS;
        const tE = ri1.tE;

        if (tS < current) {
            return false;
        }
    }

    return true;
}


export { areIntersectionsOrdered }
