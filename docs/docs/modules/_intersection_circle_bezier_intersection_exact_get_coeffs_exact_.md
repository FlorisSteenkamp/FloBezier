---
id: "_intersection_circle_bezier_intersection_exact_get_coeffs_exact_"
title: "intersection/circle-bezier-intersection/exact/get-coeffs-exact"
sidebar_label: "intersection/circle-bezier-intersection/exact/get-coeffs-exact"
---

[flo-bezier3](../globals.md) › ["intersection/circle-bezier-intersection/exact/get-coeffs-exact"](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md)

## Index

### Variables

* [eCalculate](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#ecalculate)
* [scaleExpansion](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#scaleexpansion)
* [twoProduct](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#twoproduct)

### Functions

* [getCoeffsCubicExact](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#getcoeffscubicexact)
* [getCoeffsLinearExact](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#getcoeffslinearexact)
* [getCoeffsQuadraticExact](_intersection_circle_bezier_intersection_exact_get_coeffs_exact_.md#getcoeffsquadraticexact)

## Variables

###  eCalculate

• **eCalculate**: *[eCalculate](_implicit_form_exact_get_implicit_form3_.md#ecalculate)*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L8)*

___

###  scaleExpansion

• **scaleExpansion**: *[scaleExpansion](_intersection_bezier_intersection_implicit_inversion_old_.md#scaleexpansion)*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L8)*

___

###  twoProduct

• **twoProduct**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L8)*

## Functions

###  getCoeffsCubicExact

▸ **getCoeffsCubicExact**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L16)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a cubic bezier curve

**Returns:** *number[][]*

___

###  getCoeffsLinearExact

▸ **getCoeffsLinearExact**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:119](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L119)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a linear bezier curve

**Returns:** *number[][]*

___

###  getCoeffsQuadraticExact

▸ **getCoeffsQuadraticExact**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts:73](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/exact/get-coeffs-exact.ts#L73)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a quadratic bezier curve

**Returns:** *number[][]*
