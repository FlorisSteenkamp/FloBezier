import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { fitQuadsToCubic } from "../../src/index.js";

use(nearly);

describe('fitQuadsToCubic', function() {
	it('it should approximate the given cubic bezier curve to within a given tolerance to ordered piecewise quadratic bezier curves',
	function() {
		{
			//[[88.6401864794642, -105.98771762335389],
			// [-2.9911163754275094, -46.119759242543864],
			// [-68.07973490750408, 52.16096196793046],
			// [119.30512273109173, 88.9937301783342]]
			const ps = getRandomCubic(0);
			const r = fitQuadsToCubic(ps, 1);
			
			expect(r.length).to.eql(7);

			expect(r).to.be.nearly(2**10, [ 
				[[88.6401864794642, -105.98771762335387],
				 [53.39590575322413, -83.14715230934023],
				 [28.42363127144603, -55.44467949202393]],
				[[28.42363127144603, -55.44467949202393],
				 [16.26844733892788, -41.739723428819495],
				 [8.66698481775052, -27.69697256251167]],
				[[8.66698481775052, -27.69697256251167],
				 [1.065522296573162, -13.654221696203852],
				 [-0.6584055797798598, 0.14120259139248503]],
				[[-0.6584055797798598, 0.14120259139248503],
				 [-2.3823334561328817, 13.936626878988845],
				 [3.0950865458219923, 26.89960320605888]],
				[[3.0950865458219923, 26.89960320605888],
				 [8.572506547776888, 39.86257953312891],
				 [22.575087661523185, 51.407986517857765]],
				[[22.575087661523185, 51.407986517857765],
				 [36.5776687752695, 62.95339350258663],
				 [60.42922423429073, 72.49610976315942]],
				[[60.42922423429073, 72.49610976315942],
				 [84.28077969331197, 82.03882602373228],
				 [119.30512273109173, 88.99373017833423]]
			]);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = fitQuadsToCubic(ps, 1);

			expect(r_.length).to.eql(r.length);
		}
	});
});
