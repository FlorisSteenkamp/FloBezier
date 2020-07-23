---
id: "_implicit_form_quad_get_implicit_form1_"
title: "implicit-form/quad/get-implicit-form1"
sidebar_label: "implicit-form/quad/get-implicit-form1"
---

[flo-bezier3](../globals.md) › ["implicit-form/quad/get-implicit-form1"](_implicit_form_quad_get_implicit_form1_.md)

## Index

### Variables

* [qdq](_implicit_form_quad_get_implicit_form1_.md#const-qdq)
* [tp](_implicit_form_quad_get_implicit_form1_.md#const-tp)

### Functions

* [getImplicitForm1Quad](_implicit_form_quad_get_implicit_form1_.md#getimplicitform1quad)

## Variables

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/quad/get-implicit-form1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form1.ts#L7)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/quad/get-implicit-form1.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form1.ts#L6)*

## Functions

###  getImplicitForm1Quad

▸ **getImplicitForm1Quad**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/quad/get-implicit-form1.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/quad/get-implicit-form1.ts#L16)*

Returns the quad precision implicit form of the given linear bezier.
* precondition: the input coefficients must be 48-bit-aligned
* Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **errorBound**(): *object*

* ### **coeffs**: *object*

  * **v**: *number[]*

  * **vᵧ**: *number*

  * **vₓ**: *number*
