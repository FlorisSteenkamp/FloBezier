---
id: "_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_"
title: "intersection/bezier-intersection-implicit/quad/get-coefficients-1x1"
sidebar_label: "intersection/bezier-intersection-implicit/quad/get-coefficients-1x1"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/quad/get-coefficients-1x1"](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_.md)

## Index

### Variables

* [qaq](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_.md#const-qaq)
* [tp](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_.md#const-tp)

### Functions

* [getCoeffs1x1Quad](_intersection_bezier_intersection_implicit_quad_get_coefficients_1x1_.md#getcoeffs1x1quad)

## Variables

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts#L8)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts#L7)*

## Functions

###  getCoeffs1x1Quad

▸ **getCoeffs1x1Quad**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-1x1.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[][]* = [v1, v0]

* **errBound**: *number[]* = [0, 0]
