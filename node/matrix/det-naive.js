"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
// TODO - from https://raw.githubusercontent.com/divyanthj/determinant/master/src/scripts/services/calculate.js
function detNaive(A) {
    let det = 0;
    if (A.length === 1) {
        return A[0][0];
    }
    if (A.length == 2) {
        det = A[0][0] * A[1][1] - A[1][0] * A[0][1];
        return det;
    }
    //Recursion begins here
    //Instantiate smaller matrix
    for (let i = 0; i < A.length; i++) {
        let smaller = [];
        for (let newvar = 0; newvar < A.length - 1; newvar++) {
            let array = [];
            for (let m = 0; m < A.length - 1; m++) {
                array.push(0);
            }
            smaller.push(array);
        }
        //Populate smaller matrix with the appropriate values.
        for (var a = 1; a < A.length; a++) {
            for (var b = 0; b < A.length; b++) {
                if (b < i) {
                    smaller[a - 1][b] = A[a][b];
                }
                else if (b > i) {
                    smaller[a - 1][b - 1] = A[a][b];
                }
            }
        }
        //calculate determinant of smaller matrix
        //multiply determinant of smaller matrix with current element
        //add to "det"
        let s = i % 2 === 0 ? 1 : -1;
        det += s * A[0][i] * detNaive(smaller);
    }
    return det;
}
exports.detNaive = detNaive;
function detSlowExact(A) {
    var det = [0];
    if (A.length === 1) {
        return A[0][0];
    }
    if (A.length == 2) {
        //det = A[0][0] * A[1][1] - A[1][0] * A [0][1];
        let a = flo_numerical_1.expansionProduct(A[0][0], A[1][1]);
        let b = flo_numerical_1.negativeOf(flo_numerical_1.expansionProduct(A[1][0], A[0][1]));
        return flo_numerical_1.fastExpansionSum(a, b);
    }
    //Instantiate smaller matrix
    for (let i = 0; i < A.length; i++) {
        let smaller = [];
        for (let newvar = 0; newvar < A.length - 1; newvar++) {
            var array = [];
            for (var m = 0; m < A.length - 1; m++) {
                array.push([0]);
            }
            smaller.push(array);
        }
        //Populate smaller matrix with the appropriate values.
        for (let a = 1; a < A.length; a++) {
            for (let b = 0; b < A.length; b++) {
                if (b < i) {
                    smaller[a - 1][b] = A[a][b];
                }
                else if (b > i) {
                    smaller[a - 1][b - 1] = A[a][b];
                }
            }
        }
        //calculate determinant of smaller matrix
        //multiply determinant of smaller matrix with current element
        //add to "det"
        let s = i % 2 === 0 ? 1 : -1;
        //det += s * A[0][i] * detSlowExact(smaller);
        let a = flo_numerical_1.expansionProduct(A[0][i], detSlowExact(smaller));
        if (i % 2 !== 0) {
            a = flo_numerical_1.negativeOf(a);
        }
        det = flo_numerical_1.fastExpansionSum(det, a);
    }
    return det;
}
exports.detSlowExact = detSlowExact;
//# sourceMappingURL=det-naive.js.map