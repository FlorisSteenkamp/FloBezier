---
id: "_intersection_bezier_intersection_implicit_quad_get_coefficients_1x2_"
title: "intersection/bezier-intersection-implicit/quad/get-coefficients-1x2"
sidebar_label: "intersection/bezier-intersection-implicit/quad/get-coefficients-1x2"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/quad/get-coefficients-1x2"](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x2_.md)

## Index

### Variables

* [qaq](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x2_.md#const-qaq)
* [tp](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x2_.md#const-tp)

### Functions

* [getCoeffs1x2Quad](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x2_.md#getcoeffs1x2quad)

## Variables

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts#L8)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts#L7)*

## Functions

###  getCoeffs1x2Quad

▸ **getCoeffs1x2Quad**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x2.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[][]* = [v2, v1, v0]

* **errBound**: *number[]* = [0, 0, 0]
