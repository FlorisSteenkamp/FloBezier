import { settings } from '../settings.js';

const { num } = settings;

declare const paper: any;


function getCurvesFromPss(pss: number[][][]) {
    let curves: any[] = [];

    for (let i=0; i<pss.length; i++) {
        const ps = pss[i];

        let curve: any;
        if (ps.length === 2) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0], ps[1][1])
            );
        }
        if (ps.length === 3) {
            // not working??
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
                new paper.Point(ps[2][0], ps[2][1])
            );
        }
        if (ps.length === 4) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
                new paper.Point(ps[2][0] - ps[3][0], ps[2][1] - ps[3][1]),
                new paper.Point(ps[3][0], ps[3][1])
            );
        }
        
        curves.push(curve);
    }

    return curves;
}


export { getCurvesFromPss }
