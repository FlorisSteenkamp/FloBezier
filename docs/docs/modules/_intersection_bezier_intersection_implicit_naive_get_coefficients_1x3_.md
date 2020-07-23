---
id: "_intersection_bezier_intersection_implicit_naive_get_coefficients_1x3_"
title: "intersection/bezier-intersection-implicit/naive/get-coefficients-1x3"
sidebar_label: "intersection/bezier-intersection-implicit/naive/get-coefficients-1x3"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/naive/get-coefficients-1x3"](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x3_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x3_.md#const-abs)

### Functions

* [getCoeffs1x3](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x3_.md#getcoeffs1x3)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x3.ts#L7)*

## Functions

###  getCoeffs1x3

▸ **getCoeffs1x3**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x3.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x3.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[]* = [v3, v2, v1, v0]

* **errBound**: *number[]* = [v3_, v2_, v1_, v0_].map(c => γ1*c)
