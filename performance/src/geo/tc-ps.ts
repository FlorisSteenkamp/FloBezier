import { settings } from "../settings.js";
import { unsquashp, untransp } from '../affine.js';


const { tc } = settings;


function tcPs(ps: number[][]): number[][] {
    return ps.map(p => tc(unsquashp(untransp(p))));
}


export { tcPs }
