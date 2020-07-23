---
id: "_global_properties_bounds_get_bounding_box_"
title: "global-properties/bounds/get-bounding-box"
sidebar_label: "global-properties/bounds/get-bounding-box"
---

[flo-bezier3](../globals.md) › ["global-properties/bounds/get-bounding-box"](_global_properties_bounds_get_bounding_box_.md)

## Index

### Variables

* [getBoundingBox](_global_properties_bounds_get_bounding_box_.md#let-getboundingbox)

## Variables

### `Let` getBoundingBox

• **getBoundingBox**: *function* = memoize(function(ps: number[][]) {
	let xBounds = getXBoundsTight(ps);
	let yBounds = getYBoundsTight(ps);

	return [
		[xBounds.minX.box[0][0], yBounds.minY.box[0][1]],
		[xBounds.maxX.box[1][0], yBounds.maxY.box[1][1]]
	];
})

*Defined in [src/global-properties/bounds/get-bounding-box.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounding-box.ts#L14)*

Returns an axis-aligned bounding box of the given order 2,
3 or 4 bezier.
* **certified**

**`param`** A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]

**`returns`** the axis-aligned bounding box in the form
[[minx, miny], [maxx,maxy]

#### Type declaration:

▸ (`a`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`a` | T |
