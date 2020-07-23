---
id: "_intersection_bezier_intersection_implicit_naive_get_coefficients_3x3_"
title: "intersection/bezier-intersection-implicit/naive/get-coefficients-3x3"
sidebar_label: "intersection/bezier-intersection-implicit/naive/get-coefficients-3x3"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/naive/get-coefficients-3x3"](_intersection_bezier_intersection_implicit_naive_get_coefficients_3x3_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_naive_get_coefficients_3x3_.md#let-abs)

### Functions

* [getCoeffs3x3](_intersection_bezier_intersection_implicit_naive_get_coefficients_3x3_.md#getcoeffs3x3)

## Variables

### `Let` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-3x3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-3x3.ts#L7)*

## Functions

###  getCoeffs3x3

▸ **getCoeffs3x3**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-3x3.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-3x3.ts#L14)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | - |
`ps2` | number[][] |   |

**Returns:** *object*

* **coeffs**: *number[]* = [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0]

* **errBound**: *number[]* = [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
