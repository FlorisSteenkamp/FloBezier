---
id: "_intersection_bezier_intersection_implicit_naive_get_coefficients_2x2_"
title: "intersection/bezier-intersection-implicit/naive/get-coefficients-2x2"
sidebar_label: "intersection/bezier-intersection-implicit/naive/get-coefficients-2x2"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/naive/get-coefficients-2x2"](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x2_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x2_.md#let-abs)

### Functions

* [getCoeffs2x2](_intersection_bezier_intersection_implicit_naive_get_coefficients_2x2_.md#getcoeffs2x2)

## Variables

### `Let` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x2.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x2.ts#L7)*

## Functions

###  getCoeffs2x2

▸ **getCoeffs2x2**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x2.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-2x2.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[]* = [v4, v3, v2, v1, v0]

* **errBound**: *number[]* = [v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
