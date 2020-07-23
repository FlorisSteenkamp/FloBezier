---
id: "_intersection_get_endpoint_intersections_"
title: "intersection/get-endpoint-intersections"
sidebar_label: "intersection/get-endpoint-intersections"
---

[flo-bezier3](../globals.md) › ["intersection/get-endpoint-intersections"](_intersection_get_endpoint_intersections_.md)

## Index

### Functions

* [getEndpointIntersections](_intersection_get_endpoint_intersections_.md#getendpointintersections)

## Functions

###  getEndpointIntersections

▸ **getEndpointIntersections**(`ps1`: number[][], `ps2`: number[][], `minD`: number): *RootInterval[][]*

*Defined in [src/intersection/get-endpoint-intersections.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/get-endpoint-intersections.ts#L14)*

Returns the t pairs where the endpoints of the two given same-k-family curves
overlap.
* **precondition**: the two given curves must be in the same k-family.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | an order 1,2 or 3 bezier curve |
`ps2` | number[][] | another order 1,2 or 3 bezier curve |
`minD` | number | an error bound given as a distance  |

**Returns:** *RootInterval[][]*
