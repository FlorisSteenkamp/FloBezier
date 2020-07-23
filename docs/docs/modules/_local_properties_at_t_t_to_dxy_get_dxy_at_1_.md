---
id: "_local_properties_at_t_t_to_dxy_get_dxy_at_1_"
title: "local-properties-at-t/t-to-dxy/get-dxy-at-1"
sidebar_label: "local-properties-at-t/t-to-dxy/get-dxy-at-1"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-dxy/get-dxy-at-1"](_local_properties_at_t_t_to_dxy_get_dxy_at_1_.md)

## Index

### Functions

* [getDxyAt1](_local_properties_at_t_t_to_dxy_get_dxy_at_1_.md#getdxyat1)

## Functions

###  getDxyAt1

▸ **getDxyAt1**(`ps`: number[][]): *number[]*

*Defined in [src/local-properties-at-t/t-to-dxy/get-dxy-at-1.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-dxy/get-dxy-at-1.ts#L16)*

Returns the derivative of the power basis representation of a line, quadratic
or cubic bezier's x and y-coordinates when evaluated at 1.

This is a seperate function because it allows us to make stronger bitlength
guarantees.

Bitlength: If the coordinates of the control points are grid-aligned then
* max bitlength increase === max shift === 3 (for cubics)
* max bitlength increase === max shift === 2 (for quadratics)
* max bitlength increase === max shift === 1 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*
