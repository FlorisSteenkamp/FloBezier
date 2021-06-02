import { Fatline } from "../../../src/intersection/bezier3-intersection/debug"
import { settings } from "../settings";
import { unsquashp, untransp } from '../affine';


const { tc } = settings;

function tcFatline(fatline: Fatline): Fatline {
    return {
        psBase: fatline.psBase.map(p => tc(unsquashp(untransp(p)))),
        psMin: fatline.psMin.map(p => tc(unsquashp(untransp(p)))),
        psMax: fatline.psMax.map(p => tc(unsquashp(untransp(p))))
    }
}

export { tcFatline }
