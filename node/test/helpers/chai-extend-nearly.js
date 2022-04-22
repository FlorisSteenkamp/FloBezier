/// <reference path="../chai-extensions.d.ts" />
import { closeTo } from "./close-to.js";
const nearly = (chai, utils) => {
    var Assertion = chai.Assertion;
    utils.addMethod(Assertion.prototype, 'nearly', function (ulpsOrEps, value) {
        // @ts-ignore
        const obj = this._obj;
        let isUlps = !Array.isArray(ulpsOrEps);
        // @ts-ignore
        this.assert(closeTo(ulpsOrEps)(obj, value), `expected \n${JSON.stringify(obj)}\n to be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)}`, `expected \n${JSON.stringify(obj)}\n to not be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)}`);
    });
};
export { nearly };
//# sourceMappingURL=chai-extend-nearly.js.map