---
id: "_intersection_circle_bezier_intersection_quad_get_coeffs_quad_"
title: "intersection/circle-bezier-intersection/quad/get-coeffs-quad"
sidebar_label: "intersection/circle-bezier-intersection/quad/get-coeffs-quad"
---

[flo-bezier3](../globals.md) › ["intersection/circle-bezier-intersection/quad/get-coeffs-quad"](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md)

## Index

### Variables

* [qaq](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#const-qaq)
* [qdifq](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#const-qdifq)
* [qm2](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#const-qm2)
* [qmn2](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#const-qmn2)
* [tp](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#const-tp)

### Functions

* [getCoeffsCubicQuad](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#getcoeffscubicquad)
* [getCoeffsLinearQuad](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#getcoeffslinearquad)
* [getCoeffsQuadraticQuad](_intersection_circle_bezier_intersection_quad_get_coeffs_quad_.md#getcoeffsquadraticquad)

## Variables

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L7)*

___

### `Const` qdifq

• **qdifq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L10)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L8)*

___

### `Const` qmn2

• **qmn2**: *ddMultByNeg2* = ddMultByNeg2

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L9)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L6)*

## Functions

###  getCoeffsCubicQuad

▸ **getCoeffsCubicQuad**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L18)*

* **precondition** bit-algined bitlength of coefficients <= 47

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

###  getCoeffsLinearQuad

▸ **getCoeffsLinearQuad**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:90](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L90)*

* **precondition** bit-algined bitlength of coefficients <= 47

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

###  getCoeffsQuadraticQuad

▸ **getCoeffsQuadraticQuad**(`circle`: object, `ps`: number[][]): *number[][]*

*Defined in [src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts:59](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/quad/get-coeffs-quad.ts#L59)*

* **precondition** bit-algined bitlength of coefficients <= 47

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
