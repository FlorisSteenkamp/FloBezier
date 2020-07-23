---
id: "_intersection_circle_bezier_intersection_naive_get_coeffs_"
title: "intersection/circle-bezier-intersection/naive/get-coeffs"
sidebar_label: "intersection/circle-bezier-intersection/naive/get-coeffs"
---

[flo-bezier3](../globals.md) › ["intersection/circle-bezier-intersection/naive/get-coeffs"](_intersection_circle_bezier_intersection_naive_get_coeffs_.md)

## Index

### Functions

* [getCeoffsLine](_intersection_circle_bezier_intersection_naive_get_coeffs_.md#getceoffsline)
* [getCeoffsQuadratic](_intersection_circle_bezier_intersection_naive_get_coeffs_.md#getceoffsquadratic)
* [getCoeffsCubic](_intersection_circle_bezier_intersection_naive_get_coeffs_.md#getcoeffscubic)

## Functions

###  getCeoffsLine

▸ **getCeoffsLine**(`circle`: object, `ps`: number[][]): *number[]*

*Defined in [src/intersection/circle-bezier-intersection/naive/get-coeffs.ts:78](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/naive/get-coeffs.ts#L78)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a linear bezier curve

**Returns:** *number[]*

___

###  getCeoffsQuadratic

▸ **getCeoffsQuadratic**(`circle`: object, `ps`: number[][]): *number[]*

*Defined in [src/intersection/circle-bezier-intersection/naive/get-coeffs.ts:47](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/naive/get-coeffs.ts#L47)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a quadratic bezier curve

**Returns:** *number[]*

___

###  getCoeffsCubic

▸ **getCoeffsCubic**(`circle`: object, `ps`: number[][]): *number[]*

*Defined in [src/intersection/circle-bezier-intersection/naive/get-coeffs.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/circle-bezier-intersection/naive/get-coeffs.ts#L10)*

**Parameters:**

▪ **circle**: *object*

a circle

Name | Type |
------ | ------ |
`center` | number[] |
`radius` | number |

▪ **ps**: *number[][]*

a cubic bezier curve

**Returns:** *number[]*
