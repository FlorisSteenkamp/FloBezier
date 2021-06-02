import { settings } from "../settings";
import { unsquashp, untransp } from '../affine';


const { tc } = settings;


function tcPs(ps: number[][]): number[][] {
    return ps.map(p => tc(unsquashp(untransp(p))));
}


export { tcPs }
