
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { bezierBezierIntersection } from '../../../src/index';


describe('intersections', function() {
	it('it should find intersection between two lines', 
	function() {
        let ps1 = [[1,1],[2,2]];
        let ps2 = [[0,1.5],[1.5,0.2]];
        let ts = bezierBezierIntersection(ps1, ps2);
        console.log(ts);
        //assert(r < 0);
    });

    it('it should find intersection between a line and a quadratic', 
	function() {
        let ps1 = [[1,1],[2,2]];
        let ps2 = [[0,1.5],[1.5,0.2], ];
        let ts = bezierBezierIntersection(ps1, ps2);
        console.log(ts);
        //assert(r < 0);
	});
});
