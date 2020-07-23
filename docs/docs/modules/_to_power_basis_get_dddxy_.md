---
id: "_to_power_basis_get_dddxy_"
title: "to-power-basis/get-dddxy"
sidebar_label: "to-power-basis/get-dddxy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-dddxy"](_to_power_basis_get_dddxy_.md)

## Index

### Functions

* [getDddxy](_to_power_basis_get_dddxy_.md#getdddxy)

## Functions

###  getDddxy

▸ **getDddxy**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-dddxy.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dddxy.ts#L18)*

Returns the 3rd derivative of the power basis representation of a line,
quadratic or cubic bezier's x and y-coordinates.

Note: this is a constant value and the same for all t-values and, in
particular, zero for a line or quadratic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*
