---
id: "_implicit_form_exact_get_implicit_form2__"
title: "implicit-form/exact/get-implicit-form2-"
sidebar_label: "implicit-form/exact/get-implicit-form2-"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form2-"](_implicit_form_exact_get_implicit_form2__.md)

## Index

### Variables

* [edif](_implicit_form_exact_get_implicit_form2__.md#const-edif)
* [em2](_implicit_form_exact_get_implicit_form2__.md#const-em2)
* [epr](_implicit_form_exact_get_implicit_form2__.md#const-epr)
* [qdq](_implicit_form_exact_get_implicit_form2__.md#const-qdq)
* [qm2](_implicit_form_exact_get_implicit_form2__.md#const-qm2)
* [qno](_implicit_form_exact_get_implicit_form2__.md#const-qno)
* [sce](_implicit_form_exact_get_implicit_form2__.md#const-sce)
* [tp](_implicit_form_exact_get_implicit_form2__.md#const-tp)

### Functions

* [getImplicitForm2Exact_](_implicit_form_exact_get_implicit_form2__.md#getimplicitform2exact_)

## Variables

### `Const` edif

• **edif**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)* = eDiff

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L13)*

___

### `Const` em2

• **em2**: *eMultBy2* = eMultBy2

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L12)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L14)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L11)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L9)*

___

### `Const` qno

• **qno**: *ddNegativeOf* = ddNegativeOf

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L8)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L10)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L7)*

## Functions

###  getImplicitForm2Exact_

▸ **getImplicitForm2Exact_**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form2-.ts:24](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form2-.ts#L24)*

* required: max 47 coefficient bitlength
Returns the exact implicit form of the given quadratic bezier.
Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **v**: *number[]*

* **vᵧ**: *number[]*

* **vᵧᵧ**: *number[]*

* **vₓ**: *number[]*

* **vₓᵧ**: *number[]*

* **vₓₓ**: *number[]*
