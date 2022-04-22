/// <reference path="../../chai-extensions.d.ts" />
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getXBoundsTight } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { reverseXBoundTs } from '../../helpers/reverse-bound-ts.js';


use(nearly);


describe('getXBoundsTight', function() {
	it('it should find correct x bounds for some lines', 
	function() {
		const ps = getRandomLine(0);
		const r = getXBoundsTight(ps);
        const rR = getXBoundsTight(ps.slice().reverse());

        const expected = {
			minX: {
                ts: [0,0],
                box: [
                    [-108.49686506776892,-13.011161175008596],
                    [-108.49686506776892,-13.011161175008596]
                ]
            },
            maxX: {
                ts: [1,1],
                box: [
                    [-12.996895177132615,-6.992694835578803],
                    [-12.996895177132615,-6.992694835578803]
                ]
            }
		};

        // @ts-ignore - otherwise TypeScript gives an error on nearly
		expect(r).to.be.nearly(2**6, expected);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(rR).to.be.nearly(2**6, reverseXBoundTs(expected));
	});

    it('it should find correct x bounds for some quadratic bezier curves', 
	function() {
		const ps = getRandomQuad(0);
		const r = getXBoundsTight(ps);
        const rR = getXBoundsTight(ps.slice().reverse());

        const expected = {
            minX: { 
                ts: [0,0],
                box: [
                    [-108.49686506776892,-13.011161175008596],
                    [-108.49686506776892,-13.011161175008596]
                ]
            },
            maxX: { 
                ts: [0.9352469152993876,0.9352469152993879],
                box: [
                    [-19.180812816367187, 44.86866202045913],
                    [-19.180812816366647, 44.8686620204593]
                ]
            }
        };

        // @ts-ignore - otherwise TypeScript gives an error on nearly
		expect(r).to.be.nearly(2**6, expected);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(rR).to.be.nearly(2**6, reverseXBoundTs(expected));
	});

    it('it should find correct x bounds for some cubic bezier curves', 
	function() {
        {
            const ps = getRandomCubic(0);
            const r = getXBoundsTight(ps);
            const rR = getXBoundsTight(ps.slice().reverse());

            const expected = { 
                minX: { 
                    ts: [0,0],
                    box: [
                        [-108.49686506776892,-13.011161175008596],
                        [-108.49686506776892,-13.011161175008596]
                    ]
                },
                maxX: { 
                    ts: [1,1],
                    box: [
                        [124.76385737178956,-112.1975403532909],
                        [124.76385737178956,-112.1975403532909]
                    ]
                }
            };

            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2**6, expected);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rR).to.be.nearly(2**6, reverseXBoundTs(expected));
        }
        {
            const ps = [[0,0],[-1,1],[-1,2],[0,3]];
            const r = getXBoundsTight(ps);

            const expected = { 
                minX: { 
                    ts: [0.5,0.5],
                    box: [[-0.75,1.5],[-0.75,1.5]]
                },
                maxX: { ts: [0,0], box: [[0,0],[0,0]] }
            };

            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2**6, expected);
        }
	});
});
