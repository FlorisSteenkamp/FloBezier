import { squares } from "squares-rng";
import { toGrid } from "./to-grid.js";


function rand(max: number, n: number) { 
    return 2*max * ((squares(n) / 0xffff_ffff) - 0.5); 
}

function rand01(n: number) { 
    return ((squares(n) / 0xffff_ffff)); 
}


function randomOnGrid(max: number, significantBits: number) {
    return (n: number) => { 
        const expMax = Math.ceil(Math.log2(max));
        return toGrid(rand(max, n), expMax, significantBits);
    }
}


export { randomOnGrid, rand01 }
