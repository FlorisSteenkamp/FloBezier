---
id: "_to_power_basis_get_ddxy_"
title: "to-power-basis/get-ddxy"
sidebar_label: "to-power-basis/get-ddxy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-ddxy"](_to_power_basis_get_ddxy_.md)

## Index

### Functions

* [getDdxy](_to_power_basis_get_ddxy_.md#getddxy)

## Functions

###  getDdxy

▸ **getDdxy**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-ddxy.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-ddxy.ts#L14)*

Returns the 2nd derivative of the power basis representation of a line,
quadratic or cubic bezier's x-coordinates.

Bitlength: If the coordinates of the control points are grid-aligned then
max bitlength increase === max shift === 6 (for cubics)
max bitlength increase === max shift === 3 (for quadratics)
max bitlength increase === max shift === 0 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[][]*
