---
id: "_global_properties_bounds_get_bounds_"
title: "global-properties/bounds/get-bounds"
sidebar_label: "global-properties/bounds/get-bounds"
---

[flo-bezier3](../globals.md) › ["global-properties/bounds/get-bounds"](_global_properties_bounds_get_bounds_.md)

## Index

### Variables

* [abs](_global_properties_bounds_get_bounds_.md#const-abs)
* [divWithErr](_global_properties_bounds_get_bounds_.md#divwitherr)
* [getBounds](_global_properties_bounds_get_bounds_.md#let-getbounds)
* [getXBoundsTight](_global_properties_bounds_get_bounds_.md#let-getxboundstight)
* [getYBoundsTight](_global_properties_bounds_get_bounds_.md#let-getyboundstight)
* [sqrtWithErr](_global_properties_bounds_get_bounds_.md#sqrtwitherr)
* [u](_global_properties_bounds_get_bounds_.md#const-u)

### Functions

* [getLinearRoots](_global_properties_bounds_get_bounds_.md#getlinearroots)
* [quadRoots](_global_properties_bounds_get_bounds_.md#quadroots)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/global-properties/bounds/get-bounds.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L14)*

___

###  divWithErr

• **divWithErr**: *[divWithErr](_intersection_self_intersection_self_intersection_.md#divwitherr)*

*Defined in [src/global-properties/bounds/get-bounds.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L12)*

___

### `Let` getBounds

• **getBounds**: *function* = memoize(function(ps: number[][]) {
	// Roots of derivative
	let rootsX = allRoots(getDx(ps),0,1);
	let rootsY = allRoots(getDy(ps),0,1);
		
	// Endpoints
	rootsX.push(0, 1); 
	rootsY.push(0, 1);
	
	let minX = Number.POSITIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	
	let tMinX: number;
	let tMaxX: number;
	let tMinY: number;
	let tMaxY: number;

	// Test points
	for (let i=0; i<rootsX.length; i++) {
		let t = rootsX[i];
		let x = evalDeCasteljauX(ps, t);
		if (x < minX) { minX = x;  tMinX = t; }
		if (x > maxX) { maxX = x;  tMaxX = t; }
	}
	for (let i=0; i<rootsY.length; i++) {
		let t = rootsY[i]; 
		let y = evalDeCasteljauY(ps, t);  
		if (y < minY) { minY = y;  tMinY = t; }
		if (y > maxY) { maxY = y;  tMaxY = t; }
	}
	
	let ts  = [[tMinX, tMinY], [tMaxX, tMaxY]];
	let box = [[minX,  minY ], [maxX,  maxY ]];
	
	return { ts, box };
})

*Defined in [src/global-properties/bounds/get-bounds.ts:181](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L181)*

Returns the approximate axis-aligned bounding box together with the t values
where the bounds on the bezier are reached.

#### Type declaration:

▸ (`a`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`a` | T |

___

### `Let` getXBoundsTight

• **getXBoundsTight**: *function* = memoize(function getXBoundsTight(ps: number[][]) {
	let pS = ps[0];
	let pE = ps[ps.length-1];

	let minX: { ts: number[]; box: number[][]; };
	let maxX: { ts: number[]; box: number[][]; };
	if (pS[0] < pE[0]) {
		minX = { ts: [0,0], box: [pS,pS] };
		maxX = { ts: [1,1], box: [pE,pE] };
	} else {
		minX = { ts: [1,1], box: [pE,pE] };
		maxX = { ts: [0,0], box: [pS,pS] };
	}

	if (ps.length === 2) { return { minX, maxX }; }

	let dx = getDx(ps);  // <= exact if 48-bit aligned

	// Roots of derivative
	let rootsX: { r: number; rE: number; }[];
	if (ps.length === 4) {
		rootsX = quadRoots(dx);
	} else { // ps.length === 3
		rootsX = getLinearRoots(dx);
	}
		
	// Test points
	for (let i=0; i<rootsX.length; i++) {
		let r = rootsX[i];
		let ts = [r.r - r.rE, r.r + r.rE];
		let box = getIntervalBox(ps, ts);

		if (box[0][0] < minX.box[0][0]) { minX = { ts, box } }
		if (box[1][0] > maxX.box[0][0]) { maxX = { ts, box } }
	}

	return { minX, maxX };
})

*Defined in [src/global-properties/bounds/get-bounds.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L22)*

Returns a tight axis-aligned bounding box bound of the given bezier curve.

**`param`** 

#### Type declaration:

▸ (`a`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`a` | T |

___

### `Let` getYBoundsTight

• **getYBoundsTight**: *function* = memoize(function getYBoundsTight(ps: number[][]) {
	let pS = ps[0];
	let pE = ps[ps.length-1];

	let minY: { ts: number[]; box: number[][]; };
	let maxY: { ts: number[]; box: number[][]; };
	if (pS[1] < pE[1]) {
		minY = { ts: [0,0], box: [pS,pS] };
		maxY = { ts: [1,1], box: [pE,pE] };
	} else {
		minY = { ts: [1,1], box: [pE,pE] };
		maxY = { ts: [0,0], box: [pS,pS] };
	}

	if (ps.length === 2) { return { minY, maxY }; }

	let dy = getDy(ps);  // <= exact if 48-bit aligned
	// Roots of derivative
	let rootsY: { r: number; rE: number; }[];
	if (ps.length === 4) {
		rootsY = quadRoots(dy);
	} else { // ps.length === 3
		rootsY = getLinearRoots(dy);
	}

	// Test points
	for (let i=0; i<rootsY.length; i++) {
		let r = rootsY[i];
		let ts = [r.r - r.rE, r.r + r.rE];
		let box = getIntervalBox(ps, ts);

		if (box[0][1] < minY.box[0][1]) { minY = { ts, box } }
		if (box[1][1] > maxY.box[0][1]) { maxY = { ts, box } }
	}

	return { minY, maxY };
})

*Defined in [src/global-properties/bounds/get-bounds.ts:79](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L79)*

Returns a tight axis-aligned bounding box bound of the given bezier curve.

**`param`** 

#### Type declaration:

▸ (`a`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`a` | T |

___

###  sqrtWithErr

• **sqrtWithErr**: *[sqrtWithErr](_intersection_self_intersection_self_intersection_.md#sqrtwitherr)*

*Defined in [src/global-properties/bounds/get-bounds.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L12)*

___

### `Const` u

• **u**: *number* = Number.EPSILON/2

*Defined in [src/global-properties/bounds/get-bounds.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L15)*

## Functions

###  getLinearRoots

▸ **getLinearRoots**(`__namedParameters`: [number, number]): *object[]*

*Defined in [src/global-properties/bounds/get-bounds.ts:63](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [number, number] |

**Returns:** *object[]*

___

###  quadRoots

▸ **quadRoots**(`__namedParameters`: [number, number, number]): *object[]*

*Defined in [src/global-properties/bounds/get-bounds.ts:125](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/bounds/get-bounds.ts#L125)*

Return quad roots in range [0,1] with error assuming input coefficients
are exact.

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [number, number, number] |

**Returns:** *object[]*
