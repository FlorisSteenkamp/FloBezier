import { bezierBezierIntersection } from "../../../src/index.js";
function native(pss) {
    const xss = [];
    for (let i = 0; i < pss.length; i++, i++) {
        xss.push(bezierBezierIntersection(pss[i], pss[i + 1]));
    }
    return xss;
}
export { native };
//# sourceMappingURL=native.js.map