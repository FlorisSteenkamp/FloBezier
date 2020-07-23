---
id: "_transformation_split_merge_clone_from_t_to_1_"
title: "transformation/split-merge-clone/from-T-to-1"
sidebar_label: "transformation/split-merge-clone/from-T-to-1"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/from-T-to-1"](_transformation_split_merge_clone_from_t_to_1_.md)

## Index

### Functions

* [fromTTo1](_transformation_split_merge_clone_from_t_to_1_.md#fromtto1)

## Functions

###  fromTTo1

▸ **fromTTo1**(`ps`: number[][], `t`: number): *number[][]*

*Defined in [src/transformation/split-merge-clone/from-T-to-1.ts:14](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/from-T-to-1.ts#L14)*

Returns an order 1, 2 or 3 bezier curve that starts at the given t parameter
and ends at t=1.

A loose bound on the accuracy of the resultant points is given by:
|δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
abd η is Number.EPSILON.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |
`t` | number | The t parameter where the resultant bezier should start  |

**Returns:** *number[][]*
