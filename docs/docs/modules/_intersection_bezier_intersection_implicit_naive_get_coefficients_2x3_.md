---
id: "_intersection_bezier_intersection_implicit_naive_get_coefficients_2x3_"
title: "intersection/bezier-intersection-implicit/naive/get-coefficients-2x3"
sidebar_label: "intersection/bezier-intersection-implicit/naive/get-coefficients-2x3"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/naive/get-coefficients-2x3"](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x3_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x3_.md#let-abs)

### Functions

* [getCoeffs2x3](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x3_.md#getcoeffs2x3)

## Variables

### `Let` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x3.ts#L7)*

## Functions

###  getCoeffs2x3

▸ **getCoeffs2x3**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x3.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x3.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[]* = [v6, v5, v4, v3, v2, v1, v0]

* **errBound**: *number[]* = [v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
