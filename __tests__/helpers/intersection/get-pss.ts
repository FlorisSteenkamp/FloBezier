// ignore file coverage
import { randomOnGrid } from '../random-on-grid.js';
import { getSpecialPss } from './get-special-pss.js';


const num = 1000;

const r = randomOnGrid(1, 53);


function getPss(
        orderss: [1|2|3, 1|2|3][] = [[1,1],[1,2],[1,3], [2,1],[2,2],[2,3], [3,1],[3,2],[3,3]]): number[][][] {

    let pss: number[][][] = getSpecialPss();

    let i = pss.length;
    for (; i<2*num; i++) {
        const idx = Math.trunc(i/2) % orderss.length;
        const orderPair = i%2;
        const order = orderss[idx][orderPair];

        const ps: number[][] = [];
        for (let j=0; j<order+1; j++) {
            ps.push([
                r((2*(order+1))*i + 2*j + 0),
                r((2*(order+1))*i + 2*j + 1)
            ]);
        }
        pss.push(ps);
    }

    return pss;
}


export { getPss }
