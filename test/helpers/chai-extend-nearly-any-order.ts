/// <reference path="../chai-extensions.d.ts" />
import { closeTo } from "./close-to.js";
import { ObjOrArray } from "./obj-or-array.js";


const nearlyAnyOrder: Chai.ChaiPlugin = (chai, utils) => {
	var Assertion = chai.Assertion;
  
	utils.addMethod(Assertion.prototype, 'nearlyAnyOrder', 
		function(ulpsOrEps: number | number[], value: ObjOrArray<number>[]) {
            const obj = this._obj as ObjOrArray<number>[];

            let isUlps = !Array.isArray(ulpsOrEps);

            this.assert(obj.length === value.length, 'array lengths must be equal');

            for (let i=0; i<obj.length; i++) {
                let found = false;
                for (let j=0; j<value.length; j++) {
                    if (closeTo(ulpsOrEps)(obj[i], value[j])) {
                        found = true;
                        break;
                    }
                }

                this.assert(
                    found,
                    `expected \n${JSON.stringify(obj)}\n to be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)} (any order)`,
                    `expected \n${JSON.stringify(obj)}\n to not be nearly (${ulpsOrEps} ${isUlps ? 'ulps' : 'eps'}) \n${JSON.stringify(value)} (any order)`
                );
            }
        }
	);
}


export { nearlyAnyOrder }
