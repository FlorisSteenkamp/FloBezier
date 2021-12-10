import { X } from "../../../src/index.js";
import { settings } from '../settings.js'; 
import { draw, ctx } from '../draw-stuff.js';
import { unsquashp, untransp } from '../affine.js';


const { tc, num } = settings;
const { dot_, box_ } = draw(ctx);


function drawIntersections(xs: X[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));

    xs.map(x => {
        const x0 = x[0];
        const tl = tc(unsquashp(untransp(x0.box[0])));
        const br = tc(unsquashp(untransp(x0.box[1])));
        //dot_(tc(unsquashp(untransp(p))));
        box_([tl,br]);
        //console.log(tl,br)
        dot_(tl);
        dot_(br);
    });
}


export { drawIntersections }
