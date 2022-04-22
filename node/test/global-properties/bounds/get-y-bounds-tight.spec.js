/// <reference path="../../chai-extensions.d.ts" />
import { expect, use } from 'chai';
import { describe } from 'mocha';
import { getYBoundsTight } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { reverseYBoundTs } from '../../helpers/reverse-bound-ts.js';
use(nearly);
describe('getYBoundsTight', function () {
    it('it should find correct y bounds for some lines', function () {
        const ps = getRandomLine(0);
        const r = getYBoundsTight(ps);
        const rR = getYBoundsTight(ps.slice().reverse());
        const expected = {
            minY: {
                ts: [0, 0],
                box: [
                    [-108.49686506776892, -13.011161175008596],
                    [-108.49686506776892, -13.011161175008596]
                ]
            },
            maxY: {
                ts: [1, 1],
                box: [
                    [-12.996895177132615, -6.992694835578803],
                    [-12.996895177132615, -6.992694835578803]
                ]
            }
        };
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(r).to.be.nearly(2 ** 6, expected);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(rR).to.be.nearly(2 ** 6, reverseYBoundTs(expected));
    });
    it('it should find correct y bounds for some quadratic bezier curves', function () {
        const ps = getRandomQuad(0);
        const r = getYBoundsTight(ps);
        const rR = getYBoundsTight(ps.slice().reverse());
        const expected = {
            minY: {
                ts: [0, 0],
                box: [
                    [-108.49686506776892, -13.011161175008596],
                    [-108.49686506776892, -13.011161175008596]
                ]
            },
            maxY: {
                ts: [1, 1],
                box: [
                    [-19.608964715212537, 52.32750125849648],
                    [-19.608964715212537, 52.32750125849648]
                ]
            }
        };
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(r).to.be.nearly(2 ** 6, expected);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(rR).to.be.nearly(2 ** 6, reverseYBoundTs(expected));
    });
    it('it should find correct y bounds for some cubic bezier curves', function () {
        const ps = getRandomCubic(0);
        const r = getYBoundsTight(ps);
        const rR = getYBoundsTight(ps.slice().reverse());
        const expected = {
            minY: {
                ts: [1, 1],
                box: [
                    [124.76385737178956, -112.1975403532909],
                    [124.76385737178956, -112.1975403532909]
                ]
            },
            maxY: {
                ts: [0.4346118970470492, 0.43461189704704944],
                box: [
                    [-21.066235294129285, 2.288263506433213],
                    [-21.06623529412848, 2.2882635064334345]
                ]
            }
        };
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(r).to.be.nearly(2 ** 8, expected);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(rR).to.be.nearly(2 ** 12, reverseYBoundTs(expected));
    });
});
//# sourceMappingURL=get-y-bounds-tight.spec.js.map