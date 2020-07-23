---
id: "_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_"
title: "intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit"
sidebar_label: "intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit"](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#const-abs)
* [coeffFunctionsExact](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#const-coefffunctionsexact)
* [coeffFunctionsQuad](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#const-coefffunctionsquad)
* [eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)

### Functions

* [bezierBezierIntersectionImplicit](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#bezierbezierintersectionimplicit)
* [getIntersectionCoeffs](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#getintersectioncoeffs)
* [getOtherTs](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#getotherts)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:33](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L33)*

___

### `Const` coeffFunctionsExact

• **coeffFunctionsExact**: *[getCoeffs1x1Exact_](_intersection_bezier_intersection_implicit_exact_get_coefficients_1x1__.md#getcoeffs1x1exact_)[][]* = [
    [getCoeffs1x1Exact_, getCoeffs1x2Exact_, getCoeffs1x3Exact_],
    [getCoeffs2x1Exact_, getCoeffs2x2Exact_, getCoeffs2x3Exact_],
    [getCoeffs3x1Exact_, getCoeffs3x2Exact_, getCoeffs3x3Exact_]
]

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:39](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L39)*

___

### `Const` coeffFunctionsQuad

• **coeffFunctionsQuad**: *[getCoeffs1x1Quad](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_.md#getcoeffs1x1quad)[][]* = [
    [getCoeffs1x1Quad, getCoeffs1x2Quad, getCoeffs1x3Quad],
    [getCoeffs2x1Quad, getCoeffs2x2Quad, getCoeffs2x3Quad],
    [getCoeffs3x1Quad, getCoeffs3x2Quad, getCoeffs3x3Quad]
]

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:34](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L34)*

___

###  eSign

• **eSign**: *[eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)*

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:29](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L29)*

## Functions

###  bezierBezierIntersectionImplicit

▸ **bezierBezierIntersectionImplicit**(`ps1`: number[][], `ps2`: number[][]): *RootInterval[]*

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:119](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L119)*

Returns the intersection between two linear, quadratic or cubic bezier curves
in any combination.
* Returns **undefined** only in the case that the two beziers are in the same
k-family.
* The second bezier's t values are retuned. Call getOtherTs to get the first
bezier's t values.
* this algorithm is nearly always accurate to 1 u in the t values for the **second**
bezier (except if there are several extremely close intersections) and
a few u accurate for the second t values.
* Before calling this function, ensure the two given beziers are really cubic
or quadratic if given as such (check with isReallyQuadratic), else convert
them (cubics can be converted with toQuadraticFromCubic)
See http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *RootInterval[]*

___

###  getIntersectionCoeffs

▸ **getIntersectionCoeffs**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:54](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L54)*

Returns the intersection polynomial coefficients between two bezier curves
unless all coefficients are exactly zero in which case undefined is returned
so that is easy to check if the two curves are actually identical
algebraically, i.e. if we ignore endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | - |
`ps2` | number[][] |   |

**Returns:** *object*

* **coeffs**: *number[][]*

* **errBound**: *number[]*

* **getPsExact**(): *function*

  * (): *number[][][]*

___

###  getOtherTs

▸ **getOtherTs**(`ps1`: number[][], `ps2`: number[][], `ts2`: RootInterval[]): *[X](../interfaces/_intersection_bezier_intersection_implicit_x_.x.md)[][]*

*Defined in [src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts:142](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit.ts#L142)*

Returns the ordered (first ps1, then ps2) intersection pairs given the two
curves that intersect and the t values of the **second** curve. If the t
values given is undefined, undefined is returned; if it is an empty array,
an empty array is returned. If the t values given is not an empty array and
it turns out the curves are in the same k family then undefined is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | the first bezier |
`ps2` | number[][] | the second bezier |
`ts2` | RootInterval[] | the t values of the second bezier  |

**Returns:** *[X](../interfaces/_intersection_bezier_intersection_implicit_x_.x.md)[][]*
