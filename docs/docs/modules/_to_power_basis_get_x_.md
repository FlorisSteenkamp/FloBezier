---
id: "_to_power_basis_get_x_"
title: "to-power-basis/get-x"
sidebar_label: "to-power-basis/get-x"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-x"](_to_power_basis_get_x_.md)

## Index

### Variables

* [sum](_to_power_basis_get_x_.md#const-sum)
* [td](_to_power_basis_get_x_.md#const-td)
* [ts](_to_power_basis_get_x_.md#const-ts)

### Functions

* [getX](_to_power_basis_get_x_.md#getx)
* [getXExact](_to_power_basis_get_x_.md#getxexact)

## Variables

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/to-power-basis/get-x.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-x.ts#L6)*

___

### `Const` td

• **td**: *[twoDiff](_intersection_bezier_intersection_implicit_inversion_old_.md#twodiff)* = twoDiff

*Defined in [src/to-power-basis/get-x.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-x.ts#L7)*

___

### `Const` ts

• **ts**: *twoSum* = twoSum

*Defined in [src/to-power-basis/get-x.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-x.ts#L8)*

## Functions

###  getX

▸ **getX**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-x.ts:30](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-x.ts#L30)*

Returns the approximate power basis representation of a line, quadratic or
cubic bezier's x-coordinates.

If certain preconditions are met (see below) it returns the exact result.

Returns the power basis polynomial from highest power to lowest,
e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]

Bitlength: If the coordinates of the control points are bit-aligned then
max bitlength increase === max shift === 4 (for cubics)
(due to 'multiplication' by 12 (3x 6x 3x) -> ceil(log2(12)) === 4
max bitlength increase === max shift === 2 (for quadratics)
(due to 'multiplication' by 4 (1x 2x 1x)  -> ceil(log2(4)) === 2
max bitlength increase === max shift === 1 (for lines)
(due to 'multiplication' by 4 (1x 1x) -> ceil(log2(2)) === 1

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*

___

###  getXExact

▸ **getXExact**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-x.ts:56](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-x.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *number[][]*
