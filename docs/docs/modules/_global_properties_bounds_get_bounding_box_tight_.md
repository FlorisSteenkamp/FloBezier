---
id: "_global_properties_bounds_get_bounding_box_tight_"
title: "global-properties/bounds/get-bounding-box-tight"
sidebar_label: "global-properties/bounds/get-bounding-box-tight"
---

[flo-bezier3](../globals.md) › ["global-properties/bounds/get-bounding-box-tight"](_global_properties_bounds_get_bounding_box_tight_.md)

## Index

### Variables

* [getBoundingBoxTight](_global_properties_bounds_get_bounding_box_tight_.md#let-getboundingboxtight)

## Variables

### `Let` getBoundingBoxTight

• **getBoundingBoxTight**: *function* = memoize(function(ps: number[][]) {
    let [xS, yS] = ps[0];
	let [xE, yE] = ps[ps.length-1];
	
	let sinθ: number;
	let cosθ: number;

	// take care of the case the endpoints are close together
	let len = lengthSquaredUpperBound(ps);
	if (squaredDistanceBetween(ps[0], ps[ps.length-1]) * 2**8 < len) {
		let [xE_, yE_] = evalDeCasteljau(ps, 0.5);
		let hypotenuse = Math.sqrt((xE_-xS)*(xE_-xS) + (yE_-yS)*(yE_-yS));
		sinθ = (yE_ - yS) / hypotenuse;
		cosθ = (xE_ - xS) / hypotenuse;
	} else {
		let hypotenuse = Math.sqrt((xE-xS)*(xE-xS) + (yE-yS)*(yE-yS));
		sinθ = (yE - yS) / hypotenuse;
		cosθ = (xE - xS) / hypotenuse;
	}
	
	let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
	
	let [[p0x,p0y],[p1x,p1y]] = box;

	let axisAlignedBox = [ 
		box[0], [p1x, p0y],
		box[1], [p0x, p1y]
	];

	let rotate_ = rotate(sinθ, cosθ);
	return axisAlignedBox.map(p => translate(ps[0], rotate_(p)));
})

*Defined in [src/global-properties/bounds/get-bounding-box-tight.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounding-box-tight.ts#L13)*

Returns a **non-certified**, **rotated**, **tight** bounding box of the given
order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.

#### Type declaration:

▸ (`a`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`a` | T |
