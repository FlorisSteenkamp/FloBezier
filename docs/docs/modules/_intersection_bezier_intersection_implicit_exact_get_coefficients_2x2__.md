---
id: "_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__"
title: "intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-"
sidebar_label: "intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-"](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md)

## Index

### Variables

* [em2](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-em2)
* [epr](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-epr)
* [fes](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-fes)
* [qaq](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-qaq)
* [qm2](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-qm2)
* [sce](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-sce)
* [tp](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#const-tp)

### Functions

* [getCoeffs2x2Exact_](_intersection_bezier_intersection_implicit_exact_get_coefficients_2x2__.md#getcoeffs2x2exact_)

## Variables

### `Const` em2

• **em2**: *eMultBy2* = eMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L13)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L11)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L12)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L8)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L9)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L10)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L14)*

## Functions

###  getCoeffs2x2Exact_

▸ **getCoeffs2x2Exact_**(`ps1`: number[][], `ps2`: number[][]): *number[][]*

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *number[][]*
