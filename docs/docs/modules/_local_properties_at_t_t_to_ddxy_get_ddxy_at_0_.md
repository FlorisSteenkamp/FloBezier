---
id: "_local_properties_at_t_t_to_ddxy_get_ddxy_at_0_"
title: "local-properties-at-t/t-to-ddxy/get-ddxy-at-0"
sidebar_label: "local-properties-at-t/t-to-ddxy/get-ddxy-at-0"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-ddxy/get-ddxy-at-0"](_local_properties_at_t_t_to_ddxy_get_ddxy_at_0_.md)

## Index

### Functions

* [getDdxyAt0](_local_properties_at_t_t_to_ddxy_get_ddxy_at_0_.md#getddxyat0)

## Functions

###  getDdxyAt0

▸ **getDdxyAt0**(`ps`: number[][]): *number[]*

*Defined in [src/local-properties-at-t/t-to-ddxy/get-ddxy-at-0.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-ddxy/get-ddxy-at-0.ts#L13)*

Returns the 2nd derivative of the power basis representation of a line,
quadratic or cubic bezier's x and y-coordinates when evaluated at t === 0.

Bitlength: If the coordinates of the control points are bit-aligned then
* max bitlength increase === max shift === 5 (for cubics)
* max bitlength increase === max shift === 3 (for quadratics)
* max bitlength increase === max shift === 0 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]  |

**Returns:** *number[]*
