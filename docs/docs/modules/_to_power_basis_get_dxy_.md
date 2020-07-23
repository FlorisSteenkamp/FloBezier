---
id: "_to_power_basis_get_dxy_"
title: "to-power-basis/get-dxy"
sidebar_label: "to-power-basis/get-dxy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-dxy"](_to_power_basis_get_dxy_.md)

## Index

### Functions

* [getDxy](_to_power_basis_get_dxy_.md#getdxy)

## Functions

###  getDxy

▸ **getDxy**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-dxy.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dxy.ts#L13)*

Returns the derivative of the power basis representation of a line, quadratic
or cubic bezier's.

**bitlength**: If the coordinates of the control points are bit-aligned then
* max bitlength increase === max shift === 5 (for cubics)
* max bitlength increase === max shift === 3 (for quadratics)
* max bitlength increase === max shift === 1 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[][]*
