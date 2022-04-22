import { X } from "../../../src/index.js";


function swapIntersections(xs: X[]): X[] {
    return xs.map(x => ({
        ...x,
        t1: x.t2,
        ri1: x.ri2,
        t2: x.t1,
        ri2: x.ri1
    }));
}


export { swapIntersections }
