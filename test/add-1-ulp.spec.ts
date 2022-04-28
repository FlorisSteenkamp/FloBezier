import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { add1Ulp } from '../src/add-1-ulp.js';


describe('add1Ulp', function() {
    it('should add one unit in the last place (ulp) to some floating point numbers', 
	function() {
        // some randomish small number (positive)
        {
            const n = 1.2668322421994934e-286;
            const r = 1.2668322421994936e-286;
            expect(add1Ulp(n)).to.eql(r);
        }

        // some randomish large number (positive)
        {
            const n = 2.2773756248199694e+22;
            const r = 2.27737562481997e+22;
            expect(add1Ulp(n)).to.eql(r);
        }

        // some randomish small number (negative)
        {
            const n = -1.2668322421994934e-286;
            const r = -1.2668322421994932e-286;
            expect(add1Ulp(n)).to.eql(r);
        }

        // some randomish large number (negative)
        {
            const n = -2.2773756248199694e+22;
            const r = -2.277375624819969e+22;
            expect(add1Ulp(n)).to.eql(r);
        }

        // zero
        {
            const n = 0;
            const r = 0;
            expect(add1Ulp(n)).to.eql(r);
        }

        // edge case on positive power transition (positive number)
        {
            const n = 32;
            const r = 32.00000000000001;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps before positive power transition (positive number)
        {
            const n = 31.999999999999996;
            const r = 32;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps after positive power transition (positive number)
        {
            const n = 32.00000000000001;
            const r = 32.000000000000014;
            expect(add1Ulp(n)).to.eql(r);
        }

        // edge case on negative power transition (positive number)
        {
            const n = 0.03125;
            const r = 0.03125000000000001;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps before negative power transition (positive number)
        {
            const n = 0.031249999999999997;
            const r = 0.03125;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps after negative power transition (positive number)
        {
            const n = 0.03125000000000001;
            const r = 0.031250000000000014;
            expect(add1Ulp(n)).to.eql(r);
        }

        // edge case on positive power transition (negative number)
        {
            const n = -32;
            const r = -31.999999999999996;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps before positive power transition (negative number)
        {
            const n = -31.999999999999996;
            const r = -31.999999999999993;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps after positive power transition (negative number)
        {
            const n = -32.00000000000001;
            const r = -32;
            expect(add1Ulp(n)).to.eql(r);
        }

        // edge case on negative power transition (negative number)
        {
            const n = -0.03125;
            const r = -0.031249999999999997;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps before negative power transition (negative number)
        {
            const n = -0.031249999999999997;
            const r = -0.031249999999999993;
            expect(add1Ulp(n)).to.eql(r);
        }
        // edge case 1 ulps after negative power transition (negative number)
        {
            const n = -0.03125000000000001;
            const r = -0.03125;
            expect(add1Ulp(n)).to.eql(r);
        }

        // max value
        {
            const n = 1.7976931348623157e+308;
            const r = Number.POSITIVE_INFINITY;
            expect(add1Ulp(n)).to.eql(r);
        }

        // negative max value
        {
            const n = -1.7976931348623157e+308;
            const r = -1.7976931348623155e+308;
            expect(add1Ulp(n)).to.eql(r);
        }


        //-----------------------
        // Subnormals - positive
        // Note: subnormals should be returned unaltered
        //-----------------------

        // smallest normal (positive)
        {
            const n = 2.2250738585072014e-308;
            const r = 2.225073858507202e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // max subnormal (positive)
        {
            const n = 2.225073858507201e-308;
            const r = 2.225073858507201e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // 2nd largest subnormal (positive)
        {
            const n = 2.2250738585072004e-308;
            const r = 2.2250738585072004e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // some randomish subnormal (positive)
        {
            const n = 1.2250738585072005e-308;
            const r = 1.2250738585072005e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // min value (positive)
        {
            const n = 5e-324;
            const r = 5e-324;
            expect(add1Ulp(n)).to.eql(r);
        }
        // 2nd smallest value (positive)
        {
            const n = 1e-323;
            const r = 1e-323;
            expect(add1Ulp(n)).to.eql(r);
        }


        //-----------------------
        // Subnormals - negative
        // Note: subnormals should be returned unaltered
        //-----------------------

        // smallest normal (negative)
        {
            const n = -2.2250738585072014e-308;
            const r = -2.225073858507201e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // max subnormal (negative)
        {
            const n = -2.225073858507201e-308;
            const r = -2.225073858507201e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // 2nd largest subnormal (negative)
        {
            const n = -2.2250738585072004e-308;
            const r = -2.2250738585072004e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // some randomish subnormal (negative)
        {
            const n = -1.2250738585072005e-308;
            const r = -1.2250738585072005e-308;
            expect(add1Ulp(n)).to.eql(r);
        }
        // min value (negative)
        {
            const n = -5e-324;
            const r = -5e-324;
            expect(add1Ulp(n)).to.eql(r);
        }
        // 2nd smallest value (negative)
        {
            const n = -1e-323;
            const r = -1e-323;
            expect(add1Ulp(n)).to.eql(r);
        }
    });
});
