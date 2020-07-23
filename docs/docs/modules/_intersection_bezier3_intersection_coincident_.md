---
id: "_intersection_bezier3_intersection_coincident_"
title: "intersection/bezier3-intersection/coincident"
sidebar_label: "intersection/bezier3-intersection/coincident"
---

[flo-bezier3](../globals.md) › ["intersection/bezier3-intersection/coincident"](_intersection_bezier3_intersection_coincident_.md)

## Index

### Functions

* [calcPointAndNeighbor](_intersection_bezier3_intersection_coincident_.md#calcpointandneighbor)
* [coincident](_intersection_bezier3_intersection_coincident_.md#coincident)

## Functions

###  calcPointAndNeighbor

▸ **calcPointAndNeighbor**(`P`: number[][], `Q`: number[][], `t`: number): *object*

*Defined in [src/intersection/bezier3-intersection/coincident.ts:66](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier3-intersection/coincident.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`P` | number[][] |
`Q` | number[][] |
`t` | number |

**Returns:** *object*

* **d**: *number* = bestD

* **p**: *number[]* = bestQ

* **t**: *number* = bestT

___

###  coincident

▸ **coincident**(`P`: number[][], `Q`: number[][], `δ`: number): *object*

*Defined in [src/intersection/bezier3-intersection/coincident.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier3-intersection/coincident.ts#L17)*

Check if the two given cubic beziers are nearly coincident everywhere along
a finite stretch and returns the coincident stretch (if any), otherwise
returns undefined.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`P` | number[][] | - | A cubic bezier curve. |
`Q` | number[][] | - | Another cubic bezier curve. |
`δ` | number | 0.000001 | An indication of how closely the curves should stay to each other before considered coincident.  |

**Returns:** *object*

* **p**: *number[]*

* **q**: *number[]*
