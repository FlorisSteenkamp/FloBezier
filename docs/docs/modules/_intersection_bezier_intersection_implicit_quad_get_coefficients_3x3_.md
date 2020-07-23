---
id: "_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_"
title: "intersection/bezier-intersection-implicit/quad/get-coefficients-3x3"
sidebar_label: "intersection/bezier-intersection-implicit/quad/get-coefficients-3x3"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/quad/get-coefficients-3x3"](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#let-abs)
* [qaq](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#const-qaq)
* [qm2](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#const-qm2)
* [qmd](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#const-qmd)
* [qmq](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#const-qmq)
* [tp](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#const-tp)

### Functions

* [getCoeffs3x3Quad](_intersection_bezier_intersection_implicit_quad_get_coefficients_3x3_.md#getcoeffs3x3quad)

## Variables

### `Let` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L14)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L12)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L9)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L10)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L11)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L8)*

## Functions

###  getCoeffs3x3Quad

▸ **getCoeffs3x3Quad**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/quad/get-coefficients-3x3.ts#L25)*

* the returned errors still need to be multiplied by 3*γ1*γ1
* precondition: 53-4-2 === 47-bit bit-aligned coefficient bitlength (this is
to improve speed considerably due to simpler error bound calculations)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | - |
`ps2` | number[][] |   |

**Returns:** *object*

* **coeffs**: *number[][]* = [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0]

* **errBound**: *number[]* = [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γγ3*c)
