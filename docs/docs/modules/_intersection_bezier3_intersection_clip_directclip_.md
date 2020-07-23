---
id: "_intersection_bezier3_intersection_clip_directclip_"
title: "intersection/bezier3-intersection/clip/directclip"
sidebar_label: "intersection/bezier3-intersection/clip/directclip"
---

[flo-bezier3](../globals.md) › ["intersection/bezier3-intersection/clip/directclip"](_intersection_bezier3_intersection_clip_directclip_.md)

## Index

### Functions

* [directClip](_intersection_bezier3_intersection_clip_directclip_.md#directclip)

## Functions

###  directClip

▸ **directClip**(`P`: number[][], `dQ`: function, `dMin`: number, `dMax`: number): *object*

*Defined in [src/intersection/bezier3-intersection/clip/directclip.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier3-intersection/clip/directclip.ts#L11)*

This is the directClip version of the cubic bezier curve intersection
algorithm. Since a cubic needs to be solved as opposed to two quadratics as
in GeoClip, GeoClip is faster.

**Parameters:**

▪ **P**: *number[][]*

▪ **dQ**: *function*

▸ (`p`: number[]): *number*

**Parameters:**

Name | Type |
------ | ------ |
`p` | number[] |

▪ **dMin**: *number*

▪ **dMax**: *number*

**Returns:** *object*

* **tMax**: *number*

* **tMin**: *number*
