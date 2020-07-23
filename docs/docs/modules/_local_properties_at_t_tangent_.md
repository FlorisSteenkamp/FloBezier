---
id: "_local_properties_at_t_tangent_"
title: "local-properties-at-t/tangent"
sidebar_label: "local-properties-at-t/tangent"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/tangent"](_local_properties_at_t_tangent_.md)

## Index

### Functions

* [tangent](_local_properties_at_t_tangent_.md#tangent)

## Functions

###  tangent

▸ **tangent**(`ps`: number[][], `t`: number): *number[]*

*Defined in [src/local-properties-at-t/tangent.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/tangent.ts#L11)*

Returns the squared tangent vector of a cubic bezier curve at a specific t.
This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The parameter value where the tangent should be evaluated  |

**Returns:** *number[]*

▸ **tangent**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/tangent.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/tangent.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number[]*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |
