---
id: "_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_"
title: "intersection/bezier-intersection-implicit/quad/get-coefficients-2x2"
sidebar_label: "intersection/bezier-intersection-implicit/quad/get-coefficients-2x2"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/quad/get-coefficients-2x2"](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-abs)
* [qaq](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-qaq)
* [qm2](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-qm2)
* [qmd](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-qmd)
* [qmq](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-qmq)
* [tp](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#const-tp)

### Functions

* [getCoeffs2x2Quad](_intersection_bezier_intersection_implicit_quad_get_coefficients_2x2_.md#getcoeffs2x2quad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L14)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L12)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L9)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L10)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L11)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L8)*

## Functions

###  getCoeffs2x2Quad

▸ **getCoeffs2x2Quad**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-2x2.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[][]* = [v4, v3, v2, v1, v0]

* **errBound**: *number[]* = [v4_, v3_, v2_, v1_, v0_].map(c => γγ3*c)
