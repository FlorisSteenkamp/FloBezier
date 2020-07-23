---
id: "_geometry_intersect_boxes_"
title: "geometry/intersect-boxes"
sidebar_label: "geometry/intersect-boxes"
---

[flo-bezier3](../globals.md) › ["geometry/intersect-boxes"](_geometry_intersect_boxes_.md)

## Index

### Variables

* [max](_geometry_intersect_boxes_.md#const-max)
* [min](_geometry_intersect_boxes_.md#const-min)

### Functions

* [intersectBoxes](_geometry_intersect_boxes_.md#intersectboxes)

## Variables

### `Const` max

• **max**: *max* = Math.max

*Defined in [src/geometry/intersect-boxes.ts:3](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/geometry/intersect-boxes.ts#L3)*

___

### `Const` min

• **min**: *min* = Math.min

*Defined in [src/geometry/intersect-boxes.ts:2](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/geometry/intersect-boxes.ts#L2)*

## Functions

###  intersectBoxes

▸ **intersectBoxes**(`a`: number[][], `b`: number[][]): *number[][]*

*Defined in [src/geometry/intersect-boxes.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/geometry/intersect-boxes.ts#L12)*

Returns the intersection of 2 given axis-aligned rectangular boxes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`a` | number[][] | Another axis-aligned rectangular box * **closed**:  interpret boxes as being closed (i.e. they contain their border).  |
`b` | number[][] | - |

**Returns:** *number[][]*
