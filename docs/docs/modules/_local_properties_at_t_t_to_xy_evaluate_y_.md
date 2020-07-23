---
id: "_local_properties_at_t_t_to_xy_evaluate_y_"
title: "local-properties-at-t/t-to-xy/evaluate-y"
sidebar_label: "local-properties-at-t/t-to-xy/evaluate-y"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-xy/evaluate-y"](_local_properties_at_t_t_to_xy_evaluate_y_.md)

## Index

### Functions

* [evaluateY](_local_properties_at_t_t_to_xy_evaluate_y_.md#evaluatey)

## Functions

###  evaluateY

▸ **evaluateY**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate-y.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate-y.ts#L12)*

Returns the y value of the given order 1, 2 or 3 bezier when evaluated at t.
This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A line segment, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t` | number | The t parameter  |

▸ **evaluateY**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate-y.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate-y.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number*
