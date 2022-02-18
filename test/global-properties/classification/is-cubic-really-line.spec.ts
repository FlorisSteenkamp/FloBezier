import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { evalDeCasteljau, isCollinear, isCubicReallyLine, toCubic } from '../../../src/index.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const eps = Number.EPSILON;
const u = eps/2;


function getLineCubic(seed: number) {
	const _ps = getRandomBezier(128, 52)(1)(seed);
    return toCubic(_ps.map(p => p.map(c => 3*c)));
}


describe('isCubicReallyLine', function() {
    it('it should correctly check that some cubic beziers really is a line in disguise or not', 
	function() {
        {
		    const ps = [[1,1],[2,2],[4,4],[8.5,8.5]];
            expect(isCubicReallyLine(ps)).to.be.false;
        }
        {
            const ps = [[1,1],[2,2],[4,4],[3,3]];
            expect(isCubicReallyLine(ps)).to.be.false;
        }
        {
            // a point is also a line
            const ps = [[3,3],[3,3],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).to.be.true;
        }
        {
            const ps = [[1,1],[1,1],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).to.be.true;
            //evalDeCasteljau(ps,0)[0]   //=> 1
            //evalDeCasteljau(ps,0.5)[0] //=> 2
            //evalDeCasteljau(ps,1)[0]   //=> 3
        }
        {
            // collinear but not a line
            const ps = [[1,1],[3,3],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).to.be.false;
            //evalDeCasteljau(ps,0)[0]   //=> 1
            //evalDeCasteljau(ps,0.5)[0] //=> 2.75
            //evalDeCasteljau(ps,1)[0]   //=> 3
        }
        {
            const ps = getLineCubic(0);
            expect(isCollinear(ps)).to.be.true;
            expect(isCubicReallyLine(ps)).to.be.true;
            //evalDeCasteljau(ps,0)[0]    //=> -325.4905952033067
            //evalDeCasteljau(ps,0.5)[0]  //=> -182.24064036735228
            //evalDeCasteljau(ps,1)[0]    //=> -38.990685531397844
            //-325.4905952033067 - -182.24064036735228;  //=> -143.24995483595444
            //-182.24064036735228 - -38.990685531397844  //=> -143.24995483595444
        }
	});
});
