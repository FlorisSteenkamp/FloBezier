import { fromToInclErrorBound } from '../../../src/index.js';
import { areIntersectionsInfinte } from './are-intersections-infinite.js';
import { randomOnGrid } from '../random-on-grid.js';


function getPssWithInfiniteXs(): number[][][] {
    let q = 0;
    const r = randomOnGrid(1, 30);

    while (true && q++ < 1000_000) {
        const qq = q*10;
        const bz = [
            [r(qq+0)*3,r(qq+1)*3],
            [r(qq+2)*3,r(qq+3)*3],
            [r(qq+4)*3,r(qq+5)*3],
            [r(qq+6)*3,r(qq+7)*3]
        ]

        const t1 = randomOnGrid(1,6)(qq+8);
        const t2 = randomOnGrid(1,6)(qq+9);
       
        const bz1 = fromToInclErrorBound(bz, 0, t1).ps;
        const bz2 = fromToInclErrorBound(bz, t2, 1).ps.reverse();

        if (t1 !== 0 && t1 !== 1 && t2 !== 0 && t2 !== 1 &&
            areIntersectionsInfinte(bz1,bz2)) {
            return [bz1,bz2];
        }
    }

    // ignore coverage
    throw new Error('none found');
}


export { getPssWithInfiniteXs }
