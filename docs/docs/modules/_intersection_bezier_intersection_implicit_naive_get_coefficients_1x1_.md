---
id: "_intersection_bezier_intersection_implicit_naive_get_coefficients_1x1_"
title: "intersection/bezier-intersection-implicit/naive/get-coefficients-1x1"
sidebar_label: "intersection/bezier-intersection-implicit/naive/get-coefficients-1x1"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/naive/get-coefficients-1x1"](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x1_.md)

## Index

### Variables

* [abs](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x1_.md#const-abs)

### Functions

* [getCoeffs1x1](_intersection_bezier_intersection_implicit_naive_get_coefficients_1x1_.md#getcoeffs1x1)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x1.ts#L7)*

## Functions

###  getCoeffs1x1

▸ **getCoeffs1x1**(`ps1`: number[][], `ps2`: number[][]): *object*

*Defined in [src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x1.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/naive/get-coefficients-1x1.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |

**Returns:** *object*

* **coeffs**: *number[]* = [v1, v0]

* **errBound**: *number[]* = [v1_, v0_].map(c => γ1*c)
