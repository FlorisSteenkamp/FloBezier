---
id: "_local_properties_at_t_t_to_xy_evaluate_x_"
title: "local-properties-at-t/t-to-xy/evaluate-x"
sidebar_label: "local-properties-at-t/t-to-xy/evaluate-x"
---

[flo-bezier3](../globals.md) › ["local-properties-at-t/t-to-xy/evaluate-x"](_local_properties_at_t_t_to_xy_evaluate_x_.md)

## Index

### Functions

* [evaluateX](_local_properties_at_t_t_to_xy_evaluate_x_.md#evaluatex)

## Functions

###  evaluateX

▸ **evaluateX**(`ps`: number[][]): *function*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate-x.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate-x.ts#L13)*

Returns the x value of the given order 1, 2 or 3 bezier when evaluated at t.
This function is curried.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *function*

▸ (`t`: number): *number*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t` | number | The t parameter  |

▸ **evaluateX**(`ps`: number[][], `t`: number): *number*

*Defined in [src/local-properties-at-t/t-to-xy/evaluate-x.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/local-properties-at-t/t-to-xy/evaluate-x.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`t` | number |

**Returns:** *number*
