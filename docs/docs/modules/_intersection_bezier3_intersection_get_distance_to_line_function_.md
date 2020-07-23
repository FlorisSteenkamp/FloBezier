---
id: "_intersection_bezier3_intersection_get_distance_to_line_function_"
title: "intersection/bezier3-intersection/get-distance-to-line-function"
sidebar_label: "intersection/bezier3-intersection/get-distance-to-line-function"
---

[flo-bezier3](../globals.md) › ["intersection/bezier3-intersection/get-distance-to-line-function"](_intersection_bezier3_intersection_get_distance_to_line_function_.md)

## Index

### Functions

* [getDistanceToLineFunction](_intersection_bezier3_intersection_get_distance_to_line_function_.md#private-getdistancetolinefunction)
* [getLineEquation](_intersection_bezier3_intersection_get_distance_to_line_function_.md#getlineequation)

## Functions

### `Private` getDistanceToLineFunction

▸ **getDistanceToLineFunction**(`l`: number[][]): *function*

*Defined in [src/intersection/bezier3-intersection/get-distance-to-line-function.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier3-intersection/get-distance-to-line-function.ts#L6)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`l` | number[][] |   |

**Returns:** *function*

▸ (`p`: number[]): *number*

**Parameters:**

Name | Type |
------ | ------ |
`p` | number[] |

___

###  getLineEquation

▸ **getLineEquation**(`l`: number[][]): *number[]*

*Defined in [src/intersection/bezier3-intersection/get-distance-to-line-function.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier3-intersection/get-distance-to-line-function.ts#L20)*

Get the implicit line equation from two 2d points in the form f(x,y) := ax + by + c = 0
returned as the array [a,b,c].

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`l` | number[][] | A line given by two points, e.g. [[2,0],[3,3]]  |

**Returns:** *number[]*
