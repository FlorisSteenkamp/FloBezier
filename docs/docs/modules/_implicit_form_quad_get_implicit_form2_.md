---
id: "_implicit_form_quad_get_implicit_form2_"
title: "implicit-form/quad/get-implicit-form2"
sidebar_label: "implicit-form/quad/get-implicit-form2"
---

[flo-bezier3](../globals.md) › ["implicit-form/quad/get-implicit-form2"](_implicit_form_quad_get_implicit_form2_.md)

## Index

### Variables

* [abs](_implicit_form_quad_get_implicit_form2_.md#const-abs)
* [qdq](_implicit_form_quad_get_implicit_form2_.md#const-qdq)
* [qm2](_implicit_form_quad_get_implicit_form2_.md#const-qm2)
* [qmd](_implicit_form_quad_get_implicit_form2_.md#const-qmd)
* [qmq](_implicit_form_quad_get_implicit_form2_.md#const-qmq)
* [qno](_implicit_form_quad_get_implicit_form2_.md#const-qno)
* [tp](_implicit_form_quad_get_implicit_form2_.md#const-tp)

### Functions

* [getImplicitForm2Quad](_implicit_form_quad_get_implicit_form2_.md#getimplicitform2quad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L15)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L13)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L9)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L11)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L12)*

___

### `Const` qno

• **qno**: *ddNegativeOf* = ddNegativeOf

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L8)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L7)*

## Functions

###  getImplicitForm2Quad

▸ **getImplicitForm2Quad**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/quad/get-implicit-form2.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form2.ts#L25)*

Returns an approximate (quad precision) implicit form of the given quadratic
bezier and a coefficientwise error bound.
* Adapted from http://www.mare.ee/indrek/misc/2d.pdf
* precondition: the input coefficients must be 47-bit-aligned

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* ### **coeffs**: *object*

  * **v**: *number[]*

  * **vᵧ**: *number[]*

  * **vᵧᵧ**: *number[]*

  * **vₓ**: *number[]*

  * **vₓᵧ**: *number[]*

  * **vₓₓ**: *number[]*

* ### **errorBound**: *object*

  * **v_**: *number*

  * **vᵧ_**: *number*

  * **vₓ_**: *number*
