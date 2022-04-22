import { Fatline } from "../../../src/intersection/bezier-bezier-intersection-fast/debug.js"
import { settings } from "../settings.js";
import { unsquashp, untransp } from '../affine.js';


const { tc } = settings;

function tcFatline(fatline: Fatline): Fatline {
    return {
        psBase: fatline.psBase.map(p => tc(unsquashp(untransp(p)))),
        psMin: fatline.psMin.map(p => tc(unsquashp(untransp(p)))),
        psMax: fatline.psMax.map(p => tc(unsquashp(untransp(p))))
    }
}

export { tcFatline }
