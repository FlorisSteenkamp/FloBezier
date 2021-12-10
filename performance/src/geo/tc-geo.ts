import { settings } from "../settings.js";
import { unsquashp, untransp } from '../affine.js';


const { tc } = settings;


function tcGeo(hq: number[][]): number[][] {

    const [p0, p11, p12, p2] = hq;

    return [
        tc(unsquashp(untransp(p0))),
        tc(unsquashp(untransp(p11))),
        tc(unsquashp(untransp(p12))),
        tc(unsquashp(untransp(p2)))
    ];
}


export { tcGeo }
