import { expect, describe, it } from '@jest/globals';
import { hausdorffDistanceOneSidedDirect } from '../../../src/simultaneous-properties/hausdorff-distance-direct/hausdorff-distance-direct.js';


/**
 * Pairs that were missed by earlier versions of the MA-interiors root finding
 * (cubic `B`), kept as regression cases (and for visual inspection in the
 * demo). The expected values are from the subdivision reference method.
 */
describe('regression cases (MA-interiors, cubic B)', function() {
    it('nearly parabolic B: s1 + s2 nearly constant along the medial axis', function() {
        // quadratic A, cubic B (random seed 1, case #230); missed by ~5e-4 by
        // every earlier variant: f₀, f₁, f₂ all (nearly) vanish at σ ≈ 1.2014
        const A = [[0.36982339224778116,0.4493983597494662],[0.10370140778832138,0.48362025152891874],[0.6417260940652341,0.1625686187762767]];
        const B = [[0.92983004800044,0.24122152687050402],[0.43340606964193285,0.5740463158581406],[0.6455155066214502,0.6194094310048968],[0.3704653037711978,0.41996993590146303]];

        const r = hausdorffDistanceOneSidedDirect(A, B);
        expect(r.kind).toBe('MA-interiors');
        expect(Math.abs(r.d - 0.24867279312489826)).toBeLessThan(1e-9);
        expect(Math.abs(r.tA - 0.888417124218298)).toBeLessThan(1e-6);
    });

    it('cubic/cubic missed with a too coarse (100 interval) grid (1)', function() {
        // random seed 6, case #44
        const A = [[0.6139574961271137,0.5224035275168717],[0.17812230065464973,0.5139768444932997],[0.9428231921046972,0.3199380503501743],[0.8591797284316272,0.3240538244135678]];
        const B = [[0.997370095923543,0.23232142394408584],[0.5235744153615087,0.7710683587938547],[0.4340233376715332,0.9297401250805706],[0.1891679298132658,0.14060772117227316]];

        const r = hausdorffDistanceOneSidedDirect(A, B);
        expect(r.kind).toBe('MA-interiors');
        expect(Math.abs(r.d - 0.19993395501368752)).toBeLessThan(1e-9);
        expect(Math.abs(r.tA - 0.3724986094562367)).toBeLessThan(1e-6);
    });

    it('cubic/cubic missed with a too coarse (100 interval) grid (2)', function() {
        // random seed 8, case #77
        const A = [[0.8918377568479627,0.9354918224271387],[0.3798962691798806,0.9143064124509692],[0.7890373230911791,0.5822024170774966],[0.4065735819749534,0.19051514752209187]];
        const B = [[0.5216995794326067,0.2143124600406736],[0.9614426766056567,0.7723531541414559],[0.9743195185437799,0.9049636730924249],[0.4335475764237344,0.731387484120205]];

        const r = hausdorffDistanceOneSidedDirect(A, B);
        expect(r.kind).toBe('MA-interiors');
        expect(Math.abs(r.d - 0.17203397550690386)).toBeLessThan(1e-9);
        expect(Math.abs(r.tA - 0.6172512358574567)).toBeLessThan(1e-6);
    });
});
