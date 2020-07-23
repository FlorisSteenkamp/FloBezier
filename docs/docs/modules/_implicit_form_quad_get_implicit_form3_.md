---
id: "_implicit_form_quad_get_implicit_form3_"
title: "implicit-form/quad/get-implicit-form3"
sidebar_label: "implicit-form/quad/get-implicit-form3"
---

[flo-bezier3](../globals.md) › ["implicit-form/quad/get-implicit-form3"](_implicit_form_quad_get_implicit_form3_.md)

## Index

### Variables

* [abs](_implicit_form_quad_get_implicit_form3_.md#const-abs)
* [qaq](_implicit_form_quad_get_implicit_form3_.md#const-qaq)
* [qd2](_implicit_form_quad_get_implicit_form3_.md#const-qd2)
* [qdq](_implicit_form_quad_get_implicit_form3_.md#const-qdq)
* [qm2](_implicit_form_quad_get_implicit_form3_.md#const-qm2)
* [qmd](_implicit_form_quad_get_implicit_form3_.md#const-qmd)
* [qmq](_implicit_form_quad_get_implicit_form3_.md#const-qmq)
* [qno](_implicit_form_quad_get_implicit_form3_.md#const-qno)
* [tp](_implicit_form_quad_get_implicit_form3_.md#const-tp)

### Functions

* [getImplicitForm3Quad](_implicit_form_quad_get_implicit_form3_.md#getimplicitform3quad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L9)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L19)*

___

### `Const` qd2

• **qd2**: *ddDivBy2* = ddDivBy2

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L14)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L18)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L13)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L16)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L17)*

___

### `Const` qno

• **qno**: *ddNegativeOf* = ddNegativeOf

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L12)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L11)*

## Functions

###  getImplicitForm3Quad

▸ **getImplicitForm3Quad**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/quad/get-implicit-form3.ts:31](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form3.ts#L31)*

Returns an approximate (quad precision) implicit form of the given cubic
bezier and a coefficientwise error bound.
* **precondition**: the input coefficients must be 47-bit-aligned
* takes about 15 micro-seconds on a 1st gen i7 and Chrome 79

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *object*

* ### **coeffs**: *object*

  * **v**: *number[]*

  * **vᵧ**: *number[]*

  * **vᵧᵧ**: *number[]*

  * **vᵧᵧᵧ**: *number[]*

  * **vₓ**: *number[]*

  * **vₓᵧ**: *number[]*

  * **vₓᵧᵧ**: *number[]*

  * **vₓₓ**: *number[]*

  * **vₓₓᵧ**: *number[]*

  * **vₓₓₓ**: *number[]*

* ### **errorBound**: *object*

  * **v_**: *number*

  * **vᵧ_**: *number*

  * **vᵧᵧ_**: *number*

  * **vᵧᵧᵧ_**: *number*

  * **vₓ_**: *number*

  * **vₓᵧ_**: *number*

  * **vₓᵧᵧ_**: *number*

  * **vₓₓ_**: *number*

  * **vₓₓᵧ_**: *number*

  * **vₓₓₓ_**: *number*
