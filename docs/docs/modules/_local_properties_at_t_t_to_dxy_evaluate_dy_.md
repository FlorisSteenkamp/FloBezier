---
id: "_local_properties_at_t_t_to_dxy_evaluate_dy_"
title: "local-properties-at-t/t-to-dxy/evaluate-dy"
sidebar_label: "local-properties-at-t/t-to-dxy/evaluate-dy"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-dxy/evaluate-dy"](_local_properties_at_t_t_to_dxy_evaluate_dy_.md)

## Index

### Functions

* [evaluateDy](_local_properties_at_t_t_to_dxy_evaluate_dy_.md#evaluatedy)

## Functions

###  evaluateDy

▸ **evaluateDy**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-dxy/evaluate-dy.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-dxy/evaluate-dy.ts#L13)*

Returns the y value of the once differentiated (with respect to t) bezier
when evaluated at t. This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |
`t` | number | The t parameter  |

**Returns:** *number*

▸ **evaluateDy**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-dxy/evaluate-dy.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-dxy/evaluate-dy.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |
