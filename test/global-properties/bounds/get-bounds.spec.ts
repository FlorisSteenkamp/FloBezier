/// <reference path="../../chai-extensions.d.ts" />
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getBounds } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';


use(nearly);


describe('getBounds', function() {
	it('it should find correct bounds for some lines', 
	function() {
		const ps = getRandomLine(0);
		const r = getBounds(ps);
		// @ts-ignore - otherwise TypeScript gives an error on nearly
		expect(r).to.be.nearly(2**6, { 
			ts:[[0,0],[1,1]],
			box: [
				[-108.49686506776892, -13.011161175008596],
				[-12.996895177132615, -6.992694835578803]
			]
		});
	});

	it('it should find correct bounds for some quadratic bezier curves', 
	function() {
		const ps = getRandomQuad(0);
		const r = getBounds(ps);
		// @ts-ignore - otherwise TypeScript gives an error on nearly
		expect(r).to.be.nearly(2**6, { 
			ts: [[0,0],[0.9352469152993877,1]],
  			box: [
				[-108.49686506776892, -13.011161175008596],
     			[-19.18081281636691, 52.32750125849648]
			]
		});
	});

    it('it should find correct bounds for some cubic bezier curves', 
	function() {
		const ps = getRandomCubic(0);
		const r = getBounds(ps);

		// @ts-ignore - otherwise TypeScript gives an error on nearly
		expect(r).to.be.nearly(2**6, { 
			ts: [[0, 1], [1, 0.43461189704704933]],
			box: [ 
				[-108.49686506776892, -112.1975403532909],
     			[124.76385737178956, 2.2882635064333186]
			] 
		});
	});
});
