---
id: "_to_power_basis_get_dx_"
title: "to-power-basis/get-dx"
sidebar_label: "to-power-basis/get-dx"
---

[flo-bezier3](../globals.md) › ["to-power-basis/get-dx"](_to_power_basis_get_dx_.md)

## Index

### Variables

* [sum](_to_power_basis_get_dx_.md#const-sum)
* [td](_to_power_basis_get_dx_.md#const-td)
* [tp](_to_power_basis_get_dx_.md#const-tp)

### Functions

* [getDx](_to_power_basis_get_dx_.md#getdx)
* [getDxExact](_to_power_basis_get_dx_.md#getdxexact)

## Variables

### `Const` sum

• **sum**: *[eSum](_intersection_bezier_intersection_implicit_inversion_old_.md#esum)* = eSum

*Defined in [src/to-power-basis/get-dx.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dx.ts#L5)*

___

### `Const` td

• **td**: *[twoDiff](_intersection_bezier_intersection_implicit_inversion_old_.md#twodiff)* = twoDiff

*Defined in [src/to-power-basis/get-dx.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dx.ts#L7)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/to-power-basis/get-dx.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dx.ts#L6)*

## Functions

###  getDx

▸ **getDx**(`ps`: number[][]): *number[]*

*Defined in [src/to-power-basis/get-dx.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dx.ts#L22)*

Returns the derivative of the power basis representation of a line, quadratic
or cubic bezier's x-coordinates.

**bitlength**: If the coordinates of the control points are bit-aligned then
* max bitlength increase === max shift === 5 (for cubics - 5,5,3)
* max bitlength increase === max shift === 3 (for quadratics - 3,2)
* max bitlength increase === max shift === 1 (for lines - 1)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*

___

###  getDxExact

▸ **getDxExact**(`ps`: number[][]): *number[][]*

*Defined in [src/to-power-basis/get-dx.ts:65](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/to-power-basis/get-dx.ts#L65)*

Returns the exact derivative of the power basis representation of a line,
quadratic or cubic bezier's x-coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[][]*
