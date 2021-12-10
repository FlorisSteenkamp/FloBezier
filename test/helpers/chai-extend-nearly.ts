/// <reference path="../chai-extensions.d.ts" />
import { closeTo } from "./close-to.js";
import { ObjOrArray } from "./obj-or-array.js";


const nearly: Chai.ChaiPlugin = (chai, utils) => {
	var Assertion = chai.Assertion;
  
	utils.addMethod(Assertion.prototype, 'nearly', 
		function(ulpsOrEps: number | number[], value: ObjOrArray<number>) {
            const obj = this._obj as ObjOrArray<number>;

            let isUlps = !Array.isArray(ulpsOrEps);

            this.assert(
                closeTo(ulpsOrEps)(obj, value), 
                // closeTo(1)(obj, value), 
                `expected \n${JSON.stringify(obj)}\n to be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)}`, 
                `expected \n${JSON.stringify(obj)}\n to not be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)}`
            );
        }
	);
}


export { nearly }
