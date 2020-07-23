---
id: "_geometry_are_boxes_intersecting_"
title: "geometry/are-boxes-intersecting"
sidebar_label: "geometry/are-boxes-intersecting"
---

[flo-bezier3](../globals.md) › ["geometry/are-boxes-intersecting"](_geometry_are_boxes_intersecting_.md)

## Index

### Functions

* [areBoxesIntersecting](_geometry_are_boxes_intersecting_.md#areboxesintersecting)

## Functions

###  areBoxesIntersecting

▸ **areBoxesIntersecting**(`closed`: boolean): *(Anonymous function)*

*Defined in [src/geometry/are-boxes-intersecting.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/geometry/are-boxes-intersecting.ts#L10)*

Returns true if the 2 given axis-aligned rectangular boxes intersect.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`closed` | boolean | (defaults to true) Interpret boxes as being closed (i.e. they contain their border) or open. If open then if both boxes have zero area then they are both considered close.  |

**Returns:** *(Anonymous function)*
