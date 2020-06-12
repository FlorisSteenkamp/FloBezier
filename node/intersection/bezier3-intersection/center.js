"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.center = void 0;
const flo_vector2d_1 = require("flo-vector2d");
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
function center(P, Q) {
    // TODO - improve - we shouldn't center, we should remove high order bits -
    // almost the same thing
    let lengthP = 0;
    for (let i = 1; i < P.length; i++) {
        lengthP += flo_vector2d_1.squaredDistanceBetween(P[i - 1], P[i]);
    }
    let lengthQ = 0;
    for (let i = 1; i < Q.length; i++) {
        lengthQ += flo_vector2d_1.squaredDistanceBetween(Q[i - 1], Q[i]);
    }
    let moveX;
    let moveY;
    if (lengthQ < lengthP) {
        moveX = Q.reduce((prev, p) => prev + p[0], 0) / Q.length;
        moveY = Q.reduce((prev, p) => prev + p[1], 0) / Q.length;
    }
    else {
        moveX = P.reduce((prev, p) => prev + p[0], 0) / P.length;
        moveY = P.reduce((prev, p) => prev + p[1], 0) / P.length;
    }
    P = P.map(x => [x[0] - moveX, x[1] - moveY]);
    Q = Q.map(x => [x[0] - moveX, x[1] - moveY]);
    return [P, Q];
}
exports.center = center;
//# sourceMappingURL=center.js.map