import { settings } from '../settings';
import { areBeziersInSameKFamily, from0ToT, fromTTo1, toString } from "../../../src";
import { randOnGrid } from "./rand-on-grid";

const { maxCoordinateX, maxCoordinateY, maxBitLength } = settings;


function getSameKPss(): number[][][] {
    let qq = 0;
    const r = randOnGrid(maxCoordinateX, maxBitLength);

    while (true && qq++ < 1000_000) {
        const bz = [
            [r(),r()],
            [r(),r()],
            [r(),r()],
            [r(),r()]
        ]

        //const bz1 = from0ToT(bz, 0.875);
        //const bz2 = fromTTo1(bz, 0.75);

        const t1 = randOnGrid(1, 6)();
        const t2 = randOnGrid(1, 6)();
        //console.log(t1,t2)
       
        const bz1 = from0ToT(bz, t1);
        const bz2 = fromTTo1(bz, t2).reverse();

        //console.log(bz);
        //console.log(bz1);
        //console.log(bz2);
        //throw 'a'

        //console.log(areBeziersInSameKFamily(ps1,ps2));
        if (t1 !== 0 && t1 !== 1 && t2 !== 0 && t2 !== 1 &&
            areBeziersInSameKFamily(bz1,bz2)) {

            //psss.push(bz1, bz2);
            console.log('same found')

            //console.log(toString(bz1));
            //console.log(toString(bz2));

            return [bz1,bz2];
        }
    }

    throw 'none found'
}


export { getSameKPss }
