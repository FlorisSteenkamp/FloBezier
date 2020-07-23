---
id: "_transformation_quad_to_polyline_"
title: "transformation/quad-to-polyline"
sidebar_label: "transformation/quad-to-polyline"
---

[flo-bezier3](../globals.md) › ["transformation/quad-to-polyline"](_transformation_quad_to_polyline_.md)

## Index

### Interfaces

* [IPolylineNode](../interfaces/_transformation_quad_to_polyline_.ipolylinenode.md)

### Functions

* [quadToPolyline](_transformation_quad_to_polyline_.md#quadtopolyline)

## Functions

###  quadToPolyline

▸ **quadToPolyline**(`ps`: number[][], `tolerance`: number): *number[][]*

*Defined in [src/transformation/quad-to-polyline.ts:10](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/quad-to-polyline.ts#L10)*

Transforms the given quadratic bezier into a polyline approximation to within
a given tolerance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A quadratic bezier curve given as an array of points.  |
`tolerance` | number | - |

**Returns:** *number[][]*
