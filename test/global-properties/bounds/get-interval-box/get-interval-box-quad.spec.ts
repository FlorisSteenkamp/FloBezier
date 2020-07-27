
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { qAddDouble } from 'flo-numerical';
import { getIntervalBox, getIntervalBoxQuad } from '../../../../src/index';


const eps = Number.EPSILON;

//console.log(qDivDouble([0,1],10));
// closer to 0.1 than [0,0.1]
let one_over_10 = [-5.551115123125783e-18,0.1]; 

//console.log(qDivDouble([0,1],3));
// closer to 1/3 than [0,0.3333333333333333]
let one_over_3  = [ 1.850371707708594e-17, 0.3333333333333333 ] 


describe('interval box', function() {
	it('it should interval box', 
	function() {
		{
			let ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			//let ps = [[0,0],[1,1],[1,2],[3,2]];
			//let ps = [[3,-1],[2,-1],[1,1]];
			//let ps = [[0,0],[1,1],[1.54,2]];
			//let ps = [[3.33,-1.1221],[2.542234,-1]];
			//let ps = [[1.1111,1.2222],[1.54,2]];
           
			let delta = eps * 2**-20;

			let i = [
                one_over_3, 
                qAddDouble(one_over_3,delta)
            ];
			
			let r2 = getIntervalBoxQuad(ps, i);
			
			console.log('interval box quad', r2);
		}
	});
});
