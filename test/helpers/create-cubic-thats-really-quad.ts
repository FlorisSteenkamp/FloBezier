import { squares } from "squares-rng";
import { toCubic, isCubicReallyQuad } from "../../src/index.js";
import { randomOnGrid } from "./random-on-grid.js";


const maxBitLength = 45;
const maxCoordinate = 128;
const randOnGrid_ = randomOnGrid(maxCoordinate, maxBitLength);

// const r = (n: number) => squares(n) / 0xffff_ffff;
const r = randOnGrid_;

function createCubicThatsReallyQuad(n: number): { quad: number[][], cubic: number[][] } {
    const s = squares(n);
    for (let i=s; i<100+s; i++) {
        // the `3*` below allows `toCubic` to be exact in most cases
        const ps = [[3*r(i+1),3*r(i+2)], [3*r(i+3),3*r(i+4)], [3*r(i+5),3*r(i+6)]];
        const ps_ = toCubic(ps);
        if (isCubicReallyQuad(ps_)) {
            return { quad: ps, cubic: ps_ };
        };
    }

    throw new Error('Unable to find cubic that\'s really a quad');
}


export { createCubicThatsReallyQuad }
