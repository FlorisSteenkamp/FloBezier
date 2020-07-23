---
id: "_implicit_form_exact_get_implicit_form1__"
title: "implicit-form/exact/get-implicit-form1-"
sidebar_label: "implicit-form/exact/get-implicit-form1-"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form1-"](_implicit_form_exact_get_implicit_form1__.md)

## Index

### Variables

* [qdq](_implicit_form_exact_get_implicit_form1__.md#const-qdq)
* [tp](_implicit_form_exact_get_implicit_form1__.md#const-tp)

### Functions

* [getImplicitForm1Exact_](_implicit_form_exact_get_implicit_form1__.md#getimplicitform1exact_)

## Variables

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/exact/get-implicit-form1-.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1-.ts#L7)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/exact/get-implicit-form1-.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1-.ts#L6)*

## Functions

###  getImplicitForm1Exact_

▸ **getImplicitForm1Exact_**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form1-.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1-.ts#L15)*

Returns the exact implicit form of the given linear bezier.
Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **v**: *number[]*

* **vᵧ**: *number*

* **vₓ**: *number*
