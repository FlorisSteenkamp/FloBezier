---
id: "_to_power_basis_get_xy_"
title: "to-power-basis/get-xy"
sidebar_label: "to-power-basis/get-xy"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-xy"](_to_power_basis_get_xy_.md)

## Index

### Functions

* [getXY](_to_power_basis_get_xy_.md#getxy)

## Functions

###  getXY

▸ **getXY**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-xy.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-xy.ts#L21)*

Returns the approximate power basis representation of a line, quadratic or
cubic bezier.

If certain preconditions are met (see below) it returns the exact result.

Returns the power basis polynomial from highest power to lowest,
e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]

Bitlength: If the coordinates of the control points are bit-aligned then
max bitlength increase === max shift === 4 (for cubics)
(due to 'multiplication' by 9 (3x 6x 3x)
max bitlength increase === max shift === 2 (for quadratics)
(due to 'multiplication' by 4 (1x 2x 1x)
max bitlength increase === max shift === 1 (for lines)
(due to 'multiplication' by 4 (1x 1x)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[][]*
