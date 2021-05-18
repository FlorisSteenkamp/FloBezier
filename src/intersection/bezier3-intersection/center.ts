import { squaredDistanceBetween } from 'flo-vector2d';

const sdst = squaredDistanceBetween;


/**
 * Return the given two beziers but translated such that the shorter (by
 * some length measure) is closer to the origin.
 * @private
 * @param P 
 * @param Q 
 */
/*
function center(P: number[][], Q: number[][]) {
    let lengthP = 0;
    for (let i=1; i<P.length; i++) {
        lengthP += sdst(P[i-1], P[i]);
    }

    let lengthQ = 0;
    for (let i=1; i<Q.length; i++) {
        lengthQ += sdst(Q[i-1], Q[i]);
    }

    let moveX: number;
    let moveY: number;
    if (lengthQ < lengthP) {
        moveX = Q.reduce((prev, p) => prev + p[0], 0) / 4;
        moveY = Q.reduce((prev, p) => prev + p[1], 0) / 4;
    } else {
        moveX = P.reduce((prev, p) => prev + p[0], 0) / 4;
        moveY = P.reduce((prev, p) => prev + p[1], 0) / 4;
    }
    P = P.map(x => [x[0]-moveX, x[1]-moveY]);
    Q = Q.map(x => [x[0]-moveX, x[1]-moveY]);

    return [P, Q];
}
*/


function center(P: number[][], Q: number[][]) {
    // TODO - improve - we shouldn't center, we should remove high order bits -
    // almost the same thing
    let lengthP = 0;
    for (let i=1; i<P.length; i++) {
        lengthP += sdst(P[i-1], P[i]);
    }

    let lengthQ = 0;
    for (let i=1; i<Q.length; i++) {
        lengthQ += sdst(Q[i-1], Q[i]);
    }

    //let moveX: number;
    //let moveY: number;
    let moveX = 0;
    let moveY = 0;
    if (lengthQ < lengthP) {
        //moveX = Q.reduce((prev, p) => prev + p[0], 0) / Q.length;
        //moveY = Q.reduce((prev, p) => prev + p[1], 0) / Q.length;

        for (let i=0; i<Q.length; i++) {
            const p = Q[i];
            moveX += p[0];
            moveY += p[1];
        }
        moveX /= Q.length;
        moveY /= Q.length;
    } else {
        //moveX = P.reduce((prev, p) => prev + p[0], 0) / P.length;
        //moveY = P.reduce((prev, p) => prev + p[1], 0) / P.length;

        for (let i=0; i<P.length; i++) {
            const p = P[i];
            moveX += p[0];
            moveY += p[1];
        }
        moveX /= P.length;
        moveY /= P.length;
    }

    //P = P.map(x => [x[0]-moveX, x[1]-moveY]);
    //Q = Q.map(x => [x[0]-moveX, x[1]-moveY]);

    const P_: number[][] = [];
    const Q_: number[][] = [];
    for (let i=0; i<P.length; i++) {
        const p = P[i];
        P_.push([p[0]-moveX, p[1]-moveY]);
    }
    for (let i=0; i<Q.length; i++) {
        const q = Q[i];
        Q_.push([q[0]-moveX, q[1]-moveY]);
    }

    //return [P, Q];
    return [P_, Q_];
}


export { center }
