---
id: "_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__"
title: "intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-"
sidebar_label: "intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-"](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md)

## Index

### Variables

* [em2](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-em2)
* [epr](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-epr)
* [fes](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-fes)
* [qaq](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-qaq)
* [qm2](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-qm2)
* [sce](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-sce)
* [tp](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#const-tp)

### Functions

* [getCoeffs3x3Exact_](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x3__.md#getcoeffs3x3exact_)

## Variables

### `Const` em2

• **em2**: *eMultBy2* = eMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L16)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L14)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L15)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L12)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L11)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L13)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L17)*

## Functions

###  getCoeffs3x3Exact_

▸ **getCoeffs3x3Exact_**(`ps1`: number[][], `ps2`: number[][]): *number[][]*

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts:27](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-.ts#L27)*

* **precondition**: 47-bit bit-aligned coefficient bitlength (this is to
improve speed considerably)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | - |
`ps2` | number[][] |   |

**Returns:** *number[][]*
