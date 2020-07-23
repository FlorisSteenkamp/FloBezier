---
id: "_intersection_self_intersection_naive_get_coeffs_3_"
title: "intersection/self-intersection/naive/get-coeffs-3"
sidebar_label: "intersection/self-intersection/naive/get-coeffs-3"
---

[flo-bezier3](../globals.md) › ["intersection/self-intersection/naive/get-coeffs-3"](_intersection_self_intersection_naive_get_coeffs_3_.md)

## Index

### Variables

* [abs](_intersection_self_intersection_naive_get_coeffs_3_.md#const-abs)

### Functions

* [getCoeffs3](_intersection_self_intersection_naive_get_coeffs_3_.md#getcoeffs3)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/self-intersection/naive/get-coeffs-3.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/naive/get-coeffs-3.ts#L6)*

## Functions

###  getCoeffs3

▸ **getCoeffs3**(`ps`: number[][]): *object*

*Defined in [src/intersection/self-intersection/naive/get-coeffs-3.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/naive/get-coeffs-3.ts#L13)*

Get self-intersection coefficients
* **precondition**: max bit-aligned bitlength: 47

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *object*

* **coeffs**: *number[]* = [u2, u1, u0]

* **errBound**: *number[]* = [u2_, u1_, u0_].map(c => γ1*c)
