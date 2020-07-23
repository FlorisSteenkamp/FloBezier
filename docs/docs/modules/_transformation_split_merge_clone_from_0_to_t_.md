---
id: "_transformation_split_merge_clone_from_0_to_t_"
title: "transformation/split-merge-clone/from-0-to-T"
sidebar_label: "transformation/split-merge-clone/from-0-to-T"
---

[flo-bezier3](../globals.md) › ["transformation/split-merge-clone/from-0-to-T"](_transformation_split_merge_clone_from_0_to_t_.md)

## Index

### Functions

* [from0ToT](_transformation_split_merge_clone_from_0_to_t_.md#from0tot)

## Functions

###  from0ToT

▸ **from0ToT**(`ps`: number[][], `t`: number): *number[][]*

*Defined in [src/transformation/split-merge-clone/from-0-to-T.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/split-merge-clone/from-0-to-T.ts#L15)*

Returns an order 1, 2 or 3 bezier curve that starts at the given curve's t=0
and ends at the given t parameter.

A loose bound on the accuracy of the resultant points is given by:
|δP| = 2n*max(|b_k|)η, where n = 3 (cubic), b_k are the control points
and η is Number.EPSILON.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve |
`t` | number | The t parameter where the resultant bezier should end  |

**Returns:** *number[][]*
