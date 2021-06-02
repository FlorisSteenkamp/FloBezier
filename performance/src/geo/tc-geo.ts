import { settings } from "../settings";
import { unsquashp, untransp } from '../affine';


const { tc } = settings;


function tcGeo(
    hq: [[number, number], [number, number], [number, number], [number, number]]
): [[number, number], [number, number], [number, number], [number, number]] {

    const [p0, p11, p12, p2] = hq;

    return [
        tc(unsquashp(untransp(p0))) as [number, number],
        tc(unsquashp(untransp(p11))) as [number, number],
        tc(unsquashp(untransp(p12))) as [number, number],
        tc(unsquashp(untransp(p2))) as [number, number]
    ];
}


export { tcGeo }
