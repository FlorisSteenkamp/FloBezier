---
id: "_transformation_get_hodograph_"
title: "transformation/get-hodograph"
sidebar_label: "transformation/get-hodograph"
---

[flo-bezier3](../globals.md) › ["transformation/get-hodograph"](_transformation_get_hodograph_.md)

## Index

### Functions

* [getHodograph](_transformation_get_hodograph_.md#gethodograph)

## Functions

###  getHodograph

▸ **getHodograph**(`ps`: number[][]): *number[][]*

*Defined in [src/transformation/get-hodograph.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/get-hodograph.ts#L10)*

Returns an approximation of the hodograph of the given bezier curve.
* **bitlength**: If the coordinates of the control points are bit-aligned then
* max bitlength increase === 3, max shift === 3 (for cubics)
* max bitlength increase === 1, max shift === 2 (for quadratics)
* max bitlength increase === 1, max shift === 1 (for lines)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier curve.  |

**Returns:** *number[][]*
