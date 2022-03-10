import { X } from "../../../src/index.js";


function swapIntersections(xs: X[][]): X[][] {
    return xs.map(x => [x[1],x[0]]);
}


export { swapIntersections }
