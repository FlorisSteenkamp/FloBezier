
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { getInterfaceCcw } from '../src/simultaneous-properties/get-interface-ccw';
import { splitAt } from '../src/transformation/split-merge-clone/split-at';


describe('get interface ccw', function() {
	it('it should work correctly for a variety of bezier curve pairs', 
	function() {
		{
			// opposite curvature
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[1,2],[3,2]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			// opposite curvature
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[0,2],[3,2]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			// opposite curvature
			let psO = [[3,2],[0,2],[1,1],[0,0]];
			let psI = [[0,0],[1,1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			// Identical quadratic extensions
			let psI = [[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r === 0);
		}

		{
			// Identical quadratic extensions
			let psI = [[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r === 0);
		}

		{
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1],[3,-1.1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1],[3,-0.999999]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			// quadratic extensions
			let psI = [[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1.1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			// quadratic extensions
			let psI = [[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-0.999]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[1,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[-1,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r === 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[-1.00001,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[-0.99999,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[-1-Number.EPSILON,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[-1+Number.EPSILON,-1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			let psI = [[3,1],[2,1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r > 0);
		}

		{
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,1],[3,1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r < 0);
		}

		{
			let psI = [[3,-1],[2,-1],[1,1],[0,0]];
			let psO = [[0,0],[1,1],[2,-1],[3,-1]];
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r === 0);
		}

		{
			let ps = [[3,-1],[2,-1],[1,1],[0,0]];
			let [psI, psO] = splitAt(ps, 0.5);
			let r = getInterfaceCcw(psI, psO);
			//console.log(r);
			assert(r === 0);
		}
	});
});
