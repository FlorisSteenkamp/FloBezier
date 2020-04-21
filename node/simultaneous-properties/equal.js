"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function equal(psA, psB) {
    if (psA.length !== psB.length) {
        return false;
    }
    for (let i = 0; i < psA.length; i++) {
        if (psA[i] !== psB[i]) {
            return false;
        }
    }
    return true;
}
exports.equal = equal;
//# sourceMappingURL=equal.js.map