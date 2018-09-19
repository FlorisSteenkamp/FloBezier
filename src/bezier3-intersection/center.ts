
import { squaredDistanceBetween as sdst } from 'flo-vector2d';


/**
 * Return the given two beziers but translated such that the shorter (by
 * some length measure) is closer to the origin.
 * @private
 * @param P 
 * @param Q 
 */
function center(P: number[][], Q: number[][]) {
    let [P0, P1, P2, P3] = P; 
    let [Q0, Q1, Q2, Q3] = Q; 

    let lengthP = sdst(P0,P1) + sdst(P1,P2) + sdst(P2,P3);
    let lengthQ = sdst(Q0,Q1) + sdst(Q1,Q2) + sdst(Q2,Q3);

    let moveX: number;
    let moveY: number;
    if (lengthQ < lengthP) {
        moveX = (Q0[0] + Q1[0] + Q2[0] + Q3[0]) / 4;
        moveY = (Q0[1] + Q1[1] + Q2[1] + Q3[1]) / 4;
    } else {
        moveX = (P0[0] + P1[0] + P2[0] + P3[0]) / 4;
        moveY = (P0[1] + P1[1] + P2[1] + P3[1]) / 4;
    }
    P = P.map(x => [x[0]-moveX, x[1]-moveY]);
    Q = Q.map(x => [x[0]-moveX, x[1]-moveY]);

    return [P, Q];
}


export { center }
