---
id: "_intersection_inversion_01_"
title: "intersection/inversion-01"
sidebar_label: "intersection/inversion-01"
---

[flo-bezier3](../globals.md) › ["intersection/inversion-01"](_intersection_inversion_01_.md)

## Index

### Variables

* [eEstimate](_intersection_inversion_01_.md#eestimate)

### Functions

* [inversion01Precise](_intersection_inversion_01_.md#inversion01precise)

## Variables

###  eEstimate

• **eEstimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)*

*Defined in [src/intersection/inversion-01.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/inversion-01.ts#L10)*

## Functions

###  inversion01Precise

▸ **inversion01Precise**(`ps`: number[][], `p`: number[]): *object*

*Defined in [src/intersection/inversion-01.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/inversion-01.ts#L22)*

Returns the closest point t value on the bezier to the given point - only
returns t values in the range [0,1]. Also returns the minimum distance found.
**precondition** coefficients of curve and point bit-aligned bitlength <= 46
* this function also acts as an inversion formula.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *object*

* **minD**: *number*

* **t**: *number*
