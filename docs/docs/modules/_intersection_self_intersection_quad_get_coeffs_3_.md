---
id: "_intersection_self_intersection_quad_get_coeffs_3_"
title: "intersection/self-intersection/quad/get-coeffs-3"
sidebar_label: "intersection/self-intersection/quad/get-coeffs-3"
---

[flo-bezier3](../globals.md) › ["intersection/self-intersection/quad/get-coeffs-3"](_intersection_self_intersection_quad_get_coeffs_3_.md)

## Index

### Variables

* [abs](_intersection_self_intersection_quad_get_coeffs_3_.md#const-abs)
* [qaq](_intersection_self_intersection_quad_get_coeffs_3_.md#const-qaq)
* [qdq](_intersection_self_intersection_quad_get_coeffs_3_.md#const-qdq)
* [qmq](_intersection_self_intersection_quad_get_coeffs_3_.md#const-qmq)
* [tp](_intersection_self_intersection_quad_get_coeffs_3_.md#const-tp)

### Functions

* [getCoeffs3Quad](_intersection_self_intersection_quad_get_coeffs_3_.md#getcoeffs3quad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L13)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L10)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L11)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L9)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L8)*

## Functions

###  getCoeffs3Quad

▸ **getCoeffs3Quad**(`ps`: number[][]): *object*

*Defined in [src/intersection/self-intersection/quad/get-coeffs-3.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/quad/get-coeffs-3.ts#L20)*

Get self-intersection coefficients
* **precondition**: max bit-aligned bitlength: 47

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *object*

* **coeffs**: *number[][]* = [u2, u1, u0]

* **errBound**: *number[]* = [u2_, u1_, u0_].map(c => γγ3*c)
