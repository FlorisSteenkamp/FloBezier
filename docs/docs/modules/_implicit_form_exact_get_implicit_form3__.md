---
id: "_implicit_form_exact_get_implicit_form3__"
title: "implicit-form/exact/get-implicit-form3-"
sidebar_label: "implicit-form/exact/get-implicit-form3-"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form3-"](_implicit_form_exact_get_implicit_form3__.md)

## Index

### Variables

* [ed2](_implicit_form_exact_get_implicit_form3__.md#const-ed2)
* [edif](_implicit_form_exact_get_implicit_form3__.md#const-edif)
* [em2](_implicit_form_exact_get_implicit_form3__.md#const-em2)
* [eno](_implicit_form_exact_get_implicit_form3__.md#const-eno)
* [epr](_implicit_form_exact_get_implicit_form3__.md#const-epr)
* [fes](_implicit_form_exact_get_implicit_form3__.md#const-fes)
* [qaq](_implicit_form_exact_get_implicit_form3__.md#const-qaq)
* [qdq](_implicit_form_exact_get_implicit_form3__.md#const-qdq)
* [qm2](_implicit_form_exact_get_implicit_form3__.md#const-qm2)
* [sce](_implicit_form_exact_get_implicit_form3__.md#const-sce)
* [tp](_implicit_form_exact_get_implicit_form3__.md#const-tp)

### Functions

* [getImplicitForm3Exact_](_implicit_form_exact_get_implicit_form3__.md#getimplicitform3exact_)

## Variables

### `Const` ed2

• **ed2**: *eDivBy2* = eDivBy2

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:23](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L23)*

___

### `Const` edif

• **edif**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)* = eDiff

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L20)*

___

### `Const` em2

• **em2**: *eMultBy2* = eMultBy2

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L22)*

___

### `Const` eno

• **eno**: *[eNegativeOf](_implicit_form_exact_get_implicit_form3_.md#enegativeof)* = eNegativeOf

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L21)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L18)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L19)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L16)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L15)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L14)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L17)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L13)*

## Functions

###  getImplicitForm3Exact_

▸ **getImplicitForm3Exact_**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form3-.ts:35](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3-.ts#L35)*

* precondition: max 47 coefficient bitlength
Returns an approximate implicit form of the given cubic bezier and an
implicit form coefficientwise error bound of the given cubic bezier.
* takes about 155 micro-seconds on a 1st gen i7 and Chrome 79

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *object*

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
