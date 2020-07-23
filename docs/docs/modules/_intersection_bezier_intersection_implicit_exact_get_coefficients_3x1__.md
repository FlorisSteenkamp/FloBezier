---
id: "_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__"
title: "intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-"
sidebar_label: "intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-"](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md)

## Index

### Variables

* [em2](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#const-em2)
* [epr](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#const-epr)
* [fes](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#const-fes)
* [sce](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#const-sce)
* [tp](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#const-tp)

### Functions

* [getCoeffs3x1Exact_](_intersection_bezier_intersection_implicit_exact_get_coefficients_3x1__.md#getcoeffs3x1exact_)

## Variables

### `Const` em2

• **em2**: *eMultBy2* = eMultBy2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L12)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L10)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L11)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L9)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L13)*

## Functions

###  getCoeffs3x1Exact_

▸ **getCoeffs3x1Exact_**(`ps1`: number[][], `ps2`: number[][]): *number[][]*

*Defined in [src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *number[][]*
