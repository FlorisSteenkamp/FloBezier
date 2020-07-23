---
id: "_intersection_self_intersection_exact_get_coeffs_3__"
title: "intersection/self-intersection/exact/get-coeffs-3-"
sidebar_label: "intersection/self-intersection/exact/get-coeffs-3-"
---

[flo-bezier3](../globals.md) › ["intersection/self-intersection/exact/get-coeffs-3-"](_intersection_self_intersection_exact_get_coeffs_3__.md)

## Index

### Variables

* [epr](_intersection_self_intersection_exact_get_coeffs_3__.md#const-epr)
* [fes](_intersection_self_intersection_exact_get_coeffs_3__.md#const-fes)
* [qdq](_intersection_self_intersection_exact_get_coeffs_3__.md#const-qdq)
* [tp](_intersection_self_intersection_exact_get_coeffs_3__.md#const-tp)

### Functions

* [getCoeffs3Exact_](_intersection_self_intersection_exact_get_coeffs_3__.md#getcoeffs3exact_)

## Variables

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/intersection/self-intersection/exact/get-coeffs-3-.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/exact/get-coeffs-3-.ts#L9)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/intersection/self-intersection/exact/get-coeffs-3-.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/exact/get-coeffs-3-.ts#L10)*

___

### `Const` qdq

• **qdq**: *[ddDiffDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#dddiffdd)* = ddDiffDd

*Defined in [src/intersection/self-intersection/exact/get-coeffs-3-.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/exact/get-coeffs-3-.ts#L8)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/self-intersection/exact/get-coeffs-3-.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/exact/get-coeffs-3-.ts#L7)*

## Functions

###  getCoeffs3Exact_

▸ **getCoeffs3Exact_**(`ps`: number[][]): *number[][]*

*Defined in [src/intersection/self-intersection/exact/get-coeffs-3-.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/exact/get-coeffs-3-.ts#L19)*

Returns the self-intersection poly to solve of the given cubic bezier curve.
see http://www.mare.ee/indrek/misc/2d.pdf
* precondition: max 47 bit bit-aligned coefficient bitlength

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 3 bezier curve.  |

**Returns:** *number[][]*
